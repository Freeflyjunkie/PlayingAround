(function ($) {
    $.old_merge = $.merge;
    $.merge = function (first, second, third) {
        $.old_merge(first, second);
        if (third)
            $.old_merge(first, third);
        return first;
    }
})(jQuery);



$(document).ready(function () {
    $.log('Test Adding Functions To JQuery');

    var array1 = [1, 2, 3];
    var array2 = [4, 5, 6];
    var array3 = [7, 8, 9];

    var merged = $.merge(array1, array2, array3);
    $.log(merged);

});