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

.controller('SearchCtrl', function($scope, $state, $stateParams, $ionicPopup) {
    $scope.mapBool = true

    var uluru2 = {
        lat: 2.2434,
        lng: 0.21223
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: uluru2
    });
    // var marker = new google.maps.Marker({
    //     position: uluru2,
    //     map: map
    // });



    $scope.plotter = function(a, b) {
        $scope.latitude = a;
        $scope.longitude = b;
        var uluru = {
            lat: $scope.latitude,
            lng: $scope.longitude
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });

    }


    $scope.friends = [
        { name: 'John', age: 25, gender: 'boy', number: 9894250259, mylat: 12.12122, mylong: 233.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' },
        { name: 'Jessie', age: 30, gender: 'girl', number: 9894250259, mylat: 21.12122, mylong: 5.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' },
        { name: 'Johanna', age: 28, gender: 'girl', number: 9894250259, mylat: 12.1232122, mylong: 6.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' },
        { name: 'Joy', age: 15, gender: 'girl', number: 9894250259, mylat: 12.456456122, mylong: 23.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' },
        { name: 'Mary', age: 28, gender: 'girl', number: 9894250259, mylat: 2.12122, mylong: 21.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' },
        { name: 'Peter', age: 95, gender: 'boy', number: 9894250259, mylat: 1.12122, mylong: 2.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' },
        { name: 'Peter', age: 95, gender: 'boy', number: 9894250259, mylat: 1.12122, mylong: 2.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' },
        { name: 'Peter', age: 95, gender: 'boy', number: 9894250259, mylat: 1.12122, mylong: 2.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' }
    ];

    $scope.CallNumber = function(inp) {

        // var number = inp;
        window.plugins.CallNumber.callNumber(function() {
            //success logic goes here
            console.log("success");
        }, function() {
            console.log("error");
            //error logic goes here
        }, inp, true)

    };



    $scope.mapbool = function() {
        $scope.mapBool = false;
    };

    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Thank you',
            // templateUrl: "../templates/camp_details.html"
        });
        alertPopup.then(function(res) {
            console.log('pop up not working');
        });
    };




})


.controller('PostCtrl', function($scope, $cordovaCamera, $ionicPopup) {

        $scope.pictureBool = false;
        $scope.photoLine = " Take a picture"
        $scope.takePicture = function() {
            $scope.photoLine = "Retake photo";

            $cordovaCamera.getPicture({
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true,
                correctOrientation: true
            }).then(function(imageData) {
                $scope.pictureBool = true;
                var image = document.getElementById('myImage');
                image.src = "data:image/jpeg;base64," + imageData;


            }, function(err) {
                console.log(err)
            });
            console.log("success")
        };
        $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Thank you',
                template: "&nbsp;&nbsp;&nbsp;Your camp has been recorded"
            });
            alertPopup.then(function(res) {
                console.log('pop up failure');
            });
        };

    })
    .controller('HomeCtrl', function($scope, $cordovaOauth, $http) {
        $scope.first = "";
        $scope.facebookLogin = function() {
                $cordovaOauth.facebook("1696400467327617", ["email"]).then(function(result) {
                    $scope.data = result.access_token;
                    // results
                }, function(error) {
                    // error
                    console.log("Error Message " + error);
                });
            }
            // var url =;
        $scope.getReq = function() {
            $http.get('https://camp-search.herokuapp.com/')
                .success(function(status) {
                    //your code when success
                    console.log(status.Message)
                    $scope.first = status.Message
                })
                .error(function(status) {
                    //your code when fails
                    console.log("wahid")
                });
            // $http.post("/check.json", { name: 'wahid' });
            $http({
                    url: 'check.json',
                    method: "POST",
                    data: { name: 'wahid' }
                })
                .then(function(response) {
                        // success
                        console.log("success")
                    },
                    function(response) { // optional
                        // failed
                        console.log("Failureee:     " + response.data)
                        $scope.first = response.data
                    });
        }
    });