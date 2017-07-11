'use strict';
angular.module('hmModule').factory('StateService',
    ['$localStorage','$http', '$q', 'urls','GetPostService',
        function ($localStorage, $http, $q, urls,GetPostService) 
        {

            var factory = 
            {
                getState:getState
            };

            return factory;

           function getState(urL) 
        	{
				return GetPostService.getCall(urL,null);
            }

        }

    ]);