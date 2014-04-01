$(document).ready(function () {
    var myArray = [1, 2, 3, 3, 4, 4, 5];
    var myArray2 = [5, 6, 7, 8];
    
    $.getScript("Scripts/custom/remote.js", function(data, textStatus) {
        console.log("remote script execution " + textStatus);
    });

    $('#remoteScriptError').ajaxError(function (event, jqXHR, ajaxSettings, thrownError) {
        console.log(thrownError);
    });

    //callAnotherFunction(3, 1500, functionToCall);
});

// optional parameters
function callAnotherFunction(arg1, arg2, arg3) {
    var times = $.isNumeric(arg1) ? arg1 : 4;
    var delay = $.isNumeric(arg2) ? arg2 : 1000;
    var functionToCall = $.isFunction(arg1) ? arg1 : $.isFunction(arg2) ? arg2 : arg3;

    var index = 0;

    (function loopit() {
        index++;
        functionToCall();
        if (index < times)
            setTimeout(loopit, delay);
    })();
}

function functionToCall() {
    $('#output').append("<br/> function called");
}