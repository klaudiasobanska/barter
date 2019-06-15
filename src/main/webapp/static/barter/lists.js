var param;
var categoryId;
var cityId;
var voivoId;
var latest;
var random;
var cityName;

$(function () {
    $.get('./filters/current', function (data) {

        param = data.param;
        categoryId = data.categoryId;
        cityId = data.cityId;
        voivoId = data.voivoId;
        latest = data.latest;
        random = data.random;
        cityName = data.cityName;


        $.get("./users/current",function (data) {
            user = data;

            if(user !== null && user.id === undefined){
                login()
            }
            if (user.id !== undefined ){
                userLoginName(user);
                list();

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
            }

        }).fail(function(){
            login();
        });

    });

});

function login() {
    list();

    $("#loginButton").dxButton({
        text: "Zaloguj się",
        onClick: function () {
            showLoginPopup();
        }
    }).dxButton("instance");

    userLoginText();
}

function list() {


    $("#loginButton").dxButton({
        stylingMode: "text",
        icon: 'user'
    });


    $("#loginPopup").dxPopup({
        height:450,
        width: 400,
        shadingColor: "#32323280"
    });



    if (matchMedia) {
        var ms = window.matchMedia("(max-width: 768px)");
        ms.addListener(mediaSmallChange);
        mediaSmallChange(ms);
        var mm = window.matchMedia("(min-width: 769px) and (max-width: 992px)");
        mm.addListener(mediaMediumChange);
        mediaMediumChange(mm);
    }

    function mediaSmallChange(ms){
        if(ms.matches){
            $("#loginButton").dxButton("instance").option("text","");
            $("#loginPopup").dxPopup("instance").option("closeOnOutsideClick",true);
            $("#loginPopup").dxPopup("instance").option("height",400);
            $("#loginPopup").dxPopup("instance").option("width",320);

        }
    }

    function mediaMediumChange(mm) {
        if (mm.matches) {
            $("#loginButton").dxButton("instance").option("text", "");
        }
    }


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

    if(cityId!==-1){
        lData = cityId
    }if((cityId === -1)&&(voivoId === -1)){
        lData = ""
    }
    if(voivoId !== -1 ){
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

};




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
                    voivoId: params.voivoId ? params.voivoId: -1
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
        noDataText:"Brak ofert",
        itemTemplate: function (itemData, itemIndex, itemElement){
            var temp = cardTemplate(itemData);
            itemElement.append(temp);
        }

    }).dxTileView("instance");


}

function refresh() {


    if($("#searchCityL").dxDropDownBox('instance').option('value')===null){
        cityId = null;
        voivoId = null;
    }

    var ds = $("#productList").dxTileView("getDataSource");
    ds.reload();


}

