var cityId, voivoId, cityTreeId;
$(function () {



    $("#searchBar").dxTextBox({
        showClearButton: true,
        mode: "search",
        onEnterKey: function (e){
            searchButton();
        }
    });

    $("#searchCategory").dxSelectBox({
        showClearButton: true,
        dataSource: "./categories/all",
        placeholder: "Kategoria",
        searchEnabled: true,
        displayExpr: 'name',
        valueExpr: 'id'
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



    $("#searchButton").dxButton({
        text: "Wyszukaj",
        onClick: function () {
            searchButton();
        }

    });

    $("#latestProductView").dxTileView({
        dataSource: "./products/latest",
        direction: "horizontal",
        height: 500,
        baseItemHeight: 400,
        baseItemWidth: 300,
        itemMargin: 40,
        showScrollbar:true,
        itemTemplate: function (itemData, itemIndex, itemElement){
            var temp = cardTemplate(itemData);
            itemElement.append(temp)



        }

    }).dxTileView("instance");

    $("#latestButton").dxButton({
        text:"Więcej",
        icon: "chevronnext",
        onClick: function () {
            location.href = "./lists?param="+"" + "&categoryId="+-1 + "&cityId="+-1 + "&voivoId="+-1 + "&latest=" +true + "&random="+false;
        }

    });

    $("#randomProductView").dxTileView({
        dataSource: "./products/random",
        direction: "horizontal",
        height: 500,
        baseItemHeight: 400,
        baseItemWidth: 300,
        itemMargin: 40,
        showScrollbar:true,
        itemTemplate: function (itemData, itemIndex, itemElement){
            var temp = cardTemplate(itemData);
            itemElement.append(temp);




        }

    }).dxTileView("instance");


    $("#loginPopup").dxPopup({
        height:450,
        width: 400,
        /*onHidden: function () {
            $("#loginPopup").hide();
        }*/
    });


    // $("#loginPopup").hide();



    $("#randomButton").dxButton({
        text:"Więcej",
        icon: "chevronnext",
        onClick: function () {
            location.href = "./lists?param="+"" + "&categoryId="+-1 + "&cityId="+-1 + "&voivoId="+-1 + "&latest=" +false + "&random="+true;
        }

    });

    $("#loginButton").dxButton({
        text:"Zaloguj się",
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
                $("#loginPopup").dxPopup("hide");
            })
        }
    });
}




function cardTemplate(itemData) {

    var result = $("<div>").addClass("productContent");
    var temp =
        '<div class="productContainer">' +
        '<div>' +
        '<div id="productCards ' + itemData.id + '" class = "productCards" onclick="productCardClick(' + itemData.id + ')"> ' +
        '<div class="productNameContainer">'  +
        '<div class="productName">' + itemData.name + '</div>' + '</div>'+
        /*/!*'<p id="categoryText">Kategoria:</p>'*!/  '<div class="productCategory">' + itemData.categoryName + '</div>' +
        '<div class="productLocal">' + itemData.cityName + '</div>' +*/
        '</div>'+ '</div>' + '</div>';// + '</div>';



    $.get("./image/offer?offerId="+itemData.id, function (t){
        if (t[0] != undefined) {

            $("<img id='homeImg'>").attr("src", t[0]).appendTo(result);
        }

    });

    result.append(temp);

    return result;


    /*$.get("./image/offer?offerId="+itemData.id, function (t) {
            if (t[0] != undefined) {
                /!*$(".img").attr("src", t[0]);*!/
                temp = temp.replace("###",t[0]);
                console.log(temp);
                //temp.replace()
            }

        }
    )*/




}

function showBestUsers() {

    var bestUserDate = new DevExpress.data.DataSource({

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

    bestUserDate.load().done(function (result) {
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
    var categoryId = $("#searchCategory").dxSelectBox('instance').option('value');



    location.href = "./lists?param="+param + "&categoryId="+(categoryId?categoryId:-1) + "&cityId="+(cityId?cityId:-1) +
        "&voivoId="+(voivoId?voivoId:-1) + "&latest=" +false + "&random="+false;

}

function productData() {

    var productDate = new DevExpress.data.DataSource({


        load: function (loadOptions) {

            var params = {
                param: $("#searchBar").dxTextBox('instance').option('value'),
                categoryId: -1
            };
            var d = $.Deferred();
            $.getJSON('/products/search', {
                    param: params.param ? params.param : "",
                    categoryId: params.categoryId ? params.categoryId : -1,
                    page: loadOptions.skip / loadOptions.take,
                    size: loadOptions.take
                }
            ).done(function (result) {
                d.resolve(result.content, {
                    totalCount: result.totalElements
                });
            });
            return d.promise();
        }
    });

    return productDate;
}

