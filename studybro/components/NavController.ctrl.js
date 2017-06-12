'use strict';
angular.module('hmModule').controller("NavController", function($rootScope, $scope,MenuService) {
    $scope.showChilds = function(item) 
    {
        item.active = !item.active;
    };

    /*$rootScope.items = [{
        name: "home",
        subItems: [],
        iconClass: "glyphicon glyphicon-home"
    },
    {name: "Subjects",
        subItems: [
            { name: "Physics", state: "Physics", iconClass: "icon-bar-chart" },
            {name:"Chemistry", state:"Chemistry",iconClass: "icon-bar-chart"}
        ],
        iconClass: "icon-home"
    },
    {name: "Browse Videos",
        subItems: [
            { name: "Weekly Dashboard", state: "Dashboard1", iconClass: "icon-bar-chart" },
            {name:"DashboardAllClients", state:"DashboardAllClients",iconClass: "icon-bar-chart"}
        ],
        iconClass: "icon-home"
    },
    {name: "Create Playlist",
        subItems: [
            { name: "Weekly Dashboard", state: "Dashboard1", iconClass: "icon-bar-chart" },
            {name:"DashboardAllClients", state:"DashboardAllClients",iconClass: "icon-bar-chart"}
        ],
        iconClass: "icon-home"
    },
    {name: "vvdav",
        subItems: [
            { name: "Weekly Dashboard", state: "Dashboard1", iconClass: "icon-bar-chart" },
            {name:"DashboardAllClients", state:"DashboardAllClients",iconClass: "icon-bar-chart"}
        ],
        iconClass: "icon-home"
    },
    {name: "Boards Preparations",
        subItems: [],
        iconClass: "icon-home"
    }
    ];*/
    
    $rootScope.items = MenuService.getall();


});

function expandMe(e) {
    console.log(e);
   // console.log(id);
    var event = window.event;
    //console.log(event);
    var targetClassName = event.target.className;
    console.log("target classname " + event.target.className);
    console.log(" target parentElement classname "+event.target.parentElement.className);
   
    
if (targetClassName != "")
   { if ($(e).hasClass("open")) {
        var subMenu = $(e).find("ul.sub-menu");
        $(e).removeClass("open");
        $(e).removeClass("active");
        var spanArrow = $(e).find("span.arrow");
        $(spanArrow).removeClass("open");
        $(this).removeClass("open");
        //var subMenu = $(e).find("ul.sub-menu");
        $(subMenu).css("display", "none");
        var spanselected = $(e).find("span.selected");
        $(spanselected).css("display", "none");
    } else {
        var mainUl = $(e).closest("ul");
        var navItems = $(mainUl).find("li.nav-item");
        for (var i = 0; i < navItems.length; i++) {
            $(navItems[i]).removeClass("active");
            $(navItems[i]).removeClass("open");
            var spanArrow = $(navItems).find("span.arrow");
            $(spanArrow).removeClass("open");
            $(this).addClass("open");
            var subMenu = $(navItems).find("ul.sub-menu");
            $(subMenu).css("display", "none");
            var spanselected = $(navItems).find("span.selected");
            $(spanselected).css("display", "none");
        }

        $(e).addClass("open");
        $(e).addClass("active");
        var spanArrow = $(e).find("span.arrow");
        $(spanArrow).addClass("open");
        $(this).addClass("open");
        var subMenu = $(e).find("ul.sub-menu");
        $(subMenu).css("display", "block");
        var spanselected = $(e).find("span.selected");
        $(spanselected).css("display", "block");
    }
}
}

