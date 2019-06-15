var user;
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

function goHome() {
    return location.href = "./home"
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
                username: loginForm.getEditor('login').option('value'),
                password: loginForm.getEditor('password').option('value')
            };
            logForm = JSON.stringify(logForm);
            $.ajax({
                url: './api/auth/signin',
                type: 'post',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: logForm,
                success: function (data) {
                    $.cookie('token',data.accessToken);
                    $.ajaxSetup({
                        headers:{
                            'Authorization': "Bearer " + $.cookie('token')
                        }
                    });
                    $.get("./users/current",function (data) {
                        user = data;
                        userLoginName(user);

                });
                    $("#loginButton").dxButton("instance").option("onClick",null);
                    $("#loginMenu").dxTooltip({
                        target: "#loginButton",
                        showEvent: "dxclick",
                        contentTemplate: function (contentElement) {
                            contentElement.append(
                                $("<div />").attr("id", "userButton").dxButton({
                                    text:"Profil",
                                    onClick: function () {
                                        location.href = "./user"
                                    }
                                }),
                                $("<div />").attr("id", "logoutButton").dxButton({
                                    text:"Wyloguj",
                                    onClick: function () {
                                        $.post('./logout',function () {
                                            $.removeCookie('token');
                                            location.reload();
                                        });
                                    }
                                })
                            )
                        }
                    });


                    $("#loginPopup").dxPopup("hide");

                }
            }).fail(function () {
                var error = '<p>Niepoprawne dane logowania!</p>';
                $("#badText").append(error);
            });
        }
    });
}

function userLoginName(user){
    $("#loginButton").dxButton({
        icon: 'user',
        stylingMode: "text"
    }).dxButton("instance");
    if (matchMedia) {
        var mm = window.matchMedia(" (max-width: 992px)");
        mm.addListener(mediaMediumChange);
        mediaMediumChange(mm);
        var ml = window.matchMedia("(min-width: 992px) and (max-width: 1200px)");
        ml.addListener(mediaLargeChange);
        mediaLargeChange(ml);
    }

    function mediaMediumChange(mm){
        if(mm.matches ){
            $("#loginButton").dxButton("instance").option("text","");
        }else {
            $("#loginButton").dxButton("instance").option("text", user.login);
        }

    }

    function mediaLargeChange(ml){
        if(ml.matches){
            $("#loginButton").dxButton("instance").option("text",user.login );
        }
    }
}

function userLoginText(){
    if (matchMedia) {
        var mm = window.matchMedia("(max-width: 992px)");
        mm.addListener(mediaMediumChange);
        mediaMediumChange(mm);
        var ml = window.matchMedia("(min-width: 992px) and (max-width: 1200px)");
        ml.addListener(mediaLargeChange);
        mediaLargeChange(ml);
    }

    function mediaMediumChange(mm){
        if(mm.matches){
            $("#loginButton").dxButton("instance").option("text","");
        }else{
            $("#loginButton").dxButton("instance").option("text","Zaloguj się" );
        }
    }

    function mediaLargeChange(ml){
        if(ml.matches){
            $("#loginButton").dxButton("instance").option("text","Zaloguj się" );
        }
    }
}