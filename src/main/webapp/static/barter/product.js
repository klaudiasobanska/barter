var product, productId, ownerName, ownerId, user;
var ownerProduct;
$(function () {
    $.get('./products/current', function (data) {

        product = data;
        productId = data.id;
        ownerId = data.ownerId;



        $.get("./users/current", function (dataUser) {
            user = dataUser;

            if(user !== null && user.id === undefined){
                login()
            }
            if (user.id !== undefined ){
                getAll();
                userLoginName(user);

                $("#loginMenu").dxTooltip({
                    target: "#loginButton",
                    showEvent: "dxclick",
                    contentTemplate: function (contentElement) {
                        contentElement.append(
                            $("<div />").attr("id", "userButton").dxButton({
                                text: "Profil",
                                onClick: function () {
                                    location.href = "./user"
                                }
                            }),
                            $("<div />").attr("id", "logoutButton").dxButton({
                                text: "Wyloguj",
                                onClick: function () {
                                    $.post('./logout', function () {
                                        $.removeCookie('token');
                                        location.reload();
                                    });
                                }
                            })
                        )
                    }
                });
            }

        }).fail(function () {

            $("#loginButton").dxButton({
                text: "Zaloguj się",
                onClick: function () {
                    showLoginPopup();
                }
            }).dxButton("instance");

            userLoginText();
            getAll();

        });

    });

});

function login() {
    getAll();

    $("#loginButton").dxButton({
        text: "Zaloguj się",
        onClick: function () {
            showLoginPopup();
        }
    }).dxButton("instance");

    userLoginText();
}

function getAll() {


    $("#loginButton").dxButton({
        icon: 'user',
        stylingMode: "text"
    });

    $("#loginPopup").dxPopup({
        height:450,
        width: 400,
        shadingColor: "#32323280"
    });

    $("#tranPopup").dxPopup({
        title: "Wyślij propozycję oferty",
        height: 650,
        width: 800,
        shadingColor: "#32323280"
    });



    if (matchMedia) {
        var ms = window.matchMedia("(max-width: 768px)");
        ms.addListener(mediaSmallChange);
        mediaSmallChange(ms);
    }

    function mediaSmallChange(ms){
        if(ms.matches){
            $("#loginButton").dxButton("instance").option("text","");
            $("#loginPopup").dxPopup("instance").option("closeOnOutsideClick",true);
            $("#loginPopup").dxPopup("instance").option("height",400);
            $("#loginPopup").dxPopup("instance").option("width",320);
            $("#tranPopup").dxPopup("instance").option("closeOnOutsideClick",true);
            $("#tranPopup").dxPopup("instance").option("height",650);
            $("#tranPopup").dxPopup("instance").option("width",320);

        }else {
            $("#tranPopup").dxPopup("instance").option("height",650);
            $("#tranPopup").dxPopup("instance").option("width",800);
        }
    }


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

    $("#notLoginToast").dxToast({
        message: "Zaloguj się aby kontynuować",
        type: "error",
        displayTime: 2000
    });
    $("#ownerProductToast").dxToast({
        message: "Jesteś właścicielem tej oferty",
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
            if(user.id !== undefined) {
                if(user.id !== ownerId) {
                    $.get("./transaction/exist?userId=" + user.id + "&offerId=" + productId, function (t) {
                        if (t.errorMsg === "exist") {
                            $("#transactionExistToast").dxToast("show");
                        } else {
                            transactionButton();
                        }
                    });
                }else{
                    $("#ownerProductToast").dxToast("show");
                }
            }else{
                $("#notLoginToast").dxToast("show");
            }
        }
    });



    $("#addFavButton").dxButton({
        text: "Dodaj do Ulubionych",
        icon: "favorites",
        onClick: function () {
            if(user.id !== undefined) {
                $.post("./users/add/fav?userId=" + product.ownerId + "&productId=" + productId, function (t) {
                    if (t.errorMsg === "inFav") {
                        $("#addFavErrorToast").dxToast("show");
                    } else if (t.errorMsg === "owner"){
                        $("#ownerProductToast").dxToast("show");
                    }
                    else {
                        $("#addFavToast").dxToast("show");
                    }
                });
            } else{
                $("#notLoginToast").dxToast("show");
            }
        }
    });

    showOwnerData();
    ownerUserList();


}

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
    if (cDate!==null){
        return cDate = dateFormat(cDate);
    }else{
        return cDate = "";
    }

}



function info() {

    $("#productDesc").empty();

    var temp =
        '<div id="productName">'+ product.name  + '</div>' +
        '<div id="text">'+
        '<p id="categoryText">Kategoria:</p>'+'<div id="productCategory">' + product.categoryName + '</div>' +
        '<p id="cityText">Miasto:</p>'+'<div id="productCity">' + product.cityName + '</div>' +
        '<p id="creationDateText">Dodano:</p>'+'<div id="productDate">' + getDate(product.creationDate) + '</div>' +
        '</div>'+'<div id ="hrr">'+
        '<hr id="hr1">'+'</div>'+
        '<div id="productDescription">' + product.description + '</div>';


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

        var resultHTML = $(".ownerDesc");

        $.get("./image/user?userId="+ ownerId, function (t) {
            if (t[0] !== undefined) {
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
            noDataText: "Brak innych ofert",
            itemTemplate: function (itemData, itemIndex, itemElement) {
                var temp = cardTemplate(itemData);
                itemElement.append(temp);
            }

        }).dxTileView("instance");
    })


}


function transactionButton() {

    $("#tranPopup").dxPopup("show");

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
            if(dataGrid.getSelectedRowsData().length===0){
                $("#noProposalOfferToast").dxToast("show");
            }else{

                var f = $("#tranForm").dxForm('instance');

                var saveData = {
                    ownerId: ownerId,
                    clientId: user.id,
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
            $.getJSON('./auth/products/owner', {
                    ownerId: user.id,
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
            pageSize: 3
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


