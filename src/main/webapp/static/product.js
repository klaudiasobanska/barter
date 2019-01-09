var product, productId, ownerName, ownerId;
var currentUser = 1;
var ownerProduct;

$.get('./products/current', function (data) {

    product = data;
    productId = data.id;
    ownerId = data.ownerId;
    console.log(product);
});

$(function () {

    $("#loginButtonProduct").dxButton({
        text:"Zaloguj się",
        onClick: function () {
            showLoginPopup();
            /*$("#loginPopup").show();
            $("#loginPopup").dxPopup("show");
            loginForm();*/
        }
    });

    $("#homeButtonProduct").dxButton({
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

    showGallery();

    info();
    getOwnerData();

    $("#transactionButton").dxButton({
        text: "Rozpocznij transakcję",
        icon: "email",
        onClick: function () {
            transactionButton();
        }
    });

    $("#addFavButton").dxButton({
        text: "Dodaj do Ulubionych",
        icon: "favorites",
        onClick: function () {
            $.post("./users/add/fav?userId="+1+"&productId="+productId, function (t) {});
            $("#addFavToast").dxToast("show");

        }
    });

    showOwnerData();
    ownerUserList();


});

function showGallery() {

    /*var dataSource = new DevExpress.data.DataSource({
        load: function () {

            var d = $.Deferred();
            $.getJSON('./image/offer', {
                offerId : product.productId ? product.productId : null
                }
            ).done(function (result) {
                d.resolve(result);
            });

            return d.promise();
        }
    });*/
    $.get("./image/offer?offerId="+productId, function (t) {
        console.log(t)

        $("#dxGallery").dxGallery({
            dataSource: t[0],
            loop: true,
            slideshowDelay: 2000,
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
        '<div id="productDate">' + getDate(product.creationDate) + '</div>' + '<p id="creationDateText">Dodano:</p>'+
        '<hr id="hr1">'+
        '<div id="productDescription">' + product.description + '</div>' +
        '<hr id="hr2">'+
        '<div id="productCategory">' + product.categoryName + '</div>' +
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
                '<p id="ownerAddressText">Adres email: <span id ="ownerEmail" >' + result[0].email + '</span> </p>' + '<br>' +
                '<p id="ownerPhoneText">Telefon: <span id ="ownerPhone" >' + phoneNumber + '</span> </p>' +

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

            $("#ownerOfferListProduct").dxList({
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
    });


}

function openInTab(url) {
    window.open(url, '_blank');

}

function offerLinkClick(id) {
    openInTab('./product?productId='+id);
}

function transactionButton() {

    $("#tranPopup").dxPopup({
        title:"Wyślij propozycję oferty",
        height: 700,
        width: 1000
    }).dxPopup("show");

    showTransactionForm();

}

function showTransactionForm() {

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

            var f = $("#tranForm").dxForm('instance');

            var saveData = {
                ownerId: ownerId,
                clientId: currentUser,
                offerId: productId,
                messageClient: f.getEditor('messageClient').option('value'),
                status: 1,
                ownerAccept: false,
                clientAccept:true,
                ids: []

            };

            var dataGrid = $("#clientOfferGrid").dxDataGrid("instance");

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
