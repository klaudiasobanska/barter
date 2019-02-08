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

    <link rel="stylesheet" type="text/css" href="/static/dx.spa.css" />
    <link rel="stylesheet" type="text/css" href="/static/dx.common.css" />
    <link rel="stylesheet" type="text/css" href="/static/generic.light.custom.css" />

    <script src="/static/dx.all.js"></script>
    <script src="/static/product.js"></script>
    <script src="/static/functions.js"></script>
    <link rel="stylesheet" type="text/css" href="/static/stylesGreenProduct.css" />
    <link rel="stylesheet" type="text/css" href="/static/stylesLogin.css" />
    <link rel="stylesheet" type="text/css" href="/static/stylesProductCard.css" />


</head>
<body class="dx-viewport allBackground" >

    <div class="headerContainer">
        <img clsss="logo" src="./static/logo.png"></img>
        <div class="userLoginContent">
            <div id="loginButton"></div>
            <%--<div id="userMenuButton"></div>--%>
            <%--<div id="homeButton"></div>--%>
        </div>

    </div>


    <div class="pContent">

        <div class="productGallery">
            <div id="gallery" data-bind="dxGallery: { dataSource: t }"></div>
        </div>

        <div class="oneProductContainer">
            <div id="productDesc"></div>
        </div>
    </div>

    <div class="buttonOfferContainer">
        <div id="transactionButton"></div>
        <div id="addFavButton"></div>
    </div>


    <div class="ownerContainer">
        <img id='imgOwner'>
        <div class="ownerDesc"></div>
    </div>

    <div class="ownerOfferProductContainer">
        <div id="ownerLoginText"></div>
        <div id="ownerOfferListProduct"></div>
    </div>

    <div id="addFavToast"></div>

    <div id="tranPopup">
        <div id="tranForm"></div>
        <div id="clientOfferGrid"></div>
        <div id="sendTranButton"></div>
        <div id="cancelTranButton"></div>
    </div>

    <div id="noProposalOfferToast"></div>
    <div id="addFavErrorToast"></div>
    <div id="transactionExistToast"></div>

    <div id="loginPopup">
        <div id="loginText"></div>
        <div id="loginForm"></div>
        <div id="loginButtonForm"></div>
        <div id="registrationHomeText"></div>
        <a href="./registration" id="registrationLink"></a>
    </div>

</body>
</html>
