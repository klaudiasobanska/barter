var cityId, voivoId, cityTreeId;
$(function () {

    $("#loginButton").dxButton({
        icon: 'user',
        stylingMode: "text",
        onClick: function () {
            showLoginPopup();
        }
    });

    $("#categoryTabSelect").dxSelectBox({
        showClearButton: true,
        dataSource: "./categories/all",
        placeholder: "Kategoria",
        displayExpr: 'name',
        valueExpr: 'id',
        visible: false
    });

    $("#categoryTabList").dxList({
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

        },
        visible: false
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
        var ml = window.matchMedia("(min-width: 992px) and (max-width: 1200px)");
        ml.addListener(mediaLargeChange);
        mediaLargeChange(ml);
    }


    function mediaSmallChange(ms){
        if(ms.matches){
            $("#loginButton").dxButton("instance").option("text","");
            $("#categoryTabSelect").dxSelectBox("instance").option("visible",true);
            $("#categoryTabList").dxList("instance").option("visible",false);
            $("#loginPopup").dxPopup("instance").option("closeOnOutsideClick",true);
            $("#loginPopup").dxPopup("instance").option("height",400);
            $("#loginPopup").dxPopup("instance").option("width",320);

        }else {
            $("#loginButton").dxButton("instance").option("text", "Zaloguj się");
            $("#categoryTabSelect").dxSelectBox("instance").option("visible",false);
            $("#categoryTabList").dxList("instance").option("visible",true);
        }
    }

    function mediaMediumChange(mm){
        if(mm.matches){
            $("#loginButton").dxButton("instance").option("text","");
        }
    }

    function mediaLargeChange(ml){
        if(ml.matches){
            $("#loginButton").dxButton("instance").option("text","Zaloguj się");
        }
    }


    $("#searchBar").dxTextBox({
        showClearButton: true,
        mode: "search",
        onEnterKey: function (){
            searchButton();
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





    // $("#loginPopup").hide();



    $("#randomButton").dxButton({
        text:"Więcej",
        stylingMode: "text",
        onClick: function () {
            location.href = "./lists?param="+"" + "&categoryId="+-1 + "&cityId="+-1 + "&voivoId="+-1 + "&latest=" +false + "&random="+true;
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

function searchButton() {

    var param = $("#searchBar").dxTextBox('instance').option('value');
    var categoryId = $("#categoryTabSelect").dxSelectBox("instance").option('value');


    location.href = "./lists?param="+param + "&categoryId="+(categoryId?categoryId:-1) + "&cityId="+(cityId?cityId:-1) +
        "&voivoId="+(voivoId?voivoId:-1) + "&latest=" +false + "&random="+false;

}



