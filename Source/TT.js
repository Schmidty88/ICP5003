var app = angular.module("ttApp",['ngSanitize']);

app.controller('ttCtrl', function ($scope, $http) {

    $scope.langList = [];
    // Supported Languages
    $http.get("https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20151023T145251Z.bf1ca7097253ff7e.c0b0a88bea31ba51f72504cc0cc42cf891ed90d2").success(function (data) {
        if(data != null && data.langs != null){
            $scope.langList = data.langs;
        }
    });
    // gives error if it isnt working
    $http.get("https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20151023T145251Z.bf1ca7097253ff7e.c0b0a88bea31ba51f72504cc0cc42cf891ed90d2").error(function (data) {
        alert("There was some error processing your request. Please try after some time.");
    });

    $scope.getTranslateText = function () {
        $scope.textOut = "";
        var sourceText = $scope.sourceText;
        var sourceLan = $scope.sourceLan;
        var destLan = $scope.destLan;
        if (sourceText != null && sourceText != "" && sourceLan != null && sourceLan != "") {
            if(destLan == null || destLan == ""){
                destLan = 'en';
            }
            //this is the API that will translate
            var handler = $http.get("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180619T213242Z.799538145cca3970.66e5682b1a8e404043380c0e1bbd88d0a44c4022"
            + "&text= " + sourceText +
                "&lang=" + sourceLan + "-" + destLan);
            handler.success(function (data) {
                if (data != null && data.text != null) {
                    $scope.textOut = "<strong>Translated Text : "+ data.text[0]+"</strong>";
                }else{
                    $scope.textOut = "<strong>No Translation Details exist for the Input Details</strong>";
                }
            });
            handler.error(function (data) {
                alert("There was some error processing your request.");
            });
        }else{
            $scope.textOut = "<strong>Language cannot be empty</strong>";
        }
    }
});