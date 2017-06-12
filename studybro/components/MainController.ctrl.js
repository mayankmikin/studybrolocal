'use strict';
angular.module('hmModule').controller("MainController", function ($scope, $rootScope, $stateParams, $state, $location, $window,$timeout,VideoService) 
{
    console.log("MainController called");
    $scope.names = ["chapter 1 physics", "chapter 2 physics", "chapter 3 physics"];
    $scope.videoLibrary=VideoService.getVideoLibrary();
    
    $rootScope.showsidebar=true;
   $scope.changeIt = function () 
    {
      $scope.video_url= VideoService.getLandingVideo();   //"https://www.youtube.com/embed/7V6FGF1ffgQ";
      $scope.video_url=$scope.video_url["0"].url_name;
      var already_existing_iframe=angular.element( document.querySelector( '#frame1' ) );
      if(already_existing_iframe ==null || already_existing_iframe== undefined)
      {
        console.log("iframe not exist ");
          var myEl = angular.element( document.querySelector( '#main_frame' ) );
    myEl.append('<iframe id="frame1" width="560" height="315" src="'+$scope.video_url+'" frameborder="0" allowfullscreen></iframe>');  
    
      }
      else
      {
        // iframe already exists on the page
        console.log("iframe already existing ");
        already_existing_iframe.remove();
        var myEl = angular.element( document.querySelector( '#main_frame' ) );
    myEl.append('<iframe id="frame1" width="560" height="315" src="'+$scope.video_url+'" frameborder="0" allowfullscreen></iframe>');  
      }
    };
    
   /* function()
    {
        console.log("called main controller for video url ");
        return "https://www.youtube.com/embed/7V6FGF1ffgQ";
    };*/

});
