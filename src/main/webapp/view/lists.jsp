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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"></script>
    <script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>


    <link rel="stylesheet" type="text/css" href="./static/dx.spa.css" />
    <link rel="stylesheet" type="text/css" href="./static/dx.common.css" />
    <link rel="stylesheet" type="text/css" href="./static/generic.light.custom.css" />

    <script src="./static/dx.all.js"></script>
    <script src="./static/barter/lists.js"></script>
    <script src="./static/barter/functions.js"></script>
    <%--<script src="/static/home.js"></script>--%>
    <link rel="stylesheet" type="text/css" href="./static/stylesGreenList.css" />
    <link rel="stylesheet" type="text/css" href="./static/stylesLogin.css" />
    <link rel="stylesheet" type="text/css" href="./static/stylesProductCard.css" />

</head>
<body class="dx-viewport allBackground allContent" >

    <div class="headerContainer">
        <img clsss="logo" src="./static/logo.png" onclick="goHome()" style="cursor: pointer">
        <div class="searchContent">
            <div id="searchBarL"></div>
            <div id="searchCategoryL"></div>
            <div id="searchCityL"></div>
            <div id="searchButtonL"></div>
        </div>
        <div class="userLoginContent">
            <div id="loginButton"></div>
            <div id="loginMenu"></div>
            <%--<div id="userMenuButton"></div>--%>
            <%--<div id="homeButton"></div>--%>
        </div>

    </div>

    <div class="listContainer">
        <div id="productList"></div>
    </div>

    <div id="loginPopup">
        <div id="loginText"></div>
        <div id="badText">
        <div id="loginForm"></div>
        <div id="loginButtonForm"></div>
        <div id="registrationHomeText"></div>
        <a href="./registration" id="registrationLink"></a>
    </div>

</body>
</html>