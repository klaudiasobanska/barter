var currentUser;
var currentUserId;

$.get('./users/find/2', function (data) {
    if (data.id == null) {
        location.href = './login'
    }
    else {
        currentUser = data;
        currentUserId = data.id;
    }

    showPage();
});

function showPage() {

    console.log(currentUser)

    $("#logoutButton").dxButton({
        text: "Wyloguj",
        type: "normal",
        onClick: function () {

        }
    });

    $("#homeButtonUserContent").dxButton({
        icon:"home",
        onClick: function () {
            location.href = "./home";
        }
    });

   /* var navigation = [
        { id: 1, text: "Ustawienia konta", icon: "card" },
        { id: 2, text: "Ofery", icon: "money" },
        { id: 3, text: "Propozycje wymiany", icon: "group" },
        { id: 4, text: "Historia tranzakcji", icon: "product" },
        { id: 5, text: "Oceny", icon: "chart" }
    ];

     $("#drawerMenuUser").dxDrawer({
        openedStateMode: "shrink",
        opened: true,
        position: "left",
        height: 400,
        revealMode: "slide",
        template: function () {
            var $list = $("<div/>").addClass("panel-list");

            $list.dxList({
                dataSource: navigation,
                width: 200,
                onItemClick: function(e){
                    console.log(e);
                },
                elementAttr: {
                    //class: "dx-theme-accent-as-background-color"
                }
            });

            return $list;
        }

    });

    $("#drawerMenuUserButton").dxToolbar({
        items: [{
            widget: 'dxButton',
            options: {
                icon: 'menu',
                onClick: function() {
                    $("#drawerMenuUser").dxDrawer("instance").toggle();
                }
            },
            location: 'before'
        }]
    });*/

    $("#noSelectedToast").dxToast({
        message: "Oferta nie została wybrana",
        type: "error",
        displayTime: 2000
    });

    $("#archiveUserProductToast").dxToast({
        message: "Oferta została zarchiwizowana",
        type: "success",
        displayTime: 2000
    });

    $("#deleteFavToast").dxToast({
        message: "Oferta została usunięta z ulubionych",
        type: "success",
        displayTime: 2000
    });

    $("#deleteUserProductToast").dxToast({
        message: "Oferta została usunięta",
        type: "success",
        displayTime: 2000
    });

    $("#restoreUserProductToast").dxToast({
        message: "Oferta została przywrócona",
        type: "success",
        displayTime: 2000
    });

    $("#updateUserDataToast").dxToast({
        message: "Dane zostały poprawnie zmienione",
        type: "success",
        displayTime: 2000
    });


   var menuItems=[{
       key: "Ustawienia konta",
       items: [{
           id: 1,
           text: "Moje dane"
       },{
           id: 2,
           text: "Zmień hasło"
       }]
   },{
       key: "Oferty",
       items: [{
           id: 3,
           text: "Moje oferty"
       },{
           id: 4,
           text: "Ulubione"
       }]
   },{
       key: "Propozycje wymiany",
       items: [{
           id: 5,
           text: "Nowe"
       },{
           id: 11,
           text: "Aktywne"
       },{
           id: 6,
           text: "Wysłane"
       }]
   },{
       key: "Historia",
       items: [{
           id: 7,
           text: "Zakończone tranzakcje"
       },{
           id: 8,
           text: "Oferty zarchiwizowane"
       }]
   }];



    $("#userMenuList").dxList({
        dataSource: menuItems,
        grouped: true,
        collapsibleGroups: true,
        selectionMode: "single",
        onContentReady: function () {
            this.selectItem(0);
            $("#userDataContent").show();
            $("#userPasswordContent").hide();
            $("#userOffersContent").hide();
            $("#userFavContent").hide();
            $("#userDeleteContent").hide();
            $("#userReceivedContent").hide();
            userDataSettings();

        },
        onItemClick: function(data) {
            switch (data.itemData.id){
                case 1:
                    $("#userDataContent").show();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userReceivedContent").hide();
                    userDataSettings();
                    break;

                case 2:
                    $("#userDataContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userReceivedContent").hide();
                    $("#userPasswordContent").show();
                    userPasswordSettings();
                    break;
                case 3:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userFavContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userReceivedContent").hide();
                    $("#userOffersContent").show();

                    userOffersSettings();
                    break;
                case 4:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userReceivedContent").hide();
                    $("#userFavContent").show();
                    userFavSettings();
                    break;
                case 5:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userReceivedContent").show();
                    receiveOfferSettings();
                    
                    break;
                case 6:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userReceivedContent").hide();
                    break;
                case 7:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userReceivedContent").hide();
                    break;
                case 8:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userReceivedContent").hide();
                    $("#userDeleteContent").show();
                    deletedOfferSettings();
                    break;
            }
        }
    });

};

function userDataSettings() {

    $("#headerUserDataText").html("");
    $("#headerUserDataText").append("Dane osobowe");

    var newUserData = {
        forename:"",
        surname:"",
        email: "",
        address:"",
        city:"",
        zipCode:""

    };

    var temp =  $("#userDataForm").dxForm({
        formData: currentUser,
        colCount:2,
        items: [{
            dataField: "forename",
            label: {
                text: "Imię"
            }
        },{
            dataField: "surname",
            label: {
                text: "Nazwisko"
            }

        },{
            dataField: "birthDate",
            colSpan:2,
            label: {
                text: "Data urodzenia"
            },
            editorType: "dxDateBox",
            editorOptions: {
                displayFormat: "yyyy-MM-dd",
                disabled: true
            }

        },{
            dataField: "login",
            colSpan:2,
            label: {
                text: "Login"
            },
            editorOptions: {
                disabled: true
            }
        },{
            dataField: "email",
            colSpan:2,
            label: {
                text: "Adres Email"
            }
        },{
            dataField: "address",
            label: {
                text: "Adres zamieszkania"
            }
        },{
            dataField: "city",
            label: {
                text: "Miasto"
            }
        },{
            dataField: "zipCode",
            label: {
                text: "Kod pocztowy"
            },
            editorOptions: {
                mask: "00-000"
            }
        }]
    });
    $(".userDataContent").append(temp);

    $("#userImgUploader").dxFileUploader({
        name: "file",
        selectButtonText: "Wybierz zdjęcie",
        labelText: "",
        accept: "image/*",
        uploadMode: "useButtons",
        uploadUrl:"./image/upload?id="+currentUserId,
        maxFileSize: 5000000,
        invalidMaxFileSizeMessage: "Plik zbyt duży",
        readyToUploadMessage:"Gotowy do zapisu",
        uploadButtonText: "Zapisz zdjęcie",
        uploadedMessage:"Zapisano",
        uploadFailedMessage: "Wystąpił błąd",
        multiple:false,
        onValueChanged: function(e) {
            if (e.value.length) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#imgUser').attr('src', e.target.result);
                };
                reader.readAsDataURL(e.value[0]);
            }
        }
    });


    $("#userDataFormButton").dxButton({
        text:"Zapisz",
        focusStateEnabled: false,
        onClick: function () {

            var f = $("#userDataForm").dxForm('instance');

            newUserData.forename = f.getEditor('forename').option('value');
            newUserData.surname = f.getEditor('surname').option('value');
            newUserData.email = f.getEditor('email').option('value');
            newUserData.address = f.getEditor('address').option('value');
            newUserData.city = f.getEditor('city').option('value');
            newUserData.zipCode = f.getEditor('zipCode').option('value');

            //newUserData = JSON.stringify(newUserData);
            console.log(newUserData);

            $.post("./users/edit?id="+currentUserId+"&forename="+newUserData.forename + "&surname="+newUserData.surname+
                "&email="+newUserData.email+"&address="+newUserData.address+"&city="+newUserData.city+"&zipCode="+newUserData.zipCode,
                function (data) {
                    $("#userDataForm").dxForm('instance').repaint();
                    $("#updateUserDataToast").dxToast("show");
            });
            /*$.ajax({
                url: './users/'+currentUserId,
                type: 'put',
                dataType: 'json',
                contentType: 'application/json',
                success: function (result) {
                    if (result.errorMsg) {
                        console.log("error")
                    } else {
                        $("#userDataForm").dxForm('instance').repaint();
                    }
                },
                data: newUserData
            });*/



        }
    })
}


function userPasswordSettings() {

    $("#headerUserPasswordText").html("");
    $("#headerUserPasswordText").append("Zmiana hasła");

    var editPassword = {
        password: "",
        confirm: ""
    };

    $("#userPasswordForm").dxForm({
        formData: editPassword,
        readOnly: false,
        items: [{
            dataField: "password",
            editorOptions: {
                mode: 'password'
            },
            label: {
                text: "Nowe hasło"
            },
            validationRules: [{
                type: "required",
                message: "Hasło jest wymagane"
            }],
        }, {
            dataField: "confirm",
            label: {
                text: "Potwierdź hasło"
            },
            editorOptions: {
                mode: 'password'
            },
            validationRules: [{
                type: "compare",
                comparisonTarget: function () {
                    var password = $("#userPasswordForm").dxForm('instance');
                    if (password) {
                        return password.getEditor('password').option('value');
                    }
                },
                message: "Wprowadzone hasła nie są zgodne"
            }, {
                type: "required",
                message: "Potwierdzenie hasła jest wymagane"
            }]
        }]
    });

    $("#userPasswordButton").dxButton({
        text: "Zapisz",
        focusStateEnabled: false,
        onClick: function () {

            var f = $("#userPasswordForm").dxForm('instance');

            var editProfilePassword = f.getEditor('password').option('value');
            var confirmPassword = f.getEditor('confirm').option('value');

            var ret = f.validate();

            if (ret.isValid) {
                if (editProfilePassword === confirmPassword) {

                   /* $.post("./users/edit/password?id=" + user
                        + "&password=" + editProfilePassword,
                        function (data) {})*/
                   console.log("jeej")
                }
            }
        }
    })

}

function showOffersList() {

    $.get('./products/owner/list?ownerId='+ currentUserId +"&active=" +true, function (data){
    var offerList = $("#userOfferList").dxList({
        dataSource: data,
        selectionMode: "sinle",
        height: "100%",
        noDataText: "Brak aktywnych ofert",
        scrollingEnabled: true,
        selectionMode: "single",
        itemTemplate: function(e, index) {

            var result = $("<div>").addClass("offerAnotherList");

            $("<img>").attr("src", e.img).appendTo(result);
            $("<div id='name'>").text(e.name).appendTo(result);
            $("<div id='AnotherOfferDetailsButtonContainer'>").append($('<div id="showAnotherOfferDetailsButton">').dxButton({
                text:"Pokaż ofertę",
                onClick:function () {
                    offerLinkClick(e.id);
                   /* e.jQueryEvent.stopPropagation();*/
                }
            })).appendTo(result);
            return result;

        }
    }).dxList("instance");
        $("#userOffersContent").append(offerList);
    })



}

function showAddOrEditOfferPopup(edit) {

    $("#addOrEditOfferPopup").dxPopup({
        title:"Dodaj nową ofertę",
        height: 700,
        width: 1000
    }).dxPopup("show");

    addOrEditOffer(edit);

}

function addOrEditOffer(edit) {

    $.get("./clear/session/img" );

    var dataList = $("#userOfferList").dxList("instance");

    var newOffer = {
        name: "",
        categoryId: "",
        cityId: "",
        description: "",
        ownerId: currentUserId,
        creationDate: "",
        active:true,

    };


    if (edit == true) {
        newOffer.name = dataList.option("selectedItems")[0].name;
        newOffer.categoryId = dataList.option("selectedItems")[0].categoryId;
        newOffer.description = dataList.option("selectedItems")[0].description;

    } else $("#addOfferForm").val("");



    $("#addOfferForm").dxForm({
        formData: newOffer,
        items:[{
            dataField:"name",
            label: {
                text: "Nazwa oferty"
            }
        },{
            dataField: "categoryId",
            editorType: "dxSelectBox",
            label: {
                text: "Kategoria"
            },
            editorOptions: {
                dataSource: "./categories/all",
                displayExpr: 'name',
                valueExpr: 'id',
                searchEnabled: true,
                placeholder: "Wybierz kategorię"
            }
        },{
            dataField: "cityId",
            editorType: "dxSelectBox",
            label: {
                text: "Miejscowość"
            },
            editorOptions: {
                dataSource: "./city/all",
                displayExpr: 'name',
                valueExpr: 'id',
                searchEnabled: true,
                placeholder: "Wybierz miejscowość"
            }
        },{
            dataField: "description",
            editorType: "dxTextArea",
            label: {
                text: "Opis"
            },
            editorOptions: {
                height: 200
            }
        }]
    });


    $("#productImgUploader").dxFileUploader({
        selectButtonText: "Wybierz zdjęcia",
        uploadUrl:"/products/image/upload",
        name: "file",
        accept: "image/*",
        multiple: true,
        uploadMode: "instantly",
        maxFileSize: 5000000,
        invalidMaxFileSizeMessage: "Plik zbyt duży",
        readyToUploadMessage:"Gotowy do zapisu",
        uploadButtonText: "Zapisz zdjęcia",
        uploadedMessage:"Zapisano",
        uploadFailedMessage: "Wystąpił błąd",


    });

    $("#saveAddButton").dxButton({
        text:"Zapisz",
        focusStateEnabled: false,
        onClick: function () {

            var f = $("#addOfferForm").dxForm('instance');

            var newName = f.getEditor('name').option('value');
            var newCategory = f.getEditor('categoryId').option('value');
            var newDesc = f.getEditor('description').option('value');
            var newCity = f.getEditor('cityId').option('value');
            var newCreationDate = getDate(new Date());



            newOffer.name = newName;
            newOffer.categoryId = newCategory;
            newOffer.cityId = newCity;
            newOffer.description = newDesc;
            newOffer.creationDate = newCreationDate;


            newOffer = JSON.stringify(newOffer);
            console.log(newOffer);

            if(edit === true){
                $.post("/products/update?id="+$("#userOfferList").dxList("instance").option("selectedItems")[0].id+"&name="+newName+
                "&categoryId="+newCategory+"&description="+newDesc, function (result) {
                    $("#addOrEditOfferPopup").dxPopup("hide");
                    showOffersList();
                })
            }else {


                $.ajax({
                    url: './products/add',
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (result) {
                        if (result.errorMsg) {
                            console.log("error")
                        } else {
                            $("#addOrEditOfferPopup").dxPopup("hide");
                            showOffersList();
                            $("#productImgUploader").dxFileUploader("instance").reset();
                        }
                    },
                    data: newOffer
                });
            }
        }
    });

    $("#cancelAddButton").dxButton({
        text: "Anuluj",
        type: "normal",
        focusStateEnabled: false,
        onClick: function () {
            $("#addOrEditOfferPopup").dxPopup("hide");
        }

    });

}

function userOffersSettings() {

    $("#headerUserOffersText").html("");
    $("#headerUserOffersText").append("Aktywne oferty");


    $("#addOfferButton").dxButton({
        icon: "add",
        focusStateEnabled: false,
        onClick: function () {
            showAddOrEditOfferPopup(false);
        }
    });

    $("#editOfferButton").dxButton({
        icon: "edit",
        focusStateEnabled: false,
        onClick: function () {
            if ($("#userOfferList").dxList("instance").option("selectedItems").length > 0){
                showAddOrEditOfferPopup(true);
            }
            else{
                $("#noSelectedToast").dxToast("show");
            }
        }
    });

    $("#archiveOfferButton").dxButton({
        icon: "trash",
        focusStateEnabled: false,
        onClick: function () {
            if ($("#userOfferList").dxList("instance").option("selectedItems").length > 0) {
                var id = $("#userOfferList").dxList("instance").option("selectedItems")[0].id;
                $.post("./products/active?id=" + id+"&active="+false, function (result) {
                    $("#archiveUserProductToast").dxToast("show");
                    showOffersList();
                })
            } else {
                $("#noSelectedToast").dxToast("show");
            }
        }
    });

    showOffersList();

}

function showFavList() {


    var favList = $("#userFavList").dxList({
        dataSource: currentUser.fav,
        height: "100%",
        selectionMode: "sinle",
        scrollingEnabled: false,
        selectionMode: "single",
        noDataText: "Brak ulubionych ofert",
        itemTemplate: function(e, index) {
            var result = $("<div>").addClass("offerAnotherList");
            $("<img>").attr("src", e.img).appendTo(result);
            $("<div id='name'>").text(e.name).appendTo(result);
            $("<div id='AnotherOfferDetailsButtonContainer'>").append($('<div id="showAnotherOfferDetailsButton">').dxButton({
                text:"Pokaż ofertę",
                onClick:function () {
                    offerLinkClick(e.id);
                    e.jQueryEvent.stopPropagation();
                }
            })).appendTo(result);
            return result;
        }
    }).dxList("instance");
    $("#userFavContent").append(favList);


}

function deleteFavButton() {

    $("#deleteFavButton").dxButton({
        icon: "trash",
        focusStateEnabled: false,
        onClick: function () {
            if ($("#userFavList").dxList("instance").option("selectedItems").length > 0) {
                var id = $("#userFavList").dxList("instance").option("selectedItems")[0].id;
                $.post("./users/delete/fav?productId=" + id +"&userId="+currentUserId, function (result) {
                    $("#deleteFavToast").dxToast("show");
                    $("#userFavList").dxList('instance').option("dataSource",currentUser.fav);
                    $('#userFavList').dxList('instance').repaint();
                })
            } else {
                $("#noSelectedToast").dxToast("show");
            }
        }
    });

}

function userFavSettings() {

    $("#headerUserFavText").html("");
    $("#headerUserFavText").append("Ulubione oferty");

    deleteFavButton();
    showFavList();


}



function refreshFavList() {

    var ds = $("#userFavList").dxList("instance");
    ds.repaint();

}

function showDeletedOfferList() {

    $.get('./products/owner?ownerId='+ currentUserId +"&active=" +false, function (data){
        var offerList = $("#userDeletedOfferList").dxList({
            dataSource: data.content,
            height: "100%",
            selectionMode: "sinle",
            scrollingEnabled: false,
            noDataText: "Brak zarchiwizowanych ofert",
            itemTemplate: function(e, index) {
                var result = $("<div>").addClass("offerAnotherList");
                $("<img>").attr("src", e.img).appendTo(result);
                $("<div id='name'>").text(e.name).appendTo(result);
                return result;
            }
        }).dxList("instance");
        $("#userDeleteContent").append(offerList);
    })

}

function deletedOfferSettings() {

    $("#headerUserDeleteText").html("");
    $("#headerUserDeleteText").append("Oferty zarchiwizowane");

    $("#restoreOfferButton").dxButton({
        icon: "revert",
        focusStateEnabled: false,
        onClick: function () {
            if ($("#userDeletedOfferList").dxList("instance").option("selectedItems").length > 0) {
                var id = $("#userDeletedOfferList").dxList("instance").option("selectedItems")[0].id;
                $.post("./products/active?id=" + id +"&active="+true, function () {
                    $("#restoreUserProductToast").dxToast("show");
                    showDeletedOfferList();
                })
            } else {
                $("#noSelectedToast").dxToast("show");
            }
        }
    });


    $("#deleteOfferButton").dxButton({
        icon: "trash",
        focusStateEnabled: false,
        onClick: function () {
            if ($("#userDeletedOfferList").dxList("instance").option("selectedItems").length > 0) {
                var id = $("#userDeletedOfferList").dxList("instance").option("selectedItems")[0].id;
                $.post("./products/delete?id=" + id, function () {
                    $("#deleteUserProductToast").dxToast("show");
                    showDeletedOfferList();
                })
            } else {
                $("#noSelectedToast").dxToast("show");
            }
        }
    });


    showDeletedOfferList();

}

function receiveOfferSettings() {

    $("#headerUserReceiveText").html("");
    $("#headerUserReceiveText").append("Nadesłane propozycje wymiany");

    showUserReceiveOfferList();

}

function showUserReceiveOfferList() {

    $.get('./transaction/new/proposal?ownerId='+ currentUserId, function (data){
        var receiveOfferList = $("#userReceiveOfferList").dxList({
            dataSource: data,
            height: "100%",
            selectionMode: "sinle",
            scrollingEnabled: false,
            noDataText: "Brak nowych propozycji wymiany",
            itemTemplate: function(e, index) {
                var result = $("<div>").addClass("offer");
                $("<p id='offerText'>").text("Propozycja wymiany od    ").appendTo(result);
                $("<div id='clientName'>").text(e.clientLogin).appendTo(result);

                return result;
            },
            onItemClick: function (e){
                showReceiveOfferPopup(e.itemData);
            }
        }).dxList("instance");
        $("#userReceiveContent").append(receiveOfferList);
    })

}

function showReceiveOfferPopup(transaction) {


    $("#ReceiveOfferPopup").dxPopup({
        title:"Propozycja transakcji",
        onHiding: function () {
            $("#userReceiveOfferList").dxList("instance").option("selectedItems", []);
            //$.post('./clear/session/transaction/state', function (t) { console.log("clear") });
        },
        onShowing: function () {

        }
    }).dxPopup("show");

    sendAnswerForm(transaction);

    $("#acceptOfferToast").dxToast({
        message: "Oferta została zaakceptowana",
        type: "success",
        displayTime: 2000
    });

    $("#deleteOfferToast").dxToast({
        message: "Oferta została usunięta",
        type: "success",
        displayTime: 2000
    })

}

function sendAnswerForm(transaction) {

    var transactionData = {
        messageClient: transaction.transactionState[0].messageClient,
        messageOwner: "",
        clientName: transaction.clientLogin,
        offerName:transaction.offerName
    };

    $("#rOfferForm").dxForm({
        formData: transactionData,
        colCount:2,
        labelLocation: "top",
        items:[{
            dataField:"clientName",
            label: {
                text: "Użytkownik zainteresowany wymianą"
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
                text: "Wiadomość od zainteresowanego użytkownika"
            },
            editorOptions: {
                height: 100,
                disabled: true
            }
        },{
            colSpan: 2,
            dataField:"messageOwner",
            editorType: "dxTextArea",
            label: {
                text: "Odpowiedz"
            },
            editorOptions: {
                height: 100
            }
        }]

    });

    showProposedOffers(transaction.id);


    $("#addAnotherOfferButton").dxButton({
        text: "Wybierz inną ofertę użytkownika",
        onClick: function () {
            $("#anotherOfferPopup").dxPopup({
                title: "Pozostałe oferty użytkownika " + transaction.clientLogin,

            }).dxPopup("show");

            var transactionOfferId = [-1];

            $.each(transaction.transactionState,function (indexInArray, data) {
                transactionOfferId.push(data.offerId);
            });

            var idsList = {
                ids: transactionOfferId
            };


            idsList = JSON.stringify(idsList);

            $.ajax({
                url: './products/owner/another?ownerId='+transaction.clientId,
                type: 'post',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    if (result.errorMsg) {
                        console.log("error")
                    }else{
                        var anotherOfferList = $("#anotherOfferList").dxList({
                            dataSource: result,
                            height: "100%",
                            selectionMode: "multiple",
                            showSelectionControls: true,
                            scrollingEnabled: true,
                            noDataText: "Użytkownik nie ma aktywnych ofert",
                            itemTemplate: function(e) {
                                var result = $("<div>").addClass("offerAnotherList");
                                $("<img>").attr("src", e.img).appendTo(result);
                                $("<div id='name'>").text(e.name).appendTo(result);
                                $("<div id='AnotherOfferDetailsButtonContainer'>").append($('<div id="showAnotherOfferDetailsButton">').dxButton({
                                    text:"Pokaż ofertę",
                                    onClick:function () {
                                        offerLinkClick(e.id);
                                        e.jQueryEvent.stopPropagation();
                                    }
                                })).appendTo(result);
                                return result;
                            }
                        }).dxList("instance");
                        $("#anotherOfferContainer").append(anotherOfferList);
                        $('#anotherOfferList').dxList('instance').repaint();
                    }
                },
                data: idsList
            });


            $("#acceptAnotherButton").dxButton({
                text: "Akceptuj",
                onClick: function () {
                    var anotherOfferList = $("#anotherOfferList").dxList("instance").option("selectedItems");


                    $.each(anotherOfferList,function(index, data){
                        var offerJson = {
                            offerId: "",
                            sellerAccept: true,
                            buyerAccept: false,
                            transactionId: transaction.id,
                            sideFlag: 0,
                            step:2,
                            messageOwner: $("#rOfferForm").dxForm("instance").getEditor('messageClient').option('value')
                        };
                        offerJson.offerId = data.id;
                        offerJson = JSON.stringify(offerJson);

                        $.ajax({
                            url: './transaction/save/offer',
                            type: 'post',
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8',
                            success: function (result) {
                                if (result.errorMsg) {
                                    console.log("error")
                                }
                            },
                            data: offerJson
                        });
                    });
                    $("#anotherOfferPopup").dxPopup("hide");
                    refreshOfferGrid();
                }
            });

            $("#cancelAnotherButton").dxButton({
                text:"Anuluj",
                onClick: function () {
                    $("#anotherOfferPopup").dxPopup("hide")
                }
            })



        }
    });

    $("#deleteROfferButton").dxButton({
        text:"Odrzuć ofertę"
    });

    $("#acceptROfferButton").dxButton({
        text:"Zaakceptuj i zakończ",
        onClick: function () {

            var gridOfferdata = ("#rOfferGrid").dxDataGrid("instance").option("dataSource").items();
            $.each(gridOfferdata, function (indexInArray, data) {
                if(data.sellerAccept === false || data.buyerAccept===false){
                    console.log("Niezaakceptowno")
                }


            })

        }
    });

    $("#sendResponseOfferButton").dxButton({
        text:"Wyślij odpowiedź"
    });



    /*$("#sendTranButton").dxButton({
        text:"Wyślij",
        focusStateEnabled: false,
        onClick: function () {

            var f = $("#tranForm").dxForm('instance');

            var saveData = {
                ownerId: ownerId,
                clientId: currentUser,
                offerId: productId,
                message: f.getEditor('message').option('value'),
                status: 1,
                ownerAccept: false,
                clientAccept:true,
                ids: []

            };

            var dataGrid = $("#clientOfferGrid").dxDataGrid("instance");

            for (var i = 0; i<dataGrid.getSelectedRowsData().length; i++){
                saveData.ids .push(dataGrid.getSelectedRowsData()[i].id)
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
    });*/

}

function offerLinkClick(id) {
    openInTab('./product?productId='+id);
}

function showProposedOffers(transactionId) {


    var gridOfferData = new DevExpress.data.DataSource({

        load: function (loadOptions) {

            var d = $.Deferred();
            $.getJSON('./transaction/offer/list', {
                    transactionId: transactionId

                }
            ).done(function (result) {
                d.resolve(result);
            });
            return d.promise();
        }
    });


    $("#rOfferGrid").dxDataGrid({
        dataSource: gridOfferData,
        key: "id",
        columnAutoWidth: true,
        selection: {
            mode: "single"
        },
        showBorders: true,
        hoverStateEnabled: true,
        scrolling: {
            "showScrollbar": "never"
        },
        columns: [{
            caption: "Nazwa oferty",
            dataField: "offerName"
        },{
            caption: "Kategoria",
            dataField: "categoryName"
        },{
            caption: "Akceptacja właściciela",
            dataField: "buyerAcceptStatus"
        },{
            caption: "Twoja akceptacja",
            dataField: "sellerAcceptStatus"
        },{
            caption:"",
            alignment: 'center',
            cellTemplate: function (container, options) {
                $('<a id="showLink"/>').addClass('dx-link')
                    .text("Pokaż ofertę")
                    .on('dxclick', function () {
                        openInTab('./product?productId='+options.data.offerId);
                        //location.href = './product?productId='+options.data.offerId;
                    })
                    .appendTo(container);
            }
        },{
            caption:"",
            alignment: 'center',
            cellTemplate: function (container, options) {
                $('<a id="acceptLink"/>').addClass('dx-link')
                    .text("Akceptuj")
                    .on('dxclick', function () {
                        console.log(options.data)
                        if(option.data.sellerAccept === true){
                            $("#acceptOfferTransaction").dxToast({
                                text:"Oferta jest już zaakceptowana"
                            }).dxToast("show");
                        }else{
                            /*$.post("./seller/accept/offer?offerId="+options.data.offerId, function (t) {
                                $("#acceptOfferToast").dxToast("show");
                                refreshOfferGrid();
                                $('#anotherOfferList').dxList('instance').repaint();
                            })*/
                        }

                    })
                    .appendTo(container);
            }
        },{
            caption:"",
            alignment: 'center',
            cellTemplate: function (container, options) {
                $('<a id="deleteLink"/>').addClass('dx-link')
                    .text("Usuń")
                    .on('dxclick', function () {
                        $.post("./transaction/delete/offer?offerId="+options.data.offerId,  function (t) {
                            $("#deleteOfferToast").dxToast("show");
                            refreshOfferGrid();

                        })
                    })
                    .appendTo(container);
            }
        }]

    });
    
    
}

function f() {
    
}

function refreshOfferGrid() {
    var ds = $("#rOfferGrid").dxDataGrid("getDataSource");
    ds.reload();
    var dataGridInstance = $("#rOfferGrid").dxDataGrid("instance");
    dataGridInstance.clearSelection();
    
}

function openInTab(url) {
    window.open(url, '_blank');

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


