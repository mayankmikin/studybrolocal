'use strict';
angular.module('hmModule').controller("AdminController", function($rootScope, $scope,noty,errors,MenuService,VideoService,ValidationServcie) 
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


	/*code to add a subjects videos*/
	/*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx*/

	$scope.subjects=VideoService.getSubjectNames();
	$scope.addVideo=
	{
		videourl: "",
		videoname:"",
		subjectname:"",
		classname:"",
		semester:"",
			price_status:'FREE',
			headline:"",
			review_counts:"",
			ratings:"2"
		

	};
	$scope.Addsubmit=function()
	{
		VideoService.addVideo($scope.addVideo).then(function(data) {
            
            setSuccessMessage('Video Added successfully');
        }, function(error) 
        {
           
          setErrorMessage("Error occured"+error);
        });
        reset();

	};

	$scope.newsubject=null;
	$scope.addnewsubject=function()
	{
		if(ValidationServcie.nullcheck($scope.newsubject))
		{
		var apiResponse=VideoService.createSubject($scope.newsubject)

            if (apiResponse=="success") {
            	setSuccessMessage('Subject created successfully');
            } else {
            	 setErrorMessage("Error occured");
            }
            
        	reset();
        }
        else
        {
        	setErrorMessage(errors.NULL_CHECK);
        }
	};

	$scope.successMessage = '';
    $scope.errorMessage = '';

	function setErrorMessage(errorMessage) {
        $scope.errorMessage = errorMessage;
    }

    function setSuccessMessage(successMessage) {
        $scope.successMessage = successMessage
    }
    function clearErrorAndSuccessMessages() {
        $scope.errorMessage = '';
        $scope.successMessage = '';
    }

    function reset()
    {
    	$scope.addVideo=
		{
			videourl: "",
			videoname:"",
			subjectname:"",
			classname:"",
			semester:""

		};
		$scope.newsubject=null;
    }

    $scope.noty = noty; // notify service
    
    /* test notify */
   // noty.add({title:'Welcome',body:'Hello. This is an alert message'});


});
    