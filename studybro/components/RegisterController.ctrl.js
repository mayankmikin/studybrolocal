'use strict';
angular.module('hmModule').controller("RegisterController", function ($scope, $rootScope, $stateParams, $state, $location, $window,$timeout,RegisterService)
{
	$rootScope.apptitle="Study BRO";

	$scope.user=
	{

	 firstName:"",
	 lastName:"",
	 username:"",
	 email:"",
	 password:"",
	 phonenumber:""

	};
	$scope.submit=function()
	{
		//console.log("user is");
		//console.log($scope.user);
		var response=RegisterService.saveuser($scope.user);
		if(response)
		{
			console.log('response is');
			console.log(response);
			$rootScope.activealert=true;
		}

	};
	
});
