var product;

$.get('./products/current', function (data) {

    product = data;
});

$(function () {

    $("#gallery").dxGallery({
        dataSource: product.image,
        loop: true,
        slideshowDelay: 2000,
        showNavButtons: true,
        showIndicator: true
    });

    info();
    getOwnerData();

    $("#transactionButton").dxButton({
        text: "Rozpocznij tranzakcję",
        icon: "email",
        onClick: function () {
            transactionButton();
        }
    });

    $("#addFavButton").dxButton({
        text: "Dodaj do Ulubionych",
        icon: "favorites",
        onClick: function () {
            addToFav();
        }
    })

});

function dateFormat(d) {

    var date = new Date(d);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var day = date.getDate() ;
    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (day < 10 ? ('0' + day) : day);
}

function getDate(dateV) {
    var cDate = dateV;
    if (cDate!=null){
        return cDate = dateFormat(cDate);
    }else{
        return cDate = "";
    }

}

function info() {

    $("#productDesc").empty();

    var temp =
        '<div id="productName">'+ product.name  + '</div>' +
        '<div id="productDate">' + getDate(product.creationDate) + '</div>' + '<p id="creationDateText">Dodano:</p>'+
        '<hr id="hr1">'+
        '<div id="productDescription">' + product.description + '</div>' +
        '<hr id="hr2">'+
        '<div id="productCategory">' + product.categoryName + '</div>' +
        '</div>' ;


    $("#productDesc").append(temp);

}

function getOwnerData() {

    var ownerData = new DevExpress.data.DataSource({

        load: function () {

            var d = $.Deferred();
            $.getJSON('./users/product', {
                    ownerId : product.ownerId ? product.ownerId : null
                }
            ).done(function (result) {
                d.resolve(result);
            });

            return d.promise();
        }
    });

    ownerData.load().done(function (result) {
        console.log(result[0].address);
        $("#ownerDesc").empty();

        var temp =
            '<hr id="hr3">'+
            '<div id="imgOwner"></div>'+
            '<div id="ownerLogin">'+ result[0].login  + '</div>' +
            '<div class="loginInfo">'+
                '<p id="loginText">Adres email:  </p>'+'<div id="ownerEmail">' + result[0].email +
            '</div>'+
            /*'<div class="addressInfo">'+
                '<p id="loginText">Adres email:  </p>'+'<div id="ownerAddress">' + result[0].address + '</div>' +
            '</div>'+*/
            '<div id="ownerRating">' + result[0].rating + '</div>' +
            '</div>' ;


        $("#ownerDesc").append(temp);

    });

}

function transactionButton(){

}