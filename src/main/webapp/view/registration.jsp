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
    <script src="./static/barter/registration.js"></script>
    <link rel="stylesheet" type="text/css" href="./static/stylesGreenRegistration.css" />

</head>
<body class="dx-viewport allBackground allContent" >

    <div class="headerContainer"></div>

    <div class="registrationContainer">
        <div id="registrationContent">
            <div id="registrationText"></div>
            <div id="registrationForm"></div>
            <div id="registrationButtonForm"></div>
        </div>
    </div>
    <div id="registrationErrorLoginToast"></div>
    <div id="registrationErrorEmailToast"></div>


</body>
</html>