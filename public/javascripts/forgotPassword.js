var $email = $("#email");
var $errorEmail = $("#errorEmail");

function isEmailValid() {
    return $email.val() != "" && $email.val().indexOf("@") >= 0;
}

function emailEvent() {
    $errorEmail.slideUp();
    //Does email exist and contain an @ sign?
    if (isEmailValid()) {
        $("#email").css({"border-color": "#898989"});
        $("#signUpBig").css({"color": "#09F"});
        console.log("email valid");
    } else {
        $("#email").css({"border-color": "#F00"});
        $("#signUpBig").css({"color": "#808080"});
        console.log("email invalid");
    }
}

$("#form").submit(function (evt) { //Handle the submit here.
    evt.preventDefault();

    var url = "/forgotPassword";
    var formData = $("#form").serialize();

    $.post(url, formData, function (response) {
        console.log(response);

    }).fail(function (jqXHR) {
        console.log(jqXHR.status);
        //TODO: Correct error messages based on whatever the server sends back.
        $errorEmail.slideDown('slow');
        $username.css({"border-color": "#F00"});

    });//end fail and post
});//end submit

//when the user clicks the button to submit
$(document).on("click", "#signUpBig", function () {

    if (isEmailValid()) {
        $("#form").submit(); //Trigger the Submit Here
    }
});

//when the user presses enter to submit
$(document).keyup(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13' && isEmailValid()) {
        $("#form").submit();
    }

});


$email.on("keydown change blur", function () {
    var email = $email.val().trim();
    $email.val(email);
    emailEvent();

});