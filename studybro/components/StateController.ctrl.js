'use strict';
angular.module('hmModule').controller("StateController", function($rootScope, $scope,$state,urls,StateService) 
{
	console.log('State Controller called');
	console.log($state.current.name);
	console.log('StateService :');
	//var currentPageState=newStateManager();
	//console.log(currentPageState);
	console.log(StateService.getState(urls.STATES_API+$state.current.name));
	var mainResponse=StateService.getState(urls.STATES_API+$state.current.name);
	//console.log(StateService.getState(mainResponse._embedded.state["0"]._links.tabs.href));
	$scope.tabsArray=[];
	$scope.tabsArray=StateService.getState(mainResponse._embedded.state["0"]._links.tabs.href)._embedded.tabs;
	$scope.tabsArray.AllUrList=[];
	angular.forEach($scope.tabsArray, function(value, key) 
	{
  		$scope.tabsArray.AllUrListpush(value);
	};

	

	console.log($scope.tabsArray);

	
});



/*/sb/state/search/findBystatename?statename*/