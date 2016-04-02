/* jshint camelcase: false */
'use strict';

const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

module.exports = function (nodecg) {
	// Check that config is present and valid
	if (!nodecg.bundleConfig) {
		throw new Error('No config found in cfg/lfg-streamtip.json, aborting!');
	} else if (typeof nodecg.bundleConfig.clientId !== 'string') {
		throw new Error('StreamTip clientId not present in config! Should be a string. Aborting.');
	} else if (typeof nodecg.bundleConfig.accessToken !== 'string') {
		throw new Error('StreamTip accessToken not present in config! Should be a string. Aborting.');
	}

	const Streamtip = require('streamtip-listener');
	const listener = new Streamtip({
		clientId: nodecg.bundleConfig.clientId,
		accessToken: nodecg.bundleConfig.accessToken
	});
	const tops = nodecg.Replicant('tops', {defaultValue: {}});

	listener.on('connected', () => {
		nodecg.log.info('Connected to StreamTip');
	});

	listener.on('authenticated', () => {
		// Now authenticated, we can expect tip alerts to come through
		nodecg.log.info('Authenticated with StreamTip');
	});

	listener.on('authenticationFailed', () => {
		// ClientID or Access Token was rejected
		nodecg.log.error('Authentication failed!');
	});

	listener.on('newTip', tip => {
		// We got a new tip.
		// 'tip' is an object which matches the description given on the Streamtip API page
		emitter.emit('tip', tip);
		nodecg.sendMessage('tip', tip);
	});

	listener.on('newTop', (period, tip) => {
		tops.value[period] = tip;
	});

	listener.on('error', err => {
		// An unexpected error occurred
		nodecg.log.error('Error! %s', err.message);
	});

	emitter.resetPeriod = function (period) {
		if (tops.value[period]) {
			try {
				listener.resetTop(period);
			} catch (err) {
				nodecg.log.error('resetPeriod error! %s', err.message);
			}
			tops.value[period] = {};
		}
	};

	nodecg.listenFor('resetPeriod', emitter.resetPeriod);

	return emitter;
};
