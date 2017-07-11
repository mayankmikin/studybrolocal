'use strict';
angular.module('hmModule').controller("LoginController", function($rootScope, $scope,$state,errors,success,LoginService,RegisterService) 
{
		$rootScope.userProp='';
		$rootScope.isUserLoggedIn=false;
		$scope.user=
		{
			emailid: '',
			password: ''
		};
		$scope.errorOccured='';
		$scope.formSubmit= function()
		{
			console.log('user tried to login');
			console.log($scope.user);
			var response=LoginService.login($scope.user);
			if(response)
			{
				//$rootScope.userProp=response;
				$state.transitionTo('home');
				//$rootScope.isUserLoggedIn=true;
				//$cookieStore.put('userstore',response);
				LoginService.setVariables(response);
			}
		};
		console.log('login controller called');
		console.log($scope.user);


/*new Login form changes*/
		
		$scope.makeActive=function()
		{
			
		var elemnt1=angular.element( document.querySelector( '#login-form' ) );
		var elemnt2=angular.element( document.querySelector( '#register-form' ) );
		var elemnt3=angular.element( document.querySelector( '#register-form-link' ) );
		var element4=angular.element( document.querySelector( '#login-form-link' ) );
		elemnt1.delay(100).fadeIn(100);
 		elemnt2.fadeOut(100);
		elemnt3.removeClass('  active');
		element4.addClass(' active ');

		};

		$scope.makeRegisterActive=function(e)
		{
			var elemnt1=angular.element( document.querySelector( '#register-form' ) );
		var elemnt2=angular.element( document.querySelector( '#login-form' ) );
		var elemnt3=angular.element( document.querySelector( '#login-form-link' ) );
		var elemnt4=angular.element( document.querySelector( '#register-form-link' ) );	
			elemnt1.delay(100).fadeIn(100);
 		elemnt2.fadeOut(100);
		elemnt3.removeClass(' active');
		elemnt4.addClass(' active');
			
		};

		$scope.register=function()
		{
			//console.log("user is");
			//console.log($scope.user);
			
			RegisterService.saveuser($scope.user).then(
                        function (response) {
                            
                           
                            //console.log('data is ');
                            //console.log(response.data);
                           console.log('response is');
							console.log(response);
							$rootScope.activealert=true;
							if(response.status==200)
							{
							$rootScope.exclaim=success.EXCLAIM_CONGRATS;
							$rootScope.followup=success.FOLLOWUP_MESSAGE_REGISTERED;
							}
							else
							{
								$rootScope.activealert=false;
								$scope.errorOccured=errors.FOLLOWUP_MESSAGE_REGISTER_FAILURE;
							}
						
                        },
                        function (errResponse) {    
                            console.log('error response is');
							console.log(errResponse);
                            $rootScope.activealert=false;
							$scope.errorOccured=errors.FOLLOWUP_MESSAGE_REGISTER_FAILURE;
						

							
                        }
                        
                    );
		
			
		};

		$scope.user=
	{
	 username:"",
	 email:"",
	 password:"",
	 phonenumber:""

	};
		
});