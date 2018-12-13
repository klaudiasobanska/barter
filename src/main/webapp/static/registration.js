$(function () {

    $("#registrationErrorToast").dxToast({
        message: "Login zajęty",
        type: "error",
        displayTime: 3000
    });

    $("#registrationText").html("");
    $("#registrationText").append("Rejestracja");




    var data = {
        email:"",
        login: "",
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
            dataField: "login",
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
            var registrationForm = $("#registrationForm").dxForm('instance');


            data.email = registrationForm.getEditor('email').option('value');
            data.login = registrationForm.getEditor('login').option('value');
            data.password = registrationForm.getEditor('password').option('value');
            data.birthDate = registrationForm.getEditor('birthDate').option('value');
            delete data.confirm;


            data = JSON.stringify(data);

            var ret = registrationForm.validate();

            if (ret.isValid) {
                if (registrationForm.getEditor('password').option('value') === registrationForm.getEditor('confirm').option('value')) {
                    $.ajax({
                        url: './users/add',
                        type: 'post',
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function (result) {
                            if (result.errorMsg) {
                                $("#registrationErrorToast").dxToast("show");

                            } else {
                                location.href ="./home";
                            }
                        },
                        data: data
                    });
                }
            }
        }
    });



});