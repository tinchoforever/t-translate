/*global alert */
/*global MobileDetect */


'use strict';

/**
 * @ngdoc function
 * @name tulipanTranslateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tulipanTranslateApp
 */
angular.module('tulipanTranslateApp')
  .controller('MainCtrl', function ($window,$scope, $rootScope,$http) {
    $rootScope.currentActive = 'translate';
    var md = new MobileDetect(window.navigator.userAgent);

    var errorMessages = {
        //Mensaje Vacio.
        emptyMessage: "Tu mensaje es muy corto. Por lo menos escribe 30 letras.",
        //Apodo Vacio
        emptyNickName: "No te olvides tu apodo, al menos 5 letras o números sin espacios.",
        //Mensaje con caracteres invalidos.
        wrongChar:"Tu mensaje o apodo tiene letras no válidas, usá solo letras, números y puntuación y vuelve a intentarlo",
        //No podes usar ese nicknamne (¿Posta cuando va a pasar eso?)
        duplicatedNickName:"Parece que tu apodo ya fue usado. Proba con alguno de estos: "
    };





  	 $http.get('https://spreadsheets.google.com/feeds/list/1DF9DsfaR1tjoQvRl7bwj30loKWgR7kDx0e6PBM1EksU/1/public/values?alt=json')
        .then(function(response) {
        	
        	var entries = response.data.feed.entry;
        	var result = [];
        	for (var i = 0; i < entries.length; i++) {
        		var item = entries[i];
        		var r = item.gsx$frases.$t;
        		result.push(r);

        	}
        	$scope.phrases = result;
        	
        });

 
    $scope.translate=function(){
        $scope.onSubmitError = false;
        var error = verifyMessages();

        if (error){
            $scope.onSubmitError = true;
        }   
        else { 
            var t = $scope.phrases[Math.floor(Math.random() * $scope.phrases.length)];
            var f = $scope.from.split(" ").join("");
            $scope.translation = t + String.fromCharCode(0xD83C, 0xDF37) + f;

            if (md.mobile()){
                $scope.translatedMobile= true;    
                $scope.translatedDesktop= false;    
            }
            else {
                $scope.translatedMobile= false;  
                $scope.translatedDesktop= true;    
            }
            
        }
    	
    };

    var  verifyMessages = function(){
        var error = false; 
        
        var message = $scope.message;
        var nickName = $scope.from;

        var onlyWordsSpecialNumbersUnderScore = /^[\w., A-zÀ-ú]+$/;
        var onlyWordsNumbersUnderScore = /^[\w., ]+$/;

        //Mensaje Vacio.
        if (!message || message.length < 10 || message.trim() < 4){
            error= true;
            $scope.errorMessage = errorMessages.emptyMessage;
        }
        //Apodo Vacio
        else if (!nickName || nickName.trim() < 5){
            error= true;
            $scope.errorMessage = errorMessages.emptyNickName;
        }
        // //Mensaje con caracteres invalidos.
        else if (!onlyWordsSpecialNumbersUnderScore.test(message) || !onlyWordsNumbersUnderScore.test(nickName) ){
            error= true;
            $scope.errorMessage = errorMessages.wrongChar;
        }
        // //No podes usar ese nicknamne (¿Posta cuando va a pasar eso?)
        // duplicatedNickName:"Parece que tu apodo ya fue usado. Proba con alguno de estos: "

        return error;        
       
    };



    $scope.copyMessage =function(){
		$window.document.getElementById('translation').select();
		/* Copy the text inside the text field */
		document.execCommand('Copy');
		/* Alert the copied text */
		alert('Copiamos tu traducción usala donde quieras.');
    };
  });
