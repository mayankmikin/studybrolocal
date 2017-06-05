'use strict';

angular.module('hmModule').factory('ErrorService',
    ['$localStorage','$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

            var factory = {
                createErrorMessage : createErrorMessage 
            };

            return factory;

            function createErrorMessage(errors) {
				var errorMessages = "";
				if(Array.isArray(errors)) {
					for(var i=0; i<errors.length; i++) {
						errorMessages = errorMessages + errors[i]+"\n";
					}
				} else {
					Object.keys(errors).forEach(function(key) {
						errorMessages = errorMessages + errors[key] + "\n";
					});
				}
				return errorMessages;
            }
        }
    ]);