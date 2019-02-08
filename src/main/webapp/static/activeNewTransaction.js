function activeTransactionSettings() {

    $("#headerUserActiveText").html("");
    $("#headerUserActiveText").append("Aktywne transakcje");

    $("#activeTransactionPopup").dxPopup({
        title:"Aktywna transakcja",
        shadingColor: "#32323280",
        maxWidth:1200,
        onHiding: function () {
            $("#userActiveTransactionList").dxList("instance").option("selectedItems", []);
        }
    }).dxPopup("instance");



    showUserActiveTransactionList();

    if (matchMedia) {
        var ms = window.matchMedia("(max-width: 768px)");
        ms.addListener(mediaSmallChange);
        mediaSmallChange(ms);
    }

    function mediaSmallChange(ms){
        if(ms.matches){
            $("#activeTransactionPopup").dxPopup("instance").option("height",880);
        }else{
            $("#activeTransactionPopup").dxPopup("instance").option("height",700);
        }
    }



}

function showUserActiveTransactionList() {


    $.get('./transaction/active/wait/proposal?userId='+ currentUserId, function (data){


        var activeTransactionList = $("#userActiveTransactionList").dxList({
            dataSource: data,
            height: "100%",
            selectionMode: "sinle",
            scrollingEnabled: true,
            noDataText: "Brak aktywnych transakcji",
            itemTemplate: function(e) {
                var result = $("<div>").addClass("offer");
                $("<p id='transactionText'>").text("Wiadomość dotycząca transakcji:    ").appendTo(result);
                $("<div id='transactionName'>").text(e.offerName).appendTo(result);
                $("<div id='transactionDate'>").text(e.transactionStateMaxStep[0].date).appendTo(result);

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

    $("#anotherActiveOfferPopup").hide();

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


    $("#addActiveAnotherOfferButton").dxButton({
        text: "Wybierz inne oferty",
        onClick: function () {

            $("#anotherActiveOfferPopup").dxPopup({
                title: "Pozostałe oferty użytkownika " + transaction.clientLogin,
                shadingColor: "#32323280",
                maxWidth:800
                /*height: 650,
                width: 800*/
            }).dxPopup("show");

            $.ajax({
                url: './products/owner/another?ownerId='+transaction.clientId,
                type: 'get',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    var anotherOfferList = $("#anotherActiveOfferList").dxList({
                        dataSource: result,
                        height: "100%",
                        selectionMode: "multiple",
                        showSelectionControls: true,
                        scrollingEnabled: true,
                        noDataText: "Użytkownik nie ma aktywnych ofert",
                        itemTemplate: function(e) {
                            var ret = $("<div>").addClass("offerAnotherList");
                            $.get("./image/offer?offerId="+e.id, function (t) {
                                if (t[0] != undefined) {
                                    $("<img>").attr("src", t[0]).appendTo(ret);
                                }
                                $("<div id='name'>").text(e.name).appendTo(ret);
                                $("<div id='AnotherOfferDetailsButtonContainer'>").append($('<div id="showOfferButton">').dxButton({
                                    text: "Pokaż ofertę",
                                    onClick: function () {
                                        offerLinkClick(e.id);
                                        e.jQueryEvent.stopPropagation();
                                    }
                                })).appendTo(ret);
                            });
                            return ret;
                        }
                    }).dxList("instance");
                    $("#anotherActiveOfferContainer").append(anotherOfferList);
                }
            });

            //addAnotherOfferFunction(transaction, userSide);

            $("#acceptActiveAnotherButton").dxButton({
                text: "Akceptuj",
                onClick: function () {
                    var anotherOfferList = $("#anotherActiveOfferList").dxList("instance").option("selectedItems");

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
                        offerJson = JSON.stringify(offerJson);

                        $.ajax({
                            url: './transaction/save/offer/another',
                            type: 'post',
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8',
                            success: function () {
                                refreshOfferGrid("#aOfferGrid");
                                $("#anotherActiveOfferPopup").dxPopup("hide");
                            },
                            data: offerJson
                        });
                       // addAnotherOfferToTransactionStateFunction(offerJson, "#aOfferGrid");
                    });


                }
            });

            $("#cancelActiveAnotherButton").dxButton({
                text:"Anuluj",
                onClick: function () {
                    $("#anotherActiveOfferPopup").dxPopup("hide")
                }
            })


        }
    });


    $("#rejectActiveTransactionButton").dxButton({
        text:"Odrzuć ofertę",
        onClick:function () {
            $.post("./transaction/reject?id="+transaction.id,function () {

                //$("#userActiveTransactionList").dxList('instance').repaint();
                $("#activeTransactionPopup").dxPopup("hide");
                showUserActiveTransactionList();

            })
        }
    });

    //rejectButton("#userActiveTransactionList","#activeTransactionPopup");


    $("#acceptActiveTransactionButton").dxButton({
        text:"Zaakceptuj i zakończ",
        onClick: function () {
            var gridOfferData = $("#aOfferGrid").dxDataGrid("instance").option("dataSource").items();

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
                                    //$(list).dxList('instance').repaint();
                                    $("#activeTransactionPopup").dxPopup("hide");
                                    showUserActiveTransactionList();
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

    //acceptButton("#aOfferGrid","#userActiveTransactionList","#activeTransactionPopup",userSide);


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
                               // $("#userActiveTransactionList").dxList('instance').repaint();
                                $("#activeTransactionPopup").dxPopup("hide");
                                showUserActiveTransactionList();

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
            "showScrollbar": "onHover"
        },
        paging:{
            pageSize: 5
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
                    .on('dxhoverstart',function (e) {
                        if(options.data.offerActive === false) {
                            $("#popoverNoActiveTransactionShow").dxPopover({
                                target: e.target,
                                showEvent: 'dxhoverstart',
                                hideEvent: 'dxhoverend'
                            }).dxPopover("show");

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
                    .on('dxhoverstart',function (e) {
                        if(options.data.offerActive === false) {
                            $("#popoverNoActiveTransaction").dxPopover({
                                target: e.target,
                                showEvent: 'dxhoverstart',
                                hideEvent: 'dxhoverend'
                            }).dxPopover("show");
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
                                        refreshOfferGrid();
                                        $('#anotherActiveOfferList').dxList('instance').repaint();
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
                                        refreshOfferGrid();
                                        $('#anotherActiveOfferList').dxList('instance').repaint();
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
                            refreshOfferGrid();
                            $('#anotherActiveOfferList').dxList('instance').repaint();
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

    if (matchMedia) {
        var ms = window.matchMedia("(max-width: 768px)");
        ms.addListener(mediaSmallChangeGrid);
        mediaSmallChangeGrid(ms);
    }

    function mediaSmallChangeGrid(ms){
        if(ms.matches){
            $("#aOfferGrid").dxDataGrid("instance").option("paging.pageSize",1);
        }else{
            $("#aOfferGrid").dxDataGrid("instance").option("paging.pageSize",4);
        }
    }

}

function refreshOfferGrid() {
    var ds = $("#aOfferGrid").dxDataGrid("getDataSource");
    ds.reload();
    var dataGridInstance = $("#aOfferGrid").dxDataGrid("instance");
    dataGridInstance.clearSelection();

}