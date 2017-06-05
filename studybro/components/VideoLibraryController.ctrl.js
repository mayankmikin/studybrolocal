angular.module('hmModule').controller("VLController", 
['$rootScope', '$scope','context',function($rootScope, $scope,context) 
{

	$scope.pagesize=context.PAGESIZE;
	$scope.currentPage=1;
	$scope.start=0;
	$scope.end=$scope.currentPage*$scope.pagesize;
	$scope.names = [
        {name:'Jani',country:'Norway'},
        {name:'Carl',country:'Sweden'},
        {name:'Margareth',country:'England'},
        {name:'Hege',country:'Norway'},
        {name:'Joe',country:'Denmark'},
        {name:'Gustav',country:'Sweden'},
        {name:'Birgit',country:'Denmark'},
        {name:'Mary',country:'England'},
        {name:'Kai',country:'Norway'}
        ];
        $scope.NPages=Math.round($scope.names.length/$scope.pagesize);
        $scope.changepage=function(page)
        {
        		$scope.currentPage=page;
        		$scope.start=$scope.pagesize*page-$scope.pagesize;
				$scope.end=page*$scope.pagesize;
        }
}]);
 