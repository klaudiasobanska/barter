var currentUser;
var currentUserId;

$.get('./users/find/15', function (data) {

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
           id: 6,
           text: "Wysłane"
       },{
           id: 9,
           text: "Aktywne oczekujące"
       },{
           id: 10,
           text: "Aktywne wysłane"
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
            $("#userSendTransactionContent").hide();
            $("#userActiveTransactionContent").hide();
            $("#userSentActiveTransactionContent").hide();
            $("#userEndTransactionContent").hide();
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
                    $("#userSendTransactionContent").hide();
                    $("#userActiveTransactionContent").hide();
                    $("#userReceivedContent").hide();
                    $("#userSentActiveTransactionContent").hide();
                    $("#userEndTransactionContent").hide();
                    userDataSettings();
                    break;

                case 2:
                    $("#userDataContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userReceivedContent").hide();
                    $("#userSendTransactionContent").hide();
                    $("#userActiveTransactionContent").hide();
                    $("#userSentActiveTransactionContent").hide();
                    $("#userEndTransactionContent").hide();
                    $("#userPasswordContent").show();
                    userPasswordSettings();
                    break;
                case 3:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userFavContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userReceivedContent").hide();
                    $("#userSendTransactionContent").hide();
                    $("#userActiveTransactionContent").hide();
                    $("#userSentActiveTransactionContent").hide();
                    $("#userEndTransactionContent").hide();
                    $("#userOffersContent").show();

                    userOffersSettings();
                    break;
                case 4:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userReceivedContent").hide();
                    $("#userSendTransactionContent").hide();
                    $("#userActiveTransactionContent").hide();
                    $("#userSentActiveTransactionContent").hide();
                    $("#userEndTransactionContent").hide();
                    $("#userFavContent").show();
                    userFavSettings();
                    break;
                case 5:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userSendTransactionContent").hide();
                    $("#userActiveTransactionContent").hide();
                    $("#userSentActiveTransactionContent").hide();
                    $("#userEndTransactionContent").hide();
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
                    $("#userActiveTransactionContent").hide();
                    $("#userSentActiveTransactionContent").hide();
                    $("#userEndTransactionContent").hide();
                    $("#userSendTransactionContent").show();
                    sendOfferSettings();
                    break;
                case 7:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userReceivedContent").hide();
                    $("#userSendTransactionContent").hide();
                    $("#userActiveTransactionContent").hide();
                    $("#userSentActiveTransactionContent").hide();
                    $("#userEndTransactionContent").show();
                    endTransactionSettings();
                    break;
                case 8:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userReceivedContent").hide();
                    $("#userSendTransactionContent").hide();
                    $("#userActiveTransactionContent").hide();
                    $("#userSentActiveTransactionContent").hide();
                    $("#userEndTransactionContent").hide();
                    $("#userDeleteContent").show();
                    deletedOfferSettings();
                    break;
                case 9:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userReceivedContent").hide();
                    $("#userSendTransactionContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userSentActiveTransactionContent").hide();
                    $("#userEndTransactionContent").hide();
                    $("#userActiveTransactionContent").show();
                    activeTransactionSettings();
                    break;
                case 10:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userReceivedContent").hide();
                    $("#userSendTransactionContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userActiveTransactionContent").hide();
                    $("#userEndTransactionContent").hide();
                    $("#userSentActiveTransactionContent").show();
                    activeSentTransactionSettings();
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

/*----- TRANSACTION FUNCTIONS*/

function addAnotherOfferFunction(transaction) {

    $.ajax({
        url: './products/owner/another?ownerId='+transaction.clientId,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result.errorMsg) {
                console.log("error")
            }else{
                var anotherOfferList = $(".anotherOfferList").dxList({
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
                $(".anotherOfferContainer").append(anotherOfferList);
                $('.anotherOfferList').dxList('instance').repaint();
            }
        }
    });

}

function addAnotherOfferToTransactionStateFunction(json, gridName){

    json = JSON.stringify(json);

    $.ajax({
        url: './transaction/save/offer/another',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function () {
            refreshOfferGrid(gridName);
            $(".anotherOfferPopup").dxPopup("hide");
        },
        data: json
    });
}

function rejectButton(list,popup) {

    $(".rejectTransactionButton").dxButton({
        text:"Odrzuć ofertę",
        onClick:function () {
            $.post("./transaction/reject?id="+transaction.id,function () {

                $(list).dxList('instance').repaint();
                $(popup).dxPopup("hide");
            })
        }
    })
}

function acceptButton(grid,list,popup,userSide){



    $(".acceptTransactionButton").dxButton({
        text:"Zaakceptuj i zakończ",
        onClick: function () {
            var gridOfferData = $(grid).dxDataGrid("instance").option("dataSource").items();

            if(gridOfferData.length !=0) {
                var notAccept = [];

                $.each(gridOfferData, function (indexInArray, data) {
                    if (data.sellerAccept === false || data.buyerAccept === false) {
                        notAccept.push(indexInArray)
                    }
                });

                $.each(gridOfferData, function (indexInArray, data) {
                    if (notAccept.length > 0) {
                        $(".acceptEndOfferToast").dxToast("show");
                    }
                    else {
                        data.date = dateFormat(new Date);
                        data.messageOwner = $("#aTransactionForm").dxForm("instance").getEditor('messageOwner').option('value');
                        data.messageClient = $("#aTransactionForm").dxForm("instance").getEditor('messageClient').option('value');
                        data = JSON.stringify(data);

                        $.ajax({
                            url: "./transaction/success/end?id=" + data.transactionId+"&userSide="+userSide,
                            type: 'post',
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8',
                            success: function (result) {
                                if (result.errorMsg) {
                                    $(".lastDeletedToast").dxToast("show");
                                }else {
                                    $(list).dxList('instance').repaint();
                                    $(popup).dxPopup("hide");
                                }
                            },
                            data:data
                        });

                    }


                });
            }else{
                $(".noProposalOfferToast").dxToast("show");
            }

        }
    });
}


function transactionToast() {

    $(".acceptOfferToast").dxToast({
        message: "Oferta została zaakceptowana",
        type: "success",
        displayTime: 2000
    });

    $(".deleteOfferToast").dxToast({
        message: "Oferta została usunięta",
        type: "success",
        displayTime: 2000
    });

    $(".acceptSendOfferToast").dxToast({
        message: "Zaakceptuj wszystkie proponowane oferty by wysłać wiadomość",
        type: "error",
        displayTime: 2000
    });

    $(".acceptAllSendOfferToast").dxToast({
        message: 'Wszystkie proponowane oferty zostały zaakceptowane przez obie strony transakcji. Wybierz "Zaakceptuj i zakończ"',
        type: "error",
        displayTime: 4000
    });

    $(".acceptEndOfferToast").dxToast({
        message: "Wszystkie proponowane oferty muszą być zaakceptowane przez obie strony transakcji by została zakończona pomyślnie",
        type: "error",
        displayTime: 4000
    });
    $(".noProposalOfferToast").dxToast({
        message: "Aby wysłać wiadomość lub zaakceptować transakcję muszą być wybrane oferty do wymiany",
        type: "error",
        displayTime: 4000
    });
    $(".lastDeletedToast").dxToast({
        message: "Nie można zakończyć transakcji, ponieważ oferty zaproponowane przez drugą stronę transakcji zostały usunięte. Wyślij odpowiedź z aktualnym stanem transakcji",
        type: "error",
        displayTime: 6000
    });
}



/*-------------NEW TRANSACTION----------------*/
function receiveOfferSettings() {

    $("#headerUserReceiveText").html("");
    $("#headerUserReceiveText").append("Nadesłane propozycje wymiany");

    $("#ReceiveOfferPopup").dxPopup({
        title:"Propozycja transakcji",
        onHiding: function () {
            $("#userReceiveOfferList").dxList("instance").option("selectedItems", []);
        }
    }).dxPopup("instance");

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
                $.get("./transaction/clear/session", function (t) {
                    showReceiveOfferPopup(e.itemData);
                });

            }
        }).dxList("instance");
        $("#userReceiveContent").append(receiveOfferList);
    })

}

function showReceiveOfferPopup(transaction) {


    $("#ReceiveOfferPopup").dxPopup("show");

    sendAnswerForm(transaction);


    transactionToast();

}




function sendAnswerForm(transaction) {

    var transactionData = {
        messageClient: transaction.transactionState[0].messageClient,
        messageOwner: "",
        clientName: transaction.clientLogin,
        offerName:transaction.offerName,
        date: transaction.transactionState[0].date,
    };

    $("#rOfferForm").dxForm({
        formData: transactionData,
        colCount:3,
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
            dataField:"date",
            label: {
                text: "Data wysłania"
            },
            editorOptions: {
                disabled: true
            }
        },{
            colSpan: 3,
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
            colSpan: 3,
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


    $(".addAnotherOfferButton").dxButton({
        text: "Wybierz inne oferty",
        onClick: function () {
            $(".anotherOfferPopup").dxPopup({
                title: "Pozostałe oferty użytkownika " + transaction.clientLogin
            }).dxPopup("show");


            addAnotherOfferFunction(transaction);

            $(".acceptAnotherButton").dxButton({
                text: "Akceptuj",
                onClick: function () {
                    var anotherOfferList = $(".anotherOfferList").dxList("instance").option("selectedItems");


                    $.each(anotherOfferList,function(index, data){
                        var offerJson = {
                            offerId: "",
                            sellerAccept: true,
                            buyerAccept: false,
                            transactionId: transaction.id,
                            sideFlag: 0,
                            step:2,
                            messageOwner: "",
                            id: null,
                            messageClient: null
                        };
                        var ownerMessage = $("#rOfferForm").dxForm("instance").getEditor('messageOwner').option('value');
                        offerJson.messageOwner = ownerMessage;
                        offerJson.offerId = data.id;

                        addAnotherOfferToTransactionStateFunction(offerJson, "#rOfferGrid");

                    });


                }
            });

            $(".cancelAnotherButton").dxButton({
                text:"Anuluj",
                onClick: function () {
                    $(".anotherOfferPopup").dxPopup("hide")
                }
            })



        }
    });

    rejectButton("#userReceiveOfferList","#ReceiveOfferPopup");

    acceptButton("#rOfferGrid","#userReceiveOfferList","#ReceiveOfferPopup","owner");


    $("#sendResponseNewTransactionButton").dxButton({
        text:"Wyślij odpowiedź",
        onClick: function () {
            var gridOfferData = $("#rOfferGrid").dxDataGrid("instance").option("dataSource").items();
            if (gridOfferData.length != 0) {

                var notAccept = [];
                var allAccept = [];

                $.each(gridOfferData, function (indexInArray, data) {
                    if (data.sellerAccept === false) {
                        notAccept.push(indexInArray)
                    }
                    if (data.sellerAccept === true && data.buyerAccept === true) {
                        allAccept.push(indexInArray)
                    }
                });


                $.each(gridOfferData, function (indexInArray, data) {
                    if (notAccept.length > 0) {
                        $(".acceptSendOfferToast").dxToast("show");
                    }
                    else if (allAccept.length === data.length) {
                        $(".acceptAllSendOfferToast").dxToast("show");
                    }
                    else {
                        data.date = dateFormat(new Date);

                        data.messageClient = $("#rOfferForm").dxForm("instance").getEditor('messageClient').option('value');
                        data.messageOwner = $("#rOfferForm").dxForm("instance").getEditor('messageOwner').option('value');

                        data = JSON.stringify(data);
                        $.ajax({
                            url: './send/message',
                            type: 'post',
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8',
                            success: function () {
                                $("#userReceiveOfferList").dxList('instance').repaint();
                                $("#ReceiveOfferPopup").dxPopup("hide");

                            },
                            data: data
                        });
                    }
                })

            }else{
                console.log("jeee")
                $(".noProposalOfferToast").dxToast("show");
            }
        }
    });

}


function showProposedOffers(transactionId) {


    var gridOfferData = new DevExpress.data.DataSource({

        load: function () {

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

    $("#popoverActiveOffer").hide();
    $("#popoverActiveOfferShow").hide();


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
                    .on('dxhoverstart', function () {
                        if(options.data.offerActive === false) {
                            $("#popoverActiveOfferShow").show();
                            $("#popoverActiveOfferShow").dxPopover({
                                target: "#showLink",
                                showEvent: 'dxhoverstart',
                                hideEvent: 'dxhoverend'
                            }).dxPopover("instance");
                        }
                    })
                    .on('dxclick', function () {
                        if(options.data.offerActive === true){
                            openInTab('./product?productId='+options.data.offerId);
                        }
                    })
                    .appendTo(container);
            }
        },{
            caption:"",
            alignment: 'center',
            cellTemplate: function (container, options) {
                $('<a id="acceptLink"/>').addClass('dx-link')
                    .text("Akceptuj")
                    .on('dxhoverstart', function () {
                        if(options.data.offerActive === false) {
                            $("#popoverActiveOffer").show();
                            $("#popoverActiveOffer").dxPopover({
                                target: "#acceptLink",
                                showEvent: 'dxhoverstart',
                                hideEvent: 'dxhoverend'
                            }).dxPopover("instance");
                        }
                    })
                    .on('dxclick', function () {
                        if(options.data.offerActive === true){
                            if(options.data.sellerAccept === true){
                                $("#acceptOfferTransaction").dxToast({
                                    text:"Oferta jest już zaakceptowana"
                                }).dxToast("show");
                            }else{
                                $.post("./seller/accept/offer?offerId="+options.data.offerId, function (t) {
                                    $("#acceptOfferToast").dxToast("show");
                                    refreshOfferGrid("#rOfferGrid");
                                    $('.anotherOfferList').dxList('instance').repaint();
                                })
                            }
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
                            refreshOfferGrid("#rOfferGrid");
                            $('.anotherOfferList').dxList('instance').repaint();
                        })
                    })
                    .appendTo(container);
            }
        }],
        onRowPrepared: function (data) {
            if(data.rowType === 'data'){
                if (data.data.offerActive === false){
                    data.rowElement.css('background', '#e9e9e9');
                }
            }

        },
        onSelectionChanged: function(e) {
            var selectedRows = e.selectedRowKeys;
            $.each(selectedRows, function(i, v) {
                if (v.offerActive === false){
                    e.component.deselectRows([v]); return;
                }
            })
        }

    });

}

function f() {
    
}

function refreshOfferGrid(gridName) {
    var ds = $(gridName).dxDataGrid("getDataSource");
    console.log(gridName)
    ds.reload();
    var dataGridInstance = $(gridName).dxDataGrid("instance");
    dataGridInstance.clearSelection();
    
}


/*------SEND TRANSACTION-----------*/


function sendOfferSettings(){
    $("#headerUserSendText").html("");
    $("#headerUserSendText").append("Wysłane propozycje wymiany");

    $("#sendOfferPopup").dxPopup({
        title:"Propozycja transakcji",
        height: 500,
        width: 900,
        onHiding: function () {
            $("#userSendOfferList").dxList("instance").option("selectedItems", []);
        }
    }).dxPopup("instance");

    showUserSendOfferList();

}

function showUserSendOfferList() {

    $.get('./transaction/send/proposal?userId='+ currentUserId, function (data){
        var receiveOfferList = $("#userSendOfferList").dxList({
            dataSource: data,
            height: "100%",
            selectionMode: "sinle",
            scrollingEnabled: false,
            noDataText: "Brak nowo wysłanych propozycji wymiany",
            itemTemplate: function(e) {
                var result = $("<div>").addClass("offer");
                $("<p id='offerText'>").text("Propozycja transakcji wysłana do    ").appendTo(result);

                $("<div id='ownerName'>").text(e.ownerLogin).appendTo(result);

                return result;
            },
            onItemClick: function (e){
                $.get("./transaction/clear/session", function () {
                    showSendOfferPopup(e.itemData);
                });

            }
        }).dxList("instance");
        $("#userSendTransactionContent").append(receiveOfferList);
    })

}

function showSendOfferPopup(sendTransaction) {


    $("#sendOfferPopup").dxPopup("show");

    showSendTransactionForm(sendTransaction);

}

function showSendTransactionForm(transactionData) {
    console.log(transactionData)

    var transaction = {
        ownerName: transactionData.ownerLogin,
        offerName: transactionData.offerName,
        messageClient: transactionData.messageClient,
        date: transactionData.transactionState[0].date
    };

    $("#sOfferForm").dxForm({
        formData: transaction,
        colCount:3,
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
            dataField:"date",
            label: {
                text: "Data wysłania"
            },
            editorOptions: {
                disabled: true
            }
        },{
            colSpan: 3,
            dataField:"messageClient",
            editorType: "dxTextArea",
            label: {
                text: "Wysłana wiadomość"
            },
            editorOptions: {
                height: 100,
                disabled: true
            }
        }]

    });

    showSendProposedOffers(transactionData.id);
    
    
    $("#cancelSendOfferButton").dxButton({
        text: "Wycofaj transakcję",
        onClick: function () {
            $.post('./transaction/client/reject?id='+transactionData.id, function () {
                $("#userSendOfferList").dxList('instance').repaint();
                $("#sendOfferPopup").dxPopup("hide");
            })

        }
    })

}


function  showSendProposedOffers(transactionId) {

    var gridOfferData = new DevExpress.data.DataSource({

        load: function () {

            var d = $.Deferred();
            $.getJSON('./transaction/send/offer/list', {
                    transactionId: transactionId

                }
            ).done(function (result) {
                d.resolve(result);
            });
            return d.promise();
        }
    });


    $("#sOfferGrid").dxDataGrid({
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
            caption: "Twoja akceptacja",
            dataField: "buyerAcceptStatus"
        },{
            caption: "Akceptacja właściciela",
            dataField: "sellerAcceptStatus"
        },{
            caption:"",
            alignment: 'center',
            cellTemplate: function (container, options) {
                $('<a id="showLink"/>').addClass('dx-link')
                    .text("Pokaż ofertę")
                    .on('dxclick', function () {
                        if(options.data.offerActie === true){
                            openInTab('./product?productId='+options.data.offerId);
                        }

                    })
                    .appendTo(container);
            }
        }]
    });

}



/*-------- ACTIVE TRANSACTION-------------*/

function activeTransactionSettings() {

    $("#headerUserActiveText").html("");
    $("#headerUserActiveText").append("Aktywne transakcje");

    $("#activeTransactionPopup").dxPopup({
        title:"Aktywna transakcja",
        onHiding: function () {
            $("#userActiveTransactionList").dxList("instance").option("selectedItems", []);
        }
    }).dxPopup("instance");

    showUserActiveTransactionList();

}

function showUserActiveTransactionList() {


    $.get('./transaction/active/wait/proposal?userId='+ currentUserId, function (data){


        var activeTransactionList = $("#userActiveTransactionList").dxList({
            dataSource: data,
            height: "100%",
            selectionMode: "sinle",
            scrollingEnabled: false,
            noDataText: "Brak aktywnych transakcji",
            itemTemplate: function(data,_ , element) {
                var result = $("<div>").addClass("offer");
                $("<p id='transactionText'>").text("Transakcja    ").appendTo(result);
                //$("<div id='transactionName'>").text(e.offerName).appendTo(result);

                return result;
            },
            onItemClick: function (el){
                $.get("./transaction/clear/session", function () {
                    showActiveTransactionPopup(el.itemData);
                });

            }
        }).dxList("instance");
        $("#userActiveTransactionContent").append(activeTransactionList);
    })

}

function showActiveTransactionPopup(transaction) {


    $("#activeTransactionPopup").dxPopup("show");

    sendAnswerActiveForm(transaction);


    transactionToast();

}


function sendAnswerActiveForm(transaction) {

    var transactionData, userSide;

    if (currentUserId === transaction.clientId) {
        userSide = "client"
    }
    if(currentUserId === transaction.ownerId){
        userSide = "owner"
    }


    transactionData = {
        messageOwner: "",
        messageClient: "",
        ownerName: transaction.ownerLogin,
        clientName : transaction.clientLogin,
        offerName:transaction.offerName,
        date: transaction.transactionStateMaxStep[0].date
    };

    if (userSide === "client") {
        transactionData.messageOwner = transaction.transactionStateMaxStep[0].messageOwner;


        $("#aTransactionForm").dxForm({
            formData: transactionData,
            colCount:3,
            labelLocation: "top",
            items:[{
                dataField:"ownerName",
                label: {
                    text: "Właściciel Oferty"
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
                dataField:"date",
                label: {
                    text: "Data dostarczenia"
                },
                editorOptions: {
                    disabled: true
                }
            },{
                colSpan: 3,
                dataField:"messageOwner",
                editorType: "dxTextArea",
                label: {
                    text: "Wiadomość od właściciela oferty"
                },
                editorOptions: {
                    height: 100,
                    disabled: true
                }
            },{
                colSpan: 3,
                dataField:"messageClient",
                editorType: "dxTextArea",
                label: {
                    text: "Odpowiedz"
                },
                editorOptions: {
                    height: 100
                }
            }]

        });


    }else {
        transactionData.messageClient = transaction.transactionStateMaxStep[0].messageClient;

        $("#aTransactionForm").dxForm({
            formData: transactionData,
            colCount:3,
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
                dataField:"date",
                label: {
                    text: "Data dostarczenia"
                },
                editorOptions: {
                    disabled: true
                }
            },{
                colSpan: 3,
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
                colSpan: 3,
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

    }


    showProposedOffersActive(transaction);


        $(".addAnotherOfferButton").dxButton({
            text: "Wybierz inne oferty",
            onClick: function () {

                $(".anotherOfferPopup").dxPopup({
                    title: "Pozostałe oferty użytkownika " + transaction.clientLogin
                }).dxPopup("show");


                addAnotherOfferFunction(transaction, userSide);

                $(".acceptAnotherButton").dxButton({
                    text: "Akceptuj",
                    onClick: function () {
                        var anotherOfferList = $(".anotherOfferList").dxList("instance").option("selectedItems");

                        var offerJson = {
                            offerId: "",
                            sellerAccept: "",
                            buyerAccept: "",
                            transactionId: transaction.id,
                            sideFlag: "",
                            step: transaction.transactionStateMaxStep[0].step +1,
                            messageOwner: $("#aTransactionForm").dxForm("instance").getEditor('messageOwner').option('value'),
                            id: null,
                            messageClient: $("#aTransactionForm").dxForm("instance").getEditor('messageClient').option('value')
                        };

                        if (userSide === "owner"){
                            offerJson.sellerAccept = true;
                            offerJson.buyerAccept = false;
                            offerJson.sideFlag = 0;
                            //offerJson.messageOwner = $("#aTransactionForm").dxForm("instance").getEditor('messageOwner').option('value');
                        }else{
                            offerJson.buyerAccept = true;
                            offerJson.sellerAccept = false;
                            offerJson.sideFlag = 1;
                            //offerJson.messageClient = $("#aTransactionForm").dxForm("instance").getEditor('messageClient').option('value');

                        }

                        $.each(anotherOfferList,function(index, data){

                            offerJson.offerId = data.id;
                            addAnotherOfferToTransactionStateFunction(offerJson, "#aOfferGrid");
                        });


                    }
                });

                $(".cancelAnotherButton").dxButton({
                    text:"Anuluj",
                    onClick: function () {
                        $(".anotherOfferPopup").dxPopup("hide")
                    }
                })


            }
        });

        rejectButton("#userActiveTransactionList","#activeTransactionPopup");

        acceptButton("#aOfferGrid","#userActiveTransactionList","#activeTransactionPopup",userSide);


        $("#sendResponseActiveTransactionButton").dxButton({
            text:"Wyślij odpowiedź",
            onClick: function () {
                var gridOfferData = $("#aOfferGrid").dxDataGrid("instance").option("dataSource").items();
                if (gridOfferData.length != 0) {

                    var notAccept = [];
                    var allAccept = [];

                    $.each(gridOfferData, function (indexInArray, data) {
                        if(userSide === "owner") {
                            if (data.sellerAccept === false) {
                                notAccept.push(indexInArray)
                            }
                        }else{
                            if (data.buyerAccept === false) {
                                notAccept.push(indexInArray)
                            }
                        }
                        if (data.sellerAccept === true && data.buyerAccept === true) {
                            allAccept.push(indexInArray)
                        }
                    });


                    $.each(gridOfferData, function (indexInArray, data) {
                        if (notAccept.length > 0) {
                            $(".acceptSendOfferToast").dxToast("show");
                        }
                        else if (allAccept.length === data.length) {
                            $(".acceptAllSendOfferToast").dxToast("show");
                        }
                        else {
                            data.date = dateFormat(new Date);
                            data.messageOwner = $("#aTransactionForm").dxForm("instance").getEditor('messageOwner').option('value');
                            data.messageClient = $("#aTransactionForm").dxForm("instance").getEditor('messageClient').option('value');
                            data = JSON.stringify(data);

                            $.ajax({
                                url: './send/message',
                                type: 'post',
                                dataType: 'json',
                                contentType: 'application/json; charset=utf-8',
                                success: function () {
                                    $("#userActiveTransactionList").dxList('instance').repaint();
                                    $("#activeTransactionPopup").dxPopup("hide");

                                },
                                data: data
                            });
                        }
                    })

                }else{
                    $(".noProposalOfferToast").dxToast("show");
                }
            }
        });

}

function offerLinkClick(id) {
    openInTab('./product?productId='+id);
}
function showProposedOffersActive(transaction) {

    var userSide;

    if (currentUserId === transaction.clientId) {
        userSide = "client"
    }
    if(currentUserId === transaction.ownerId){
        userSide = "owner"
    }

  var gridOfferData = new DevExpress.data.DataSource({

      load: function () {

          var d = $.Deferred();
          $.getJSON('./transaction/active/offer/list', {
                  transactionId: transaction.id

              }
          ).done(function (result) {
              d.resolve(result);
          });
          return d.promise();
      }
  });
    $("#popoverNoActiveTransactionShow").hide();
    $("#popoverNoActiveTransaction").hide();

  $("#aOfferGrid").dxDataGrid({
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
                  .on('dxhoverstart',function () {
                      if(options.data.offerActive === false) {
                          $("#popoverNoActiveTransactionShow").show();
                          $("#popoverNoActiveTransactionShow").dxPopover({
                              target: "#showLink",
                              showEvent: 'dxhoverstart',
                              hideEvent: 'dxhoverend'
                          }).dxPopover("instance");
                      }
                  })
                  .on('dxclick', function () {
                      if(options.data.offerActive === true){
                          openInTab('./product?productId='+options.data.offerId);

                      }
                  })
                  .appendTo(container);
          }
      },{
          caption:"",
          alignment: 'center',
          cellTemplate: function (container, options) {
              $('<a id="acceptLink"/>').addClass('dx-link')
                  .text("Akceptuj")
                  .on('dxhoverstart',function () {
                      if(options.data.offerActive === false) {
                          $("#popoverNoActiveTransaction").show();
                          $("#popoverNoActiveTransaction").dxPopover({
                              target: "#acceptLink",
                              showEvent: 'dxhoverstart',
                              hideEvent: 'dxhoverend'
                          }).dxPopover("instance");
                      }
                  })
                  .on('dxclick', function () {
                      if(options.data.offerActive === true){
                          if(userSide === "owner"){
                              if(options.data.sellerAccept === true) {
                                  $(".acceptOfferTransaction").dxToast({
                                      text: "Oferta jest już zaakceptowana"
                                  }).dxToast("show");
                              }else {
                                  $.post("./accept/owner/side/offer?offerId="+options.data.offerId + "&side="+userSide, function () {
                                      $(".acceptOfferToast").dxToast("show");
                                      refreshOfferGrid("#aOfferGrid");
                                      $('.anotherOfferList').dxList('instance').repaint();
                                  });
                              }
                          }else {
                              if(options.data.buyerAccept === true) {
                                  $(".acceptOfferTransaction").dxToast({
                                      text: "Oferta jest już zaakceptowana"
                                  }).dxToast("show");
                              }else {
                                  $.post("./accept/owner/side/offer?offerId="+options.data.offerId + "&side="+userSide, function () {
                                      $(".acceptOfferToast").dxToast("show");
                                      refreshOfferGrid("#aOfferGrid");
                                      $('.anotherOfferList').dxList('instance').repaint();
                                  });
                              }
                          }
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
                          $(".deleteOfferToast").dxToast("show");
                          refreshOfferGrid("#aOfferGrid");
                          $('.anotherOfferList').dxList('instance').repaint();
                      })
                  })
                  .appendTo(container);
          }
      }],
      onRowPrepared: function (data) {
          if(data.rowType === 'data'){
              if (data.data.offerActive === false){
                  data.rowElement.css('background', '#e9e9e9');
              }
          }

      },
      onSelectionChanged: function(e) {
          var selectedRows = e.selectedRowKeys;
          $.each(selectedRows, function(i, v) {
              if (v.offerActive === false){
                  e.component.deselectRows([v]);
              }
          })
      }

  });

    if (userSide === "client") {
        $("#aOfferGrid").dxDataGrid("instance").columnOption(2, "caption", "Twoja akceptacja");
        $("#aOfferGrid").dxDataGrid("instance").columnOption(3, "caption", "Akceptacja właściciela");

    }else{
        $("#aOfferGrid").dxDataGrid("instance").columnOption(2, "caption", "Akceptacja właściciela");
        $("#aOfferGrid").dxDataGrid("instance").columnOption(3, "caption", "Twoja akceptacja");
    }

}


/*---------------ACTIVE SENT--------------------*/

function activeSentTransactionSettings() {

    $("#headerUserSentActiveText").html("");
    $("#headerUserSentActiveText").append("Aktywne transakcje wysłane");

    $("#activeSentTransactionPopup").dxPopup({
        title:"Wysłana odpowiedź",
        height: 600,
        width: 900,
        onHiding: function () {
            $("#userSentActiveTransactionList").dxList("instance").option("selectedItems", []);
        }
    }).dxPopup("instance");

    showSentActiveTransactionList();

}

function showSentActiveTransactionList() {



    $.get('./transaction/active/sent/proposal?userId='+ currentUserId, function (data){

        var activeSentTransactionList = $("#userSentActiveTransactionList").dxList({
            dataSource: data,
            height: "100%",
            selectionMode: "sinle",
            scrollingEnabled: false,
            noDataText: "Brak aktywnych transakcji",
            itemTemplate: function(data,_ , element) {
                var result = $("<div>").addClass("offer");
                $("<p id='transactionText'>").text("Transakcja    ").appendTo(result);
                //$("<div id='transactionName'>").text(e.offerName).appendTo(result);

                return result;
            },
            onItemClick: function (el){
                showSentActiveTransactionPopup(el.itemData);


            }
        }).dxList("instance");
        $("#userSentActiveTransactionContent").append(activeSentTransactionList);
    });

}

function showSentActiveTransactionPopup(transaction) {

    $("#activeSentTransactionPopup").dxPopup("show");

    showSentAnswerActiveForm(transaction);

}

function showSentAnswerActiveForm(transaction) {


    var transactionData, userSide;

    if (currentUserId === transaction.clientId) {
        userSide = "client"
    }
    if (currentUserId === transaction.ownerId) {
        userSide = "owner"
    }


    transactionData = {
        messageOwner: "",
        messageClient: "",
        ownerName: transaction.ownerLogin,
        clientName: transaction.clientLogin,
        offerName: transaction.offerName,
        date: transaction.transactionStateMaxStep[0].date
    };

    if (userSide === "client") {
        transactionData.messageOwner = transaction.transactionStateMaxStep[0].messageOwner;
        transactionData.messageClient = transaction.transactionStateMaxStep[0].messageClient;

        $("#aSentActiveTransactionForm").dxForm({
            formData: transactionData,
            colCount: 3,
            labelLocation: "top",
            items: [{
                dataField: "ownerName",
                label: {
                    text: "Właściciel Oferty"
                },
                editorOptions: {
                    disabled: true
                }
            }, {
                dataField: "offerName",
                label: {
                    text: "Oferta"
                },
                editorOptions: {
                    disabled: true
                }
            },{
                dataField: "date",
                label: {
                    text: "Data wysłania"
                },
                editorOptions: {
                    disabled: true
                }
            }, {
                colSpan: 3,
                dataField: "messageOwner",
                editorType: "dxTextArea",
                label: {
                    text: "Wiadomość od właściciela oferty"
                },
                editorOptions: {
                    height: 100,
                    disabled: true
                }
            }, {
                colSpan: 3,
                dataField: "messageClient",
                editorType: "dxTextArea",
                label: {
                    text: "Twoja odpowiedź"
                },

                editorOptions: {
                    height: 100,
                    disabled: true
                }
            }]

        });


    } else {
        transactionData.messageClient = transaction.transactionStateMaxStep[0].messageClient;
        transactionData.messageOwner = transaction.transactionStateMaxStep[0].messageOwner;

        $("#aSentActiveTransactionForm").dxForm({
            formData: transactionData,
            colCount: 3,
            labelLocation: "top",
            items: [{
                dataField: "clientName",
                label: {
                    text: "Użytkownik zainteresowany wymianą"
                },
                editorOptions: {
                    disabled: true
                }
            }, {
                dataField: "offerName",
                label: {
                    text: "Oferta"
                },
                editorOptions: {
                    disabled: true
                }
            },{
                dataField: "date",
                label: {
                    text: "Data wysłania"
                },
                editorOptions: {
                    disabled: true
                }
            }, {
                colSpan: 3,
                dataField: "messageClient",
                editorType: "dxTextArea",
                label: {
                    text: "Wiadomość od zainteresowanego użytkownika"
                },
                editorOptions: {
                    height: 100,
                    disabled: true
                }
            }, {
                colSpan:3,
                dataField: "messageOwner",
                editorType: "dxTextArea",
                label: {
                    text: "Twoja odpowiedź"
                },
                editorOptions: {
                    height: 100,
                    disabled:true
                }
            }]

        });

    }

    showProposedSentOffersActive(transaction,userSide);
}

function showProposedSentOffersActive(transaction,userSide) {



    $("#aSentActiveOfferGrid").dxDataGrid({
        dataSource: transaction.transactionStateMaxStep,
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
                        if(options.data.offerActive === true){
                            openInTab('./product?productId='+options.data.offerId);

                        }
                    })
                    .appendTo(container);
            }
        }]

    });

    if (userSide === "client") {
        $("#aOfferGrid").dxDataGrid("instance").columnOption(2, "caption", "Twoja akceptacja");
        $("#aOfferGrid").dxDataGrid("instance").columnOption(3, "caption", "Akceptacja właściciela");

    }else{
        $("#aOfferGrid").dxDataGrid("instance").columnOption(2, "caption", "Akceptacja właściciela");
        $("#aOfferGrid").dxDataGrid("instance").columnOption(3, "caption", "Twoja akceptacja");
    }

}


/*--------END TRANSACTION-----------*/
function endTransactionSettings(){


    $("#headerUserEndTransactionText").html("");
    $("#headerUserEndTransactionText").append("Transakcje zakończone sukcesem");

    $("#activeEndTransactionPopup").dxPopup({
        title:"Zakończona transakcja",
        height: 650,
        width: 900,
        onHiding: function () {
            $("#userEndTransactionList").dxList("instance").option("selectedItems", []);
        }
    }).dxPopup("instance");

    showEndTransactionList();

}

function showEndTransactionList() {

    $.get('./transaction/end/list?userId='+ currentUserId, function (data){
        var endTransactionList = $("#userEndTransactionList").dxList({
            dataSource: data,
            height: "100%",
            selectionMode: "sinle",
            scrollingEnabled: false,
            noDataText: "Brak zakończonych transakcji",
            itemTemplate: function(e) {
                var result = $("<div>").addClass("end");
                $("<p id='endText'>").text("Transakcja    ").appendTo(result);

                //$("<div id='ownerName'>").text(e.ownerLogin).appendTo(result);

                return result;
            },
            onItemClick: function (e){

                showEndTransactionPopup(e.itemData);

            }
        }).dxList("instance");
        $("#userEndTransactionContent").append(endTransactionList);
    })

}

function showEndTransactionPopup(transaction) {


    $("#activeEndTransactionPopup").dxPopup("show");

    showEndTransactionForm(transaction);

}

function showEndTransactionForm(transaction) {

    var transactionData, userSide;

    if (currentUserId === transaction.clientId) {
        userSide = "client"
    }
    if (currentUserId === transaction.ownerId) {
        userSide = "owner"
    }


    transactionData = {
        messageOwner: "",
        messageClient: "",
        ownerName: transaction.ownerLogin,
        clientName: transaction.clientLogin,
        offerName: transaction.offerName,
        date: transaction.transactionStateMaxStep[0].date
    };

    if (userSide === "client") {
        transactionData.messageOwner = transaction.transactionStateMaxStep[0].messageOwner;
        transactionData.messageClient = transaction.transactionStateMaxStep[0].messageClient;

        $("#aEndTransactionForm").dxForm({
            formData: transactionData,
            colCount: 3,
            labelLocation: "top",
            items: [{
                dataField: "ownerName",
                label: {
                    text: "Właściciel Oferty"
                },
                editorOptions: {
                    disabled: true
                }
            }, {
                dataField: "offerName",
                label: {
                    text: "Oferta"
                },
                editorOptions: {
                    disabled: true
                }
            },{
                dataField: "date",
                label: {
                    text: "Data wysłania"
                },
                editorOptions: {
                    disabled: true
                }
            }, {
                colSpan: 3,
                dataField: "messageOwner",
                editorType: "dxTextArea",
                label: {
                    text: "Wiadomość od właściciela oferty"
                },
                editorOptions: {
                    height: 100,
                    disabled: true
                }
            }, {
                colSpan: 3,
                dataField: "messageClient",
                editorType: "dxTextArea",
                label: {
                    text: "Twoja odpowiedź"
                },

                editorOptions: {
                    height: 100,
                    disabled: true
                }
            }]

        });


    } else {
        transactionData.messageClient = transaction.transactionStateMaxStep[0].messageClient;
        transactionData.messageOwner = transaction.transactionStateMaxStep[0].messageOwner;

        $("#aEndTransactionForm").dxForm({
            formData: transactionData,
            colCount: 3,
            labelLocation: "top",
            items: [{
                dataField: "clientName",
                label: {
                    text: "Partner wymiany"
                },
                editorOptions: {
                    disabled: true
                }
            }, {
                dataField: "offerName",
                label: {
                    text: "Oferta"
                },
                editorOptions: {
                    disabled: true
                }
            },{
                dataField: "date",
                label: {
                    text: "Data zakończenia"
                },
                editorOptions: {
                    disabled: true
                }
            }, {
                colSpan: 3,
                dataField: "messageClient",
                editorType: "dxTextArea",
                label: {
                    text: "Ostatnia wiadomość od partnera wymiany"
                },
                editorOptions: {
                    height: 100,
                    disabled: true
                }
            }, {
                colSpan:3,
                dataField: "messageOwner",
                editorType: "dxTextArea",
                label: {
                    text: "Twoja odpowiedź"
                },
                editorOptions: {
                    height: 100,
                    disabled:true
                }
            }]

        });

    }

    showEndTransactionOffers(transaction);

}


function  showEndTransactionOffers(transaction) {


    $("#aEndTransactionOfferGrid").dxDataGrid({
        dataSource: transaction.transactionStateMaxStep,
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
        }]
    });

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


