/**
 * This is a extension for website shellsmart.com
 * On URL https://www.shellsmart.com/smart/account/transactions, there is list of filtered transactions.
 * But there is no total amount of listed points. For clients is useful to see, how much points they have for
 * last 12 months, because of reaching premium membership.
 *
 * This extension show total points of filtered list.
 *
 * @summary Extension show total points of filtered list at https://www.shellsmart.com/smart/account/transactions.
 * author   mkopca
 * version  1.0
 * since    2016-12-21
 */

/**
 * Return integer value from html content of jQuery element (strip non-numeric characters)
 *
 * @param   (jQuery Object) el - jQuery element, that contain amount of points
 * @returns {Number} - integer value of html content of input element
 */
function getNumericValueOfPointElement(el){
    return parseInt(el.html().replace(/\D/g,''));
}

/**
 * Return alphabetical chars from html content of jQuery element (strip non-numeric characters)
 *
 * @param   (jQuery Object) el - jQuery element, that contain amount of points
 * @returns {String} - alphabetical string of html content of input element
 */
function getAlphabeticalValueOfPointElement(el){
    return el.html().replace(/[\d\s\W]/g,'');
}

/**
 * Run calculation process, if html row containing total points is missing.
 * Because if user change filter by ajax, we must watching, when list of points is changed,
 * and then run calculation.
 */
function calculateIfExistTotalCountRow() {
    if (jQuery('#totalCount').length != 0) {
        setTimeout(calculateIfExistTotalCountRow, 200);
    } else {
        calculateTotal();
    }
}

/**
 * Calculate total points and show table row with this number.
 */
function calculateTotal(){
    var totalCount = 0;
    jQuery('#transaction_points, [id^=transaction_points_u]').each(function(){
        if (jQuery(this).html().substr(0,1) == '-') {
            totalCount -= getNumericValueOfPointElement(jQuery(this));
        } else {
            totalCount += getNumericValueOfPointElement(jQuery(this));
        }
    });

    // get points shortcut
    var pointsShortcut = '';
    var firstRowPoints = jQuery('#transaction_points, [id^=transaction_points_u]').first();
    if (firstRowPoints.length != 0) {
        pointsShortcut = getAlphabeticalValueOfPointElement(firstRowPoints);
    }

    var totalRow =
        '<tr><th style="background-color: #f7d117; padding: 8px 20px;">TOTAL</th>' +
        '<th style="background-color: #f7d117;"></th>' +
        '<th id="totalCount" style="background-color: #f7d117; padding: 8px 20px; text-align: center;">' + totalCount + pointsShortcut + '</th></tr>';

    jQuery('#transaction_table tbody:first-child').append(totalRow);
}

jQuery(document).ready(function(){
    calculateTotal();
});

jQuery('#filter_form select').change(function(){
    calculateIfExistTotalCountRow();
});


