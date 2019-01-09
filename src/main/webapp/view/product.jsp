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
    <script src="/static/product.js"></script>
    <link rel="stylesheet" type="text/css" href="/static/styles.css" />

</head>
<body class="dx-viewport allBackground" >


<div class="userLoginContent">
    <div id="loginButtonProduct"></div>
    <div id="userMenuButtonProduct"></div>
    <div id="homeButtonProduct"></div>
</div>
    <div class="header">

    </div>

    <div class="pContent">
        <div class="productGallery">
            <div data-bind="dxGallery:{dataSource: dSource}" <%--id="gallery"--%>></div>
        </div>
        <div class="oneProductContainer">
            <div id="productDesc"></div>
        </div>
    </div>


    <div class="ownerContainer">
        <div id="transactionButton"></div>
        <div id="addFavButton"></div>
        <hr id="hr3">
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

</body>
</html>
