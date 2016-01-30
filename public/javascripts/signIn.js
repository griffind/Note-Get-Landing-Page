var $username = $("#username");
var $password = $("#password");
var $errorUsername = $("#errorUsername");

function isUsernameValid() {
    return $username.val().length >= 5 && $username.val().length < 25;
}

function isPasswordValid() {
    return $password.val().length >= 8;
}

function usernameEvent() {
    //Hide the error messages
    $errorUsername.slideUp();
    //Find out if username is valid
    if (isUsernameValid()) {
        $username.css({"border-color": "#898989"});
        console.log("username valid");
    } else {
        $username.css({"border-color": "#F00"});
        console.log("username invalid");
    }
}

function passwordEvent() {
    //Hide the error messages
    $errorUsername.slideUp();
    //Find out if password is valid
    if (isPasswordValid()) {
        $password.css({"border-color": "#898989"});
        console.log("pass valid");
    } else {
        $password.css({"border-color": "#F00"});
        console.log("pass invalid");
    }
}

function canSubmit() {
    return isUsernameValid() && isPasswordValid();
}


function canSubmitForm() {
    console.log("canSubmitForm got called");
    //Does the users info conform to the requirements?
    if (canSubmit()) {
        $("#signUpBig").css({"color": "#09F"});

    } else {
        $("#signUpBig").css({"color": "#808080"});
    }
}

//trim the username, and check if valid
$username.on("keyup change blur", function () {
    var username = $username.val().trim();
    $username.val(username);
    usernameEvent();
    passwordEvent();
    canSubmitForm();
});

//trim the password, and check if valid
$password.on("keyup change blur", function () {
    var password = $password.val().trim();
    $password.val(password);
    passwordEvent();
    usernameEvent();
    canSubmitForm();
});

$("#form").submit(function (evt) { //Handle the submit here.
    evt.preventDefault();

    var url = "/verifyUser";
    var formData = $("#form").serialize();

    $.post(url, formData, function (response) {
        console.log(response);
        // Save token to storage
        window.localStorage.token = response.sec_token;
        window.location.replace('/app');
    }).fail(function (jqXHR) {
        console.log(jqXHR.status);

        $errorUsername.slideDown('slow');
        $username.css({"border-color": "#F00"});
        $password.css({"border-color": "#F00"});

    });//end fail and post
});//end submit

//when the user clicks the button to submit
$(document).on("click", "#signUpBig", function () {

    if (canSubmit()) {
        $("#form").submit(); //Trigger the Submit Here
    }
});

//when the user presses enter to submit
$(document).keyup(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13' && canSubmit()) {
        $("#form").submit();
    }

});
