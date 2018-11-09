var param;
var categoryId;
var latest;
var random;

$.get('./filters/current', function (data) {

        param = data.param;
        categoryId = data.categoryId;
        latest = data.latest;
        random = data.random;
        console.log(latest)
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
            refresh();
        }

    });


    if(latest===true){
        showList((getProductLatest()))
    }
    else{
    showList(getProductFilter());}



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

function getProductFilter() {

    var productData = new DevExpress.data.DataSource({


        load: function (loadOptions) {

            var params = {
                param: $("#searchBar").dxTextBox('instance').option('value'),
                categoryId: $("#searchCategory").dxSelectBox('instance').option('value')
            };
            var d = $.Deferred();
            $.getJSON('./products/search', {
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

    var ds = $("#productList").dxList("getDataSource");
    ds.reload();
    var dataGridInstance = $("#productList").dxList("instance");
    dataGridInstance.clearSelection();

}