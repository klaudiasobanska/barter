
function receiveOfferSettings() {

    $("#headerUserReceiveText").html("");
    $("#headerUserReceiveText").append("Nadesłane propozycje transakcji");

    $("#ReceiveOfferPopup").dxPopup({
        title:"Propozycja transakcji",
        shadingColor: "#32323280",
        maxWidth:1200,
        minHeight:550,
        onHiding: function () {
            $("#userReceiveOfferList").dxList("instance").option("selectedItems", []);
        }
    }).dxPopup("instance");

    $("#userMenuList").dxList('instance');

    if (matchMedia) {
        var ms = window.matchMedia(" (max-width: 768px)");
        ms.addListener(mediaSmallChange);
        mediaSmallChange(ms);
    }

    function mediaSmallChange(ms){
        if(ms.matches){
            $("#ReceiveOfferPopup").dxPopup("instance").option("minHeight",550);
            $("#ReceiveOfferPopup").dxPopup("instance").option("closeOnOutsideClick",true);
        }else{
            $("#ReceiveOfferPopup").dxPopup("instance").option("height",700);
        }
    }




    showUserReceiveOfferList();

}

function showUserReceiveOfferList() {

    $.get('./transaction/new/proposal?ownerId='+ user.id, function (data){
        var receiveOfferList = $("#userReceiveOfferList").dxList({
            dataSource: data,
            height: "100%",
            selectionMode: "sinle",
            scrollingEnabled: true,
            noDataText: "Brak nowych propozycji wymiany",
            itemTemplate: function(e) {
                var result = $("<div>").addClass("offer");
                $("<p id='offerText'>").text("Propozycja transakcji od    ").appendTo(result);
                $("<div id='clientName'>").text(e.clientLogin).appendTo(result);
                $("<div id='transactionDate'>").text(e.transactionStateMaxStep[0].date).appendTo(result);

                return result;
            },
            onItemClick: function (e){
                $.get("./transaction/clear/session", function () {
                    showReceiveOfferPopup(e.itemData);
                });

            }
        }).dxList("instance");
        $("#userReceiveContent").append(receiveOfferList);
    })

}

function showReceiveOfferPopup(transaction) {

    $("#ReceiveOfferPopup").dxPopup({
        contentTemplate: function(container) {
            var scrollView = $("<div id='scrollView'></div>");
            var content = $("<div id='popoverActiveOffer'>" +
            "<p>Ta oferta jest już nieaktywna i nie może być brana pod uwagę w tej transakcji. Usuń ją z proponowanych</p>"+
            "</div>"+
            "<div id='popoverActiveOfferShow'>"+
                "<p>Ta oferta jest już nieaktywna i nie może być brana pod uwagę w tej transakcji. Usuń ją z proponowanych</p>"+
            "</div>"+
            "<div id='rOfferForm'></div>"+
                "<div id='rOfferGrid'></div>"+
                "<div id='addAnotherNewButton'></div>"+
                "<div id='anotherNewPopup'>"+
                "<div id='anotherNewContainer'>"+
                "<div id='anotherNewList'></div>"+
                "</div>"+
                "<div id='acceptAnotherNewButton'></div>"+
                "<div id='cancelAnotherNewButton'></div>"+
                "</div>"+
                "<div class='offerButtonContainer'>"+
                "<div id='sendResponseNewTransactionButton'></div>"+
                "<div id='acceptNewTransactionButton'></div>"+
                "<div id='rejectNewTransactionButton'></div>"+
                "</div>)");
            scrollView.append(content);
            scrollView.dxScrollView({
                height: '100%',
                width: '100%'

            });

            container.append(scrollView);
            return container;
        }
        }).dxPopup("show");

    $("#anotherNewPopup").hide();

    sendAnswerForm(transaction);


    transactionToast();

}




function sendAnswerForm(transaction) {

    var transactionData = {
        messageClient: transaction.transactionState[0].messageClient,
        messageOwner: "",
        clientName: transaction.clientLogin,
        offerName:transaction.offerName,
        date: transaction.transactionState[0].date
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


    $("#addAnotherNewButton").dxButton({
        text: "Wybierz inne oferty",
        onClick: function () {
            $("#anotherNewPopup").dxPopup({
                title: "Pozostałe oferty użytkownika " + transaction.clientLogin,
                shadingColor: "#32323280",
                maxWidth:800
            }).dxPopup("show");



            $.ajax({
                url: './auth/products/owner/another?ownerId='+transaction.clientId,
                type: 'get',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    var anotherOfferList = $("#anotherNewList").dxList({
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
                $("#anotherNewContainer").append(anotherOfferList);
                    //$('#anotherNewList').dxList('instance').reload();
                }

            });

            $("#acceptAnotherNewButton").dxButton({
                text: "Akceptuj",
                onClick: function () {
                    var anotherOfferList = $("#anotherNewList").dxList("instance").option("selectedItems");


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


                        offerJson = JSON.stringify(offerJson);

                        $.ajax({
                            url: './transaction/save/offer/another',
                            type: 'post',
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8',
                            success: function () {
                                refreshROfferGrid();
                                $("#anotherNewPopup").dxPopup("hide");
                            },
                            data: offerJson
                        });

                        //addAnotherOfferToTransactionStateFunction(offerJson, "#rOfferGrid");

                    });


                }
            });

            $("#cancelAnotherNewButton").dxButton({
                text:"Anuluj",
                onClick: function () {
                    $("#anotherNewPopup").dxPopup("hide")
                }
            })



        }
    });


    $("#rejectNewTransactionButton").dxButton({
        text:"Odrzuć ofertę",
        onClick:function () {
            $.post("./transaction/reject?id="+transaction.id,function () {

                //$("#userReceiveOfferList").dxList('instance').repaint();
                $("#ReceiveOfferPopup").dxPopup("hide");
                showUserReceiveOfferList();
                $("#userMenuList").dxList('instance').repaint();
            })
        }
    });


    $("#acceptNewTransactionButton").dxButton({
        text:"Zaakceptuj i zakończ",
        onClick: function () {
            var gridOfferData = $("#rOfferGrid").dxDataGrid("instance").option("dataSource").items();

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
                        data.messageOwner = $("#rOfferForm").dxForm("instance").getEditor('messageOwner').option('value');
                        data.messageClient = $("#rOfferForm").dxForm("instance").getEditor('messageClient').option('value');
                        var id =data.transactionId;
                        data = JSON.stringify(data);


                        $.ajax({
                            url: "./transaction/success/end?id=" + id+"&userSide=owner",
                            type: 'post',
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8',
                            success: function (result) {
                                if (result.errorMsg) {
                                    $(".lastDeletedToast").dxToast("show");
                                }else {
                                    //$("#userReceiveOfferList").dxList('instance').repaint();
                                    $("#ReceiveOfferPopup").dxPopup("hide");
                                    showUserReceiveOfferList();
                                    $("#userMenuList").dxList('instance').repaint();
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
                                //$("#userReceiveOfferList").dxList('instance').repaint();
                                $("#ReceiveOfferPopup").dxPopup("hide");
                                showUserReceiveOfferList();
                                $("#userMenuList").dxList('instance').repaint();

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
            showScrollbar: "onHover"
        },
        paging:{
            pageSize: 2
        },
        pager:{
            visible: true
        },
        columns: [{
            caption: "Nazwa oferty",
            dataField: "offerName"
        },{
            caption: "Kategoria",
            dataField: "categoryName"
        },{
            caption: "Akceptacja kontrahenta",
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
                    .on('dxhoverstart', function (e) {
                        if(options.data.offerActive === false) {
                            $("#popoverActiveOfferShow").dxPopover({
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
                    .on('dxhoverstart', function (e) {
                        if(options.data.offerActive === false) {
                            $("#popoverActiveOffer").dxPopover({
                                target: e.target,
                                showEvent: 'dxhoverstart',
                                hideEvent: 'dxhoverend'
                            }).dxPopover("show");
                        }
                    })
                    .on('dxclick', function () {
                        if(options.data.offerActive === true){
                            if(options.data.sellerAccept === true){
                                $(".acceptOfferTransaction").dxToast({
                                    text:"Oferta jest już zaakceptowana"
                                }).dxToast("show");
                            }else{
                                $.post("./seller/accept/offer?offerId="+options.data.offerId, function (t) {
                                    $(".acceptOfferToast").dxToast("show");
                                    refreshROfferGrid();
                                    $('#anotherNewList').dxList('instance').reload();
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
                            $(".deleteOfferToast").dxToast("show");
                            refreshROfferGrid();
                            $('#anotherNewList').dxList('instance').reload();
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


function refreshROfferGrid() {
    var ds = $("#rOfferGrid").dxDataGrid("getDataSource");
    ds.reload();
    var dataGridInstance = $("#rOfferGrid").dxDataGrid("instance");
    dataGridInstance.clearSelection();

}