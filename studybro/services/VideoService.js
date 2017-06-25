'use strict';

angular.module('hmModule').factory('VideoService',
    ['$localStorage','$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) 
        {

            var factory = {
                getLandingVideo : getLandingVideo,
                getVideoLibrary: getVideoLibrary,
                getSubjectNames: getSubjectNames,
                addVideo: addVideo,
                createSubject:createSubject,
                getVideoDescriptionById:getVideoDescriptionById

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
            function getVideoLibrary(subname)
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

            function getSubjectNames(subname)
            {

                 var apiResponse;
                 $.ajax({
                async: false,
                type: 'GET',
                url: urls.SUBJECT_NAME_API,
                crossDomain: true,
                data:subname,
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

                return apiResponse;

            }

            function addVideo(video) 
            {
                var deferred = $q.defer();
                var url = urls.VIDEO_ADD_API;
                $http.post(url, video)
                    .then(
                        function (response) {
                            deferred.resolve(response);
                        },
                        function (errResponse) {    
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
                
                /* $.post(urls.VIDEO_ADD_API,
                {
                        videourl: video.videourl,
                        videoname:video.videoname,
                        subjectname:video.subjectname,
                        classname:video.classname,
                        semester:video.semester
                },*/
               
               


            }
             function createSubject(subject) 
            {
                var apiResponse;
                 $.post(urls.VIDEO_ADD_SUBJECT,
                {
                    subname: subject
                },
                function(data, status)
                {
        console.log("Data: " + data + "\nStatus: " + status);
            apiResponse=status;
                });
                 return apiResponse;
            }

            function getVideoDescriptionById(id)
            {
                
                 var apiResponse;
                 $.ajax({
                async: false,
                type: 'GET',
                url: urls.VIDEO_ADD_DESCRIPTION_BY_VIDEO_ID,
                crossDomain: true,
                data:{id:id},
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

                return apiResponse;
            }

        }
    ]);