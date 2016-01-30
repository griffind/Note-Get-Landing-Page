var $password = $("#password");
var $confirmPassword = $("#confirmPassword");
var $username = $("#username");
var $email = $("#email");
var $errorUsername = $("#errorUsername");
var $errorEmail = $("#errorEmail");

function isUsernameValid() {
    return $username.val().length >= 5 && $username.val().length < 25;
}

function isPasswordValid() {
    return $password.val().length >= 8;
}

function arePasswordsMatching() {
    return $password.val() === $confirmPassword.val();
}

function isEmailValid() {
    return $email.val() != "" && $email.val().indexOf("@") >= 0;
}

function canSubmit() {
    return isPasswordValid() && arePasswordsMatching() && isUsernameValid() && isEmailValid();
}

function usernameEvent() {
    //Hide username taken error
    $errorUsername.slideUp('slow');
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
    //Find out if password is valid  
    if (isPasswordValid() && arePasswordsMatching()) {
        //pass do match
        $password.css({"border-color": "#898989"});
        $confirmPassword.css({"border-color": "#898989"});
        console.log("pass match");
    } else {
        //pass dont match
        $password.css({"border-color": "#F00"});
        $confirmPassword.css({"border-color": "#F00"});
        console.log("pass no match");
    }
}

function emailEvent() {
    //Hide email invalid error
    $errorEmail.slideUp('slow');
    //Does email exist and contain an @ sign?
    if (isEmailValid()) {
        $email.css({"border-color": "#898989"});
        console.log("email valid");
    } else {
        $email.css({"border-color": "#F00"});
        console.log("email invalid");
    }
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


$username.on("keyup change blur", function () {
    var username = $username.val().trim();
    $username.val(username);
    usernameEvent();
    canSubmitForm();
});
$email.on("keyup change blur", function () {
    var email = $email.val().trim();
    $email.val(email);
    emailEvent();
    canSubmitForm();
});
$password.on("keyup change blur", function () {
    var password = $password.val().trim();
    $password.val(password);
    passwordEvent();
    canSubmitForm();
});
$confirmPassword.on("keyup change blur", function () {
    var confirmPassword = $confirmPassword.val().trim();
    $confirmPassword.val(confirmPassword);
    passwordEvent();
    canSubmitForm();
});


//submit function
$("#form").submit(function (evt) { //Handle the submit here.
    evt.preventDefault();

    var url = "/createUser";
    var formData = $("#form").serialize();
    console.log("Form: " + formData);
    $.post(url, formData, function (response) {
        console.log(response);

        //Send the email verification email
        var from, to, subject, text;
        to = $email.val();
        $.get("https://localhost:3333/send", {to: to}, function (data) {
            console.log(data);
            //Check to see if the email was sent
            if (data == 'email sent') {
                $("#success").slideDown('slow');
            }
        })//end get
    }).fail(function (jqXHR) {
        console.log(jqXHR.status);
        if (jqXHR.status == '409') {
            $errorUsername.slideDown('slow');
            $username.css({"border-color": "#F00"});
        } else if (jqXHR.status == '422') {
            $errorEmail.slideDown('slow');
            $email.css({"border-color": "#F00"});
        }
    });//end fail and post
});//end submit

//call submit when button is clicked
$(document).on("click", "#signUpBig", function () {
    //Check if form can be submitted
    if (canSubmit()) {
        $("#form").submit(); //Trigger the Submit Here
    } else {
        console.log("the forms info is not valid");
        usernameEvent();
        emailEvent();
        passwordEvent();
    }
});

//call submit when enter is pressed
$(document).keyup(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13' && canSubmit()) {
        $("#form").submit();
    } else if (keycode == '13') {
        console.log("the forms info is not valid");
        usernameEvent();
        emailEvent();
        passwordEvent();
    }

});





