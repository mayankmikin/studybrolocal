'use strict';
angular.module('hmModule').controller("MainController", function ($scope, $rootScope, $stateParams, $state, $location, $window,$timeout,$sce,context,VideoService) 
{
    console.log("MainController called");
    
      $rootScope.activealert=false;
      $rootScope.exclaim='';
      $rootScope.followup='';
});
