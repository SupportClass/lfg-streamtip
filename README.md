# lfg-streamtip [![Build Status](https://travis-ci.org/SupportClass/lfg-streamtip.svg?branch=master)](https://travis-ci.org/SupportClass/lfg-streamtip)
This is a [NodeCG](http://github.com/nodecg/nodecg) bundle.

Listens for tips to a given account on [StreamTip](https://streamtip.com/) and emits API events for other bundles to use.
Also displays stats on the dashboard and easily allows the user to reset said stats.

This bundle integrates with [`lfg-nucleus`](https://github.com/SupportClass/lfg-nucleus).

## Installation
- Install to `nodecg/bundles/lfg-streamtip`
- Create `nodecg/cfg/lfg-streamtip.json` with the `clientId` and `accessToken` of the 
[StreamTip](https://streamtip.com/) account that you wish to listen to:
```json
{
  "clientId": "xxxxx",
  "accessToken": "yyyyy"
}
```

## Usage
### As a dashboard panel
If you simply want to see top tips for the `daily` and `monthly` periods on your dashboard, you are done.

### In other bundles' view pages and dashboard panels
If you would like to use this data in another bundle, add the following code to your view/panel:
```javascript
nodecg.listenFor('tip', 'lfg-streamtip', callback);
```
... where 'callback' is the name of a function with the signature `function callback(data)`

### In other bundles' extensions
If you want to use tip events in another bundle's extension,
add `lfg-streamtip` as a `bundleDependency` in your bundle's [`nodecg.json`](http://nodecg.com/guide/nodecg.json.html)

Then add the following code:
```javascript
var streamTip = nodecg.extensions['lfg-streamtip'];
streamTip.on('tip', function(tip) {
     // Do your thing.
});
```

### License
lfg-streamtip is provided under the MIT license, which is available to read in the [LICENSE][] file.
[license]: LICENSE
