var product, productId, ownerName, ownerId;
var currentUser = 15;
var ownerProduct;

$.get('./products/current', function (data) {

    product = data;
    productId = data.id;
    ownerId = data.ownerId;
    console.log(product);
    getAll();


});

function getAll() {
    console.log(product)

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

    $("#homeButton").dxButton({
        icon:"home",
        stylingMode: "text",
        onClick: function () {
            location.href = "./home";
        }
    });

    $("#userMenuButtonProduct").dxButton({
        text:"Mój Profil",
        icon: 'user',
        stylingMode: "text",
        onClick: function () {
            location.href = './user'
        }
    });

    $("#addFavToast").dxToast({
        message: "Ofertę dodano do ulubionych",
        type: "success",
        displayTime: 2000
    });

    $("#addFavErrorToast").dxToast({
        message: "Oferta została już dodana do ulubionych",
        type: "error",
        displayTime: 2000
    });

    $("#transactionExistToast").dxToast({
        message: "Już wysłałeś propozycję wymiany",
        type: "error",
        displayTime: 2000
    });

    showGallery();

    info();
    getOwnerData();

    $("#transactionButton").dxButton({
        text: "Rozpocznij transakcję",
        icon: "email",
        onClick: function () {
            $.get("./transaction/exist?userId="+currentUser+"&offerId="+productId, function (t) {
                if(t.errorMsg === "exist"){
                    $("#transactionExistToast").dxToast("show");
                }else{
                    transactionButton();
                }
            });
        }
    });

    $("#addFavButton").dxButton({
        text: "Dodaj do Ulubionych",
        icon: "favorites",
        onClick: function () {
            $.post("./users/add/fav?userId="+currentUser+"&productId="+productId, function (t) {
                if(t.errorMsg === "inFav"){
                    $("#addFavErrorToast").dxToast("show");
                }else{
                    $("#addFavToast").dxToast("show");
                }
            });
        }
    });

    showOwnerData();
    ownerUserList();


};

function showGallery() {

    $.get("./image/offer?offerId="+productId, function (t) {

        $("#gallery").dxGallery({
            width: '100%',
            height: '100%',
            dataSource: t,
            showNavButtons: true,
            showIndicator: true
        });

    })

}


function dateFormat(d) {

    var date = new Date(d);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var day = date.getDate() ;
    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (day < 10 ? ('0' + day) : day);
}

function getDate(dateV) {
    var cDate = dateV;
    if (cDate!=null){
        return cDate = dateFormat(cDate);
    }else{
        return cDate = "";
    }

}



function info() {

    $("#productDesc").empty();

    var temp =
        '<div id="productName">'+ product.name  + '</div>' +
        '<p id="categoryText">Kategoria:</p>'+'<div id="productCategory">' + product.categoryName + '</div>' +
        '<p id="cityText">Miasto:</p>'+'<div id="productCity">' + product.cityName + '</div>' +
        '<p id="creationDateText">Dodano:</p>'+'<div id="productDate">' + getDate(product.creationDate) + '</div>' +
        '<hr id="hr1">'+
        '<div id="productDescription">' + product.description + '</div>' +
        '</div>' ;


    $("#productDesc").append(temp);

}



function getOwnerData() {

    var ownerData = new DevExpress.data.DataSource({

        load: function () {

            var d = $.Deferred();
            $.getJSON('./users/product', {
                    ownerId: product.ownerId ? product.ownerId : null
                }
            ).done(function (result) {
                d.resolve(result);
            });

            return d.promise();
        }
    });

    return ownerData;

}

function showOwnerData(){

    getOwnerData().load().done(function (result) {


        var ownerId = result[0].id;

        ownerName = result[0].login;

        ownerProduct = result[0].login;

        var phoneNumber = result[0].phoneNumber;
        if(phoneNumber === undefined){
            phoneNumber = ""
        }


        $(".ownerDesc").empty();
        $("#ownerLoginText").empty();

        var resultHTML = $(".ownerDesc");

        $.get("./image/user?userId="+ ownerId, function (t) {
            if (t[0] != undefined) {
                $("#imgOwner").attr("src", t[0]);
            }
            var temp =
                '<div id="textOwnerContainer">' +
                '<div id="ownerLogin">' + result[0].login + '</div>' +
                '<div class="ownerInfo">' +
                '<p id="ownerAddressText">Email: <span id ="ownerEmail" >' + result[0].email + '</span> </p>' +
                '<p id="ownerPhoneText">Tel: <span id ="ownerPhone" >' + phoneNumber + '</span> </p>' +

                '</div>' +
                '</div>';
            resultHTML.append(temp);

        });
    });
}

function ownerUserList(){

    getOwnerData().load().done(function (result) {

        var ownerLogin = '<p id="anotherOfferListText">Inne oferty użytkownika  <span id ="ownerLoginOfferListText" >' + result[0].login + '</span> </p>';

        $("#ownerLoginText").append(ownerLogin);


        var ownerListData = new DevExpress.data.DataSource({

            load: function () {

                var d = $.Deferred();
                $.getJSON('./products/owner/another/one', {
                        ownerId: ownerId ? ownerId : null,
                        productId: productId ? productId : -1
                    }
                ).done(function (result) {
                    d.resolve(result);
                });

                return d.promise();
            }
        });

        $("#ownerOfferListProduct").dxTileView({
            dataSource: ownerListData,
            direction: "horizontal",
            height: 360,
            baseItemHeight: 320,
            baseItemWidth: 300,
            itemMargin: 10,
            showScrollbar: true,
            itemTemplate: function (itemData, itemIndex, itemElement) {
                var temp = cardTemplate(itemData);
                itemElement.append(temp);
            }

        }).dxTileView("instance");
    })

           /* $("#ownerOfferListProduct").dxList({
                dataSource: ownerListData,
                scrollingEnabled: true,
                noDataText: "Użytkownik nie ma aktywnych ofert",
                itemTemplate: function (e) {
                    var resultHTML = $("<div>").addClass("offerAnotherList");
                    $.get("./image/offer?offerId=" + e.id, function (t) {
                        $("<img>").attr("src", t[0]).appendTo(resultHTML);
                        $("<div id='name'>").text(e.name).appendTo(resultHTML);
                        $("<div id='AnotherOfferDetailsButtonContainer'>").append($('<div id="showAnotherOfferDetailsButton">').dxButton({
                            text: "Pokaż ofertę",
                            onClick: function () {
                                offerLinkClick(e.id);
                                e.jQueryEvent.stopPropagation();
                            }
                        })).appendTo(resultHTML);
                    });
                    return resultHTML;
                }
            })
    });*/


}


function transactionButton() {

    $("#tranPopup").dxPopup({
        title:"Wyślij propozycję oferty",
        height: 650,
        width: 800,
        shadingColor: "#32323280",
    }).dxPopup("show");

    showTransactionForm();

}

function showTransactionForm() {

    $("#noProposalOfferToast").dxToast({
        message: "Musisz zaproponować swoją ofertę na wymianę",
        type: "error",
        displayTime: 3000
    });

    var transactionData = {
        messageClient:"",
        ownerName: ownerName,
        offerName:product.name
    };



    $("#tranForm").dxForm({
        formData: transactionData,
        colCount:2,
        labelLocation: "top",
        items:[{
            dataField:"ownerName",
            label: {
                text: "Właściciel oferty"
            },
            editorOptions: {
                disabled: true
            }
        },{
            dataField:"offerName",
            label: {
                text: "Oferta"
            },
            editorOptions: {
                disabled: true
            }
        },{
            colSpan: 2,
            dataField:"messageClient",
            editorType: "dxTextArea",
            label: {
                text: "Wiadomość"
            },
            editorOptions: {
                height: 200
            }
        }]

    });

    showClientOffer();

    $("#sendTranButton").dxButton({
        text:"Wyślij",
        focusStateEnabled: false,
        onClick: function () {
            var dataGrid = $("#clientOfferGrid").dxDataGrid("instance");

            if(dataGrid.option("dataSource").items().length===0){
                $("#noProposalOfferToast").dxToast("show");
            }else{

                var f = $("#tranForm").dxForm('instance');

                var saveData = {
                    ownerId: ownerId,
                    clientId: currentUser,
                    offerId: productId,
                    messageClient: f.getEditor('messageClient').option('value'),
                    status: 1,
                    ids: []

                };

                for (var i = 0; i<dataGrid.getSelectedRowsData().length; i++){
                    saveData.ids.push(dataGrid.getSelectedRowsData()[i].id)
                }

                saveData = JSON.stringify(saveData);

                $.ajax({
                    url: './transaction/save',
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (result) {
                        if (result.errorMsg) {
                            console.log("error")
                        } else {
                            $("#tranPopup").dxPopup("hide");
                            dataGrid.clearSelection();
                        }
                    },
                    data: saveData
                });
            }
        }
    });

    $("#cancelTranButton").dxButton({
        text:"Anuluj",
        focusStateEnabled: false,
        onClick: function () {
            var dataGrid = $("#clientOfferGrid").dxDataGrid("instance");
            $("#tranPopup").dxPopup("hide");
            dataGrid.clearSelection();

        }
    });

}

function getListOfferOwner() {

    var gridClientOfferData = new DevExpress.data.DataSource({

        load: function (loadOptions) {

            var d = $.Deferred();
            $.getJSON('./products/owner', {
                    ownerId: currentUser,
                    active: true,
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

    return gridClientOfferData
}
function showClientOffer(){

    $("#clientOfferGrid").dxDataGrid({
        dataSource: getListOfferOwner(),
        key: "id",
        noDataText:"Brak aktywnych ofert lub zostały ",
        columnAutoWidth: true,
        remoteOperations: {groupPaging: true},
        selection: {
            mode: 'multiple'
        },
        showBorders: true,
        hoverStateEnabled: true,
        scrolling: {
            "showScrollbar": "never"
        },
        paging: {
            pageSize: 4
        },
        columns: [{
            caption: "Nazwa oferty",
            dataField: "name"
        },{
            caption: "Kategoria",
            dataField: "categoryName"
        },{
            caption: "Lokalizacja",
            dataField: "cityName"
        }]

    })

}


