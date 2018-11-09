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
        displayExpr: 'name',
        valueExpr: 'id'
    });

    $("#searchCity").dxSelectBox({
        showClearButton: true,
        dataSource:"./voivo/city/list",
        placeholder: "Miejscowość",
        displayExpr: 'name',
        valueExpr: 'id'
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
            location.href = "./lists?param="+"" + "&categoryId="+-1 + "&latest=" +true + "&random="+false;
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
            itemElement.append(temp)
        }

    }).dxTileView("instance");




    $("#randomButton").dxButton({
        text:"Więcej",
        icon: "chevronnext",
        onClick: function () {

        }

    });

    $("#loginButton").dxButton({
        text:"Zaloguj sie",
        onClick: function () {

        }
    });


    showBestUsers();



});

function cardTemplate(itemData) {
    var temp =
        '<div class="productContent">'+
        '<div class="productContainer">'+
        '<div>' +
        '<div id="productCards'+ itemData.id +'" class = "productCards" onclick="productCardClick('+itemData.id + ')"> ' +
        '<div class="productName">' + itemData.name + '</div>' +
        '<div id="img"></div>' +
        '<p id="categoryText">Kategoria:</p>' + '<div class="productCategory">' + itemData.categoryName + '</div>' +
        '</div>' + '</div>'+'</div>'+'</div>';

    return temp;

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
        console.log(result);
        $.each(result, function (index, user) {
            console.log(user);
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


    location.href = "./lists?param="+param + "&categoryId="+(categoryId?categoryId:-1) + "&latest=" +false + "&random="+false;


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

