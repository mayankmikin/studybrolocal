'use strict';

angular.module('hmModule').factory('LoginService',
    ['$localStorage','$cookieStore','$http', '$q','$rootScope', 'urls',
        function ($localStorage,$cookieStore, $http, $q, urls,$rootScope) 
        {

            var factory = 
            {
                login : login ,
                setVariables:setVariables,
                logout:logout
            };

            return factory;

            function login(user)
            {
            	var apiResponse;
                 $.ajax({
                async: false,
                type: 'GET',
                url: urls.USER_LOGIN_API,
                crossDomain: true,
                data:{emailid:user.emailid,password:user.password},
                success: function(response) {
                       console.log("response is ");
                  console.log(response);
                },
                complete: function(xhr, textStatus) {
                    //console.log(xhr);
                }
            }).done(function(response) 
                    {
                console.log(response);
                apiResponse = response;
            });

                return apiResponse;

            };

            function setVariables(response)
            {

                $rootScope.userProp=response;
                $rootScope.isUserLoggedIn=true;
                $cookieStore.put('userstore',response);
                $cookieStore.put('isLoggedIn','true');

            };
            function logout()
            {
                
                delete $rootScope.userProp;
                delete $rootScope.isUserLoggedIn;
                $cookieStore.put('userstore','');
                $cookieStore.put('isLoggedIn','false');
                
            };
            

        }]);