/*global alert */
'use strict';

/**
 * @ngdoc function
 * @name tulipanTranslateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tulipanTranslateApp
 */
angular.module('tulipanTranslateApp')
  .controller('DecoCtrl', function ($window,$rootScope, $scope,$http) {
    $rootScope.currentActive = 'deco';

    var md = new MobileDetect(window.navigator.userAgent);

    var errorMessages = {
        //Mensaje Vacio.
        emptyMessage: "El mensaje que pusiste es muy corto. Revisalo y no te olvides de " + String.fromCharCode(0xD83C, 0xDF37),
        //Apodo Vacio
        emtpyTulip: "¿Pusiste " + String.fromCharCode(0xD83C, 0xDF37) + " ? No te lo olvides!",
        //Mensaje con caracteres invalidos.
        wrongChar:"Tu mensaje tiene letras no válidos, usa solo letras, números y puntuación y vuelve a intentarlo",
        //No podes usar ese nicknamne (¿Posta cuando va a pasar eso?)
        duplicatedNickName:"Parece que tu apodo ya fue usado. Proba con alguno de estos: "
    };


    $scope.translate=function(){
        $scope.onSubmitError = false;
        var error = verifyMessages();

        if (error){
            $scope.onSubmitError = true;
        }   
        else { 
            // var t = $scope.phrases[Math.floor(Math.random() * $scope.phrases.length)];
            // var f = $scope.from.split(" ").join("");
            //String.fromCharCode(0xD83C, 0xDF37)
            $scope.translation = "Aca deberia ir tu mensaje traducido. Que cosas sucias dijiste.";

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
        
        var msg = $scope.message;
        
        //Mensaje Vacio.
        if (!msg || msg.length < 10 || msg.trim() < 4){
            error= true;
            $scope.errorMessage = errorMessages.emptyMessage;
        }
        if (!(/[\uD83C-\uDF37]/.test(msg))){
            error= true;
            $scope.errorMessage = errorMessages.emtpyTulip;
        }


        
        
        // emptyNickName: "No te olvides tu apodo, al menos 5 letras o números sin espacios.",
        // //Mensaje con caracteres invalidos.
        // wrongChar:"Tu mensaje tiene letras no válidos, usa solo letras, números y puntuación y vuelve a intentarlo",
        // //No podes usar ese nicknamne (¿Posta cuando va a pasar eso?)
        // duplicatedNickName:"Parece que tu apodo ya fue usado. Proba con alguno de estos: "

        return error;        
       
    };
  });
