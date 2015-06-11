'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function ($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';

    $scope.wishList = [];
    $scope.addToWishList = function (phoneId) {
      $scope.wishList.push(phoneId);
    }

    $scope.removeFromWishList = function(phoneId) {
      var index = $scope.wishList.indexOf(phoneId);
      $scope.wishList.splice(index, 1);
    }

    $scope.isInWishList = function(phoneId) {
      var index = $scope.wishList.indexOf(phoneId);
      if (index != -1) {
        $scope.removeFromWishList(phoneId);
      } else {
        $scope.addToWishList(phoneId);
      }
    }
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function ($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function (phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function (imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
