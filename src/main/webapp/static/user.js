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
        icon: 'user',
        stylingMode: "text",
        onClick: function () {

        }
    });

    /*$("#homeButton").dxButton({
        icon:"home",
        stylingMode: "text",
        onClick: function () {
            location.href = "./home";
        }
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


    var drawer = $("#userDrawer").dxDrawer({
        opened: false,
        closeOnOutsideClick: true,
        openedStateMode: "shrink",
        revealMode: "slide",
        template: function () {
            var $list = $("<div>").addClass("panel-list");

            return $list.dxList({
                dataSource: menuItems,
                hoverStateEnabled: false,
                focusStateEnabled: false,
                activeStateEnabled: false,
                grouped: true,
                width: 200,
                elementAttr: {
                    class: "dx-theme-accent-as-background-color"
                },
                onItemClick: function (data) {
                    menuContent(data);
                }

             });
    }
    }).dxDrawer("instance");

    $("#drawerButton").dxButton({
        icon: "menu",
        stylingMode: "text",
        onClick: function() {
            var opened = drawer.option("opened");
            drawer.toggle(!opened);
        }
    }).dxButton("instance");



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
        onItemClick: function (data) {
            menuContent(data);

        },
        groupTemplate: function (groupData, _, groupElement) {
            groupElement.append(
                $("<p>").text(groupData.key)
            )
        },
        itemTemplate: function (data, index, element) {
            element.append(
                $("<p id='menuListText'>").text(data.text)
            );
            var result = $("<div>").addClass("cList");
            $.get("./transaction/active/wait/proposal?userId=" + currentUserId, function (t) {
                if (t.length > 0) {
                    for (var key in data) {
                        if (data[key] === 9) {
                            result.append($("<p id='activeC'>").text(t.length))
                        }
                    }
                }

            });
            $.get("./transaction/new/proposal?ownerId=" + currentUserId, function (e) {
                if (e.length > 0) {
                    for (var key in data) {
                        if (data[key] === 5) {
                            result.append($("<p id='newC'>").text(e.length))
                        }
                    }
                }

            });

            return result
        }
    });

    $("#addOrEditOfferPopup").dxPopup({
        title:"Dodaj nową ofertę",
        maxWidth: 800,
        shadingColor: "#32323280"
    });

    if (matchMedia) {
        var ms = window.matchMedia("(max-width: 768px)");
        ms.addListener(mediaSmallChange);
        mediaSmallChange(ms);
    }


    function mediaSmallChange(ms){
        if(ms.matches){
            $("#logoutButton").dxButton("instance").option("text","");
            $("#drawerButton").dxButton("instance").option("visible",true);
            $("#userMenuList").dxList("instance").option("visible",false);
            $("#userDataForm").dxForm("instance").option("labelLocation","top");
            $("#addOrEditOfferPopup").dxPopup("instance").option("height",650);


        }else {
            $("#logoutButton").dxButton("instance").option("text", "Wyloguj");
            $("#userDrawer").dxDrawer("instance").option("opened",false);
            $("#drawerButton").dxButton("instance").option("visible",false);
            $("#userMenuList").dxList("instance").option("visible",true);
            $("#userDataForm").dxForm("instance").option("labelLocation","left");
        }
    }
};

function menuContent(data) {
    switch (data.itemData.id) {
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
            /*cssClass: "myClass",*/
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
            cssClass: "myClass",
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

    $('#imgUser').attr('src', currentUser.imageString);


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
            if (e.value.length>0) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#imgUser').attr('src', e.target.result);
                };
                reader.readAsDataURL(e.value[0]);
            }else{
                $('#imgUser').attr('src', currentUser.imageString);
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
        noDataText: "Brak aktywnych ofert",
        scrollingEnabled: true,
        itemTemplate: function(e) {

            var result = $("<div>").addClass("offersUser");

            $.get("./image/offer?offerId="+e.id, function (t){
                if (t[0] != undefined) {
                    $("<img>").attr("src", t[0]).appendTo(result);
                }
                $("<div id='name'>").text(e.name).appendTo(result);
                $("<div id='offerUserButtonContainer'>").append($('<div id="showOfferButton">').dxButton({
                    text: "Pokaż ofertę",
                    onClick: function () {
                        offerLinkClick(e.id);
                        /!* e.jQueryEvent.stopPropagation();*!/
                    }
                })).appendTo(result);
            });

            return result;
        }

    }).dxList("instance");
        $("#userOffersContent").append(offerList);
    })

}

function showAddOrEditOfferPopup(edit) {

    $("#addOrEditOfferPopup").dxPopup("show");

    addOrEditOffer(edit);

}

function addOrEditOffer(edit) {


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
        labelText:""
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
                    $("#productImgUploader").dxFileUploader("instance").reset();
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
            $("#productImgUploader").dxFileUploader("instance").reset();
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
            $.get("./clear/session/img", function () {
                showAddOrEditOfferPopup(false);
            });

        }
    });

    $("#editOfferButton").dxButton({
        icon: "edit",
        focusStateEnabled: false,
        onClick: function () {
            if ($("#userOfferList").dxList("instance").option("selectedItems").length > 0){
                $.get("./clear/session/img", function () {
                    showAddOrEditOfferPopup(false);
                });
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
        itemTemplate: function(e) {

            var result = $("<div>").addClass("offerFav");

            $.get("./image/offer?offerId="+e.id, function (t){
                if (t[0] != undefined) {
                    $("<img>").attr("src", t[0]).appendTo(result);
                    console.log(result[0]);
                }
                $("<div id='name'>").text(e.name).appendTo(result);
                $("<div id='offerUserButtonContainer'>").append($('<div id="showOfferButton">').dxButton({
                    text:"Pokaż ofertę",
                    onClick:function () {
                        offerLinkClick(e.id);
                        e.jQueryEvent.stopPropagation();
                    }
                })).appendTo(result);
            });

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
            selectionMode: "sinle",
            scrollingEnabled: true,
            noDataText: "Brak zarchiwizowanych ofert",
            itemTemplate: function(e) {

                var result = $("<div>").addClass("offerDelete");

                $.get("./image/offer?offerId="+e.id, function (t){
                    if (t[0] != undefined) {
                        $("<img>").attr("src", t[0]).appendTo(result);
                    }
                    $("<div id='name'>").text(e.name).appendTo(result);

                });

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


/*
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
}*/


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


/*--------END TRANSACTION-----------*/
function endTransactionSettings(){


    $("#headerUserEndTransactionText").html("");
    $("#headerUserEndTransactionText").append("Transakcje zakończone sukcesem");

    $("#activeEndTransactionPopup").dxPopup({
        title:"Zakończona transakcja",
        /*height: 600,*/
        /*width: 900,*/
        maxWidth:900,
        shadingColor: "#32323280",
        onHiding: function () {
            $("#userEndTransactionList").dxList("instance").option("selectedItems", []);
        }
    }).dxPopup("instance");

    if (matchMedia) {
        var mp = window.matchMedia("(max-width: 768px)");
        mp.addListener(mediaSmallChangePopup);
        mediaSmallChangePopup(mp);
    }


    function mediaSmallChangePopup(mp){
        if(mp.matches){
            $("#activeEndTransactionPopup").dxPopup("instance").option("height",700);

        }else{
            $("#activeEndTransactionPopup").dxPopup("instance").option("height",600);
        }
    }

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
                console.log(e)
                var result = $("<div>").addClass("offer");
                $("<p id='offerText'>").text("Zakończona transakcja:    ").appendTo(result);
                $("<div id='transactionName'>").text(e.offerName).appendTo(result);
                $("<div id='transactionDate'>").text(e.transactionStateMaxStep[0].date).appendTo(result);
                return result;
            },
            onItemClick: function (t){

                showEndTransactionPopup(t.itemData);

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
        paging:{
            pageSize: 5
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

