'use strict';
angular.module('hmModule').factory('MenuService',
    ['$localStorage','$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) 
        {

            var factory = {
                saveMenuItem : saveMenuItem,
                //editMenuItem: editMenuItem
                getall:getall 
            };

            return factory;

        
        // we are creatin this function inside this module bcoz we want to use urlsand localstorage
        function saveMenuItem(menuitem)
            {
                var apiResponse;
                 $.ajax({
                async: false,
                type: 'POST',
                data: menuitem,
                url: urls.MENU_ITEM_ADD_API,
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

            function getall()
            {
            	
            	var apiResponse;
                 $.ajax({
                async: false,
                type: 'GET',
                //data: menuitem,
                url: urls.MENU_ITEM_ALL_API,
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

        }// factory function ends here 
]);

			