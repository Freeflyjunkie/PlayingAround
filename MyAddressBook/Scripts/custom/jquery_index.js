$(document).ready(function () {

    // EXTEND
    var animal = {
        eat: function () {
            console.log("I'm Eating");
        },
        color: "brown"
    }

    var dog = {
        bark: function () {
            console.log("I'm barking");
        },
        color: "white"
    }

    dog.bark();
    $.extend(dog, animal);
    dog.eat();

    // ARRAY FUNCS
    var myArray = [1, 2, 3, 3, 4, 4, 5];
    var myArray2 = [5, 6, 7, 8];
    if ($.inArray(2, myArray) != -1) {
        console.log('2 is in myArray');
    }

    var uniqueArray = $.unique(myArray);
    console.log(uniqueArray);

    // EACH
    $(myArray).each(function (idx, element) {
        console.log(element + " is at index " + idx);
    });

    // PARSE JSON
    var json = '{ "fname" : "Eric", "lname" : "Torres", "Age" : "40" }';
    var myObject = $.parseJSON(json);
    $('#output').append(myObject.fname + "<br/>" + myObject.lname + "<br/>" + myObject.Age);

    // GET SCRIPT
    //$.getScript("Scripts/custom/remote.js", function(data, textStatus) {
    //    console.log("remote script execution " + textStatus);
    //});

    //$('#remoteScriptError').ajaxError(function (event, jqXHR, ajaxSettings, thrownError) {
    //    console.log(thrownError);
    //});


    //callAnotherFunction(3, 1500, functionToCall);

    // pushstack
    //$('div').children().hide().end().addClass('myclass');

    $.fn.everyThird = function () {
        var arr = [];
        $.each(this, function (idx, item) {
            if (idx % 3 == 0) {
                arr.push(item);
            }
        });
        return this.pushStack(arr, "everyThird", "");
    }

    $("div").everyThird().css("color", "red").end().css("font-weight", "bold");
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