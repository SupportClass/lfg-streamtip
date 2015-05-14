'use strict';

var modal = $('#lfg-streamtip_modal');
var panel = $bundle.filter('.tip-stats');
var dayAmount = panel.find('.js-daily').find('.js-amount');
var dayUsername = panel.find('.js-daily').find('.js-username');
var monthAmount = panel.find('.js-monthly').find('.js-amount');
var monthUsername = panel.find('.js-monthly').find('.js-username');

nodecg.Replicant('tops')
    .on('change', function(oldVal, newVal) {
        if (!newVal) return;

        var dayamt = '$0';
        var dayusr = 'N/A';
        var monthamt = '$0';
        var monthusr = 'N/A';
        var dayTopTip = newVal.daily;
        var monthTopTip = newVal.monthly;

        if (dayTopTip && dayTopTip.cents > 0) {
            dayamt = dayTopTip.currencySymbol + dayTopTip.amount;
            dayusr = dayTopTip.username;
        }

        if (monthTopTip && monthTopTip.cents > 0) {
            monthamt = monthTopTip.currencySymbol + monthTopTip.amount;
            monthusr = monthTopTip.username;
        }

        dayAmount.html(dayamt);
        dayAmount.attr('title', dayamt);
        dayUsername.html(dayusr);
        dayUsername.attr('title', dayusr);

        monthAmount.html(monthamt);
        monthAmount.attr('title', monthamt);
        monthUsername.html(monthusr);
        monthUsername.attr('title', monthusr);
    });

//triggered when modal is about to be shown
modal.on('show.bs.modal', function(e) {
    //get data-id attribute of the clicked element
    var period = $(e.relatedTarget).data('period');
    $(this).find('.js-period')
        .html(period)
        .data('period', period);
});

modal.find('.js-reset').click(function() {
    var period = modal.find('.js-period').data('period');
    nodecg.sendMessage('resetPeriod', period);
});
