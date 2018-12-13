var currentUser;
var currentUserId;

$.get('./users/find/1', function (data) {
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
           text: "Nadesłane"
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
   },{
       key: "Oceny",
       items: [{
           id: 9,
           text: "Moje oceny"
       },{
           id: 10,
           text: "Dodaj nową ocenę"
       }]
   }
   ];



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
                    userDataSettings();
                    break;

                case 2:
                    $("#userDataContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userPasswordContent").show();
                    userPasswordSettings();
                    break;
                case 3:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userFavContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userOffersContent").show();
                    userOffersSettings();
                    break;
                case 4:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userDeleteContent").hide();
                    $("#userFavContent").show();
                    userFavSettings();
                    break;
                case 5:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userDeleteContent").hide();
                    break;
                case 6:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userDeleteContent").hide();
                    break;
                case 7:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
                    $("#userDeleteContent").hide();
                    break;
                case 8:
                    $("#userDataContent").hide();
                    $("#userPasswordContent").hide();
                    $("#userOffersContent").hide();
                    $("#userFavContent").hide();
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


    $.get('./products/owner?ownerId='+ currentUserId +"&active=" +true, function (data){
    var offerList = $("#userOfferList").dxList({
        dataSource: data,
        showSelectionControls: true,
        selectionMode: "sinle",
        height: "100%",
        noDataText: "Brak aktywnych ofert",
        scrollingEnabled: false,
        selectionMode: "single",
        itemTemplate: function(e, index) {
            var result = $("<div>").addClass("offer");
            $("<img>").attr("src", e.img).appendTo(result);
            $("<div id='name'>").text(e.name).appendTo(result);
            $("<p id='creationDateText'>").text("Data utworzenia: ").appendTo(result);
            $("<div id='creationDate'>").text(e.creationDate).appendTo(result);

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

    var dataList = $("#userOfferList").dxList("instance");

    var newOffer = {
        name: "",
        category: "",
        city: "",
        desc: "",
        /*ownerId: currentUser;*/
        creationDate: ""
    };

    if (edit == true) {
        newOffer.name = dataList.option("selectedItems")[0].name;
        newOffer.category = dataList.option("selectedItems")[0].categoryId;
        newOffer.desc = dataList.option("selectedItems")[0].description;

    } else $("#addOfferForm").val("");



    $("#addOfferForm").dxForm({
        formData: newOffer,
        items:[{
            dataField:"name",
            label: {
                text: "Nazwa oferty"
            }
        },{
            dataField: "category",
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
            dataField: "city",
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
            dataField: "desc",
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
        labelText: "",
        accept: "image/*",
        uploadMode: "useButtons",
        uploadUrl:"",
        maxFileSize: 5000000,
        invalidMaxFileSizeMessage: "Plik zbyt duży",
        readyToUploadMessage:"Gotowy do zapisu",
        uploadButtonText: "Zapisz zdjęcia",
        uploadedMessage:"Zapisano",
        uploadFailedMessage: "Wystąpił błąd"
    });

    $("#saveAddButton").dxButton({
        text:"Zapisz",
        focusStateEnabled: false,
        onClick: function () {

            var f = $("#addOfferForm").dxForm('instance');

            var newName = f.getEditor('name').option('value');
            var newCategory = f.getEditor('category').option('value');
            var newCity = f.getEditor('city').option('value');
            var newDesc = f.getEditor('desc').option('value');
            var newCity = f.getEditor('city').option('value');
            var newCreationDate = getDate(new Date());



            newOffer.name = newName;
            newOffer.category = newCategory;
            newOffer.city = newCity;
            newOffer.desc = newDesc;
            newOffer.city = newCity;
            newOffer.creationDate = newCreationDate;


            newOffer = JSON.stringify(newOffer);

            if(edit === true){
                $.post("/products/update?id="+$("#userOfferList").dxList("instance").option("selectedItems")[0].id+"&name="+newName+
                "&categoryId="+newCategory+"&description="+newDesc, function (result) {
                    $("#addOfferPopup").dxPopup("hide");
                    showOffersList();
                })
            }else {

                $.ajax({
                    url: '',
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (result) {
                        if (result.errorMsg) {
                            console.log("error")
                        } else {
                            $("#addOfferPopup").dxPopup("hide");
                            showOffersList();
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
        showSelectionControls: true,
        selectionMode: "sinle",
        scrollingEnabled: false,
        selectionMode: "single",
        noDataText: "Brak ulubionych ofert",
        itemTemplate: function(e, index) {
            var result = $("<div>").addClass("offer");
            $("<img>").attr("src", e.img).appendTo(result);
            $("<div id='name'>").text(e.name).appendTo(result);
            $("<p id='creationDateText'>").text("Data utworzenia: ").appendTo(result);
            $("<div id='creationDate'>").text(e.creationDate).appendTo(result);

            return result;
        },
        onItemClick: function (data) {
            location.href = './product?productId='+data.itemData.id;
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
                    //refreshFavList();
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
    ds.reload();

}

function showDeletedOfferList() {

    $.get('./products/owner?ownerId='+ currentUserId +"&active=" +false, function (data){
        var offerList = $("#userDeletedOfferList").dxList({
            dataSource: data,
            height: "100%",
            showSelectionControls: true,
            selectionMode: "sinle",
            scrollingEnabled: false,
            noDataText: "Brak zarchiwizowanych ofert",
            itemTemplate: function(e, index) {
                var result = $("<div>").addClass("offer");
                $("<img>").attr("src", e.img).appendTo(result);
                $("<div id='name'>").text(e.name).appendTo(result);
                $("<p id='creationDateText'>").text("Data utworzenia: ").appendTo(result);
                $("<div id='creationDate'>").text(e.creationDate).appendTo(result);

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


