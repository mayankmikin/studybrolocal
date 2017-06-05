var app = angular.module('hmModule', ['ui.router', 'ngStorage', 'ngCookies']);
//var appp = angular.module('hmModule',[]);
var StacktraceService = function () { }
StacktraceService.prototype.print = function ($window, exception) {
    return $window.printStackTrace({
        e: exception
    });
};

angular.module('hmModule').service('stacktraceService', StacktraceService);
app.constant('urls', {

   // VIDEO_SERVICE_API:"https://still-tor-67248.herokuapp.com/sb/landing/video"
    VIDEO_SERVICE_API:"http://localhost:8088/sb/landing/video",
    VIDEO_Library_API:"http://localhost:8088/sb/landing/videolibrary",
    MENU_ITEM_ADD_API: "http://localhost:8088/sb/menu/create",
    MENU_ITEM_ALL_API: "http://localhost:8088/sb/menu/all"
});

app.constant('errors', {
    WRONG_CREDENTIALS: 'Incorrect username/password !'

});
app.constant('context', {
    PAGESIZE: '3'

});


app.config(function ($provide) {
    // $provide provider is used to register the components in angular internally.

    // use decorator to customise the behaviour of a service. 
    $provide.decorator('$exceptionHandler', ['$delegate', '$window', 'stacktraceService',
        function ($delegate, $window, stacktraceService) {

            // exception: exception associated with the error
            // cause: optional information about the context in which the error was thrown.

            return function (exception, cause) {

                // $delegate: provides the original service to the method which is used to call the base implementation
                // of $exceptionHandler service which internally delegates to $log.error.
                $delegate(exception, cause);

                var stacktrace = stacktraceService.print($window, exception);

                var clientSideErrorInfo = {
                    cause: cause || '', // the cause of the issue
                    message: exception.message, // the message in the exception
                    url: $window.location.href, // the location in the browser's address bar when error occurred
                    stacktrace: stacktrace.join('\n') // join array items to populate a string
                };

                console.log(clientSideErrorInfo.stacktrace);

                // below code will send error to our server where we can log the errors of application and create an alert---[Mayank]

                // the angular $http service cannot be used in the $log 
                // decorator because it will cause a circular dependecy.
                // to overcome this  a direct ajax call should be made.
                // $.ajax({
                //   type: 'POST',
                //   url: '/logger/log', // this is the server end-point where you can log this error
                //   contentType: 'application/json; charset=UTF-8',
                //   data: JSON.stringify(clientSideErrorInfo)
                // });
                //$window.alert("Something went wrong please contact ADMIN ");

            };

        }
    ]);
});

app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider, $provide) {

        $stateProvider
    
           /* .state('login', {
                url: '/login',
                templateUrl: 'angulartemplates/fancylogin.html',
                controller: 'LoginController',

                requireLogin: false

            })*/
            .state('home', {
                url: '/home',
                templateUrl: 'angulartemplates/home.html',
                controller: 'MainController',

                requireLogin: false

            })
            .state('vvdav', {
                url: '/vvdav',
                templateUrl: 'angulartemplates/vvdav.html',
                controller: 'VLController',

                requireLogin: false

            })
             .state('Physics', {
                url: '/Physics',
                templateUrl: 'angulartemplates/vvdav.html',
                controller: 'VLController',

                requireLogin: false

            })
             .state('Chemistry', {
                url: '/Chemistry',
                templateUrl: 'angulartemplates/vvdav.html',
                controller: 'VLController',

                requireLogin: false

            })
             .state('admin', {
                url: '/admin',
                templateUrl: 'angulartemplates/adminpanel.html',
                controller: 'AdminController',

                requireLogin: false

            })
            .state('error', {
                url: '/error',
                templateUrl: 'angulartemplates/error.html',
                controller: 'MainController',

                requireLogin: false

            });
           

        $urlRouterProvider.otherwise('/error');
        // $provide provider is used to register the components in angular internally.

    }
]);



