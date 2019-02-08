<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Barter</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0,minimum-scale=1, maximum-scale=1" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>

    <%--<link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/18.2.3/css/dx.spa.css" />--%>
    <link rel="stylesheet" type="text/css" href="/static/dx.spa.css" />
    <link rel="stylesheet" type="text/css" href="/static/dx.common.css" />
    <link rel="stylesheet" type="text/css" href="/static/generic.light.custom.css" />


    <%--<link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/18.2.3/css/dx.common.css" />--%>
    <%--<link rel="dx-theme" data-theme="generic.light" href="https://cdn3.devexpress.com/jslib/18.2.3/css/dx.light.css" />--%>

    <script src="/static/dx.all.js"></script>
    <script src="/static/home.js"></script>
    <script src="/static/functions.js"></script>
    <link rel="stylesheet" type="text/css" href="/static/stylesGreen.css" />
    <link rel="stylesheet" type="text/css" href="/static/stylesLogin.css" />
    <link rel="stylesheet" type="text/css" href="/static/stylesProductCard.css" />

</head>
<body class="dx-viewport allBackground allContent" >

    <div class="headerContainer">
        <img id="logo" src="./static/logo.png"></img>
        <div class="searchContent">
            <div id="searchBar"></div>
            <div id="searchCity"></div>
            <div id="categoryTabSelect"></div>
            <div id="searchButton"></div>
        </div>
        <div class="userLoginContent">
            <div id="loginButton"></div>
        </div>
    </div>
    <div class="categoryContainer">
        <div id="categoryTabList"></div>
    </div>

    <div class="latestContent">
        <div id="latestTextContent">
            <p id="latestText">Najnowsze oferty:</p>
            <div id="latestButton"></div>
        </div>
        <div id="latestProductView"></div>

    </div>


        <div class="randomContent">
            <div id="randomTextContent">
                <p id="randomText">Losowe oferty:</p>
                <div id="randomButton"></div>
            </div>
            <div id="randomProductView"></div>

        </div>
    <%--
           <br>
           <div class="bestUserContent">
               &lt;%&ndash;<p id="bestUserText">Najlepiej oceniani użytkownicy:</p>&ndash;%&gt;
               <div class="userContainer"></div>
           </div>
           &lt;%&ndash;<div class="productContent">
               <div class="productContainer"></div>
           </div>&ndash;%&gt;

          &lt;%&ndash; <footer class="footer">
               <hr>
               <p id="footerText">Autorzy: Klaudia Sobańska Daniel Kobylski</p>
           </footer>&ndash;%&gt;
           --%>

           <div id="loginPopup">
               <div id="loginText"></div>
               <div id="loginForm"></div>
               <div id="loginButtonForm"></div>
               <div id="registrationHomeText"></div>
               <a href="./registration" id="registrationLink"></a>
           </div>

</body>
</html>