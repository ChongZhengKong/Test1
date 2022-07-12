// JavaScript source code
var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {

    //User
    $scope.isUserType = "Associate";
    $scope.discountPercent = 5;

    //products data
    $scope.items = [
        {
            id: 1,
            name: 'Kone',
            oriprice: 3488.99,
            price: 3488.99
        },
        {
            id: 2,
            name: 'Ironhide Cartridge',
            oriprice: 529.99,
            price: 529.99
        }
    ];

  
    //shopping cart
    $scope.ShoppingCart = [];
    $scope.showAfterDiscountKone = false;
    $scope.showAfterDiscountIron = false;

    //add to cart
    $scope.addItem = function (newItem) {
        console.log($scope.isUserType);
        if ($scope.ShoppingCart.length == 0) {
            newItem.count = 1;
            $scope.ShoppingCart.push(newItem);
        } else {
            var repeat = false;
            for (var i = 0; i < $scope.ShoppingCart.length; i++) {
                if ($scope.ShoppingCart[i].id == newItem.id) {
                    $scope.ShoppingCart[i].count++;
                    repeat = true;
                }
            }

            if (repeat ==  false) {
                newItem.count = 1;
                $scope.ShoppingCart.push(newItem);
            }
        }
        $scope.updatePrice();
    };

    //update price
    $scope.ironhidePayCount = 0;

    $scope.updatePrice = function () {
        $scope.totalPrice = 0;
        $scope.totalKonePrice = 0;
        $scope.totalIronhidePrice = 0;
        $scope.isKoneDiamond = false;
        $scope.isIronhideDiamond = false;

        if ($scope.isUserType == "Diamond") {
            for (var i = 0; i < $scope.ShoppingCart.length; i++) {

                if ($scope.ShoppingCart[i].id == 1) {
                    if ($scope.ShoppingCart[i].count > 2) {
                        $scope.isKoneDiamond = true;
                        $scope.showAfterDiscountKone = true;
                    }
                }

                if ($scope.ShoppingCart[i].id == 2) {
                    if ($scope.ShoppingCart[i].count > 2) {
                        $scope.isIronhideDiamond = true;
                        $scope.showAfterDiscountIron = true;
                    }
                }
            }
        }

        for (var j = 0; j < $scope.ShoppingCart.length; j++) {
            //conditions here
            if ($scope.isUserType == "Diamond") { //Is Diamond User
                 $scope.ShoppingCart[j].price = $scope.ShoppingCart[j].oriprice * 0.8;
                 if ($scope.ShoppingCart[j].id == 1) { //Kone Diamond Logic here
                    if ($scope.isKoneDiamond) {
                        $scope.ShoppingCart[j].price = 2588.99; //Get a discount on Kone where 3 or more purchased. The price dropped to RM 2588.99 per unit 
                     }
                     $scope.totalKonePrice = $scope.totalKonePrice + $scope.ShoppingCart[j].count * $scope.ShoppingCart[j].price;
                 }

                if ($scope.ShoppingCart[j].id == 2) { //Ironhide Diamond Logic here
                    if ($scope.isIronhideDiamond) {
                        $scope.ironhidePayCount = Math.ceil($scope.ShoppingCart[j].count / 3 * 2); //Get a 3 for 2 deal
                         //console.log($scope.ironhidePayCount);
                     }
                     if ($scope.ironhidePayCount > 0)
                         $scope.totalIronhidePrice = $scope.totalIronhidePrice + $scope.ironhidePayCount * $scope.ShoppingCart[j].price;
                     else
                         $scope.totalIronhidePrice = $scope.totalIronhidePrice + $scope.ShoppingCart[j].count * $scope.ShoppingCart[j].price;
                 }

                 $scope.totalPrice = $scope.totalKonePrice + $scope.totalIronhidePrice;
            }

             else { //Is Associate User
                 $scope.ShoppingCart[j].price = $scope.ShoppingCart[j].oriprice * 0.95;
                 $scope.totalPrice = $scope.totalPrice + $scope.ShoppingCart[j].count * $scope.ShoppingCart[j].price;
             }
        }

    };

    //empty cart
    $scope.removeBasket = function () {
        $scope.ShoppingCart.splice(0, $scope.ShoppingCart.length);
        $scope.updatePrice();
        $scope.ShoppingCart = [];
        $scope.showAfterDiscountKone = false;
        $scope.showAfterDiscountIron = false;
        $scope.ironhidePayCount = 0;

        //reset value
        for (i = 0; i < $scope.items.length; i++) {
            $scope.items[i].price = $scope.items[i].oriprice;
        }
    };

    //change user type
    $scope.userchange = function () {
        $scope.removeBasket();
        $scope.discountPercent = $scope.isUserType == "Associate" ? 5:20;
    };

});

