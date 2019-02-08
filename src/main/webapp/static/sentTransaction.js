
function sendOfferSettings(){
    $("#headerUserSendText").html("");
    $("#headerUserSendText").append("Wysłane propozycje wymiany");

    $("#sendOfferPopup").dxPopup({
        title:"Propozycja transakcji",
        maxWidth:800,
        shadingColor: "#32323280",
        onHiding: function () {
            $("#userSendOfferList").dxList("instance").option("selectedItems", []);
        }
    }).dxPopup("instance");

    if (matchMedia) {
        var ms = window.matchMedia("(max-width: 768px)");
        ms.addListener(mediaSmallChange);
        mediaSmallChange(ms);
    }


    function mediaSmallChange(ms) {
        if (ms.matches) {
            $("#sendOfferPopup").dxPopup("instance").option("height",600);
        }else{
            $("#sendOfferPopup").dxPopup("instance").option("height",500);

        }
    }

    showUserSendOfferList();

}

function showUserSendOfferList() {

    $.get('./transaction/send/proposal?userId='+ currentUserId, function (data){
        var receiveOfferList = $("#userSendOfferList").dxList({
            dataSource: data,
            height: "100%",
            selectionMode: "sinle",
            scrollingEnabled: true,
            noDataText: "Brak nowo wysłanych propozycji wymiany",
            itemTemplate: function(e) {
                var result = $("<div>").addClass("offer");
                $("<p id='offerText'>").text("Propozycja transakcji wysłana do    ").appendTo(result);
                $("<div id='ownerName'>").text(e.ownerLogin).appendTo(result);
                $("<div id='transactionDate'>").text(e.transactionStateMaxStep[0].date).appendTo(result);
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


    var transaction = {
        ownerName: transactionData.ownerLogin,
        offerName: transactionData.offerName,
        messageClient: transactionData.transactionStateMaxStep[0].messageClient,
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
                showUserSendOfferList();
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

    if (matchMedia) {
        var ms = window.matchMedia("(max-width: 768px)");
        ms.addListener(mediaSmallChangeGrid);
        mediaSmallChangeGrid(ms);
    }


    function mediaSmallChangeGrid(ms) {
        if (ms.matches) {
            $("#sOfferGrid").dxDataGrid("instance").option("page.pageSize",2);
        }else{
            $("#sOfferGrid").dxDataGrid("instance").option("page.pageSize",4);

        }
    }

}
