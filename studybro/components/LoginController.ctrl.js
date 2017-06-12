'use strict';
angular.module('hmModule').controller("LoginController", function($rootScope, $scope,$state,LoginService) 
{
		$rootScope.userProp='';
		$rootScope.isUserLoggedIn=false;
		$scope.user=
		{
			emailid: '',
			password: ''
		};

		$scope.formSubmit= function()
		{
			console.log('user tried to login');
			console.log($scope.user);
			var response=LoginService.login($scope.user);
			if(response)
			{
				$rootScope.userProp=response;
				$state.transitionTo('home');
				$rootScope.isUserLoggedIn=true;
			}
		};
		console.log('login controller called');
		console.log($scope.user);

});