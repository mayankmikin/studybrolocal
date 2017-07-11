'use strict';
angular.module('hmModule').factory('GetPostService',
    ['$localStorage','$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) 
        {

            var factory = 
            {
                postCall:postCall,
                getCall:getCall
            };

            return factory;
    function postCall(urL,jsondata,)
    {
    	 var deferred = $q.defer();
     $http.post(urL, jsondata)
     .then(
            function (response) 
            {
                deferred.resolve(response);
            },
            function (errResponse)
            {    
                deferred.reject(errResponse);
            }
          );
    return deferred.promise;
    }
    function getCall(urL,param)
    {
    	var apiResponse;
    	if(param!="" && param!=null)
    	{
    	
	                 $.ajax({
	                async: false,
	                type: 'GET',
	                url: urL,
	                crossDomain: true,
	                data: param,
                    headers:
                    {
                        "Authorization": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1cGFzYW5hbmFncGFsMDhAZ21haWwuY29tIiwiZXhwIjoxNTAwMTkwMjQxfQ.zH4o34n4n9tItKGn2nPe69vG_ZP9W1t7WRo12qmeazXReZUiDOEFzRErlHYVLiQy73cYA-gVrBHPibLhQrY8BQ",
                        "Content-Type": "application/json"
                    },
	                success: function(response) {
	                       //console.log("response is ");
	                  console.log(response);
	                },
	                complete: function(xhr, textStatus) {
	                    //console.log(xhr);
	                }
	            }).done(function(response) 
	                    {
	               // console.log(response);
	                apiResponse = response;
	            });

                
            }
            else 
            {
            	$.ajax({
	                async: false,
	                type: 'GET',
	                url: urL,
	                crossDomain: true,
                    beforeSend : function(xhr) {
                      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                      xhr.setRequestHeader("Authorization", "Bearer "+"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1cGFzYW5hbmFncGFsMDhAZ21haWwuY29tIiwiZXhwIjoxNTAwMTkwMjQxfQ.zH4o34n4n9tItKGn2nPe69vG_ZP9W1t7WRo12qmeazXReZUiDOEFzRErlHYVLiQy73cYA-gVrBHPibLhQrY8BQ");
                    },
                    
	                success: function(response) {
	                      // console.log("success response is ");
	                  //console.log(response);
	                },
	                complete: function(xhr, textStatus) {
	                    //console.log(xhr);
	                }
	            }).done(function(response) 
	                    {
	                //console.log(response);
	                apiResponse = response;
	            });
            }
            return apiResponse;
    }

  }

]);

