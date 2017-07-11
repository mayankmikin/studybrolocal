var app = angular.module('hmModule', ['ui.router', 'ngStorage', 'ngCookies','ui.bootstrap',"ngSanitize",
            'com.2fdevs.videogular',
            "com.2fdevs.videogular.plugins.controls",
            "com.2fdevs.videogular.plugins.overlayplay",
            "com.2fdevs.videogular.plugins.poster",
            "com.2fdevs.videogular.plugins.buffering"]);
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
    VIDEO_ADD_API:"http://localhost:8088/sb/video/create",
    VIDEO_ADD_SUBJECT:"http://localhost:8088/sb/subject/create",
    SUBJECT_NAME_API:"http://localhost:8088/sb/subject/all",
    MENU_ITEM_ADD_API: "http://localhost:8088/sb/menu/create",
    MENU_ITEM_ALL_API: "http://localhost:8088/sb/menu/all",
    USER_ADD_API: "http://localhost:8088/sb/user/register",
    USER_LOGIN_API:"http://localhost:8088/sb/user/login",
    VIDEO_ADD_DESCRIPTION_BY_VIDEO_ID:"http://localhost:8088/sb/video/getDesc",
    STATES_API:"http://localhost:8088/sb/state/search/findBystatename?statename="
});

app.constant('errors', {
    WRONG_CREDENTIALS: 'Incorrect username/password !',
    NULL_CHECK:'Field Cannot Be Empty',
    EXCLAIM_ERROR:'Error!',
    FOLLOWUP_MESSAGE_REGISTER_FAILURE:'Change a few things up and try submitting again..'
});
app.constant('success', {
    EXCLAIM_CONGRATS:'Congratulations!',
    FOLLOWUP_MESSAGE_REGISTERED: 'You have successfully Registered.'
});
app.constant('context', {
    PAGESIZE: '3'

});


app.config(function ($provide) {
   $provide.decorator('$exceptionHandler', ['$delegate', '$window', 'stacktraceService',
        function ($delegate, $window, stacktraceService) {

            return function (exception, cause) {

              $delegate(exception, cause);

                var stacktrace = stacktraceService.print($window, exception);

                var clientSideErrorInfo = {
                    cause: cause || '', // the cause of the issue
                    message: exception.message, // the message in the exception
                    url: $window.location.href, // the location in the browser's address bar when error occurred
                    stacktrace: stacktrace.join('\n') // join array items to populate a string
                };

                console.log(clientSideErrorInfo.stacktrace);

            };

        }
    ]);
});


app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider, $provide) {

        $stateProvider
        .state('contact', {
                url: '/contact',
                templateUrl: 'angulartemplates/contact.html',
                controller: 'ContactController',
                requireLogin: false
            })
        .state('home', {
                url: '/home',
                templateUrl: 'angulartemplates/home.html',
                controller: 'MainController',

                requireLogin: false

            })
            .state('login', {
                url: '/login',
                templateUrl: 'angulartemplates/login.html',
                controller: 'LoginController',
                requireLogin: false
            })
            .state('error', {
                url: '/error',
                templateUrl: 'angulartemplates/notfound.html',
                controller: 'MainController',
                requireLogin: false

            })
            .state('BCA', {
                url: '/BCA',
                templateUrl: 'angulartemplates/bca.html',
                controller: 'StateController',
                requireLogin: false

            })
            .state('MCA', {
                url: '/MCA',
                templateUrl: 'angulartemplates/mca.html',
                controller: 'StateController',
                requireLogin: false

            })
            .state('BTECH', {
                url: '/BTECH',
                templateUrl: 'angulartemplates/btech.html',
                controller: 'StateController',
                requireLogin: false

            })
            .state('watch', {
                url: '/watch',
                templateUrl: 'angulartemplates/videopanel.html',
                controller: 'VpanelController',
                controllerAs: 'controller',
                requireLogin: false

            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'angulartemplates/adminpanel.html',
                controller: 'AdminController',

                requireLogin: false

            })
            
            /*;
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
             .state('Register', {
                url: '/register',
                templateUrl: 'angulartemplates/register.html',
                controller: 'RegisterController',

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

            });*/
           

        $urlRouterProvider.otherwise('/error');
        // $provide provider is used to register the components in angular internally.

    }
]);


app.run(function ($rootScope, $location, $state, LoginService, $localStorage, $sessionStorage, $cookieStore, $window) {
   
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) 
    {
            console.log('Changed state to: ');
            console.log(toState);
            if(toState.name=='home')
            {
                $rootScope.showcarousel=true;
            }
            else
            {
                $rootScope.showcarousel=false;
            }

            /*var requireLogin = toState.requireLogin;
            // stopping user from going to any page using URL if not loggged in already
            if (requireLogin && typeof $rootScope.currentUser === 'undefined') {


                console.log("user alreadynot logged in");
                event.preventDefault();

            } else {
                if ($cookieStore.get('loggedin') == 'false' && $localStorage.user != null) {

                    LoginService.clearUserVariables();
                    $location.path('/');
                } else if (($rootScope.authvariables != undefined)) {
                    if (!($rootScope.authvariables.ClientsInfo["0"].ui_roles[$rootScope.authvariables.role["0"]].permissions.states.indexOf(toState.name) > -1)) {
                        console.log("user not authorized to view this page ");
                        event.preventDefault();
                    }
                }
            }

            $rootScope.title = 'Nv | ' + ($location.$$path).replace('/', '');
*/
        });

    // check if user is already logged-in
    /*if ($localStorage.user != null) 
    {
        //transfer user variables from localstorage to root scope 
        LoginService.provideUserVariables();
        //  $state.transitionTo('home');
        $location.path('/home');

    } else {
        if (!LoginService.isAuthenticated()) {
            $state.transitionTo('login');
        }

    }*/

});

app.filter('trustUrl', function ($sce) 
    {
         return function (url) 
         {
            return $sce.trustAsResourceUrl(url);
        };
    });


