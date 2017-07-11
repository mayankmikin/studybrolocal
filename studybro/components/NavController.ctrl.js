'use strict';
angular.module('hmModule').controller("NavController", function($rootScope, $scope,MenuService,LoginService) {
    $scope.showChilds = function(item) 
    {
        item.active = !item.active;
    };
    $scope.menuitems=[{name:'home',subItems:[]},{name:'Courses',subItems:[]},
    {name:'browse videos',subItems:[{name:'BCA'},{name:'MCA'},{name:'Btech'},{name:'XI'},{name:'XII'}]},
    {name:'login',subItems:[]},
 /*   {name:'sign up',subItems:[]},*/
    {name:'contact us',subItems:[]}];

    $scope.setActive = function(menuItem) 
    {
        $scope.activeMenu = menuItem;
    }
    $scope.activeMenu = $scope.menuitems[0].name;
    
   // $rootScope.items = MenuService.getall();
    $scope.logout=function ()
        {
            
            LoginService.logout();

        };

});
