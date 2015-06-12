'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function ($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';

    $scope.wishList = [];
    $scope.addToWishList = function (phoneName) {
      $scope.wishList.push(phoneName);
        angular.forEach($scope.phones, function(phone) {
            if(phoneName == phone.name) {
                phone.isInWishList = true;
            }
        });
    };

    $scope.removeFromWishList = function(phoneName) {
      var index = $scope.wishList.indexOf(phoneName);
      $scope.wishList.splice(index, 1);
        angular.forEach($scope.phones, function(phone) {
            if(phoneName == phone.name) {
                phone.isInWishList = false;
            }
        });
        console.log(phone.name);
    };

    $scope.isInWishList = function(phoneName) {
      var index = $scope.wishList.indexOf(phoneName);
      if (index != -1) {
        $scope.removeFromWishList(phoneName);
      } else {
        $scope.addToWishList(phoneName);
      }
    }
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function ($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneName: $routeParams.phoneName}, function (phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function (imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
