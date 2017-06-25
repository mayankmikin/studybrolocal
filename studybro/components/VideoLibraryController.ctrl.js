angular.module('hmModule').controller("VLController", 
['$rootScope', '$scope','context','VideoService',function($rootScope, $scope,context,VideoService) 
{

	$scope.pagesize=context.PAGESIZE;
	$scope.currentPage=1;
	$scope.start=0;
	$scope.end=$scope.currentPage*$scope.pagesize;
	/*$scope.videos = [
        {name:'Jani',country:'Norway'},
        {name:'Carl',country:'Sweden'},
        {name:'Margareth',country:'England'},
        {name:'Hege',country:'Norway'},
        {name:'Joe',country:'Denmark'},
        {name:'Gustav',country:'Sweden'},
        {name:'Birgit',country:'Denmark'},
        {name:'Mary',country:'England'},
        {name:'Kai',country:'Norway'}
        ];*/

        $scope.subjects=VideoService.getSubjectNames();
        // above call gets you all subjects along with the video urls
        
        $scope.subjectNames=[];
        $scope.videos=new Map();
        
        for(var sub of $scope.subjects)
        {
                $scope.subjectNames.push(sub.subname);
                $scope.videos.set(sub.subname,VideoService.getVideoLibrary(sub));
        }

        //$scope.NPages=Math.round($scope.videos.length/$scope.pagesize);
        $scope.changepage=function(page)
        {
        		$scope.currentPage=page;
        		$scope.start=$scope.pagesize*page-$scope.pagesize;
		        $scope.end=page*$scope.pagesize;
        }       

   
}]);
 