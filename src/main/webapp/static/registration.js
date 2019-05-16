$(function () {

    $("#registrationErrorLoginToast").dxToast({
        message: "Login jest już zajęty",
        type: "error",
        displayTime: 3000
    });
    $("#registrationErrorEmailToast").dxToast({
        message: "Adres email już istnieje",
        type: "error",
        displayTime: 3000
    });

    $("#registrationText").html("");
    $("#registrationText").append("Rejestracja");


    var data = {
        email:"",
        username: "",
        password: "",
        confirm:"",
        birthDate:""
    };

    $("#registrationForm").dxForm({
        formData: data,
        items: [{
            dataField: "email",
            label: {
                location: "top",
                alignment: "left",
                text: "Email"
            },
            validationRules: [{
                type: "required",
                message: "Adres email jest wymagany"
            }, {
                type: "email",
                message: "Niepoprawny adres email"
            }]
        },{
            dataField: "username",
            label: {
                location: "top",
                size: "20px",
                alignment: "left",
                text: "Login"
            },
            validationRules: [{
                type: "required",
                message: "Login jest wymagany"
            }]
        },{
            dataField: "password",
            editorOptions: {
                mode: 'password'
            },
            label: {
                location: "top",
                alignment: "left",
                text: "Hasło"
            },
            validationRules: [{
                type: "required",
                message: "Hasło jest wymagane"
            }]
        },{
            dataField: "confirm",
            editorOptions: {
                mode: 'password'
            },
            label: {
                location: "top",
                alignment: "left",
                text: "Potwierdź hasło"
            },
            validationRules: [{
                type: "required",
                message: "Potwierdzenie hasła jest wymagane"
            }, {
                type: "compare",
                comparisonTarget: function () {
                    var password = $("#registrationForm").dxForm('instance');
                    if (password) {
                        return password.getEditor('password').option('value');
                    }
                },
                message: "Hasła nie są zgodne"
            }]
        },{
            dataField: "birthDate",
            editorType: "dxDateBox",
            label: {
                location: "top",
                alignment: "left",
                text: "Data urodzenia"
            },
            editorOptions: {
                displayFormat: "yyyy-MM-dd"
            },
            validationRules: [{
                type: "required",
                message: "Data urodzenia jest wymagana"
            }, {
                type: "range",
                max: new Date().setFullYear(new Date().getFullYear() - 18),
                message: "Wymagana jest pełnoletność"
            }]
        }]
    });

    $("#registrationButtonForm").dxButton({
        text: "Zarejestruj się",
        type: "normal",
        onClick: function () {
            data = {
                email:"",
                username: "",
                password: "",
                confirm:"",
                birthDate:""
            };

            var dataLogin = {
                username: "",
                password: ""
            };

            var registrationForm = $("#registrationForm").dxForm('instance');

            data.email = registrationForm.getEditor('email').option('value');
            data.username = registrationForm.getEditor('username').option('value');
            dataLogin.username = registrationForm.getEditor('username').option('value');
            data.password = registrationForm.getEditor('password').option('value');
            dataLogin.password = registrationForm.getEditor('password').option('value');
            data.birthDate = registrationForm.getEditor('birthDate').option('value');
            delete data.confirm;

            data = JSON.stringify(data);
            dataLogin = JSON.stringify(dataLogin);

            var ret = registrationForm.validate();

            if (ret.isValid) {
                if (registrationForm.getEditor('password').option('value') === registrationForm.getEditor('confirm').option('value')) {
                    $.ajax({
                        url: './api/auth/signup',
                        type: 'post',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: data,
                        success: function (result) {
                            if (result.errorMsg === "login") {
                                $("#registrationErrorLoginToast").dxToast("show");

                            }else if(result.errorMsg === "email"){
                                $("#registrationErrorEmailToast").dxToast("show");
                            }
                            else {
                                $.ajax({
                                    url: './api/auth/signin',
                                    type: 'post',
                                    dataType: 'json',
                                    contentType: 'application/json; charset=utf-8',
                                    data: dataLogin,
                                    success: function (data) {
                                        $.cookie('token', data.accessToken);
                                        $.ajaxSetup({
                                            headers: {
                                                'Authorization': "Bearer " + $.cookie('token')
                                            }
                                        });
                                    }
                                });
                                location.href ="./home";
                            }
                        }
                    });
                }
            }
        }
    });



});