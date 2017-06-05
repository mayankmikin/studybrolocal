'use strict';
angular.module('hmModule').factory('RegisterService',
    ['$localStorage','$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) 
        {

            var factory = {
                saveuser:saveuser
            };

            return factory;


            function saveuser(user)
            {
            	console.log(user)
            	/*var apiResponse;
                 $.ajax({
                async: false,
                type: 'POST',
                data: user,
                url: urls.USER_ADD_API,
                crossDomain: true,
                contentType: "application/json",
                success: function(response) 
                {
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
        
                return apiResponse;*/
                var deferred = $q.defer();
                var url = urls.USER_ADD_API;
                $http.post(url, user)
                    .then(
                        function (response) {
                            deferred.resolve(response);
                        },
                        function (errResponse) {    
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;

            }


        }// factory function ends here 
]);