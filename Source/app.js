// 'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])

    .controller('View1Ctrl', function ($scope, $http) {
        $scope.mostRecentReview = new Array();
        $scope.venueList = new Array();
        $scope.getVenues = function () {
            var placeEntered = document.getElementById("txt_placeName").value;
            var searchQuery = document.getElementById("txt_searchFilter").value;
            if (placeEntered != null && placeEntered != "" && searchQuery != null && searchQuery != "") {

                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("https://api.foursquare.com/v2/venues/search" +
                    "?client_id=HRPQLWUVUT33SZGE41V4SBII31QN3DZZPP53FTDJMB3ITLDW"
                    +
                    "&client_secret= 0JWIDKX23CNUJCY0KHO34V0TNDKX1IFRJBHAOAKOBTOJI12P" +
                    "&v=20160215&limit=5" +
                    "&near=" + placeEntered +
                    "&query=" + searchQuery);

                handler.success(function (data) {
                    if (data != null && data.response != null && data.response.venues != undefined && data.response.venues != null) {
                        data.response.venues.forEach(function (value) {
                            var location = value.location.formattedAddress;
                            if(location != null){
                                location = location.toString();
                            }
                            console.log(location);
                            $scope.venueList.push({name : value.name, id : value.id, location : location})
                        });
                    }else{
                        $("#error").text("No Venues present for the Input values");
                        $("#error").show();
                    }


                })
                var handler = $http.get("https://api.foursquare.com/v2/venues/VENUE_ID/tips" +
                    "?client_id=HRPQLWUVUT33SZGE41V4SBII31QN3DZZPP53FTDJMB3ITLDW"
                    +
                    "&client_secret= 0JWIDKX23CNUJCY0KHO34V0TNDKX1IFRJBHAOAKOBTOJI12P" +
                    "&v=20160215&limit=5" +
                    "&VENUE_ID = "  + value.id);

                handler.success(function (data) {
                    if (data != null && data.response != null && data.response.venues != undefined && data.response.venues != null) {
                        data.response.venues.forEach(function (value) {
                            var comment = value.text.mostRecentReview;
                            if(comment != null){
                                comment = comment.toString();
                            }
                            console.log(comment);
                            $scope.venueList.push({review : value.text, id : value.text, location : mostRecentReview})
                        });
                    }else{
                        $("#error").text("No Venues present for the Input values");
                        $("#error").show();
                    }


                })
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }
    });
