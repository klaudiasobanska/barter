var cityId, voivoId, cityTreeId;
$(function () {



    $("#searchBar").dxTextBox({
        showClearButton: true,
        mode: "search",
        onEnterKey: function (){
            searchButton();
        }
    });

    $("#categoryTab").dxList({
        dataSource: "./categories/all",
        displayExpr: 'name',
        valueExpr: 'id',
        itemTemplate: function(data){
            var result = $("<div>").addClass("category");
            var temp =
                '<img id="iconC" src="./static/icon/'+data.icon+'">'+
                '<div id="name">' + data.name + '</div>' ;

            result.append(temp);
            return result;
        },
        onItemClick: function (e) {
            location.href = "./lists?param=" + "&categoryId="+( e.itemData.id? e.itemData.id:-1) + "&cityId="+(cityId?cityId:-1) +
                "&voivoId="+(voivoId?voivoId:-1) + "&latest=" +false + "&random="+false;

        }
    });

    $("#searchButton").dxButton({
        text: "Szukaj",
        onClick: function () {
            searchButton();
        }

    });

    var makeAsyncDataSourceCity = function(path){
        return new DevExpress.data.CustomStore({
            loadMode: "raw",
            key:"id",
            load: function() {
                return $.getJSON(path);
            }
        });
    };

    $("#searchCity").dxDropDownBox({
        valueExpr: "id",
        displayExpr: "name",
        placeholder: "Lokalizacja",
        showClearButton: true,
        dataSource: makeAsyncDataSourceCity("./voivo/all"),
        contentTemplate: function(e) {
            $treeViewProvider = $("<div>").dxTreeView({
                dataSource: e.component.option("dataSource"),
                displayExpr: "name",
                height: 500,
                onItemClick: function(d){
                    voivoId = null;
                    cityId = null;
                    cityTreeId = null;
                    if(d.node.items != 0){
                        voivoId = d.node.itemData.id;
                    }else {
                        cityId = d.node.itemData.id;
                    };
                    e.component.option("value", d.node.itemData.name);
                }

            });
            treeViewProvider = $treeViewProvider.dxTreeView("instance");


            return $treeViewProvider;

        }
    });





    $("#latestProductView").dxTileView({
        dataSource: "./products/latest",
        direction: "horizontal",
        height: 360,
        baseItemHeight: 320,
        baseItemWidth: 300,
        itemMargin: 10,
        showScrollbar:true,
        itemTemplate: function (itemData, itemIndex, itemElement){
            var temp = cardTemplate(itemData);
            itemElement.append(temp)



        }

    }).dxTileView("instance");

    $("#latestButton").dxButton({
        text:"Więcej",
        stylingMode: "text",
        onClick: function () {
            location.href = "./lists?param="+"" + "&categoryId="+-1 + "&cityId="+-1 + "&voivoId="+-1 + "&latest=" +true + "&random="+false;
        }

    });

    $("#randomProductView").dxTileView({
        dataSource: "./products/random",
        direction: "horizontal",
        height: 360,
        baseItemHeight: 320,
        baseItemWidth: 300,
        itemMargin: 10,
        showScrollbar:true,
        itemTemplate: function (itemData, itemIndex, itemElement){
            var temp = cardTemplate(itemData);
            itemElement.append(temp);




        }

    }).dxTileView("instance");


    $("#loginPopup").dxPopup({
        height:450,
        width: 400,
        shadingColor: "#32323280"
    });


    // $("#loginPopup").hide();



    $("#randomButton").dxButton({
        text:"Więcej",
        stylingMode: "text",
        onClick: function () {
            location.href = "./lists?param="+"" + "&categoryId="+-1 + "&cityId="+-1 + "&voivoId="+-1 + "&latest=" +false + "&random="+true;
        }

    });

    $("#loginButton").dxButton({
        text:"Zaloguj się",
        icon: 'user',
        stylingMode: "text",
        onClick: function () {
            showLoginPopup();
            /*$("#loginPopup").show();
            $("#loginPopup").dxPopup("show");
            loginForm();*/
        }
    });

    $("#userMenuButton").dxButton({
        text:"Mój Profil",
        icon: 'user',
        stylingMode: "text",
        onClick: function () {
            location.href = './user'
        }
    });


    //showBestUsers();




});



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

function showBestUsers() {

    var bestUserData = new DevExpress.data.DataSource({

        load: function () {

            var d = $.Deferred();
            $.getJSON('/users/rating',{

                }
            ).done(function (result) {
                d.resolve(result);
            });

            return d.promise();
        }
    });

    bestUserData.load().done(function (result) {
        $(".userContainer").empty();
        $.each(result, function (index, user) {
            var temp =
                '<div id="userCards'+ user.id +'" class = "userCards" onclick="userCardClick('+user.id + ')"> ' +
                '<div id="img"></div>' +
                '<div class="userLogin">' + user.login + '</div>' +
                '<div class="userRating">' + user.rating + '</div>' +
                '</div>' ;


            $(".userContainer").append(temp);
        });
    })

}


function productCardClick(productId) {
    location.href = './product?productId='+productId;
}


function searchButton() {

    var param = $("#searchBar").dxTextBox('instance').option('value');


    location.href = "./lists?param="+param + "&categoryId="+(-1) + "&cityId="+(cityId?cityId:-1) +
        "&voivoId="+(voivoId?voivoId:-1) + "&latest=" +false + "&random="+false;

}



