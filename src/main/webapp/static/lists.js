var param;
var categoryId;
var cityId;
var voivoId;
var latest;
var random;

$.get('./filters/current', function (data) {

        param = data.param;
        categoryId = data.categoryId;
        cityId = data.cityId;
        voivoId=data.voivoId;
        latest = data.latest;
        random = data.random;
 });



$(function () {



    $("#searchBar").dxTextBox({
        showClearButton: true,
        mode: "search",
        value: param,
        onEnterKey: function (){

        }
    }).dxTextBox("instance");

    $("#searchCategory").dxSelectBox({
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
    }else{
        lData = voivoId

    }


    $("#searchCity").dxDropDownBox({
        value: lData,
        valueExpr: "id",
        displayExpr: "name",
        placeholder: "Lokalizacja",
        showClearButton: true,
        dataSource: makeAsyncDataSourceCity("./voivo/all"),
        onContentReady: function(data){

         /* if(voivoId!=null){
              data.component.option("value", voivoId);
          }else{
              data.component.option("value", cityId);
            }*/
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


    $("#searchButton").dxButton({
        text: "Wyszukaj",
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


        load: function (loadOptions) {

            var params = {
                param: $("#searchBar").dxTextBox('instance').option('value'),
                categoryId: $("#searchCategory").dxSelectBox('instance').option('value'),
                cityId: cityId,
                voivoId: voivoId,
            };


            var d = $.Deferred();
            $.getJSON('./products/search', {
                    param: params.param ? params.param : "",
                    categoryId: params.categoryId ? params.categoryId : -1,
                    cityId: params.cityId ? params.cityId : -1,
                    voivoId: params.voivoId ? params.voivoId: -1,
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



    return productData;
}

function showList(data) {

    $("#productList").dxList({
        dataSource: data,
        height: "100%",
        itemTemplate: function(data, index) {

            var result = $("<div>").addClass("product");

            $("<img>").attr("src", data.img).appendTo(result);
            $("<div id='name'>").text(data.name).appendTo(result);
            $("<div id='category'>").text(data.categoryName).appendTo(result);

            return result;

        },
        onItemClick: function (data) {
            location.href = './product?productId='+data.itemData.id;
        }
    }).dxList("instance");

}

function refresh() {


    if($("#searchCity").dxDropDownBox('instance').option('value')===null){
        cityId = null;
        voivoId = null;
    }

    var ds = $("#productList").dxList("getDataSource");
    ds.reload();









}