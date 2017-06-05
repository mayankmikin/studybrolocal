'use strict';

angular.module('hmModule').factory('VideoService',
    ['$localStorage','$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) 
        {

            var factory = {
                getLandingVideo : getLandingVideo,
                getVideoLibrary: getVideoLibrary 
            };

            return factory;

            function getLandingVideo() 
            {
            	var apiResponse;
				 $.ajax({
                async: false,
                type: 'GET',
                url: urls.VIDEO_SERVICE_API,
                crossDomain: true,
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
				
            }
            function getVideoLibrary()
            {
                var apiResponse;
                 $.ajax({
                async: false,
                type: 'GET',
                url: urls.VIDEO_SERVICE_API,
                crossDomain: true,
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
            }
        }
    ]);