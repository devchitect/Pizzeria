"use strict";

let app = angular.module('myApp',["ngRoute","ngStorage"]);

app.config(function ($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl : "html/home.html",
            controller : "homeController"
        })
        .when("/sign-up",{
            templateUrl: "html/sign-up.html",

        })
        .when("/menu",{
            templateUrl: "html/menu.html",
            controller: "menuController"
        })
        .when("/cart",{
            templateUrl: "html/cart.html",
            controller: "cartController"
        })
        .when("/check-out",{
            templateUrl: "html/check-out.html",
            controller: "checkoutController"
        })
        .when("/order-complete",{
            templateUrl: "html/order-complete.html",
            controller: "finishOrderController"
        })
        .when("/promotion",{
            templateUrl: "html/promotion.html",
            controller:"promoController"
        })
        .when("/about",{
            templateUrl: "html/about.html",
        })
        .when("/policy",{
            templateUrl: "html/policy.html",
            controller: "policyController"
        })
        .when("/contact",{
            templateUrl: "html/contact.html",
        })
        .when("/stores",{
            templateUrl: "html/stores.html",
        })
        .when("/customer-review",{
            templateUrl: "html/customer-review.html",
        })


})
/*my-app root*/
app.run(function ($rootScope, $interval, $sessionStorage, $location, $anchorScroll){

    $rootScope.updateInfo = function(){
            $rootScope.name = nameData;
            $rootScope.birth = birthData;
            $rootScope.gender = genderData;
            $rootScope.phone = phoneData;
            $rootScope.address = addressData;
            $rootScope.email = emailData;
    }
    $rootScope.updateInfo()
    $rootScope.points = 999999999;


    if ($sessionStorage.OrderList === undefined) {
        $sessionStorage.OrderList = [];
    }
    $rootScope.cartList = $sessionStorage.OrderList;

    $rootScope.shippingCost = 3;
    $rootScope.taxRate = 0.08;
    $rootScope.discount = 0;

    $rootScope.updateCart = function () {
        $rootScope.quantity = 0;
        $rootScope.totalCartPrice = 0;
        for (let i = 0; i < $sessionStorage.OrderList.length; i++){
            $rootScope.totalCartPrice += $sessionStorage.OrderList[i].amount * $sessionStorage.OrderList[i].price;
            $rootScope.quantity += $sessionStorage.OrderList[i].amount;
        }
        $rootScope.taxCost = $rootScope.totalCartPrice * $rootScope.taxRate;
        $rootScope.totalPriceAfterward = $rootScope.totalCartPrice + $rootScope.shippingCost + $rootScope.taxCost - $rootScope.discount;
        $rootScope.cartList = $sessionStorage.OrderList;
    }
    $rootScope.updateCart()

    $rootScope.resetCart = function (){
        $sessionStorage.OrderList = [];
    }

    $rootScope.goTop = function () {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
    }

    $rootScope.gotoAnchor = function(anchor) {
            // set the location.hash to the id of the element you wish to scroll to.
            //$location.hash(anchor); not necessary
            // call $anchorScroll()
            $anchorScroll(anchor);
    };

    window.onscroll = function(){scrollFunction()};
    function scrollFunction() {
        if (document.body.scrollTop > 340 || document.documentElement.scrollTop > 340) {
            document.querySelector('.goTopBtn').style.display = "flex";
        } else {
            document.querySelector('.goTopBtn').style.display = "none";
            }

    }

    $rootScope.activeCustomer = function(){
        $rootScope.updateInfo();
        if(signIn_flag === '1'){
            $rootScope.resetCart();
            $rootScope.updateCart();
        }
        $rootScope.goTop();
    }

})

/*Home Controller*/
app.controller('homeController', function ($scope){

    const slide = document.querySelectorAll('.slide'),
        dot = document.querySelectorAll('.dot');

    let counter = 1;

     $scope.slidefun = (n) => {
         //Hide all slide
        let i;
        for(i = 0;i<slide.length;i++){
            slide[i].style.display = "none";
        }
        for(i = 0;i<dot.length;i++) {
            dot[i].className = dot[i].className.replace(' active', '');
        }

        // display the main slide
        if(n > slide.length){
            counter = 1;
        }
        if(n < 1){
            counter = slide.length;
        }
        slide[counter - 1].style.display = "block";
        dot[counter - 1].className += " active";
    }

    $scope.slidefun(counter);

    $scope.autoSlide = () => {
        counter += 1;
        $scope.slidefun(counter);
    }
     setInterval($scope.autoSlide, 10000);

// Next and Prev
    $scope.plusSlides = (n) => {
        counter += n;
        $scope.slidefun(counter);
    }
     $scope.currentSlide = (n) => {
        counter = n;
        $scope.slidefun(counter);
    }


    /*Reviews */
    class review{
        constructor(fullname,img,id,description) {
            this.fullname = fullname;
            this.img = img;
            this.id = id;
            this.description = description;
        }
    }

    $scope.reviews = [
        new review("Lily Jones","images/clients/customer.jpg",1,"\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Cras cursus augue id quam rhoncus tincidunt. Duis mauris odio. " +
            "Nullam sed bibendum turpis. Maecenas in lobortis sapien. Nulla sed magna feugiat, malesuada lectus nec, laoreet elit. "),

        new review("Jack Samuel",'images/clients/customer5.jpg',2,"\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Cras cursus augue id quam rhoncus tincidunt. Duis mauris odio, vestibulum ac maximus a, blandit sed ex. " +
            "Nullam sed bibendum turpis. Maecenas in lobortis sapien. Nulla sed magna feugiat, malesuada lectus nec, laoreet elit. " +
            "Phaselluse eu dictum lorem ultrices. Aenean massa justo, placerat cursus nulla. "),

        new review("Vivian",'images/clients/customer3.jpg',3,"\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Nullam sed bibendum turpis. Maecenas in lobortis sapien. Nulla sed magna feugiat, malesuada lectus nec, laoreet elit. " +
            "Phaselluse eu dictum lorem ultrices. Aenean massa justo, placerat cursus nulla. "),

        new review("John Doe",'images/clients/customer1.jpg',4,"\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Nullam sed bibendum turpis. Maecenas in lobortis sapien. Nulla sed magna feugiat, malesuada lectus nec, laoreet elit. " +
            "Phaselluse eu dictum lorem ultrices. Aenean massa justo, placerat cursus nulla. "),

        new review("John Doe",'images/clients/customer2.jpg',5,"\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Nullam sed bibendum turpis. Maecenas in lobortis sapien. Nulla sed magna feugiat, malesuada lectus nec, laoreet elit. " +
            "Phaselluse eu dictum lorem ultrices. Aenean massa justo, placerat cursus nulla. "),

        new review("John Doe",'images/clients/customer4.jpg',6,"\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Nullam sed bibendum turpis. Maecenas in lobortis sapien. Nulla sed magna feugiat, malesuada lectus nec, laoreet elit. " +
            "Phaselluse eu dictum lorem ultrices. Aenean massa justo, placerat cursus nulla. ")

    ]

    $scope.reviewCount = 0;

    $scope.slide = function (x){
        document.querySelector(".child-box").style.opacity = '0.5';
        document.querySelector(".child-box").style.transform = 'translate(5%, 0)' ;

        setTimeout(() => {
            document.querySelector(".child-box").style.opacity = '1';
            document.querySelector(".child-box").style.transform = 'translate(0)';
            },300);

        $scope.reviewCount = $scope.reviewCount + x;

        if($scope.reviewCount === $scope.reviews.length){
            $scope.reviewCount = 0;
        }

        if($scope.reviewCount === -1){
            $scope.reviewCount = $scope.reviews.length - 1;
        }



    }
})

//Promotions Controller
app.controller("promoController", function ($scope){
    class promotion{
        constructor(img, code, content, dueTime) {
            this.img = img;
            this.code = code;
            this.content = content;
            this.dueTime = dueTime;
        }
    }

    $scope.promotions = [
        new promotion('images/banner&offer/promotion1.png','SALEOFF30','Sale off 30% for all Casanova member','Today'),
        new promotion('images/banner&offer/promotion2.png','SALEOFF30','Sale off 30% for all Casanova member','This Month'),
        new promotion('images/banner&offer/promotion3.png','SALEOFF30','Sale off 30% for all Casanova member','This Weekend'),
        new promotion('images/banner&offer/promotion4.png','SALEOFF30','Sale off 30% for all Casanova member','Today')
    ]


})

/*Store Controller*/
app.controller("storesController",function ($scope){
    /*Display Map*/
    const mapbox = document.querySelector(".map-box");
    const map = document.createElement("iframe");

    map.src = "https://www.google.com/maps/d/u/0/embed?mid=1wFueh0M7Yocw3lZorvX3ebPmDJxW8-E&ehbc=2E312F";
    map.className = "iframe-map";
    mapbox.appendChild(map);

    /*Dependent Dropdown*/
    let country = document.querySelector("#country")
    let city = document.querySelector("#city")
    let district = document.querySelector("#district")

    let currCountry, currCity, currDistrict;
    $scope.currCountry = 'blah blah';
    $scope.currCity = 'blah blah';
    $scope.currDistrict = 'blah blah';

    let locations = {
        "Viet Nam" : {
            "Ha Noi" : ["Dong Da", "My Dinh"],
            "Ha Long":["Bai Chay"],
            "Hai Phong":["Ngo Quyen"],
            "Thanh Hoa":["Ba Dinh"],
            "Da Nang": ["Lien Chieu"],
            "Nghe An":["Truong Thi"],
            "Nha Trang":["Phuoc Hai"],
            "Cao Lanh":["Phuong 1"],
            "Ho Chi Minh" : ["Tan Binh"]

        },
        "Singapore" :{
        } ,
        "China" :{
            "Suzhou":[],
            "Tianjin":[],
        },
        "Malaysia":{
            "Kuala Lumpur":[],
        },
        "Korean":{
            "Icheon":[],
        },
        "Thailand":{
            "Bangkok":[],
        } ,
    }
    for(let co in locations) {
        country.options[country.options.length] = new Option(co)
    }

    country.onchange = () => {
        district.value = "";
        district.style.display = "none";
        city.length = 1; /* Take Cities of 1 (Selected) Country Value */
        if(Object.keys(locations[country.value]).length > 0) {
            city.style.display = "inline";
        }else {
                district.style.display = "none";
                city.style.display = "none";
        }

        for(let ci in locations[country.value]){

            city.options[city.options.length] = new Option(ci)
        }
        currCountry = country.value;
        currCity = "";
        currDistrict = "";
    }

    city.onchange = () => {
        district.length = 1; /* Take Districts of 1 (Selected) City Value */
        if(locations[country.value][city.value].length > 0){
            district.style.display = "inline";
        }else if(Object.keys(locations[country.value]).length > 0) {
            district.style.display = "none";
        }
        else{
            district.style.display = "none";
        }
        for(let dt = 0; dt < locations[country.value][city.value].length; dt++){
            district.options[district.options.length] = new Option(locations[country.value][city.value][dt])
        }
        currCity = city.value;
    }
    district.onchange = () => {
        currDistrict = district.value;
    }

     $scope.storesFilter = function(){
         $scope.currCountry = currCountry;
         $scope.currCity = currCity;
         $scope.currDistrict = currDistrict;
     }
})

app.controller("storesData", function($scope){
    class store {
        constructor(name,country,city,district,street,storePhone) {
            this.name = name;
            this.country = country;
            this.city = city;
            this.district = district;
            this.street = street;
            this.storePhone = storePhone;
            this.timeopen = "09:00 - 22:00";
        }
    }

    $scope.stores = [
        new store("Casanova Aptech","Viet Nam.","Ha Noi,","My Dinh,","8 Ton That Thuyet,","0123456789"),
        new store("Casanova Dong Da","Viet Nam.","Ha Noi,","Dong Da,","Ho Dac Di,","0123456789"),
        new store("Casanova Lach Tray","Viet Nam.","Hai Phong,","Ngo Quyen,","Lach Tray,","0123456789"),
        new store("Casanova Vuon Dao","Viet Nam.","Quang Ninh,","Ha Long,","Vuon Dao,","0123456789"),
        new store("Casanova LHP","Viet Nam.","Nha Trang,","Phuoc Hai,","Le Hong Phong,","0123456789"),
        new store("Casanova NT","Viet Nam.","Thanh Hoa,","Ba Dinh,","Nguyen Trai,","0123456789"),
        new store("Casanova LHP","Viet Nam.","Nghe An,","Truong Thi,","Le Hong Phong,","0123456789"),
        new store("Casanova TDT","Viet Nam.","Da Nang,","Lien Chieu,","Ton Duc Thang,","0123456789"),
        new store("Casanova Dong Den","Viet Nam.","HCM,","Tan Binh,","Dong Den,","0123456789"),
        new store("Casanova Tran Phu","Viet Nam.","Cao Lanh,","Phuong 1,","Tran Phu,","0123456789"),
        new store("Casanova DS","Singapore.","","","Defu South Street 1,","0666999666"),
        new store("Casanova Guangji","China.","Suzhou,","","Guangji Brg Street,","0555666888"),
        new store("Casanova Tianjin","China.","Tianjin,","","Yu Wei Rd Street,","0333444555"),
        new store("Casanova FDG","Malaysia.","Kuala Lumpur,","","Jln imbi Street,","0999666999"),
        new store("Casanova Aya","Korean.","Icheon,","","Guwollam-ro Street,","0987654321"),
        new store("Casanova Sup","Thailand.","Bangkok,","","Lat Phrao Rd Street,","0988654321"),

    ]
})

//Contact

app.controller("contactController", function($scope) {
    let phoneRegex = /\d{10}/;
    $scope.contactPhone = '';

    document.getElementById("contact-phone").addEventListener("focus", () => {document.querySelector(".contact-phone-error").innerHTML = ""})
    document.getElementById("contact-phone").addEventListener("focusout", () => {
        if(Boolean($scope.contactPhone.match(phoneRegex)) === false){
            document.querySelector(".contact-phone-error").innerHTML = "The phone number must contains 10 digit values.";
            console.log($scope.contactPhone)
        }
    })
})


// Menu
app.controller("menuController", function ($scope, $rootScope){
    $rootScope.updateCart();

    let catalogFlag = 0;
    $scope.downloadCatalog = function (){
        let catalog = document.querySelector(".catalog-download")
        if(catalogFlag % 2 === 0){
            catalog.style.transform = "translateX(0)";
            catalogFlag ++;
        }else {
            catalog.style.transform = "translateX(110px)";
            catalogFlag ++;
        }
    }

    class food {
        constructor(name, category, PriceS, PriceM, PriceL, onePrice, oneSize, image, ingredient) {
            this.name = name;
            this.category = category;
            this.PriceS = PriceS;
            this.PriceM = PriceM;
            this.PriceL = PriceL;
            this.onePrice = onePrice;
            this.oneSize = oneSize;
            this.image = image;
            this.ingredient = ingredient;
            this.sizeS = "S";
            this.sizeM = "M";
            this.sizeL = "L";
        }
    }

    $scope.listOfFood = [
        new food("Neapolitan","Pizza",5.00, 9.00, 13.50,null,null, "images/menu/pizzas/neapolitan.jpg",
            "San Marzano tomato sauce, buffalo mozzarella , fresh basil leaves."),
        new food("Hawaiian","Pizza",4, 6.80, 11,null,null, "images/menu/pizzas/hawaiian.jpg",
            "hawaiian tomato sauce, mozzarella cheese, provolone cheese, cooked ham, and pineapple."),
        new food("Carbonara","Pizza",5.00, 8.50, 13.50,null,null, "images/menu/pizzas/carbonara.jpg",
            "guanciale, Pecorino-Romano cheese, heavy cream, scallions, black pepper, eggs."),
        new food("Mexican","Pizza",6.20, 12.35, 18.00,null,null, "images/menu/pizzas/mexican.jpg",
            "tortillas, enchilada sauce, tomatoes, black beans, scallions, cheese."),
        new food("Classic","Pizza",6.50, 10.00, 15.00,null,null,"images/menu/pizzas/classic.jpg",
            "mozzarella cheese, bell pepper, olive, mushroom, sausages, dried parsley, dill weed."),
        new food("Seafood","Pizza",7.50, 14.00, 20.50,null,null, "images/menu/pizzas/seafood.jpg",
            "fresh shrimp, crab meat, purple onion, provolone cheese, mozzarella cheese, basil leaves, black pepper."),
        new food("Salami","Pizza",5.50, 10.50, 15.00,null, null,"images/menu/pizzas/salami.jpg",
            "salami, marinara sauce, mozzarella cheese, red onion , Parmesan cheese, dried oregano."),
        new food("Sicillian","Pizza",5.00, 8.50, 13.50,null, null,"images/menu/pizzas/sicillian.jpg",
            "olive, tomatoes, onion, mozzarella cheese,parmesan cheese, bread crumb, basil leaves ,anchovy fillets."),
        new food("Veggie","Pizza",4.50, 8.00, 12.00,null, null,"images/menu/pizzas/veggie.jpg",
            "sour cream, shroom, tomatoes, purple onion, bell pepper, olive, cream cheese, garlic salt, dill weed."),
        new food("Classic Garlic Bread","Garlic Bread",null, null, null,6.00, "Standard","images/menu/garlic_breads/classic.jpg",
            "french white bread, romano cheese , minced garlic n garlic powder, fresh parsley, butter."),
        new food("Pull-Apart Garlic & Cheese","Garlic Bread",null, null, null,5.60,"Standard","images/menu/garlic_breads/pull-apart-cheese-n-garlic-bread.jpg",
            "brioche, mozzarella cheese,dried parsley flakes, garlic salt."),
        new food("Garlic Dill Soda Bread","Garlic Bread",null, null, null,6.00, "Standard","images/menu/garlic_breads/Garlic-Dill-Soda-Bread.jpg",
            "baked bread, buttermilk, ground mustard, dill weed, shredded cheddar cheese, dried parsley"),
        new food("Spiral Garlic Bread","Garlic Bread",null, null, null,5.00, "Standard","images/menu/garlic_breads/spirals.jpg",
            "crusty French bread, butter, fresh parsley, parmesan cheese, green onion, minced garlic."),
        new food("Grilled Cheese","Sandwich",null, null, null,6.00, "Standard","images/menu/sandwiches/grilled-cheese.jpg",
            "bacon, cheddar cheese, parmigiano-reggiano cheese, butter."),
        new food("Hot-dog","Sandwich",null, null, null,5.00,"Standard","images/menu/sandwiches/hot-dog.jpg",
            "steamed Wiener, mustard, purple onion, cheese sause."),
        new food("Vietnamese Banh Mi","Sandwich",null, null, null,6.85,"Standard","images/menu/sandwiches/vietnamese-sandwich.jpg",
            "eggs, grilled meat, carrot, cucumber, vietnamese special sauce, onion."),
        new food("Lobster Roll","Sandwich",null, null, null,8.00,"Standard","images/menu/sandwiches/lobster-roll.jpg",
            "lobster meat, mayonnaise, garlic, onion, kosher salt, lemon, unsalted butter, pepper, scallions."),
        new food("Jambon Beurre","Sandwich",null, null, null,4.00,"Standard","images/menu/sandwiches/jambon-beurre.jpg",
            "sliced pork ham, butter, pickles, baguette."),
        new food("Steak Burger","Sandwich",null, null, null,6.50,"Standard","images/menu/sandwiches/steak-burger.jpg",
            "hamburger bun, prime rib, smoked bacon, blue cheese, green lettuce, red onion, pepper, butter, fresh tomato."),
        new food("Apple Crisp","Dessert",null, null, null,9.00,"Standard","images/menu/desserts/apple-crisp.jpg",
            "apple cinnamon cake filling topped with crunchy oat crumble, vanilla ice cream and caramel sauce."),
        new food("Cheese Cake","Dessert",null, null, null,8.00,"Standard","images/menu/desserts/cheesecake.jpg",
            "cheesecake filling topped with cracker crust. Seasonal fruit topping at additional cost."),
        new food("Blueberry Pie","Dessert",null, null, null,10.50,"Standard","images/menu/desserts/blueberry pie.jpg",
            "fresh blueberries , cornstarch, kosher salt, butter, granulated sugar."),
        new food("Irish Coffee","Dessert",null, null, null,3.50,"Standard","images/menu/desserts/Irish-Coffee.jpg",
            "heavy whipping cream, irish whiskey, hot coffee."),
        new food("Budweiser Beer","Beverage",null, null, null,3.30,"330ml","images/menu/beverages/budweiser.jpg",null),
        new food("Coca-cola OG","Beverage",null, null, null,2.00,"255ml","images/menu/beverages/cocacola.jpg",null),
        new food("Fiji Water","Beverage",null, null, null,6.30,"330ml","images/menu/beverages/fiji.jpg",null),
        new food("O Long Tea+ Plus","Beverage",null, null, null,2.50,"455ml","images/menu/beverages/tea+nosugar.jpg",null),
        new food("Pomegranate Juice","Beverage",null, null, null,4.50,"380ml","images/menu/beverages/pomegranate-juice.jpg",null),
        new food("Jingle Juice Punch","Beverage",null, null, null,5.00,"Classic","images/menu/beverages/jingle-juice-punch.jpg",null),
        new food("Happy Hour","Combo",null, null, null,28.00,"Combo","images/menu/combo/combo-pizzas-drinks.jpg", "2 Pizza Size M + 2 Drinks")
    ]

    $scope.resetSearch = function () {
        $scope.button = document.getElementsByClassName("menu-button");
        for (let i = 0; i< $scope.button.length; i++) {
            if ($scope.button[i].classList.contains("nav-active-color")) {
                $scope.button[i].classList.remove("nav-active-color");
            }
        }
        $scope.keyword = "";
        $scope.category = "";
        $scope.flag = false;
    }
    $scope.resetSearch()

    $scope.search = function (string) {
        $scope.resetSearch()
        $rootScope.gotoAnchor('anchor');
        $scope.category = string;
        $scope.button = document.getElementsByClassName("menu-button");
        $scope.flag = false;
        for (let i = 0; i < $scope.button.length; i++) {
            if ($scope.button[i].classList.contains("nav-active-color")) {
                switch (string) {
                    case "Pizza":
                        if (i === 0) {
                            $scope.category = "";
                            $scope.flag = true;
                        }
                        break;
                    case "Garlic Bread":
                        if (i === 1) {
                            $scope.category = "";
                            $scope.flag = true;
                        }
                        break;
                    case "Sandwich":
                        if (i === 2) {
                            $scope.category = "";
                            $scope.flag = true;
                        }
                        break;
                    case "Dessert":
                        if (i === 3) {
                            $scope.category = "";
                            $scope.flag = true;
                        }
                        break;
                    case "Beverage":
                        if (i === 4) {
                            $scope.category = "";
                            $scope.flag = true;
                        }
                        break;
                    case "Combo":
                        if (i === 5) {
                            $scope.category = "";
                            $scope.flag = true;
                        }
                        break;
                }
                $scope.button[i].classList.remove("nav-active-color");
            }
            if ($scope.flag) {
                return;
            }
        }
        switch (string) {
            case "Pizza":
                $scope.button[0].classList.add("nav-active-color");
                break;
            case "Garlic Bread":
                $scope.button[1].classList.add("nav-active-color");
                break;
            case "Sandwich":
                $scope.button[2].classList.add("nav-active-color");
                break;
            case "Dessert":
                $scope.button[3].classList.add("nav-active-color");
                break;
            case "Beverage":
                $scope.button[4].classList.add("nav-active-color");
                break;
            case "Combo":
                $scope.button[5].classList.add("nav-active-color");
                break;
        }
    }

    $scope.Enter = function(keyEvent,string) {
        $scope.resetSearch()
        if (keyEvent.which === 13) {
            $scope.keyword = string;
            $rootScope.gotoAnchor('anchor');
        }
        $scope.button = document.getElementsByClassName("menu-button");
        for (let i = 0; i< $scope.button.length; i++) {
            if ($scope.button[i].classList.contains("nav-active-color")) {
                $scope.button[i].classList.remove("nav-active-color");
            }
        }
    }

    $scope.closeMenuAlert = function (){
        document.querySelector(".menu-buy-alert").classList.replace("menu-buy-alert-active","menu-buy-alert-unactive")
    }
})

app.controller("menuBuyController", function ($scope, $sessionStorage,$rootScope) {

    class itemOrder {
        constructor(image, name, size, price, amount) {
            this.image = image;
            this.name = name;
            this.size = size;
            this.price = price;
            this.amount = amount;
        }
    }

    $scope.size = $scope.f.oneSize;
    $scope.amount = 1;
    $scope.totalMoney = 0;

    $scope.chooseSize = function (size) {
        $scope.size = size;
        switch ($scope.size) {
            case $scope.f.sizeS:
                $scope.sizeMoney = $scope.f.PriceS;
                $scope.totalMoney = $scope.f.PriceS * $scope.amount;
                break;
            case $scope.f.sizeM:
                $scope.sizeMoney = $scope.f.PriceM;
                $scope.totalMoney = $scope.f.PriceM * $scope.amount;
                break;
            case $scope.f.sizeL:
                $scope.sizeMoney = $scope.f.PriceL;
                $scope.totalMoney = $scope.f.PriceL * $scope.amount;
                break;

        }

    }

    $scope.decAmount = function () {
        if ($scope.amount > 1) {
            $scope.amount = $scope.amount - 1;
            switch ($scope.size) {
                case $scope.f.sizeS:
                    $scope.totalMoney = $scope.f.PriceS * $scope.amount;
                    break;
                case $scope.f.sizeM:
                    $scope.totalMoney = $scope.f.PriceM * $scope.amount;
                    break;
                case $scope.f.sizeL:
                    $scope.totalMoney = $scope.f.PriceL * $scope.amount;
                    break;
                case $scope.f.oneSize:
                    $scope.totalMoney = $scope.f.onePrice * $scope.amount;
            }

        }
    }

    $scope.incAmount = function () {
        $scope.amount = $scope.amount + 1;
        switch ($scope.size) {
            case $scope.f.sizeS:
                $scope.totalMoney = $scope.f.PriceS * $scope.amount;
                break;
            case $scope.f.sizeM:
                $scope.totalMoney = $scope.f.PriceM * $scope.amount;
                break;
            case $scope.f.sizeL:
                $scope.totalMoney = $scope.f.PriceL * $scope.amount;
                break;
            case $scope.f.oneSize:
                $scope.totalMoney = $scope.f.onePrice * $scope.amount;
        }

    }

    $scope.buyItem = function () {
        //get data from session storage and push it into array
        $scope.orderList = $sessionStorage.OrderList;
        //get new data

        if ($scope.size === $scope.f.sizeS) {
            $scope.price = $scope.f.PriceS;
        } else if ($scope.size === $scope.f.sizeM) {
            $scope.price = $scope.f.PriceM;
        } else if($scope.size === $scope.f.sizeL){
            $scope.price = $scope.f.PriceL;
        } else if($scope.size === $scope.f.oneSize){
            $scope.price = $scope.f.onePrice;
        }

        $scope.orderItem = new itemOrder($scope.f.image,$scope.f.name, $scope.size, $scope.price, $scope.amount);
        //push new data to array
        $scope.flag = false;
        for (let i = 0; i < $scope.orderList.length; i++) {
            if (($scope.orderList[i].name === $scope.f.name) && ($scope.orderList[i].size === $scope.size)) {
                $scope.orderList[i].amount += $scope.amount;
                $scope.flag = true;
            }
        }
        if (!$scope.flag) {
            $scope.orderList.push($scope.orderItem);
        }
        //push new data to session storage
        $sessionStorage.OrderList = $scope.orderList;
        console.log($sessionStorage.OrderList);
        $rootScope.updateCart()

        //show success alert when click buy
        let menuAlert = document.querySelector(".menu-buy-alert")
        function popupMenuAlert(){
            menuAlert.classList.replace("menu-buy-alert-unactive","menu-buy-alert-active")
        }
        function closeMenuAlert(){
            menuAlert.classList.replace("menu-buy-alert-active","menu-buy-alert-unactive")
        }
        popupMenuAlert()
        setTimeout(closeMenuAlert,5000)
    }
})

// Cart Controller
app.controller("cartController",function($scope,$rootScope){
    $rootScope.updateCart();

    if($rootScope.cartList.length > 0){
        document.querySelector(".empty").classList.add("dp-none");
        document.querySelector(".cart-box").classList.remove("dp-none");
    }

    $scope.stepDown = function (name,size){
        for(let p in $scope.cartList){
            if ($rootScope.cartList[p].name === name && $rootScope.cartList[p].size === size &&  $rootScope.cartList[p].amount > 1){
                $rootScope.cartList[p].amount -=1;
            }
        }
        $rootScope.updateCart()
    }
    $scope.stepUp = function (name,size){
        for(let p in $scope.cartList){
            if ($rootScope.cartList[p].name === name && $rootScope.cartList[p].size === size){
                $rootScope.cartList[p].amount +=1;
            }
        }
        $rootScope.updateCart()
    }

    $scope.removeProduct = function (name,size){
        for(let p in $rootScope.cartList){
            if ($rootScope.cartList[p].name === name && $rootScope.cartList[p].size === size){
                $rootScope.cartList.splice(p,1)
            }
        }
        $rootScope.updateCart()

        if($rootScope.cartList.length === 0){
            document.querySelector(".cart-box").classList.add("dp-none");
            document.querySelector(".empty").classList.remove("dp-none");
        }
    }

    $scope.discountCode = '';
    $scope.discountFlag = null;
    let DiscountRates = {
        "FRIDAY30TOTAL": 0.3,

    }
    $scope.applyCoupon = function (string){
        let discountRates = Object.keys(DiscountRates)
        $rootScope.discount = '';

        for (let r of discountRates){
            if(string === r){
                $scope.discountRate = DiscountRates[r];
                $rootScope.discount = $rootScope.totalCartPrice * $scope.discountRate;
                $scope.discountFlag = true;
                break;
            }else{
                $scope.discountFlag = false;
            }

            if(string === "FIRSTACC10"){
                $rootScope.discount = 10;
                $scope.discountFlag = true;
            }else {
                $scope.discountFlag = false;
            }
        }

    }

})

//checkout Controller
app.controller("checkoutController",function ($scope, $rootScope){
    $scope.paymentMethod = null;

    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let errorEmail = document.querySelector('.error-email');
    $scope.placeOrder = function (){

        if(signIn_flag === '1'){
            $rootScope.updateInfo();
            $scope.name = $rootScope.name;
            $scope.phone = $rootScope.phone;
            $scope.address = $rootScope.address;
            $scope.email = $rootScope.email;

        }else{
            sessionStorage.setItem("guestName", $scope.name);
            sessionStorage.setItem("guestPhone", $scope.phone);
            sessionStorage.setItem("guestAddress", $scope.address);
            sessionStorage.setItem("guestEmail", $scope.email);
        }

    }
    document.getElementById('co-email').addEventListener('focus',() => { errorEmail.innerHTML = ""})
    document.getElementById('co-email').addEventListener('focusout',() => {
        if(Boolean($scope.email.match(emailRegex)) === false){
            errorEmail.innerHTML = "The Email is invalid.";
        }
    })

    document.getElementById('checkoutForm').addEventListener("submit",(e) => {

        if($scope.paymentMethod === null){
            e.preventDefault()
        }else {
            $scope.placeOrder()
            sessionStorage.setItem("paymentMethod", $scope.paymentMethod);
        }
    })

})

// Order-Complete Controller
app.controller("finishOrderController",function ($rootScope, $scope, $sessionStorage){
    $rootScope.updateCart()

    $scope.totalCartP = $rootScope.totalCartPrice;
    $scope.totalPAfterward = $rootScope.totalPriceAfterward;
    $scope.taxC = $rootScope.taxCost;

    $rootScope.paymentMethod = sessionStorage.getItem("paymentMethod");

    let productInCart = $sessionStorage.OrderList.concat();

    if(signIn_flag !== '1'){
        $rootScope.name = sessionStorage.getItem("guestName");
        $rootScope.phone = sessionStorage.getItem("guestPhone");
        $rootScope.address = sessionStorage.getItem("guestAddress");
        $rootScope.email = sessionStorage.getItem("guestEmail");
    }

    $rootScope.resetCart()
    $rootScope.updateCart()

})

/*Sign Up Controller*/
app.controller("signUpController", ($scope) => {
    let passSu1Flag, passSu2Flag;
    passSu1Flag = passSu2Flag = true;
    $scope.showPassSu1 = () => {
        let sushow1 = document.querySelector(".sushow1")

        if(passSu1Flag){
            document.querySelector("#password-su").setAttribute("type","text")
            sushow1.classList.remove("bi-eye-slash-fill")
            sushow1.classList.add("bi-eye-fill")
            passSu1Flag = false;
        }else {
            document.querySelector("#password-su").setAttribute("type","password")
            sushow1.classList.remove("bi-eye-fill")
            sushow1.classList.add("bi-eye-slash-fill")
            passSu1Flag = true;
        }
    }
    $scope.showPassSu2 = () => {
        let sushow2 = document.querySelector(".sushow2")
        if(passSu2Flag){
            document.querySelector("#password2-su").setAttribute("type","text")
            sushow2.classList.remove("bi-eye-slash-fill")
            sushow2.classList.add("bi-eye-fill")
            passSu2Flag = false;
        }else {
            document.querySelector("#password2-su").setAttribute("type","password")
            sushow2.classList.remove("bi-eye-fill")
            sushow2.classList.add("bi-eye-slash-fill")
            passSu2Flag = true;
        }
    }

    /*Validate Sign Up Form*/

    let pass1Flag,pass2Flag,phoneFlag;
    pass1Flag = pass2Flag = phoneFlag = false;
    $scope.pass1 = "";
    $scope.pass2 = "";
    $scope.phoneNumber = "";
    $scope.email = "";

    let errorpass1 = document.querySelector(".error-pass1")
    let errorpass2 = document.querySelector(".error-pass2")
    let errorphone = document.querySelector(".error-phone")
    let erroremail = document.querySelector(".error-email")

    let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[a-zA-Z0-9\W]{8,}$/;
    let phoneRegex = /\d{10}/;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    function validPass1(){
        if(Boolean($scope.pass1.match(passRegex)) === false){
            errorpass1.innerHTML = "The Password must following the rules below."
        } else {
            pass1Flag = true;
        }
    }
    function validPass2(){
        if($scope.pass2 !== $scope.pass1){
            errorpass2.innerHTML = "The Password do not match."
        } else {
            pass2Flag = true;
        }
    }
    function validPhone(){
        if(Boolean($scope.phoneNumber.match(phoneRegex)) === false){
            errorphone.innerHTML = "The phone number must contains 10 digit values."
        } else {
            phoneFlag = true;
        }
    }
    function validEmail(){
        if(Boolean($scope.email.match(emailRegex)) === false){
            erroremail.innerHTML = "The Email is invalid."
        }
    }
    $scope.createFakeData = () => {
        sessionStorage.setItem("email",document.querySelector("#email-su").value)
        sessionStorage.setItem("password",document.querySelector("#password-su").value)
        sessionStorage.setItem("name",document.querySelector("#name").value)
        sessionStorage.setItem("gender",document.querySelector("#gender").value)
        sessionStorage.setItem("birthdate",document.querySelector("#birthdate").value)
        sessionStorage.setItem("phone",document.querySelector("#phone").value)
        sessionStorage.setItem("address",document.querySelector("#address").value)
    }

    document.getElementById("password-su").addEventListener("focus", () => {errorpass1.innerHTML = ""})
    document.getElementById("password-su").addEventListener("focusout", () => {
        validPass1()
    })

    document.getElementById("password2-su").addEventListener("focus", () => {errorpass2.innerHTML = ""})
    document.getElementById("password2-su").addEventListener("focusout", () => {
       validPass2()
    })

    document.getElementById("phone").addEventListener("focus", () => {errorphone.innerHTML = ""})
    document.getElementById("phone").addEventListener("focusout", () => {
        validPhone();
    })

    document.getElementById("email-su").addEventListener("focus", () => {erroremail.innerHTML = ""})
    document.getElementById("email-su").addEventListener("focusout", () => {
        validEmail();
    })

    document.getElementById("su-form-box").addEventListener("submit", (e) => {
        if(!pass1Flag || !pass2Flag || !phoneFlag){
            e.preventDefault()
        }
    })

})

app.controller("policyController", function($scope) {

    $scope.termOfUse = true;
    $scope.privacyPolicy = true;
    $scope.touIntro = false;
    $scope.aUse = false;
    $scope.oUse = false;
    $scope.pUse = false;
    $scope.intProp = false;
    $scope.warranty = false;
    $scope.liability = false;
    $scope.indem = false;
    $scope.waiver = false;
    $scope.policyIntro = false;
    $scope.gathertrack = false;
    $scope.amendment = false;
    $scope.pIntUse = false;
    $scope.trademark = false;
    $scope.access = false;

    $scope.dropFunction = function (target) {
        switch (target) {
            case "TermOfUse":
                if ($scope.termOfUse === true) {
                    $scope.termOfUse = false;
                } else {
                    $scope.termOfUse = true;
                }
                break;
            case "PrivacyPolicy":
                if ($scope.privacyPolicy === true) {
                    $scope.privacyPolicy = false;
                } else {
                    $scope.privacyPolicy = true;
                }
                break;
            case "touIntro":
                if ($scope.touIntro === true) {
                    $scope.touIntro = false;
                } else {
                    $scope.touIntro = true;
                }
                break;
            case "aUse":
                if ($scope.aUse === true) {
                    $scope.aUse = false;
                } else {
                    $scope.aUse = true;
                }
                break;
            case "oUse":
                if ($scope.oUse === true) {
                    $scope.oUse = false;
                } else {
                    $scope.oUse = true;
                }
                break;
            case "pUse":
                if ($scope.pUse === true) {
                    $scope.pUse = false;
                } else {
                    $scope.pUse = true;
                }
                break;
            case "intProp":
                if ($scope.intProp === true) {
                    $scope.intProp = false;
                } else {
                    $scope.intProp = true;
                }
                break;
            case "warranty":
                if ($scope.warranty === true) {
                    $scope.warranty = false;
                } else {
                    $scope.warranty = true;
                }
                break;
            case "liability":
                if ($scope.liability === true) {
                    $scope.liability = false;
                } else {
                    $scope.liability = true;
                }
                break;
            case "indem":
                if ($scope.indem === true) {
                    $scope.indem = false;
                } else {
                    $scope.indem = true;
                }
                break;
            case "waiver":
                if ($scope.waiver === true) {
                    $scope.waiver = false;
                } else {
                    $scope.waiver = true;
                }
                break;
            case "policyIntro":
                if ($scope.policyIntro === true) {
                    $scope.policyIntro = false;
                } else {
                    $scope.policyIntro = true;
                }
                break;
            case "gathertrack":
                if ($scope.gathertrack === true) {
                    $scope.gathertrack = false;
                } else {
                    $scope.gathertrack = true;
                }
                break;
            case "amendment":
                if ($scope.amendment === true) {
                    $scope.amendment = false;
                } else {
                    $scope.amendment = true;
                }
                break;
            case "pIntUse":
                if ($scope.pIntUse === true) {
                    $scope.pIntUse = false;
                } else {
                    $scope.pIntUse = true;
                }
                break;
            case "trademark":
                if ($scope.trademark === true) {
                    $scope.trademark = false;
                } else {
                    $scope.trademark = true;
                }
                break;
            case "access":
                if ($scope.access === true) {
                    $scope.access = false;
                } else {
                    $scope.access = true;
                }
                break;
            default:
                break;
        }
    }
})

