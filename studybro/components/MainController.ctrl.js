'use strict';
angular.module('hmModule').controller("MainController", function ($scope, $rootScope, $stateParams, $state, $location, $window,$timeout,$sce,context,VideoService) 
{
    console.log("MainController called");

    /*xxxxxxxxxxxxxxxxxxxxx   VideoLibrary Functions xxxxxxxxxxxxxxxx*/
    $scope.pagesize=context.PAGESIZE;
  $scope.currentPage=1;
  $scope.currentPageArray=[];
  $scope.start=0;
  $scope.end=$scope.currentPage*$scope.pagesize;
  $scope.inmemorypages=[];
  $scope.subjectVideoArray=[];    
        var videoresponse=VideoService.getSubjectNames();
        // the above call will get you all subjects and their video urls
        for(var sub of videoresponse)
        {

          var obj={currentPage:1 , totalength:sub.videourls.length , noOfPages:Math.round(sub.videourls.length/$scope.pagesize)};
          $scope.currentPageArray[sub.subname]=[];
            $scope.currentPageArray[sub.subname].push(obj);

            $scope.subjectVideoArray[sub.subname]=[];
            $scope.subjectVideoArray[sub.subname].push(sub.videourls);

            // now adding inmemory pages 
            //inmemory pages are the actual object having video url and subject properties
            $scope.inmemorypages[sub.subname]=[];
            for(var i=0;i<$scope.pagesize;i++)
            { 
              if(sub.videourls.length>=1)
              $scope.inmemorypages[sub.subname].push(sub.videourls[i]);
            // adding description to video by sending video id 
            sub.videourls[i].description=VideoService.getVideoDescriptionById(sub.videourls[i].id)["0"];


            }

            //for(var vid of sub.videourls)
            //{
              // vid.url_name=$sce.trustAsResourceUrl(vid.url_name);
           //}
        }

        $scope.subjects=videoresponse;
        //$scope.subjects=VideoService.getSubjectNames();
        console.log('pagination array');
        console.log($scope.currentPageArray);
        console.log('in memory page array');
        console.log($scope.inmemorypages);

        //$scope.NPages=Math.round($scope.videos.length/$scope.pagesize);
        $scope.changepage=function(requestedpage,subname)
        {
            /*$scope.currentPage=requestedpage;
            $scope.start=$scope.pagesize*page-$scope.pagesize;
            $scope.end=page*$scope.pagesize;*/
            console.log('requested page is ');
            console.log(requestedpage);
            console.log('subjectname is ');
            console.log(subname);
            var startindex=$scope.pagesize*requestedpage-$scope.pagesize;
            var endindex=startindex+$scope.pagesize;
            for(var i=0;i<$scope.pagesize;i++)
            {

        var already_existing_iframe=angular.element( document.querySelector( '#'+subname+'-'+(i+1) ) );
        // iframe already exists on the page
        console.log("iframe already existing ");
        //already_existing_iframe.remove();
        //var myEl = angular.element( document.querySelector( '#main_frame' ) );
        //myEl.append('<iframe id="frame1" width="560" height="315" src="'+$scope.video_url+'" frameborder="0" allowfullscreen></iframe>');  
             if($scope.subjectVideoArray[subname]["0"][startindex])
             {

                  $scope.inmemorypages[sub.subname][i]=$scope.subjectVideoArray[subname]["0"][startindex];

                    if(already_existing_iframe)
                    {

                      already_existing_iframe.attr("src", $scope.inmemorypages[sub.subname][i].url_name);  
                    
                    }
                    else
                    {
                      
                      already_existing_iframe.attr("style", "visibility: hidden;");  

                    }
                    $scope.currentPageArray[subname]["0"].currentPage=requestedpage;
                    startindex++;
              }// if ends here 
            
            } /*for ends here */
      
        }

         $scope.pagelimits = function() 
         {
             return $scope.pagesize;
          }

          $scope.getcurrentPage=function (subname)
          {
            return $scope.currentPageArray[subname]["0"].currentPage;

          }
          $scope.getotalengthofsubject=function (subname)
          {
            return $scope.currentPageArray[subname]["0"].totalength;
            
          }
          $scope.nofpages=function (subname)
          {
            var totalength=$scope.getotalengthofsubject(subname);
            var noOfpages=Math.round(totalength/$scope.pagesize);
            var pagearray=[];
              for(var i=0;i<noOfpages;i++)
              {
                 pagearray.push(i+1);
              }
             return pagearray;
          }

      $scope.getInmemorypages=function(subname)
      {
        return $scope.inmemorypages[sub.subname];
      };

      $scope.range = function(count)
      {

        var ratings = []; 

        for (var i = 0; i < count; i++) { 
          ratings.push(i) 
        } 

        return ratings;
      };


});
