angular.module('starter.controllers', [])


.factory('myFactory',function(){
    obj = {};
    obj.name= "";
    obj.contact= 0;
    obj.type = "";
    obj.address = "";    
    return obj;
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

   

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

.controller('SearchCtrl', function($scope, $state, $stateParams, $ionicPopup, $http, $ionicLoading) {
    $scope.mapBool = true;
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
            zoom: 16,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });

    }


    // $scope.friends = [
    //     { name: 'John', age: 25, gender: 'boy', number: 9894250259, mylat: 12.12122, mylong: 233.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' },
    //     { name: 'Jessie', age: 30, gender: 'girl', number: 9894250259, mylat: 21.12122, mylong: 5.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' },
    //     { name: 'Johanna', age: 28, gender: 'girl', number: 9894250259, mylat: 12.1232122, mylong: 6.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' },
    //     { name: 'Joy', age: 15, gender: 'girl', number: 9894250259, mylat: 12.456456122, mylong: 23.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' },
    //     { name: 'Mary', age: 28, gender: 'girl', number: 9894250259, mylat: 2.12122, mylong: 21.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' },
    //     { name: 'Peter', age: 95, gender: 'boy', number: 9894250259, mylat: 1.12122, mylong: 2.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' },
    //     { name: 'Peter', age: 95, gender: 'boy', number: 9894250259, mylat: 1.12122, mylong: 2.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' },
    //     { name: 'Peter', age: 95, gender: 'boy', number: 9894250259, mylat: 1.12122, mylong: 2.1221, address: 'The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG' }
    // ];

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
        $scope.type1 = document.getElementById("type1").value;
        $scope.area1 = document.getElementById("area1").value;
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        $scope.mapBool = false;
        var link = "https://camp-search.herokuapp.com/search/" + $scope.type1 + "/" + $scope.area1;
        console.log(link);
        $http.get(link)
            .then(function(response) {
                    console.log(response.data);
                    $scope.friends = response.data;
                    $ionicLoading.hide();
                },
                function myError(response) {
                    console.log(response.statusText);
                    $ionicLoading.hide();
                    $scope.mapBool = true;
                    var alertPopup = $ionicPopup.alert({
                        title: '<span>Error</span>',
                        template: 'Come back with valid input'
                    });
                    alertPopup.then(function(res) {
                        console.log('pop up not working');
                    });

                });

    };

    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'More Details:',
            template: "campname" + $f
        });
        alertPopup.then(function(res) {
            console.log('pop up not working');
        });
    };




})


.controller('PostCtrl', function($scope, $http, $cordovaCamera, $ionicPopup, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {

    // $scope.pictureBool = false;
    $scope.photoLine = " Take a picture"
        // $scope.takePicture = function() {
        //     $scope.photoLine = "Retake photo";

    //     $cordovaCamera.getPicture({
    //         quality: 50,
    //         destinationType: Camera.DestinationType.DATA_URL,
    //         sourceType: Camera.PictureSourceType.CAMERA,
    //         allowEdit: true,
    //         encodingType: Camera.EncodingType.JPEG,
    //         targetWidth: 300,
    //         targetHeight: 300,
    //         popoverOptions: CameraPopoverOptions,
    //         saveToPhotoAlbum: true,
    //         correctOrientation: true
    //     }).then(function(imageData) {
    //         $scope.pictureBool = true;
    //         var image = document.getElementById('myImage');
    //         image.src = "data:image/jpeg;base64," + imageData;


    //     }, function(err) {
    //         console.log(err)
    //     });
    //     console.log("success")
    // };


    // $ionicPlatform.ready(function() {

    //     $ionicLoading.show({
    //         template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
    //     });

    //     var posOptions = {
    //         enableHighAccuracy: true,
    //         timeout: 20000,
    //         maximumAge: 0
    //     };
    //     $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
    //         var lat = position.coords.latitude;
    //         var long = position.coords.longitude;

    //         var myLatlng = new google.maps.LatLng(lat, long);

    //         var mapOptions = {
    //             center: myLatlng,
    //             zoom: 16,
    //             mapTypeId: google.maps.MapTypeId.ROADMAP
    //         };

    //         var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //         $scope.map = map;
    //         $ionicLoading.hide();

    //     }, function(err) {
    //         $ionicLoading.hide();
    //         console.log(err);
    //     });
    // });
    $scope.address = ""


    $scope.showAlert = function() {
        // var address = $scope.address;


        $scope.date = document.getElementById("date").value;
        $scope.name = document.getElementById("name").value;
        $scope.type = document.getElementById("type").value;
        $scope.number = document.getElementById("number").value;
        $scope.area = document.getElementById("area").value;
        $scope.email = document.getElementById("email").value;
        var address = document.getElementById("addr").value;
        $scope.address = address;
        console.log(address)
            // Initialize the Geocoder
        geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    // callback(results[0]);
                    console.log(results[0].geometry.location.lat());
                    console.log(results[0].geometry.location.lng());
                    $scope.lat = results[0].geometry.location.lat();
                    $scope.long = results[0].geometry.location.lng();
                    var resultant = {
                        "campname": $scope.name,
                        "camptype": $scope.type,
                        "contact": $scope.number,
                        "location": $scope.area,
                        "address": $scope.address,
                        "email": $scope.email,
                        "latitude": $scope.lat,
                        "longitude": $scope.long,
                        "date": $scope.date

                    }
                    console.log(resultant);
                    var link = "https://camp-search.herokuapp.com/post"
                    $http.post(link, resultant);


                }
            });
        }





        var alertPopup = $ionicPopup.alert({
            title: 'Thank you',
            template: "&nbsp;&nbsp;&nbsp;Your camp has been recorded"
        });
        alertPopup.then(function(res) {
            console.log(res);
        });
        $ionicLoading.hide();


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
                console.log("Facebook failed: " + error);
            });
        }
        // var url =;
        //
});