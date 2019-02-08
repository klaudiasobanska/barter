function cardTemplate(itemData) {

    var result = $("<div>").addClass("productContent");

    $.get("./image/offer?offerId="+itemData.id, function (t){
        if (t[0] != undefined) {

            $('<img  id="homeImg ' + itemData.id + '" onclick="productCardClick(' + itemData.id +')" >').attr("src", t[0]).appendTo(result);

        }

    });
    var temp = '<div class="productName ' + itemData.id + '" onclick="productCardClick(' + itemData.id + ')">' + itemData.name + '</div>'+
        '<div class="overlay ' + itemData.id + '" onclick="productCardClick(' + itemData.id +')">'+'<img id="iconSearch" src="./static/icon/search.png">'+'</div>';


    result.append(temp);

    return result;


}

function productCardClick(productId) {
    location.href = './product?productId='+productId;
}

function showLoginPopup() {

    $("#loginPopup").dxPopup("show");

    loginForm();

}

function loginForm() {

    $("#loginText").html("");
    $("#loginText").append("Zaloguj się");

    $("#registrationHomeText").html("");
    $("#registrationHomeText").append("Nie masz konta?");

    $("#registrationLink").html("");
    $("#registrationLink").append("Zarejestruj się");

    var data = {
        login: "",
        password: ""
    };

    $("#loginForm").dxForm({
        formData: data,
        items: [{
            dataField: "login",
            label: {
                location: "top",
                alignment: "left",
                text: "Login lub email"
            }
        }, {
            dataField: "password",
            editorOptions: {
                mode: 'password'
            },
            label: {
                location: "top",
                size: "20px",
                alignment: "left",
                text: "Hasło"
            }
        }]
    });

    $("#loginButtonForm").dxButton({
        text: "Zaloguj",
        type: "normal",
        onClick: function (e) {
            var loginForm = $("#loginForm").dxForm('instance');
            var logForm = {
                login: loginForm.getEditor('login').option('value'),
                password: loginForm.getEditor('password').option('value')
            };

            $.post('./login', logForm, function (result) {
            }).done(function () {
                location.href = './home';
                $("#loginPopup").dxPopup("hide");
            })
        }
    });
}