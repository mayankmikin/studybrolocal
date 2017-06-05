'use strict';
angular.module('hmModule').controller("AdminController", function($rootScope, $scope,MenuService) 
{
	//$scope.menuitems=[];
	$scope.menuitems=MenuService.getall();
	$scope.subItems=[];
	$scope.menuitem=
	{
		name:"",
		subItems: [],
        iconClass: ""
	};

	$scope.subItem=
	{
		name: "", 
		state: "", 
		iconClass:""
	};

	$scope.saveSubitem= function(subitem)
	{
		$scope.subItems.push({name: subitem.name, 
		state: subitem.state, 
		iconClass:subitem.iconClass});

	};

	$scope.saveMenuItem=function(menuitem)
	{
		$scope.menuitems.push({
			name:menuitem.name,
		subItems: $.extend({}, [], menuitem.subItems),
        iconClass:menuitem.iconClass
			});
		console.log($scope.menuitems);
		var response=MenuService.saveMenuItem(menuitem);
		console.log(response);

	};

	$scope.editMenuItem;
	$scope.editSubMenuItem;
	$scope.currentEditIndex=-1;
	$scope.currentSubMenuEditIndex=-1;

	$scope.editSubMenu=function(index)
	{
		console.log('editing sub menu item at index');
		console.log($scope.menuitems[$scope.currentEditIndex].subItems[index]);
		$scope.editSubMenuItem=$scope.menuitems[$scope.currentEditIndex].subItems[index];
		$scope.currentSubMenuEditIndex=index;
	};

	$scope.editMenu=function(index)
	{
		console.log('editing menu item at index');
		console.log($scope.menuitems[index]);
		$scope.editMenuItem=$scope.menuitems[index];
		$scope.currentEditIndex=index;
	};

	$scope.saveditchanges=function()
	{
		console.log($scope.currentEditIndex);
		if($scope.currentEditIndex!=-1)
		{
			$scope.menuitems[$scope.currentEditIndex]=$scope.editMenuItem;
			if($scope.currentSubMenuEditIndex!=-1)
			{

$scope.menuitems[$scope.currentEditIndex].subItems[$scope.currentSubMenuEditIndex]=$scope.editSubMenuItem;
			
			}
		}
		else
		{
			console.log("error while editing");
		}
		// refreshing variables to maintain idempotency
		$scope.editMenuItem='';
		$scope.editSubMenuItem='';
		$scope.currentEditIndex=-1;
		$scope.currentSubMenuEditIndex=-1;

	};

	$scope.savedSubmenuchanges=function()
	{
		if($scope.currentSubMenuEditIndex!=-1)
			{

$scope.menuitems[$scope.currentEditIndex].subItems[$scope.currentSubMenuEditIndex]=$scope.editSubMenuItem;
			
			}

			$scope.editSubMenuItem='';
			$scope.currentSubMenuEditIndex=-1;

	};


});
    