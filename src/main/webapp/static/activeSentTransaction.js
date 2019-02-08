function activeSentTransactionSettings() {

    $("#headerUserSentActiveText").html("");
    $("#headerUserSentActiveText").append("Aktywne transakcje wysłane");

    $("#activeSentTransactionPopup").dxPopup({
        title:"Wysłana odpowiedź",
        maxWidth:800,
        maxHeight:660,
        shadingColor: "#32323280",
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
            scrollingEnabled: true,
            noDataText: "Brak aktywnych transakcji",
            itemTemplate: function(e) {
                var result = $("<div>").addClass("offer");
                $("<p id='transactionText'>").text("Odpowiedź do transakcji:    ").appendTo(result);
                $("<div id='transactionName'>").text(e.offerName).appendTo(result);
                $("<div id='transactionDate'>").text(e.transactionStateMaxStep[0].date).appendTo(result);
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
        paging:{
            pageSize: 4
        },
        showBorders: true,
        hoverStateEnabled: true,
        scrolling: {
            "showScrollbar": "onHover"
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
                            $("#popoverNoActiveSentShow").dxPopover({
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
        }]

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
        ms.addListener(mediaSmallChange);
        mediaSmallChange(ms);
    }


    function mediaSmallChange(ms) {
        if (ms.matches) {
            $("#aSentActiveOfferGrid").dxDataGrid("instance").option("page.pageSize",2);
        }else{
            $("#aSentActiveOfferGrid").dxDataGrid("instance").option("page.pageSize",4);

        }
    }

}