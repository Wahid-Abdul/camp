angular.module('starter.controllers', [])



.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('MapCtrl', function($scope) {
    var uluru = {
        lat: 13.2984920,
        lng: 80.1484450
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });

    $scope.friends = [
        { name: 'John', age: 25, gender: 'boy' },
        { name: 'Jessie', age: 30, gender: 'girl' },
        { name: 'Johanna', age: 28, gender: 'girl' },
        { name: 'Joy', age: 15, gender: 'girl' },
        { name: 'Mary', age: 28, gender: 'girl' },
        { name: 'Peter', age: 95, gender: 'boy' },
        { name: 'Sebastian', age: 50, gender: 'boy' },
        { name: 'Erika', age: 27, gender: 'girl' },
        { name: 'Patrick', age: 40, gender: 'boy' },
        { name: 'Samantha', age: 60, gender: 'girl' }
    ];
})

.controller('HomeCtrl', function($scope) {



})