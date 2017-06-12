'use strict';

angular.module('hmModule').factory('LoginService',
    ['$localStorage','$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) 
        {

            var factory = 
            {
                login : login 
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

        }]);