var param;
var categoryId;
var cityId;
var voivoId;
var latest;
var random;
var cityName;

$.get('./filters/current', function (data) {

        param = data.param;
        categoryId = data.categoryId;
        cityId = data.cityId;
        voivoId=data.voivoId;
        latest = data.latest;
        random = data.random;
        cityName = data.cityName;

 });



$(function () {


    /*$("#loginButton").dxButton({
        text:"Zaloguj się",
        stylingMode: "text",
        icon: 'user',
        onClick: function () {
            showLoginPopup();
            /!*$("#loginPopup").show();
            $("#loginPopup").dxPopup("show");
            loginForm();*!/
        }
    });*/

    $("#homeButton").dxButton({
        icon:"home",
        stylingMode: "text",
        onClick: function () {
            location.href = "./home";
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

    $("#searchBarL").dxTextBox({
        showClearButton: true,
        mode: "search",
        value: param,
        onEnterKey: function (){

        }
    }).dxTextBox("instance");

    $("#searchCategoryL").dxSelectBox({
        showClearButton: true,
        dataSource: "./categories/all",
        placeholder: "Kategoria",
        displayExpr: 'name',
        valueExpr: 'id',
        value: categoryId
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

    var lData;

    if(cityId!=-1){
        lData = cityId
    }if((cityId === -1)&&(voivoId === -1)){
        lData = ""
    }
    if(voivoId != -1 ){
        lData = voivoId
    }



    $("#searchCityL").dxDropDownBox({
        value: lData,
        valueExpr: "id",
        displayExpr: "name",
        placeholder: "Lokalizacja",
        showClearButton: true,
        dataSource: makeAsyncDataSourceCity("./voivo/all"),
        onContentReady: function(data){

            if(data === ""){
                data.component.option("value", "Lokalizacja");
            }
            if(cityId!= -1){
                data.component.option("value", cityName);
            }

        },
        contentTemplate: function(e) {
            $treeViewProvider = $("<div>").dxTreeView({
                dataSource: e.component.option("dataSource"),
                displayExpr: "name",
                valueExpr: "id",
                height: 500,
                onItemClick: function(d){
                    voivoId = null;
                    cityId = null;
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


    $("#searchButtonL").dxButton({
        text: "Szukaj",
        onClick: function () {
            refresh();
        }

    });


    if(latest===true){
        showList(getProductLatest());

    }
    else if(random===true){
        showList(getProductRandom());
    }
    else{
    showList(getProductFilter());
   }



});

function getProductLatest() {

    var productData = new DevExpress.data.DataSource({

        load: function () {

            var d = $.Deferred();
            $.getJSON('./products/latest/all',{

                }
            ).done(function (result) {
                d.resolve(result);
            });

            return d.promise();
        }
    });

    return productData;

}

function getProductRandom() {

    var productData = new DevExpress.data.DataSource({

        load: function () {

            var d = $.Deferred();
            $.getJSON('./products/random/all',{

                }
            ).done(function (result) {
                d.resolve(result);
            });

            return d.promise();
        }
    });

    return productData;

}

function getProductFilter() {

    var productData = new DevExpress.data.DataSource({


        load: function () {

            var params = {
                param: $("#searchBarL").dxTextBox('instance').option('value'),
                categoryId: $("#searchCategoryL").dxSelectBox('instance').option('value'),
                cityId: cityId,
                voivoId: voivoId,
            };


            var d = $.Deferred();
            $.getJSON('./products/search', {
                    param: params.param ? params.param : "",
                    categoryId: params.categoryId ? params.categoryId : -1,
                    cityId: params.cityId ? params.cityId : -1,
                    voivoId: params.voivoId ? params.voivoId: -1,
                    /*page: loadOptions.skip / loadOptions.take,
                    size: loadOptions.take*/
                }
            ).done(function (result) {
                d.resolve(result);

            });
            return d.promise();
        }
    });



    return productData;
}

function showList(data) {

    $("#productList").dxTileView({
        dataSource: data,
        direction: "vertical",
        height: 750,
        baseItemHeight: 320,
        baseItemWidth: 300,
        itemMargin: 10,
        showScrollbar:true,
        itemTemplate: function (itemData, itemIndex, itemElement){
            var temp = cardTemplate(itemData);
            itemElement.append(temp);
        }

    }).dxTileView("instance");

    /*$("#productList").dxList({
        dataSource: data,
        height: "100%",
        nextButtonText: "Więcej",
        itemTemplate: function(data, index) {

            var result = $("<div>").addClass("product");

            $.get("./image/offer?offerId="+data.id, function (t){
                if (t[0] != undefined) {
                    $("<img>").attr("src", t[0]).appendTo(result);
                    console.log(result[0]);
                }
                var temp =

                    '<div id="textContainer">'+
                    '<div id="name">' + data.name + '</div>' +
                    '<div id="category">' + data.categoryName + '</div>' +
                    '<div id="city">' + data.cityName + '</div>' +
                    '</div>';
                result.append(temp);
            });

            return result;

        },
        onItemClick: function (data) {
            location.href = './product?productId='+data.itemData.id;
        }
    }).dxList("instance");
*/
}

function refresh() {


    if($("#searchCityL").dxDropDownBox('instance').option('value')===null){
        cityId = null;
        voivoId = null;
    }

    var ds = $("#productList").dxTileView("getDataSource");
    ds.reload();


}