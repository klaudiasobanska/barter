<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Barter</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>

    <link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/18.2.3/css/dx.spa.css" />
    <link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/18.2.3/css/dx.common.css" />
    <link rel="dx-theme" data-theme="generic.light" href="https://cdn3.devexpress.com/jslib/18.2.3/css/dx.light.css" />

    <script src="https://cdn3.devexpress.com/jslib/18.2.3/js/dx.all.js"></script>
    <script src="/static/user.js"></script>
    <link rel="stylesheet" type="text/css" href="/static/styles.css" />

</head>
<body class="dx-viewport allBackground allContent" >

    <div class="headerUser">
        <div id="logoutButton"></div>
        <div id="homeButtonUserContent"></div>
    </div>

    <%--<div id="drawerMenuUserButton"></div>
    <div id="drawerMenuUser"></div>--%>



    <div class="userMenuContainer">
        <div id="userMenuList"></div>
    </div>
    <div class="userInformationContainer">
        <div id="userDataContent">
            <div id="headerUserDataText"></div>
            <div id="userDataForm"></div>
            <div id="userDataFormButton"></div>
            <div id="imgUserContainer">
                <img id="imgUser" />
            </div>
            <div id="userImgUploaderContainer">
                <form  enctype="multipart/form-data" id="xx" name="ff" method="post">
                    <div class="fitem">
                        <div id="userImgUploader" name="file">
                        </div>
                    </div>
                </form>
                <%--<div id="submitImageButton"></div>--%>
            </div>
        </div>
        <div id="userPasswordContent">
            <div id="headerUserPasswordText"></div>
            <div id="userPasswordForm"></div>
            <div id="userPasswordButton"></div>
        </div>
        <div id="userOffersContent">
            <div id="headerUserOffersText"></div>
            <div class="userOffersButtonMenu">
                <div id="addOfferButton"></div>
                <div id="editOfferButton"></div>
                <div id="archiveOfferButton"></div>
            </div>
            <div class="userOfferListContainer">
                <div id="userOfferList"></div>
            </div>
        </div>
        <div id="addOrEditOfferPopup">
            <div id="addOfferForm"></div>
            <div id="productImgUploaderContainer">
                <form  enctype="multipart/form-data" id="productUploaderForm" name="puf" method="post">
                    <div id="productImgUploader" name="file"></div>
                </form>
            </div>
            <div id="saveAddButton"></div>
            <div id="cancelAddButton"></div>
        </div>
        <div id="userFavContent">
            <div id="headerUserFavText"></div>
            <div class="userFavButtonMenu">
                <div id="deleteFavButton"></div>
            </div>
            <div class="userFavListContainer">
                <div id="userFavList"></div>
            </div>
        </div>

        <%--NADESLANE--%>
        <div id="userReceivedContent">
            <div id="headerUserReceiveText"></div>
            <div id="userReceiveOfferList"></div>
            <div id="ReceiveOfferPopup">
                <div id="popoverActiveOffer">
                    <p>Ta oferta jest już nieaktywna i nie może być brana pod uwagę w tej transakcji. Usuń ją z proponowanych</p>
                </div>
                <div id="popoverActiveOfferShow">
                    <p>Ta oferta jest już nieaktywna i nie może być brana pod uwagę w tej transakcji. Usuń ją z proponowanych</p>
                </div>
                <div id="rOfferForm"></div>
                <div id="rOfferGrid"></div>
                <div class="addAnotherOfferButton"></div>
                <div class="anotherOfferPopup">
                    <div class="anotherOfferContainer">
                        <div class="anotherOfferList"></div>
                    </div>
                    <div class="acceptAnotherButton"></div>
                    <div class="cancelAnotherButton"></div>
                </div>
                <div class="offerButtonContainer">
                    <div id="sendResponseNewTransactionButton"></div>
                    <div class="acceptTransactionButton"></div>
                    <div class="rejectTransactionButton"></div>
                    <%--<div id="cancelROfferButton"></div>--%>
                </div>
                <div class="lastDeletedToast"></div>
                <div class="acceptOfferToast"></div>
                <div class="deleteOfferToast"></div>
                <div class="acceptSendOfferToast"></div>
                <div class="acceptAllSendOfferToast"></div>
                <div class="acceptEndOfferToast"></div>
            </div>
        </div>

        <%--WYSLANE--%>
        <div id="userSendTransactionContent">
            <div id="headerUserSendText"></div>
            <div id="userSendOfferList"></div>
            <div id="sendOfferPopup">
                <div id="sOfferForm"></div>
                <div id="sOfferGrid"></div>
                <div class="offerButtonContainer">
                    <div id="cancelSendOfferButton"></div>
                </div>
            </div>
        </div>

        <%--AKTYWNE--%>
        <div id="userActiveTransactionContent">
            <div id="headerUserActiveText"></div>
            <div id="userActiveTransactionList"></div>
            <div id="activeTransactionPopup">
                <div id="popoverNoActiveTransaction">
                    <p>Ta oferta jest już nieaktywna i nie może być brana pod uwagę w tej transakcji. Usuń ją z proponowanych</p>
                </div>
                <div id="popoverNoActiveTransactionShow">
                    <p>Ta oferta jest już nieaktywna i nie może być brana pod uwagę w tej transakcji. Usuń ją z proponowanych</p>
                </div>
                <div id="aTransactionForm"></div>
                <div id="aOfferGrid"></div>
                <div class="addAnotherOfferButton"></div>
                <div class="anotherOfferPopup">
                    <div class="anotherOfferContainer">
                        <div class="anotherOfferList"></div>
                    </div>
                    <div class="acceptAnotherButton"></div>
                    <div class="cancelAnotherButton"></div>
                </div>
                <div class="offerButtonContainer">
                    <div id="sendResponseActiveTransactionButton"></div>
                    <div class="acceptTransactionButton"></div>
                    <div class="rejectTransactionButton"></div>
                </div>
                <div class="lastDeletedToast"></div>
                <div class="acceptOfferToast"></div>
                <div class="deleteOfferToast"></div>
                <div class="acceptSendOfferToast"></div>
                <div class="acceptAllSendOfferToast"></div>
                <div class="acceptEndOfferToast"></div>
            </div>
        </div>

        <%--AKTYWNE WYSLANE--%>
        <div id="userSentActiveTransactionContent">
            <div id="headerUserSentActiveText"></div>
            <div id="userSentActiveTransactionList"></div>
            <div id="activeSentTransactionPopup">
                <div id="aSentActiveTransactionForm"></div>
                <div id="aSentActiveOfferGrid"></div>
            </div>
        </div>

        <%--TRANSAKCJE ZAKONCZONE SUKCESEM--%>

        <div id="userEndTransactionContent">
            <div id="headerUserEndTransactionText"></div>
            <div id="userEndTransactionList"></div>
            <div id="activeEndTransactionPopup">
                <div id="aEndTransactionForm"></div>
                <div id="aEndTransactionOfferGrid"></div>
            </div>
        </div>

        <%--ZARCHIWIZOWANE--%>
        <div id="userDeleteContent">
            <div id="headerUserDeleteText"></div>
            <div class="userDeletedOffersButtonMenu">
                <div id="restoreOfferButton"></div>
                <div id="deleteOfferButton"></div>
            </div>
            <div class="userDeletedOfferListContainer">
                <div id="userDeletedOfferList"></div>
            </div>
        </div>



        <div id="noSelectedToast"></div>
        <div id="deleteUserProductToast"></div>
        <div id="deleteFavToast"></div>
        <div id="archiveUserProductToast"></div>
        <div id="restoreUserProductToast"></div>
        <div id="updateUserDataToast"></div>
        <div id="noProposalOfferToast"></div>
    </div>



</body>
</html>