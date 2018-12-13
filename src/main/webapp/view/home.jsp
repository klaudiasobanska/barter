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
    <script src="/static/home.js"></script>
    <link rel="stylesheet" type="text/css" href="/static/styles.css" />

</head>
<body class="dx-viewport allBackground allContent" >


    <div class="userLoginContent">
            <div id="loginButton"></div>
            <div id="userMenuButton"></div>
        </div>
    <div id="headerContainer">
        <div class="searchContent">
            <div id="searchBar"></div>
            <div id="searchButton"></div>
            <div id="searchCategory"></div>
            <div id="searchCity"></div>

        </div>

    </div>

    <div class="latestContent">
        <p id="latestText">Najnowsze oferty:</p>
        <div id="latestProductView"></div>
        <div id="latestButton"></div>
    </div>


    <div class="randomContent">
        <p id="randomText">Losowe oferty:</p>
        <div id="randomProductView"></div>
        <div id="randomButton"></div>
    </div>


    <div class="bestUserContent">
        <p id="bestUserText">Najlepiej oceniani użytkownicy:</p>
        <div class="userContainer"></div>
    </div>
    <%--<div class="productContent">
        <div class="productContainer"></div>
    </div>--%>

   <%-- <footer class="footer">
        <hr>
        <p id="footerText">Autorzy: Klaudia Sobańska Daniel Kobylski</p>
    </footer>--%>

    <div id="loginPopup">
        <div id="loginText"></div>
        <div id="loginForm"></div>
        <div id="loginButtonForm"></div>
        <div id="registrationHomeText"></div>
        <a href="./registration" id="registrationLink"></a>
    </div>

</body>
</html>