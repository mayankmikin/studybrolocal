var mainModule = angular.module("hmModule", []);

function getHeaders() {
    var config = {headers: {
        'x-nv-api': '12345678987654321',
        'x-nv-user': '1001',
        'x-nv-key': '12345'
    }};
    return config;
}

function getConfigHeaders(configLink, fileName) {
    var config = {headers: {
        'x-nv-api': '12345678987654321',
        'x-nv-user': '1001',
        'x-nv-key': '12345',
        'config' : configLink,
        'name' : fileName
    }};
    return config;
}


mainModule.controller('dashboardController', function($scope,$rootScope,$http) {
	
	$rootScope.event="dashboard1Page";
	
	$scope.dashboard1=function() {
		$rootScope.event="dashboard1Page";
	}
});

mainModule.controller('domainController', function($scope,$rootScope,$http) {
	
	$scope.domains=function() {
		$rootScope.event="domainPage";
		$rootScope.DomainMessages = $rootScope.$new(true);
		 $http.get("http://nview.nviz.co:8180/hm/domains/all",getHeaders())
			.then(function(response) {
				if(response.data.statusCode == 1) {
					$rootScope.DomainMessages.errorMessage = createErrorMessage(response.data.response);
				} else {
					$rootScope.domains = response.data.response;
				}
		});
		 $http.get("http://nview.nviz.co:8180/hm/endpointurls/all",getHeaders())
			.then(function(response) {
					$rootScope.endpointurls = response.data;
		});
	}
	
	$scope.domainManagement=function() {
		$rootScope.event="domainManagementPage";
	}
});	

mainModule.controller('optimizationController', function($scope,$rootScope,$http) {
	
	$scope.optimizations=function() {
		$rootScope.event="optimizationsPage";
	}
});	

mainModule.controller('templateController', function($scope,$rootScope,$http) {
	
	$scope.templates=function() {
		$rootScope.event="templatesPage";
	}
});	

mainModule.controller('catalogController', function($scope,$rootScope,$http) {
	
	$scope.catalogView=function() {
		$rootScope.event="catalogViewPage";
	}
});	

mainModule.controller('urlRoutingController', function($scope,$rootScope,$http) {
	
	$scope.urlRouteConfig=function(configLink) {
		$rootScope.event="urlRoutingPage";
		
		var fileName = "";
		
		$http.get("http://nview.nviz.co:8180/hm/files/nicknames", getConfigHeaders(configLink, fileName))
		.then(function(response) {
			$rootScope.apacheConfiguration = response.data.response;
		});
		
	}
	
	$scope.save=function(fileName, fileContent, configLink) {
		$rootScope.event="urlRoutingPage";
		
		$http.get("http://nview.nviz.co:8180/hm/files/nicknames", getConfigHeaders(configLink, fileName))
		.then(function(response) {
			$rootScope.apacheConfiguration = response.data.response;
		});
		
	}
	
	$scope.fetchContent=function(configLink, fileName) {
		$rootScope.event="urlRoutingPage";
		
		$http.post("http://nview.nviz.co:8180/hm/files/edit", getConfigHeaders(configLink, fileName))
		.then(function(response) {
			$rootScope.apacheConfiguration = response.data.response;
		});
		
	}
});	



function createErrorMessage(errors) {
	//var errors = JSON.parse(response);
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
mainModule.controller('crawlerController', function($scope,$rootScope,$http) {
	$scope.crawler=function()
	{
		$rootScope.event = "crawlerPage";
		$rootScope.cpJSON = "";
		$http.get("http://nview.nviz.co:8180/hm/endpointurls/all",getHeaders())
				.then(function(response) {
					$rootScope.crawlerJSON = response.data;
				});
	}
	$scope.addCrawler=function(requestType){
		var CrawlerJSPURL = document.getElementById("CrawlerJSPURL").value;
		var CallBackJSPURL = document.getElementById("CallBackJSPURL").value;
		$rootScope.event = "crawlerPage";
		$rootScope.cpJSON = $rootScope.$new(true);
		if(CrawlerJSPURL != ""){
			if(CrawlerJSPURL.startsWith("http://")){
				if(CallBackJSPURL != ""){
					if(CallBackJSPURL.startsWith("http://")){
						$rootScope.crawlerJSON = $rootScope.$new(true);
						$http.post("http://nview.nviz.co:8180/hm/endpointurls/add", {"id":0, "crawlerURL":CrawlerJSPURL,"callbackURL":CallBackJSPURL},getHeaders())
						.success(function(response, status, headers, config){
								$rootScope.cpJSON = response.data;
								$rootScope.event = "crawlerPage";
								$http.get("http://nview.nviz.co:8180/hm/endpointurls/all",getHeaders())
										.then(function(response) {
											$rootScope.crawlerJSON = response.data;
										});
						     })
						   .error(function(data, status, header, config){
						     });
						/*$http.get("/hm/crawlerInfo.jsp?CrawlerJSPURL="+CrawlerJSPURL+"&CallBackJSPURL="+CallBackJSPURL+"&requestType="+requestType)
							.then(function(response) {
								if(response.data.StatusDescription==="Please Login")
								{
									window.location='/hm/login.jsp'
								}
								else {	
									$rootScope.crawlerJSON = response.data;
								}
						});*/
						
						
						/*$http.get("/hm/processOperation.jsp?event=crawler")
							.then(function(response) {
								if(response.data.StatusDescription==="Please Login")
								{
									window.location='/hm/login.jsp'
								}
								else {	
									$rootScope.crawlerJSON = response.data;
									$rootScope.event ="crawlerPage"; 
								}
						});*/
					}
					else{
						$rootScope.cpJSON.successMessage = "";
						$rootScope.cpJSON.errorMessage ="Please add protocol to CallBackJSP URL";
					}
				} else{
					$rootScope.cpJSON.successMessage = "";
					$rootScope.cpJSON.errorMessage ="Please enter CallBackJSP URL";
				}
			} else{
				$rootScope.cpJSON.successMessage = "";
				$rootScope.cpJSON.errorMessage ="Please add protocol to CrawlerJSP URL";
			}
		} else {
			$rootScope.cpJSON.successMessage = "";
			$rootScope.cpJSON.errorMessage ="Please enter CrawlerJSP URL";
		}
	}

	
});	
mainModule.controller('transformationController', function($scope,$rootScope,$http) {
	$scope.transformation=function()
	{
		$rootScope.event = "transformationPage";
		$rootScope.TransformationMessages = $rootScope.$new(true)
		$http.get("http://nview.nviz.co:8180/hm/transformations/all",getHeaders())
				.then(function(response) {
					if(response.data.statusCode == 1) {
						$rootScope.TransformationMessages.errorMessage = createErrorMessage(data.response);
					}else{
						$rootScope.transformations = response.data.response;
					}
				});
	}
});	




mainModule.controller('StatusController', function($scope, $rootScope , $http){
	
	$scope.status=function()
	{
	   $rootScope.event = "status";
         $http.get("/hm/getStatusPage.jsp")
				.then(function(result) {
					if(result.data.StatusDescription==="Please Login")
					{
							window.location='/hm/login.jsp'
					}
					else
					{	
						$rootScope.json = result.data;
						$rootScope.currentPage = 0;
						$rootScope.pageSize = 20;
						$rootScope.numberOfPages=function(){
						return Math.ceil($rootScope.json.HMRequestList.length/$rootScope.pageSize);
						}
					}
				});
	}
$scope.reset=function(requestId)
	{
  
			$rootScope.event = "confirmPage";
			var object = new Object();
			object.event="resetConfirm";
			object.requestId=requestId;
			$rootScope.confirmjson = object;
		
        
	}
});
mainModule.filter('firstPage', function() {
					return function(input, start) {
						if (!input || !input.length) { return; }
					start = +start; //parse to int
					return input.slice(start);
					}});
			
mainModule.controller('PurgeController', function($scope , $rootScope, $http){
	$scope.purge=function(){
				var event="purgeCDN";
				$rootScope.event = "purgeCDN";
				$http.get("/hm/processOperation.jsp?event=purgeCDN")
				.then(function(response) {
					if(response.data.StatusDescription==="Please Login")
					{
						window.location='/hm/login.jsp'
					}
					else
					{	
						$rootScope.purgeJSON = response.data;
					}
				});
	}
});


mainModule.controller('confirmController', function($scope , $rootScope, $http){
	
	$scope.selectedHtmlizationDomain=function(){
        var checkedDomainNames = new Array();
		var domains = document.getElementsByName('domainNames');
		for(var x=0; x < domains.length; x++)   // comparison should be "<" not "<="
		{
			if(domains[x].checked){
				checkedDomainNames.push(domains[x].value);
			}
		}
		if(checkedDomainNames.length > 0){
			$rootScope.event = "confirmPage";
			var object = new Object();
			object.event="selectedDomainHtmlizeConfirm";
			object.domainNameList=checkedDomainNames;
			object.actionName="Domains: "+checkedDomainNames;
			$rootScope.confirmjson = object;
		} else{
			$rootScope.jsonObject.errorMessage ="Please Select Domains for HTMLization";
		}
	}
	
	$scope.resetConfirm=function(requestId){
                var requestId=requestId;
				$rootScope.event = "status";
				$http.get("/hm/processOperation.jsp?event=resetConfirm&requestId="+requestId)
				.then(function(response) {
					if(response.data.StatusDescription==="Please Login")
					{
						window.location='/hm/login.jsp'
					}
					else
					{	
						$rootScope.event = "status";
						$rootScope.json = response.data;
						$rootScope.currentPage = 0;
						$rootScope.pageSize = 20;
						$rootScope.numberOfPages=function(){
						return Math.ceil($rootScope.json.HMRequestList.length/$rootScope.pageSize);
						}
					}
				});
				
	}
	$scope.htmlizationDomain=function(domainName,domainId){
               			var domainName=domainName;
						var domainId=domainId;
				$rootScope.event = "confirmPage";
				var object = new Object();
				object.event="htmlizeDomainConfirm";
				object.domainName=domainName;
				object.domainId=domainId;
				object.actionName="Domain: "+domainName;
				$rootScope.confirmjson = object;
				
	}
	$scope.htmlizationstaticDomain=function(domainName,domainId){
 	       var domainName=domainName;
		   var domainId=domainId;
		$rootScope.event = "confirmPage";
		var object = new Object();
		object.event="HtmlizeWithStaticAssetConfirm";
		object.domainName=domainName;
		object.domainId=domainId;
		object.actionName="Domain: "+domainName;
		$rootScope.confirmjson = object;
  }
	 $scope.deleteTransformConfirm=function(transformationType,domainName,segmentName,domainId,segmentId){
		  var event2="deleteTransformConfirm";
		  var event1="Edit";
		    $http.get("/hm/processOperation.jsp",{params:{"event":event2,"domainName":domainName,"transformationType":transformationType,"segmentName":segmentName,"domainId":domainId,"segmentId":segmentId}})
		  .then(function(response) {
			  if(response.data.StatusDescription==="Please Login")
				{
					window.location='/hm/login.jsp'
				}
				else
				{	
			   $rootScope.confirmjson = response.data;
				$http.get("/hm/processOperation.jsp",{params:{"event":event1,"segmentName":segmentName,"domainName":domainName,"segmentId":segmentId,"domainId":domainId}})
			   .then(function(response) {
				$rootScope.detailsEditSegment = response.data;
				$rootScope.operation = "Edit Segment";
			   
				$rootScope.event = "Add Segment";
				$rootScope.editSegmentJSON = segmentData;
				$rootScope.domainId = domainId;
				$rootScope.domainName = domainName;
				$rootScope.segmentName = segmentName;
			 $rootScope.flag1 = $rootScope.$new(true)
				$rootScope.htmlPathflag = $rootScope.$new(true)
				$rootScope.urlflag = $rootScope.$new(true)
			  $rootScope.eventname = "Edit"
				$rootScope.flag = 2;
			 $rootScope.index = 1;
				$rootScope.domainName = domainName;
				$rootScope.segmentName = segmentName;
				$rootScope.activeDomain = segments;
				$rootScope.addSegmentRequiredData = $rootScope.$new(true)
				
				$rootScope.eventName = "Add Segment";
			   });
				}
		      });
		  
		 }
		
		$scope.deletehtmlSelectorConfirm=function(transformationID,selectorID,htmlSelector,oprntn,domainName,segmentName,domainId,segmentId){
		  var event2="deleteHtmlSelectorConfirm";
		  var event1="Edit";
		    $http.get("/hm/processOperation.jsp",{params:{"event":event2,"domainName":domainName,"htmlSelectorId":selectorID,"transformationId":transformationID,"segmentName":segmentName,"operation":oprntn,"htmlSelector":htmlSelector,"domainId":domainId,"segmentId":segmentId}})
		  .then(function(response) {
		   $rootScope.confirmjson = response.data;
		    $http.get("/hm/processOperation.jsp",{params:{"event":event1,"segmentName":segmentName,"domainName":domainName,"segmentId":segmentId,"domainId":domainId}})
		   .then(function(response) {
		    $rootScope.detailsEditSegment = response.data;
		    $rootScope.operation = "Edit Segment";
		   
		    $rootScope.event = "Add Segment";
		    $rootScope.editSegmentJSON = segmentData;
			$rootScope.domainId = domainId;
		    $rootScope.domainName = domainName;
			$rootScope.segmentName = segmentName;
		 $rootScope.flag1 = $rootScope.$new(true)
		    $rootScope.htmlPathflag = $rootScope.$new(true)
		    $rootScope.urlflag = $rootScope.$new(true)
		  $rootScope.eventname = "Edit"
		    $rootScope.flag = 2;
		    $rootScope.domainName = domainName;
			$rootScope.segmentName = segmentName;
		    $rootScope.activeDomain = segments;
		    $rootScope.addSegmentRequiredData = $rootScope.$new(true)
		    
		    $rootScope.eventName = "Add Segment";
		   });
		      });
		  
		 }

		$scope.deleteSearchStringConfirm=function(searchString,searchStringId,transformationId,domainName,segmentName,domainId,segmentId){
			var event2="deleteSearchStringConfirm";
			var event1="Edit";
			  $http.get("/hm/processOperation.jsp",{params:{"event":event2,"domainName":domainName,"searchString":searchString,"searchStringId":searchStringId,"transformationId":transformationId,"segmentName":segmentName,"domainId":domainId,"segmentId":segmentId}})
			.then(function(response) {
				$rootScope.confirmjson = response.data;
					$http.get("/hm/processOperation.jsp",{params:{"event":event1,"segmentName":segmentName,"domainName":domainName,"segmentId":segmentId,"domainId":domainId}})
					   .then(function(response) {
						$rootScope.detailsEditSegment = response.data;
						$rootScope.operation = "Edit Segment";
					   
						$rootScope.event = "Add Segment";
						$rootScope.editSegmentJSON = segmentData;
						$rootScope.domainId = domainId;
						$rootScope.domainName = domainName;
			            $rootScope.segmentName = segmentName;
						$rootScope.flag1 = $rootScope.$new(true)
						$rootScope.htmlPathflag = $rootScope.$new(true)
						$rootScope.urlflag = $rootScope.$new(true)
						 $rootScope.eventname = "Edit"
						$rootScope.flag = 2;
						$rootScope.domainName = domainName;
			            $rootScope.segmentName = segmentName;
						$rootScope.activeDomain = segments;
						$rootScope.addSegmentRequiredData = $rootScope.$new(true)
						
						$rootScope.eventName = "Add Segment";
					   });
		   		});
			
		}

	$scope.load = function () {
		if(document.getElementById("searchStringDiv_0") != null) {
			document.getElementById("searchStringDiv_0").style.display="none";
		}
		if(document.getElementById("transformDiv_0") != null) {
			document.getElementById("transformDiv_0").style.display="none";
		}
		if(document.getElementById("htmlSelectorDiv_0") != null) {
			document.getElementById("htmlSelectorDiv_0").style.display="none";
		}
		if(document.getElementById("deleteDiv_0") != null) {
			document.getElementById("deleteDiv_0").style.display="none";
		}
    }
	
	$scope.deleteUserConfirm = function(event1,uname) {
	  var deleteUser = "Yes";
	  $http.get("/hm/processOperation.jsp",{params:{"event":event1,"uname":uname,"deleteUser":deleteUser}})
	  .then(function(response){
	   $rootScope.cpJSON = response.data;
	   $http.get("/hm/accountOperation.jsp",{params:{"requestType" : "myAccount","rolename" : "admin"}})
			  .then(function(response){
		 $rootScope.jsonObject_myAccount = response.data;
			$rootScope.event ="myAccount";  
			  });
	  });
	 }
	$scope.refreshDomain=function(domainName,domainId){
		$rootScope.event = "confirmPage";
		var object = new Object();
		object.event="refreshDomainConfirm";
		object.actionName="Domain: "+domainName;
		object.domainName=domainName;
		object.domainId=domainId;
		$rootScope.confirmjson = object;
	}

	$scope.refreshStaticAssetDomain=function(domainName,domainId){
		$rootScope.event = "confirmPage";
		var object = new Object();
		object.event="staticrefreshDomainConfirm";
		object.actionName="Domain: "+domainName;
		object.domainName=domainName;
		object.domainId=domainId;
		$rootScope.confirmjson = object;
	}
	$scope.deleteDomainHtml=function(domainName,domainId){
		$rootScope.event = "confirmPage";
		var object = new Object();
		object.event="deleteDomainHtmlConfirm";
		object.actionName="Domain: "+domainName;
		object.domainName=domainName;
		object.domainId=domainId;
		$rootScope.confirmjson = object;
	}
	
	$scope.deleteDomain=function(domainName, domainId){
				$rootScope.event = "confirmPage";
				var object = new Object();
				object.event="deleteDomainConfirm";
				object.domainName=domainName;
				object.domainId=domainId;
				$rootScope.confirmjson = object;
				
	}
	
	$scope.refreshURL=function(segmentName , domainName , segmentId , domainId ,url, isStaticAssetDomain) {
		$rootScope.event = "confirmPage";
		var object = new Object();
		if(isStaticAssetDomain == 0){
			object.event="refreshURLConfirm";
		}else {
			object.event="staticrefreshURLConfirm";
		}
		object.domainName=domainName;
		if(segmentId != undefined && segmentId != ''){
			object.checkedSegments=segmentId;
		} else{
			object.segmentName=segmentName;
		}
		object.domainId=domainId;
		object.segmentId=segmentId;
		object.actionName="Domain: "+domainName+", Segment: "+segmentName;
		object.url=url;
		$rootScope.confirmjson = object;
	}
	$scope.deleteURLHtml=function(segmentName , domainName , segmentId , domainId, url) {
		$rootScope.event = "confirmPage";
		var object = new Object();
		object.event="deleteURLHtmlConfirm";
		object.domainName=domainName;
		if(segmentId != undefined && segmentId != ''){
			object.checkedSegments=segmentId;
		} else{
			object.segmentName=segmentName;
		}
		object.domainId=domainId;
		object.segmentId=segmentId;
		object.url=url;
		object.actionName="Domain: "+domainName+", Segment: "+segmentName;
		$rootScope.confirmjson = object;
	}
	$scope.confirm=function(eventname , domainId, domainName , actionName , domainNameList , checkedSegments,selectedURLS , url, segmentName, domainIdList, segmentId){
		
		eventname = checkUndefined(eventname);
		domainId = checkUndefined(domainId);
		domainName = checkUndefined(domainName);
		actionName = checkUndefined(actionName);
		domainNameList = checkUndefined(domainNameList);
		checkedSegments = checkUndefined(checkedSegments);
		selectedURLS = checkUndefined(selectedURLS);
		url = checkUndefined(url);
		segmentName = checkUndefined(segmentName);
		domainIdList = checkUndefined(domainIdList);
		segmentId = checkUndefined(segmentId);
		
		$http.get("/hm/processEvents.jsp?event="+eventname+"&domainId="+domainId+"&domainName="+domainName+"&actionName="+actionName+"&domainNameList="+domainNameList+"&checkedSegments="+checkedSegments+"&selectedURLS="+selectedURLS+"&url="+url+"&segmentName="+segmentName+"&domainIdList="+domainIdList+"&segmentId="+segmentId)

			.then(function(response) {
				$rootScope.event = "status";
				$http.get("/hm/getStatusPage.jsp")
					.then(function(result) {
						$rootScope.json = result.data;
						$rootScope.currentPage = 0;
						$rootScope.pageSize = 20;
						$rootScope.numberOfPages=function(){
						return Math.ceil($rootScope.json.HMRequestList.length/$rootScope.pageSize);
					}
				});
		});
	}
	
	function checkUndefined(param) {
		if(typeof param === 'undefined'){
			param = null;
		}
		return param;
	}
	$scope.deleteDomainConfirm=function(domainId){

		$rootScope.event="domainPage";
		$rootScope.DomainMessages = $rootScope.$new(true);
		$http.get("http://nview.nviz.co:8180/hm//domains/delete?id="+domainId,getHeaders())
		.success(function(data, status, headers, config){
			 $http.get("http://nview.nviz.co:8180/hm/domains/all",getHeaders())
				.then(function(response) {
					if(response.data.statusCode == 1) {
						$rootScope.DomainMessages.errorMessage = createErrorMessage(response.data.response);
					} else {
						$rootScope.domains = response.data.response;
					}
			});
		})
		.error(function(data, status, header, config){
		   	 $rootScope.DomainMessages.errorMessage = createErrorMessage(data.response);
		});
	}
	
	$scope.cancelDomainProcess=function(){
		$rootScope.event="domainPage";
	}
	
	$scope.cancelURLProcess=function(domainName, segmentName , domainId ,segmentId )
	{
		$rootScope.event="segmentURLs";
		$http.get("/hm/segmentDetailList.jsp",{params:{"domainName":domainName, "segmentName":segmentName,"domainId":domainId, "segmentId":segmentId}})
			.then(function(response) {
			$rootScope.URLsDetailJSON = response.data;
			$rootScope.event ="segmentURLs";		
		});
	}
	
	$scope.cancelDeleteSegmentHtmlProcess=function(domainId)
	{
		$rootScope.SegmentMessages = "";
		$rootScope.event ="Segment Page";
		$http.get("/hm/segmentPage.jsp",{params:{"domainId":domainId}})
				.then(function(response) {
				$rootScope.segmentDetail = response.data;
		});
	}
		
	$scope.cancelSegmentProcess=function(domainName)
	{
		$rootScope.SegmentMessages = "";
		$rootScope.event ="Segment Page";
		$http.get("/hm/segmentPage.jsp",{params:{"domainName":domainName}})
				.then(function(response) {
				$rootScope.segmentDetail = response.data;
		});
	}
	
	$scope.getDomainData = function(domainName,domainId) {
		$http.get("http://nview.nviz.co:8180/hm/domains/view?id="+domainId,getHeaders())
		.then(function(response) {
			$rootScope.editDomainJSON = response.data.response;
			$rootScope.event ="Edit Domain";
		});
	}
	
	$scope.swapPriority = function(activeDomain, move, segment, segmentList) {
		
	 		var currentPriority = segment.executionSequence;
					var updatePriority = 0;
					var exeArray = new Array();
					for (var i = 0; i < Object.keys(segmentList).length; i++) {
						exeArray.push(segmentList[i].executionSequence);
					}
					for (var j = 0; j < exeArray.length; j++) {
						if (j == currentPriority) {
							index = exeArray.indexOf(currentPriority);
							if (move == "up") {
								if (index > 0) {
									updatePriority = exeArray.indexOf(index - 1);
								} else {
									updatePriority = exeArray.indexOf(0);
								}
							} else if (move == "down") {
								updatePriority = exeArray.indexOf(index + 1);
							}
						}
					}
					for (var i = 0; i < segmentList.length; i++) {
						if (segmentList[i].executionSequence == updatePriority) {
							segmentList[i].executionSequence = currentPriority;
						}
						if (segmentList[i].segmentName == segment.segmentName) {
							segmentList[i].executionSequence = updatePriority;
						}
					}
					var segments = new Array();
					segments.push.apply(segments, segmentList);
					for (var i = 0; i < segments.length; i++) {
						if(segments[i].segmentName == 'default') {
							segments.splice(i, 1);
						}
					}
				$rootScope.SegmentMessages = $rootScope.$new(true);
				$rootScope.event="Segment Page"; 
				$http.post("http://nview.nviz.co:8180/hm/domains/segments/reorder?domainId="+activeDomain.domainId, segments, getHeaders())
					.then(function(response){
						if(response.data.statusCode == 1){
							$rootScope.SegmentMessages.errorMessage = createErrorMessage(response.data.response);
						}else{
							$rootScope.SegmentMessages = response.data;
							$http.get("http://nview.nviz.co:8180/hm/domains/view?id="+activeDomain.domainId,getHeaders())
							.then(function(response) {
								if(response.data.statusCode == 1) {
									$rootScope.SegmentMessages.errorMessage = createErrorMessage(response.data.response);
								} else {
									$rootScope.activeDomain = arrangeSegmentInOrder(response.data.response);
								}
						});
				}
				});
	}
	 
	$scope.cancelSwapSegmentProcess=function(domainName) {
		$rootScope.SegmentMessages = "";
	  $rootScope.event ="Segment Page";
	  $http.get("/hm/segmentPage.jsp",{params:{"domainName":domainName}})
		.then(function(response) {
		$rootScope.segmentDetail = response.data;
	  });
	}
});

function arrangeSegmentInOrder(response) {
	var activeDomain = response;
	var segments = activeDomain.segments;
	segments.sort(function (firstSegment, secondSegment) {
	    var segmentSequence = firstSegment.executionSequence - secondSegment.executionSequence;
	    if (segmentSequence !== 0) {
	        return segmentSequence;
	    }
	});
	return activeDomain;
}

mainModule.controller('processPurgeController', function($scope , $rootScope, $http){
	$scope.purgeProcess=function(siteName, mediapath){
				if(typeof siteName === 'undefined'){
					siteName = "";
				}
				if(typeof mediapath === 'undefined'){
					mediapath = "";
				}
				$rootScope.event = "purgeCDN";
				$http.get("/hm/purge.jsp?siteName="+siteName+"&mediapath="+mediapath)
				.then(function(response) {
					$rootScope.purgeJSON = response.data;
				});
	}
});


mainModule.controller('HtmlController', function($scope , $rootScope, $http){
	$scope.htmlization=function(domainName){
				$rootScope.event = "confirmPage";
		var actionName = "Domain: "+domainName;
                var confirmjson='{"event":"htmlizeDomainConfirm","domainName":domainName,"actionName":actionName}';
                $rootScope.confirmjson = confirmjson;
				
	}
});

mainModule.controller('indexController', ['$scope', '$rootScope', '$http', '$injector', function($scope,$rootScope,$http,$injector) {
			$scope.login = function() {
				var username = $scope.username;
				var pwd = $scope.pwd;
				var requestType = 'Login';
				if (username != null && pwd != null) {
					$http.get("/hm/loginOperation.jsp", {
						params : {
							"username" : username,
							"password" : pwd
						}
					}).success(
							function(data) {
								if (data.Status == 'OK') {
									$scope.event = "domainPage";
									$scope.$parent.image = data;
									window.location = '/hm/index.html'
								} else {
									$('[name=username],[name=password]')
											.val('');
									$('div.LoginError').text(
											data.StatusDescription).css(
											'color', 'red');
								}
							});
				} else if (document.myform.password.value == ""
						&& document.myform.username.value == "") {
					$('div.LoginError').text("Please Provide User Credentials")
							.css('color', 'red');
				} else if (document.myform.password.value == ""
						|| document.myform.username.value == "") {
					if (document.myform.username.value == "") {
						$('div.LoginError').text("Please enter UserName").css(
								'color', 'red');
					} else if (document.myform.password.value == "") {
						$('div.LoginError').text("Please enter a Password")
								.css('color', 'red');
					}
				}

			}
		} ]);

mainModule.controller('addUserConfirm',['$rootScope','$scope', '$http', '$injector', function($rootScope,$scope,$http,$injector) {
	 $scope.addUserSubmit = function() 
	 {
		var childUserName=$scope.childUserName;
		var childPassword=$scope.childPassword;
		var roleType = $scope.roleType;
		var requestType="AddUser";
		var event1="AddUser";
		if(roleType != undefined){
			$http.get("/hm/addUserOperation.jsp", {params:{"childUserName":childUserName,"childPassword":childPassword,"roleType":roleType}})
			.then(function(response){
		   $rootScope.cpJSON = response.data;
		   $http.get("/hm/accountOperation.jsp",{params:{"requestType" : "myAccount","rolename" : "admin"}})
				  .then(function(response){
			 $rootScope.jsonObject_myAccount = response.data;
				$rootScope.event ="myAccount";  
			});

			});
		}else{
			$rootScope.addUserJSON.errorMessage ="Please Select Role Type";
		}
	}
}]);

mainModule.controller('addTransformationConfirm',['$rootScope','$scope', '$http', '$injector', function($rootScope,$scope,$http,$injector) {
	 $scope.addTransformationSubmit = function(event,id,name, group, supportedContentTypes) 
	 {
		var attributes = [];
		if(event == "Add Transformation"){
		for (var x = 1; x <= count; x++) {
			var transAttrName = "#transformationAttributeName_"+x;
			var transAttrOptions = "#transformationAttributeOptions_"+x;
			var transAttrDropdown = "input[name='transformationAttributeDropdown_"+x+"']:checked";
			var transAttrReqd = "input[name='transformationAttributeRequired_"+x+"']:checked";
			var divName = "#attributeDiv_"+x;
			
			var attributename = $(divName).find(transAttrName).val();
			var attributeOptions = $(divName).find(transAttrOptions).val();
			var attributeDropdown = $(divName).find(transAttrDropdown).val();
			var attributeRequired = $(divName).find(transAttrReqd).val();
			
			if(attributename != undefined || attributename != '') {
				attributes.push({
					"name":attributename,
					"options":attributeOptions,
					"dropdown":attributeDropdown,
					"required":attributeRequired,
				})
			}
			
		}
		//var requestType="AddTransformation";
		$rootScope.TransformationMessages = $rootScope.$new(true);
		$rootScope.transformations = $rootScope.$new(true);
			$http.post("http://nview.nviz.co:8180/hm/transformations/add", {"id":0, "name":name,"group":group,"supportedContentTypes":supportedContentTypes,"attributes":attributes}, getHeaders())
			.success(function(response, status, headers, config){
					$rootScope.event = "transformationPage";
					$http.get("http://nview.nviz.co:8180/hm/transformations/all",getHeaders())
						.then(function(response) {
							if(response.data.statusCode == 1) {
								$rootScope.TransformationMessages.errorMessage = createErrorMessage(response.data.response);
							}else{
								$rootScope.transformations= response.data.response;
							}
							});
			     })
			   .error(function(data, status, header, config){
				   $rootScope.TransformationMessages.errorMessage = createErrorMessage(data.response);
			     });
			
		} else{
			
			for (var x = 1; x <= document.getElementById('count').value; x++) {
				//$("#transformationAttributeName_1").val();
				var transAttrName = "#transformationAttributeName_"+x;
				var transAttrOptions = "#transformationAttributeOptions_"+x;
				var transAttrDropdown = "input[name='transformationAttributeDropdown_"+x+"']:checked";
				var transAttrReqd = "input[name='transformationAttributeRequired_"+x+"']:checked";
				var transId = "#attributeId_"+x; 
				var attributeId = null;
				var attributename = $(transAttrName).val();
				var attributeOptions = $(transAttrOptions).val();
				var attributeDropdown = $(transAttrDropdown).val();
				var attributeRequired = $ (transAttrReqd).val();
				 attributeId = $ (transId).val();
				/*var attributename = $(divName).find(transAttrName).val();
				var attributeOptions = $(divName).find(transAttrOptions).val();
				var attributeDropdown = $(divName).find(transAttrDropdown).val();
				var attributeRequired = $(divName).find(transAttrReqd).val();*/
				/*var attributeId = null;
				if (typeof (document
						.getElementsByName('attributeId')[x]) != 'undefined'
						&& document
								.getElementsByName('attributeId')[x].value != null) {
					attributeId = document
							.getElementsByName('attributeId')[x].value;
				}*/
				attributes.push({
					"id":attributeId,
					"name":attributename,
					"options":attributeOptions,
					"dropdown":attributeDropdown,
					"required":attributeRequired,
				})
				
			}
			
			var attributeCount = 0;
			if(document.getElementById("count").value != "") {
				attributeCount = parseInt(document.getElementById("count").value);
			}
			
			for (var x = attributeCount+1; x <= count; x++) {
				var transAttrName = "#transformationAttributeName_"+x;
				var transAttrOptions = "#transformationAttributeOptions_"+x;
				var transAttrDropdown = "input[name='transformationAttributeDropdown_"+x+"']:checked";
				var transAttrReqd = "input[name='transformationAttributeRequired_"+x+"']:checked";
				var divName = "#attributeDiv_"+x;
				
				var attributename = $(divName).find(transAttrName).val();
				var attributeOptions = $(divName).find(transAttrOptions).val();
				var attributeDropdown = $(divName).find(transAttrDropdown).val();
				var attributeRequired = $(divName).find(transAttrReqd).val();
				if(attributename != undefined || attributename != '') {
					attributes.push({
						"name":attributename,
						"options":attributeOptions,
						"dropdown":attributeDropdown,
						"required":attributeRequired,
					})
				}
				
			}
			//var requestType="AddTransformation";
			$rootScope.TransformationMessages = $rootScope.$new(true);
			$rootScope.transformations = $rootScope.$new(true);
			var event1="AddTransformation";
				$http.post("http://nview.nviz.co:8180/hm/transformations/edit?id="+id, {"id":id, "name":name,"group":group,"supportedContentTypes":supportedContentTypes,"attributes":attributes}, getHeaders())
				.success(function(response, status, headers, config){
						$rootScope.event = "transformationPage";
						$http.get("http://nview.nviz.co:8180/hm/transformations/all",getHeaders())
							.then(function(response) {
								if(response.data.statusCode == 1) {
									$rootScope.TransformationMessages.errorMessage = createErrorMessage(response.data.response);
								}else{
									$rootScope.transformations= response.data.response;
								}
								});
				     })
				   .error(function(data, status, header, config){
					   $rootScope.TransformationMessages.errorMessage = createErrorMessage(data.response);
				     });
				
		}
	 }
}]);

mainModule.controller('myAccountController',
		function($scope, $rootScope, $http) {
			$scope.myAccount = function(roleName)  {
				$rootScope.cpJSON = $rootScope.$new(true)
				$http.get("/hm/accountOperation.jsp", {
					params : {
						"rolename" : roleName
					}
				}).then(function(response) {
					if(response.data.StatusDescription==="Please Login")
					{
							window.location='/hm/login.jsp'
					}
					else
					{
					$rootScope.jsonObject_myAccount = response.data;
					$rootScope.event = "myAccount";
					}
				});
			}
			$scope.logout = function(requestType) 
			{				
				$http.get("/hm/logout.jsp")
				.then(function(response) {
					$rootScope.logoutJSON = response.data;
					window.location='/hm/'
				});
			}
		});

mainModule.controller('changePassword', function($scope, $rootScope, $http) {
	$scope.changePwd = function(event1, uname) {
		$http.get("/hm/processOperation.jsp", {
			params : {
				"event" : event1,
				"uname" : uname
			}
		}).then(function(response) {
			$rootScope.cpJSON = response.data;
			$rootScope.event = "ChangePassword";
		});
	}
});

mainModule.controller('changePwdConfirm', function($scope, $rootScope, $http) {
	$scope.chngPwdConfirm = function(uname) {
		var pwd = $scope.password;
		$http.get("/hm/changePasswordOperation.jsp", {
			params : {
				"userName" : uname,
				"password" : pwd,
			}
		}).then(function(response) {
			if (response.successMessage) {
				$rootScope.cpJSON = response.data;
				$rootScope.event = "myAccount";
			} else {
				$rootScope.cpJSON = response.data;
				$rootScope.event = "myAccount";
			}

		});
	}
});
mainModule.controller('deleteTransformation', function($scope,$rootScope,$http) {
	$scope.deleteTransform = function(event,transformationType,domainName,segmentName,domainId,segmentId)
   {
	   $rootScope.event = "confirmPage";
			var object = new Object();
			object.event="deleteTransformConfirm";
			object.domainName=domainName;
			object.segmentName=segmentName;
			object.domainId=domainId;
			object.segmentId=segmentId;
			object.transformationType=transformationType;
			$rootScope.confirmjson = object;
		
   }
	   
	});
mainModule.controller('deleteSelector', function($scope,$rootScope,$http) {
	  $scope.deleteselector = function(event,selectorID,htmlSelector,opr,transID,domainName,segmentName,domainId,segmentId)
	   {
		   $rootScope.event = "confirmPage";
			var object = new Object();
			object.event="deleteHtmlSelectorConfirm";
			object.transId=transID;
			object.selectorID=selectorID;
			object.htmlSelector=htmlSelector;
			object.operatn=opr
			object.domainName=domainName;
			object.segmentName=segmentName;
			object.domainId=domainId;
			object.segmentId=segmentId;
			$rootScope.confirmjson = object;
	   }
	   
	});
mainModule.controller('deletesearchString', function($scope,$rootScope,$http) {
	 $scope.searchStringDelete = function(event,searchString,searchStringId,transformationId,domainName,segmentName,domainId,segmentId)
 		{
			$rootScope.event = "confirmPage";
			var object = new Object();
			object.event="deleteSearchStringConfirm";
			object.searchString=searchString;
			object.searchStringId=searchStringId;
			object.transformationId=transformationId;
			object.domainName=domainName;
			object.segmentName=segmentName;
			object.domainId=domainId;
			object.segmentId=segmentId;
			$rootScope.confirmjson = object;
 		}		 
});


mainModule.controller('UserOperation', function($scope,$rootScope,$http) {
	$scope.updateUser = function(event1,uname) {
		$rootScope.cpJSON = $rootScope.$new(true)
		$http.get("/hm/processOperation.jsp",{params:{"event":event1,"uname":uname}})
		.then(function(response) {
		$rootScope.updateUserData = response.data;
		$rootScope.event ="Update User";		
		});
	}
	
	$scope.deleteUser = function(eventname,uname) {
			$rootScope.event = "confirmPage";
			var object = new Object();
			object.event="deleteUserConfirm";
			object.uname=uname;
			$rootScope.confirmjson = object;
	}
})
mainModule.controller('TransformationOperation', function($scope,$rootScope,$http) {
	
	$scope.deleteTransformationsConfirm = function(id,name)
   {
	   $rootScope.event = "confirmPage";
			var object = new Object();
			object.event = "deleteTransformationsConfirm" ;
			object.id=id;
			object.name=name;
			$rootScope.confirmjson = object;
   }
	$scope.editTransformation = function(event,id) {
		$http.get("http://nview.nviz.co:8180/hm/transformations/view?id="+id,getHeaders())
		.then(function(response) {
		$rootScope.transformation = response.data.response;
		$rootScope.event ="Edit Transformation";	
		count=0;
		counter=0;
		});
	}
   $scope.deleteCrawlers = function(event, url)
   {
	   $rootScope.cpJSON = "";
	   $rootScope.crawlerJSON = "";
	   $rootScope.event = "confirmPage";
			var object = new Object();
			object.event="deleteCrawlerConfirm";
			object.crawler=url;
			$rootScope.confirmjson = object;
   }
	
	$scope.deleteTransformation = function(id) {
		$rootScope.TransformationMessages=$rootScope.$new(true);
		$http.get("http://nview.nviz.co:8180/hm/transformations/delete?id="+id,getHeaders())
		.then(function(response) {
			if(response.data.statusCode == 1) {
				$rootScope.TransformationMessages.errorMessage = createErrorMessage(response.data.response);
			} else {
				$rootScope.event ="transformationPage"; 
				$http.get("http://nview.nviz.co:8180/hm/transformations/all",getHeaders())
				.then(function(response) {
					if(response.data.statusCode == 1) {
						$rootScope.TransformationMessages.errorMessage = createErrorMessage(response.data.response);
					}else{
						$rootScope.transformations = response.data.response;
					}
				});
			}
		});
	}
	
	$scope.deleteCrawlerConfirm = function(eventname, crawler) {
		
		$http.get("/hm/processOperation.jsp",{params:{"event":eventname,"CrawlerJSPURL":crawler}})
		.then(function(response) {
			 $rootScope.cpJSON = response.data;
			 $rootScope.crawlerJSON="";
			 $rootScope.event ="crawlerPage"; 
			$http.get("/hm/processOperation.jsp",{params:{"event":"endPointURLs"}})
			  .then(function(response){
		     $rootScope.crawlerJSON = response.data;
			  });
		
		});
	}
})
  
mainModule.controller('userOperation1',['$rootScope','$scope', '$http', '$injector', function($rootScope,$scope,$http,$injector) {
	 $scope.updateUserConfirm = function(userName) 
	 {
		var roleType=$scope.roleType;
		if(roleType != undefined){
				var userName=userName;
				var event1="updateUser";
				
				$http.get("/hm/updateUserOperation.jsp",{params:{"uname":userName,"roleType":roleType}})
					.then(function(response){
			   $rootScope.cpJSON = response.data;
			   $http.get("/hm/accountOperation.jsp",{params:{"rolename" : "admin"}})
					  .then(function(response){
				 $rootScope.jsonObject_myAccount = response.data;
				$rootScope.event ="myAccount";  
			});

			});
		}else{
			$rootScope.updateUserData.errorMessage = "Please Select Role Type";
		}
	}
}])

mainModule.controller('addUser', function($scope,$rootScope,$http) {
	 $scope.addUser = function() {
		 $rootScope.cpJSON = $rootScope.$new(true)
		$http.get("/hm/processOperation.jsp",{params:{"event":"AddUser"}})
		.then(function(response) {
		$rootScope.addUserJSON = response.data;
		$rootScope.event ="Add User";		
		});
	}
});
mainModule.controller('addTransformations', function($scope,$rootScope,$http) {
	 $scope.addTransformation = function() {
		$rootScope.cpJSON = $rootScope.$new(true)
		$rootScope.event ="Add Transformation";
		$rootScope.transformation="";
		count = 0;
		counter = 0;
	}
});

mainModule.controller('segmentDisplayController', function($scope,$rootScope,$http) {
	 $scope.segments = function(domainId) {
		 $rootScope.activeDomain = $rootScope.$new(true);
		 $rootScope.event="Segment Page";
			$rootScope.SegmentMessages = $rootScope.$new(true);
			 $http.get("http://nview.nviz.co:8180/hm/domains/view?id="+domainId,getHeaders())
				.then(function(response) {
					if(response.data.statusCode == 1) {
						$rootScope.SegmentMessages.errorMessage = createErrorMessage(response.data.response);
					} else {
						$rootScope.activeDomain = arrangeSegmentInOrder(response.data.response);
					}
			});
	}
});


mainModule.controller('segmentController', function($scope,$rootScope,$http) {
	
	$scope.refreshSelectedCheckedSegments=function(domainName, isStaticAssetDomain , domainId) {
		var checkedSegments = new Array();
		var checkedIds = new Array();
		var segments = document.getElementsByName('segmentsNames');
		for(var x=0; x < segments.length; x++) {  // comparison should be "<" not "<="
			if(segments[x].checked){
				var idNames = segments[x].value.split(",");
				if(idNames[0] != '' && idNames[0] != '0'){
					checkedIds.push(idNames[0]);
				}
				checkedSegments.push(idNames[1]);
			}
		}
		if(checkedSegments.length > 0) {
			$rootScope.event ="confirmPage";	
			var object = new Object();
			if(isStaticAssetDomain == 0) {
				object.event="refreshSelectedSegmentsConfirm";
			} else{
				object.event="staticrefreshSelectedSegmentsConfirm";
			}
			object.domainName=domainName;
			if(checkedIds.length > 0){
				object.checkedSegments=checkedIds;
			} else{
				object.checkedSegments=checkedSegments;
			}
			object.domainId=domainId;
			object.actionName="Domain: "+domainName+", Segments: "+checkedSegments;
			$rootScope.confirmjson = object;
		}else {
			$rootScope.activeDomain.errorMessage ="Please Select the checkbox to refresh segments";
		}
	}
	$scope.deleteSelectedCheckedSegmentHtml=function(domainName , domainId)
	{
		var checkedIds = new Array();
		var checkedSegments = new Array();
		var segments = document.getElementsByName('segmentsNames');
		for(var x=0; x < segments.length; x++) {  // comparison should be "<" not "<="
			if(segments[x].checked){
				var idNames = segments[x].value.split(",");
				if(idNames[0] != '' && idNames[0] != '0'){
					checkedIds.push(idNames[0]);
				}
				checkedSegments.push(idNames[1]);
			}
		}
		if(checkedSegments.length > 0) {
			$rootScope.event ="confirmPage";	
			var object = new Object();
			object.event="deleteSelectedSegmentHtmlConfirm";
			object.domainName=domainName;
			object.domainId=domainId;
			if(checkedIds.length > 0){
				object.checkedSegments=checkedIds;
			} else{
				object.checkedSegments=checkedSegments;
			}
			object.actionName="Domain: "+domainName+", Segments: "+checkedSegments;
			$rootScope.confirmjson = object;
		}else {
			$rootScope.activeDomain.errorMessage ="Please Select the checkbox to delete segments";
		}
	}
	
	$scope.editSegment = function(segment, activeDomain) {
		
		$rootScope.detailsEditSegment = $rootScope.$new(true)
		$rootScope.messages = $rootScope.$new(true)
		
		$http.get("http://nview.nviz.co:8180/hm/transformations/all",getHeaders())
			.then(function(response) {
					$rootScope.transformations = response.data.response;
					$rootScope.flag = $rootScope.$new(true)
					//$rootScope.flag1 = 1;
					//$rootScope.htmlPathflag = 1;
					//$rootScope.urlflag = 1;
					
					$rootScope.detailsEditSegment = segment;
					$rootScope.operation = "Edit Segment";
					$rootScope.event = "Add Segment";
					$rootScope.flag1 = $rootScope.$new(true)
					$rootScope.htmlPathflag = $rootScope.$new(true)
					$rootScope.urlflag = $rootScope.$new(true)
					$rootScope.eventname = "Edit"
					$rootScope.flag = 2;
					$rootScope.index = 1;
		});
	}
	
  $scope.splitSegment=function(segmentName , domainName , segmentId , domainId) {
		var event="Split";
		$rootScope.event ="SplitSegment";	
		$http.get("/hm/processOperation.jsp",{params:{"event":event,"segmentName":segmentName,"domainName":domainName,"segmentId":segmentId,"domainId":domainId}})
			.then(function(response) {
				$rootScope.splitJSON = response.data;
		});
	}
  $scope.split=function(seg_Name, seg_priority, segmentName, segmentRule, splitCrawl, sequence_no, domainName ,seg_Id , domainId)
	{
		$rootScope.SegmentMessages = "";
	  var requestType="Split Segment";
	  var segmentName = new Array();
					  for(var x=0; x < document.getElementsByName('segmentName').length; x++)   // comparison should be "<" not "<="
						{
							var name = document.getElementsByName('segmentName')[x].value;
							segmentName.push(name);
						}
		 var segmentRule = new Array();
					  for(var x=0; x < document.getElementsByName('segmentRule').length; x++)   // comparison should be "<" not "<="
						{
							var name = document.getElementsByName('segmentRule')[x].value;
							segmentRule.push(name);
						}
		var splitCrawl = new Array();
					 for(var x=0; x < document.getElementsByName('splitCrawl').length; x++)   // comparison should be "<" not "<="
						{
							var crawl2 = document.getElementsByName('splitCrawl')[x].value;
							
							splitCrawl.push(crawl2);
						}
		var sequence_no = new Array();
					 for(var x=0; x < document.getElementsByName('sequence_no').length; x++)   // comparison should be "<" not "<="
						{
							var sequence = document.getElementsByName('sequence_no')[x].value;
							
							sequence_no.push(sequence);
						}
	   $http.get("/hm/processSplitSegment.jsp",{params:{"seg_Name":seg_Name,"seg_priority":seg_priority, "segmentName":segmentName, "segmentRule":segmentRule, "splitCrawl":splitCrawl, "sequence_no":sequence_no,"domainName":domainName,"seg_Id":seg_Id,"domainId":domainId,"requestType":requestType}})
		.then(function(response) {
		 $rootScope.SegmentMessages = response.data;
		 $http.get("/hm/segmentPage.jsp",{params:{"domainName":domainName,"domainId":domainId}})
		   .then(function(response) {
			 $rootScope.activeDomain = response.data;
			 $rootScope.event ="Segment Page"; 
		   });
	   });
	}
	
	$scope.deleteSegmentConfirm=function(segmentId , segmentName)
	{
		$rootScope.event ="confirmPage";	
		var object = new Object();
		object.event="deleteSegmentConfirm";
		object.domainName=$rootScope.activeDomain.domainName;
		object.domainId=$rootScope.activeDomain.domainId;
		object.segmentName=segmentName;
		object.segmentId=segmentId;
		$rootScope.confirmjson = object;
		
	}

	
	$scope.deleteSegment=function(domainId ,segmentId){
		$rootScope.SegmentMessages = $rootScope.$new(true);
			$http.get("http://nview.nviz.co:8180/hm/domains/segments/delete?domainId="+domainId+"&segmentId="+segmentId,getHeaders())
			.then(function(response) {
				if(response.data.statusCode == 1) {
					$rootScope.SegmentMessages.errorMessage = createErrorMessage(response.data.response);
				} else {
				$rootScope.SegmentMessages = response.data;
				$rootScope.event="Segment Page"; 
				$http.get("http://nview.nviz.co:8180/hm/domains/view?id="+domainId,getHeaders())
				.then(function(response) {
					if(response.data.statusCode == 1) {
						$rootScope.SegmentMessages.errorMessage = createErrorMessage(response.data.response);
					} else {
						$rootScope.activeDomain = arrangeSegmentInOrder(response.data.response);
					}
			});
		}
		});
	}
	
	$scope.deleteSelectedSegmentHtml=function(segmentName, domainName, segmentId, domainId) {
		$rootScope.event ="confirmPage";	
		var object = new Object();
		object.event="deleteSelectedSegmentHtmlConfirm";
		object.domainName=domainName;
		object.segmentId=segmentId;
		object.domainId=domainId;
		if(segmentId != undefined && segmentId != ''){
			object.checkedSegments=segmentId;
		} else{
			object.checkedSegments=segmentName;
		}
		object.actionName="Domain: "+domainName+", Segment: "+segmentName;
		$rootScope.confirmjson = object;
	}

	$scope.mergeSegment=function(segmentName , domainName ,segmentId , domainId)
	{
		var event="Merge";
		$rootScope.event ="mergeSegment";	
		$http.get("/hm/processOperation.jsp",{params:{"event":event,"segmentName":segmentName,"domainName":domainName,"segmentId":segmentId,"domainId":domainId}})
			.then(function(response) {
				$rootScope.mergeJSON = response.data;
		});
	}
	
	$scope.merge=function(selected_seg_Name , domainName, merge_seg_name ,selected_seg_Id ,domainId)
	{
		var event="Merge Segement";
		var requestType="Save";
		$rootScope.SegmentMessages = "";
		$rootScope.event ="Segment Page";	
		$http.get("/hm/processMergeSegment.jsp",{params:{"event":event,"selected_seg_Name":selected_seg_Name,"domainName":domainName,"merge_seg_name":merge_seg_name,"selected_seg_Id":selected_seg_Id,"domainId":domainId,"requestType":requestType}})
			.then(function(response) {
				$rootScope.SegmentMessages = response.data;
				$http.get("/hm/segmentPage.jsp",{params:{"domainName":domainName,"domainId":domainId}})
					.then(function(response) {
						$rootScope.activeDomain = response.data;
						$rootScope.event ="Segment Page";		
					});
		});
	}
	$scope.cancelMergeOrSplit=function(domainId)
	{
		$rootScope.event ="Segment Page";	
		$rootScope.SegmentMessages = "";
		$http.get("/segmentPage.jsp",{params:{"domainId":domainId}})
			.then(function(response) {
				$rootScope.activeDomain = response.data;
				$rootScope.event ="Segment Page";		
			});
	}
		
	$scope.refreshSelectedSegments=function(segmentName , domainName, isStaticAssetDomain , segmentId , domainId) {
		$rootScope.event = "confirmPage";
		var object = new Object();
		if(isStaticAssetDomain == 0) {
			object.event="refreshSelectedSegmentsConfirm";
		}else {
			object.event="staticrefreshSelectedSegmentsConfirm";
		}
		object.domainName=domainName;
		object.segmentId=segmentId;
		object.domainId=domainId;
		if(segmentId != undefined && segmentId != ''){
			object.checkedSegments=segmentId;
		} else{
			object.checkedSegments=segmentName;
		}
		object.actionName="Domain: "+domainName+", Segment: "+segmentName;
		$rootScope.confirmjson = object;
	}
	
	$scope.cancelDeleteSegment=function(domainId)
	{
		$rootScope.event ="Segment Page";
		$rootScope.SegmentMessages = $rootScope.$new(true);
		$http.get("http://localhost:9090/hm/domains/view?id="+domainId,getHeaders())
		.then(function(response) {
			if(response.data.statusCode == 1) {
				$rootScope.SegmentMessages.errorMessage = createErrorMessage(response.data.response);
			} else {
				$rootScope.domain = response.data.response;
			}
	   });
	}
	$scope.insRow1=function(tableID) {
		var folder = document.getElementById(tableID);
		var new_folder = folder.cloneNode(true);
		var count =1;
		new_folder.setAttribute("style","visibility: visible;");
		new_folder.getElementsByTagName("input")[0].value="";
		new_folder.getElementsByTagName("input")[1].value="";
		var tableDataListing=$(".tableDataListing");
		var length= tableDataListing.length;
		var dd;
		tableDataListing.each(function(){
			if(count==length){
				var element=$(this);
			   dd =element.children().first();
		}
			else{
			count++;
			}
		});
		var ele = tableDataListing.first();
		var dl=ele.children();
		var dd=dl.first();
		$('#'+tableID).before(new_folder);
		//dd.html(count+1);
	}

});

mainModule.controller('segmentURLsController', function($scope,$rootScope,$http) {
	
	$scope.refreshSelectedURL=function(domainName, segmentName, isStaticAssetDomain , domainId, segmentId) {
		var checkedURLs = new Array();
		var urls = document.getElementsByName('selectedURLS');
		for(var x=0; x < urls.length; x++) {   // comparison should be "<" not "<="
			if(urls[x].checked){
				checkedURLs.push(urls[x].value);
			}
		}
		if(checkedURLs.length > 0) {
			$rootScope.event = "confirmPage";
			var object = new Object();
			if(isStaticAssetDomain == 0) {
				object.event="refreshSelectedURLSConfirm";
			}else {
				object.event="staticrefreshSelectedURLSConfirm";
			}
			object.domainName=domainName;
			object.segmentName=segmentName;
			object.domainId=domainId;
			object.segmentId=segmentId;
			object.selectedURLS = checkedURLs;
			object.actionName="Domain: "+domainName+", Segment: "+segmentName;
			$rootScope.confirmjson = object;
		} else{
			$rootScope.URLsDetailJSON.errorMessage ="Please Select the checkbox to refresh the URL's";
		}
	}

	$scope.deleteSelectedURL=function(domainName, segmentName , domainId, segmentId) {
		var checkedURLs = new Array();
		var urls = document.getElementsByName('selectedURLS');
		for(var x=0; x < urls.length; x++)   // comparison should be "<" not "<="
		{
			if(urls[x].checked){
				checkedURLs.push(urls[x].value);
			}
		}
		if(checkedURLs.length > 0){
			$rootScope.event = "confirmPage";
			var object = new Object();
			object.event="deleteSelectedURLHtmlConfirm";
			object.domainName=domainName;
			object.segmentName=segmentName;
			object.domainId=domainId;
			object.segmentId=segmentId;
			object.selectedURLS = checkedURLs;
			object.actionName="Domain: "+domainName+", Segment: "+segmentName;
			$rootScope.confirmjson = object;
		}else{
			$rootScope.URLsDetailJSON.errorMessage ="Please Select the checkbox to delete the URL's";
		}
	}
		
	 $scope.segmentURLs = function(segmentName,domainName,domainId,segmentId) {
		 
		$http.get("/hm/segmentDetailList.jsp",{params:{"domainName":domainName, "segmentName":segmentName, "domainId":domainId, "segmentId":segmentId}})
		.then(function(response) {
		$rootScope.URLsDetailJSON = response.data;
		$rootScope.event ="segmentURLs";		
		});
	}
});
mainModule.controller('deleteTransformation', function($scope,$rootScope,$http) {
  $scope.deleteTransform = function(event,transformationType,domainName,segmentName,domainId,segmentId)
   {
	   $rootScope.event = "confirmPage";
			var object = new Object();
			object.event="deleteTransformConfirm";
			object.domainName=domainName;
			object.segmentName=segmentName;
			object.domainId=domainId;
			object.segmentId=segmentId;
			object.transformationType=transformationType;
			$rootScope.confirmjson = object;
		
   }
   
});

	mainModule.controller('addDomainController', function($scope, $rootScope) {
		$scope.addDomain = function() {
			$rootScope.DomainMessages = "";
			$rootScope.event = "Add Domain";
			$rootScope.editDomainJSON = "";
		}
	});
		  

	function checkUndefined(param) {
		if(typeof param == undefined) {
			param = null;
		}
		return param;
	}
	
	mainModule.controller('saveDomainController', function($scope,$rootScope,$http) {
		     $scope.saveDomain = function(event,domainId,domain_name,domain_url,seed_url, raw_content_directory,final_content_directory,staticAssetHostNames,
		    		 relatedStaticAssetDomainId,directoryName,staticAssetDomain, domainUserAgent,domainHost,additionalBaseURL,crawlerUrl) {

		    	 staticAssetHostNames = checkUndefined(staticAssetHostNames);
		    	 relatedStaticAssetDomainId = checkUndefined(relatedStaticAssetDomainId);
		    	 directoryName = checkUndefined(directoryName);
		    	 domainUserAgent = checkUndefined(domainUserAgent);
		    	 domainHost = checkUndefined(domainHost);
		    	 additionalBaseURL = checkUndefined(additionalBaseURL);
		    	 crawlerUrl = checkUndefined(crawlerUrl);
		    	 staticAssetDomain = checkUndefined(staticAssetDomain);
		    	 
			     if(domain_name!=null&domain_url!=null&seed_url!=null&raw_content_directory!=null&final_content_directory!=null&staticAssetDomain!=null&crawlerUrl!=null){
			     $rootScope.DomainMessages = $rootScope.$new(true);
				 var url = null;
			     if(event=='Add Domain') {
			    	 url = "http://nview.nviz.co:8180/hm/domains/add";
			     } else {
			    	 url = "http://nview.nviz.co:8180/hm/domains/edit?id="+ domainId;
			     }
			     
			     $rootScope.event="domainPage";
				
		    	 $http.post(url,{'domainName':domain_name,'url':domain_url,'seedUrl':seed_url, 'rawContentDirectory':raw_content_directory,'finalContentDirectory':final_content_directory,'staticAssetHostNames':staticAssetHostNames,'staticAssetDomain':staticAssetDomain,'relatedStaticAssetDomainId':relatedStaticAssetDomainId,'directoryName':directoryName,'domainUserAgent':domainUserAgent,'domainHost':domainHost,'additionalBaseURL':additionalBaseURL,'crawlerUrl':crawlerUrl},getHeaders())
			     .success(function(data, status, headers, config){
					 $http.get("http://nview.nviz.co:8180/hm/domains/all",getHeaders())
						.then(function(response) {
							if(response.data.statusCode == 1) {
								$rootScope.DomainMessages.errorMessage = createErrorMessage(response.data.response);
							} else {
								$rootScope.domains = response.data.response;
							}
						});
			     })
			     .error(function(data, status, header, config){
			    	 $rootScope.DomainMessages.errorMessage = createErrorMessage(data.response);
			     });
		     } else{
				 $rootScope.DomainMessages = $rootScope.$new(true);
				 $rootScope.DomainMessages.errorMessage = "Please enter required values";
			 }
		    }
		   });

mainModule.controller('segmentSwapController', function($scope,$rootScope,$http) {
	
	$scope.swapPriorityConfirm = function(segmentName,segmentId,segment,move,segmentList){
			 
			$rootScope.event = "confirmPage";
				var object = new Object();
				object.event="swapPriorityConfirm";
				object.domainName=$rootScope.activeDomain.domainName;
				object.segmentName=segmentName;
				object.domainId=$rootScope.activeDomain.domainId;
				object.segmentId=segmentId;
				object.segment=segment;
				object.segment=segment;
				object.move=move;
				object.segmentList=segmentList;
				$rootScope.confirmjson = object;
			 
		} 
});

mainModule.controller(
		    'AddSegmentConfirm',
		    [
		      '$rootScope',
		      '$scope',
		      '$http',
		      '$injector',
		      function($rootScope, $scope, $http, $injector) {
		    	
	    	  $scope.addHeaderToSegment= function(){
	    		  var seg = $rootScope.segment;
		  			var headersList = seg.headers;
		  			if(headersList == undefined || headersList.length == 0){
		  				headersList = new Array();
		  			}
		  			var header = new Object();
		  			header.headerName="";
		  			header.headerVame="";
		  			header.request=0;
		  			header.add=0;
		  			headersList.push(header);
		  			seg.headers = headersList;
	    	  }
	    	  $scope.removeHeaderFromSegment= function(index){
	    		  var seg = $rootScope.segment;
	    		  seg.headers.splice(index, 1);
	    	  }
	    	  $scope.addTransformationToSegment= function(){
	  			var selectedTransformationCfg = $("#segTransSelect").val();
	  			var selectedOption = JSON.parse(selectedTransformationCfg);
	  			var name = selectedOption.name;
	  			var seg = $rootScope.segment;
	  			var transformationList = seg.transformations;
	  			if(transformationList == undefined || transformationList.length == 0){
	  				transformationList = new Array();
	  			}
				var segTransformation = new Object();
				var attributeList = new Array();
				for(var y = 0; y < selectedOption.attributes.length; y++){
					var attribute = new Object();
					attribute.name=selectedOption.attributes[y].name;
					attribute.value="";
					attribute.id=0;
					attributeList.push(attribute);
				}
				segTransformation.transformationName=selectedOption.name;
				segTransformation.transformationId=selectedOption.id;
				segTransformation.segmentTransformationId=0;
				segTransformation.enabled=1;
				segTransformation.executionSequence=0;
				segTransformation.attributes = attributeList;
				transformationList.push(segTransformation);
				seg.transformations = transformationList;
	  		  }
	    	  
	    	  $scope.removeTransformationFromSegment= function(index){
	    		  var seg = $rootScope.segment;
	    		  seg.transformations.splice(index, 1);
	    		
		  	}
		    	  
	    	  $scope.addSegment = function() {
	    			
	    			$rootScope.messages = $rootScope.$new(true)
	    			
	    			$http.get("http://localhost:9004/hm/transformations/all",getHeaders())
	    			.then(function(response) {
	    					$rootScope.transformationCfgs = response.data.response;
	    					$rootScope.flag = $rootScope.$new(true)
	    					$rootScope.flag1 = 1;
	    					$rootScope.htmlPathflag = 1;
	    					$rootScope.urlflag = 1;
	    					$rootScope.index = 1;
	    					$rootScope.operation = "Add Segment";
	    					$rootScope.event = "Add Segment";
    						$rootScope.segment = {
    						    async: 1,
    						    crawl: 1,
    						    defer: 1

    						}

	    			});
	    		}
		    	  
		       $scope.addSegmentConfirm = function() 
		       {
	    			var segment = $rootScope.segment;
	    			var activeDomain = $rootScope.activeDomain;
	    			
				
							var url = "http://localhost:9004/hm/domains/segments/add?domainId="+activeDomain.domainId;
							$http.post(url,segment,getHeaders())
						    
							.success(function(data, status, headers, config){
								$rootScope.event="Segment Page";
								$rootScope.SegmentMessages = $rootScope.$new(true);
								 $http.get("http://localhost:9004/hm/domains/view?id="+ activeDomain.domainId,getHeaders())
									.then(function(response) {
										if(response.data.statusCode == 1) {
											$rootScope.SegmentMessages.errorMessage = createErrorMessage(response.data.response);
										} else {
											$rootScope.activeDomain = response.data.response;
										}
								});
						     })
						     .error(function(data, status, header, config){
						    	 $rootScope.messages.errorMessage = createErrorMessage(data.response);
						     });
				} // end
								
							
		$scope.cancelAddSegmentProcess=function(domainId) {
				   $rootScope.SegmentMessages = "";
		        $rootScope.event ="Segment Page";
		        $http.get("/hm/segmentPage.jsp",{params:{"domainId":domainId}})
		          .then(function(response) {
		          $rootScope.segmentDetail = response.data;
		        });
		}
			   
	} ]);
	
mainModule.controller('headerController', function($scope,$rootScope,$http) {
	$scope.deleteAddHeader=function(event,headerName,headerType,domainName,segmentName,domainId,segmentId,headerId)
	{
		var object = new Object();
		object.event=event;
		object.domainName=domainName;
		object.domainId=domainId;
		object.segmentName=segmentName;
		object.segmentId=segmentId;
		object.headerName=headerName;
		object.headerType=headerType;
		object.headerId=headerId;
		$rootScope.confirmjson = object;
		$rootScope.event = "confirmPage";
	}
	$scope.deleteAddHeaderConfirm=function(eventName,headerName,headerType,domainName,segmentName,domainId,segmentId,headerId)
	{
		$rootScope.event = "segmentPage";
		$rootScope.cpJSON = "";
		$http.get("/hm/processOperation.jsp", {params:{
				"event":eventName,
				"headerName":headerName,
				"headerType":headerType,
				"domainName":domainName,
				"segmentName":segmentName,
				"domainId":domainId,
				"headerId":headerId,
				"segmentId":segmentId
			}})
			.then(function(result) {
				
			if(result.data.StatusDescription==="Please Login")
			{
				window.location='/hm/login.jsp'
			}
			else
			{	
				var event1 = "Edit";
				$http.get("/hm/processOperation.jsp",{params:{"event":event1,"segmentName":segmentName,"domainName":domainName,"segmentId":segmentId,"domainId":domainId}})
			   .then(function(response) {
				$rootScope.detailsEditSegment = response.data;
				$rootScope.operation = "Edit Segment";
			   
				$rootScope.event = "Add Segment";
				$rootScope.editSegmentJSON = segmentData;
				$rootScope.domainId = domainId;
				$rootScope.domainName = domainName;
				$rootScope.segmentName = segmentName;
			 $rootScope.flag1 = $rootScope.$new(true)
				$rootScope.htmlPathflag = $rootScope.$new(true)
				$rootScope.urlflag = $rootScope.$new(true)
			  $rootScope.eventname = "Edit"
				$rootScope.flag = 2;
				$rootScope.domainName = domainName;
				$rootScope.segmentName = segmentName;
				$rootScope.activeDomain = segments;
				
				$rootScope.eventName = "Add Segment";
			   });
			}
		});

	}
	$scope.deleteDelHeader=function(event,headerName,headerType,domainName,segmentName,domainId,segmentId,headerId)
	{
		var object = new Object();
		object.event=event;
		object.domainName=domainName;
		object.domainId=domainId;
		object.segmentName=segmentName;
		object.segmentId=segmentId;
		object.headerName=headerName;
		object.headerType=headerType;
		object.headerId=headerId;
		$rootScope.confirmjson = object;
		$rootScope.event = "confirmPage";
	}
	$scope.deleteDelHeaderConfirm=function(eventName,headerName,headerType,domainName,segmentName,domainId,segmentId,headerId)
	{
		$rootScope.event = "segmentPage";
		$rootScope.cpJSON = "";
		$http.get("/hm/processOperation.jsp", {params:{
				"event":eventName,
				"headerName":headerName,
				"headerType":headerType,
				"domainName":domainName,
				"segmentName":segmentName,
				"domainId":domainId,
				"headerId":headerId,
				"segmentId":segmentId
			}})
			.then(function(result) {
			$rootScope.messages = $rootScope.$new(true)
			$rootScope.messages = result.data;
			if(result.data.StatusDescription==="Please Login")
			{
				window.location='/hm/login.jsp'
			}
			else
			{	
				var event1 = "Edit";
				$http.get("/hm/processOperation.jsp",{params:{"event":event1,"segmentName":segmentName,"domainName":domainName,"segmentId":segmentId,"domainId":domainId}})
			   .then(function(response) {
				$rootScope.detailsEditSegment = response.data;
				$rootScope.operation = "Edit Segment";
			   
				$rootScope.event = "Add Segment";
				$rootScope.editSegmentJSON = segmentData;
				$rootScope.domainId = domainId;
				$rootScope.domainName = domainName;
				$rootScope.segmentName = segmentName;
				$rootScope.flag1 = $rootScope.$new(true)
				$rootScope.htmlPathflag = $rootScope.$new(true)
				$rootScope.urlflag = $rootScope.$new(true)
				$rootScope.eventname = "Edit"
				$rootScope.flag = 2;
				$rootScope.index = 1;
				$rootScope.domainName = domainName;
				$rootScope.segmentName = segmentName;
				$rootScope.activeDomain = segments;
				$rootScope.messages = $rootScope.$new(true)
				$rootScope.messages.errorMessage = result.data.errorMessage;
				$rootScope.messages.successMessage = result.data.successMessage;
				
				$rootScope.eventName = "Add Segment";
			   });
			}
		});
	}

	
});	


function removeTransform(cc) {
	var pare = cc.split("_");
	var id = "transformDiv_" + pare[1];
	var child = document.getElementById(id);
	var parent = document.getElementById("addtransform");
	if (pare[1] == 0) {
		parent.removeChild(child);
		//var child1 = document.getElementById(cc);
		//parent.removeChild(child1);

	} else {
		parent.removeChild(child);
		//var child1 = document.getElementById(cc);
		//parent.removeChild(child1);
	}
}

function removeHeader(cc){
	var pare = cc.split("_");
		var id = "headerDiv_" + pare[1];
		var child = document.getElementById(id);
		var parent = document.getElementById("headerBlock");
		if (pare[1] == 0) {
			parent.removeChild(child);
		} else {
			parent.removeChild(child);
		}
	}

	function removeDeleteHeader(cc) {
	var pare = cc.split("_");
		var id = "delheaderDiv_" + pare[1];
		var child = document.getElementById(id);
		var parent = document.getElementById("delheaderBlock");
		if (pare[1] == 0) {
			parent.removeChild(child);
			//var child1 = document.getElementById(cc);
			//parent.removeChild(child1);
		} else {
			parent.removeChild(child);
			//var child1 = document.getElementById(cc);
			//parent.removeChild(child1);
		}
	}
	
	function removeRequestHeader(cc) {
		var pare = cc.split("_");
		var id = "requestHeaderDiv_" + pare[1];
		var child = document.getElementById(id);
		var parent = document.getElementById("requestHeaderBlock");
		if (pare[1] == 0) {
			parent.removeChild(child);
			//var child1 = document.getElementById(cc);
			//parent.removeChild(child1);

		} else {
			parent.removeChild(child);
			//var child1 = document.getElementById(cc);
			//parent.removeChild(child1);
		}
	}

	function removeDeleteRequestHeader(cc) {
		var pare = cc.split("_");
		var id = "delRequestHeaderDiv_" + pare[1];
		var child = document.getElementById(id);
		var parent = document.getElementById("delRequestHeaderBlock");
		if (pare[1] == 0) {
			parent.removeChild(child);
			//var child1 = document.getElementById(cc);
			//parent.removeChild(child1);

		} else {
			parent.removeChild(child);
			//var child1 = document.getElementById(cc);
			//parent.removeChild(child1);
		}
	}
	
	function show(div) {
		if (document.getElementById(div).style.display == 'none') {
			document.getElementById(div).style.display = 'block';
		}
	}
	function hide(div) {
		document.getElementById(div).style.display = 'none';
	}
	function setFolderType(id, block, row) {
		var selectedOption = document.getElementById(id).options[document
				.getElementById(id).selectedIndex].value;
		if (selectedOption != 'resourceName'
				&& selectedOption != "") {
			document.getElementById('folderName_' + block + "_"
					+ row).style.visibility = "visible";
		} else {
			document.getElementById('folderName_' + block + "_"
					+ row).style.visibility = "hidden";
		}
	}

	function setFileType(id, block) {
		var selectedOption = document.getElementById(id).options[document
				.getElementById(id).selectedIndex].value;
		if (selectedOption != 'resourceName'
				&& selectedOption != "") {
			document.getElementById('fileName_' + block).style.visibility = "visible";
		} else {
			document.getElementById('fileName_' + block).style.visibility = "hidden";
		}
	}

	function addFolder(blockId, number) {
		var count = 0;
		var counter = 0;
		var parentDiv = document.getElementById("folderBlock"
				+ number);
		var count = parseInt(document
				.getElementById("folderCount" + number).value) + 1;
		var folder = document.getElementById("folderTemplate");
		var new_folder = folder.cloneNode(true);
		new_folder.setAttribute("style",
				"visibility: visible;display: block");

		new_folder.id = "folder_" + number + "_" + count;

		var counter = document.getElementById("folderCount"
				+ number);
		counter.value = count;

		var folderName = new_folder
				.getElementsByTagName("input")[1];
		folderName.id = "folderName_" + number + "_" + count;
		folderName.name = "folderName";

		var option = new_folder.getElementsByTagName("select")[0];
		option.id = "folderType_" + number + "_" + count;
		option.name = "folderType";
		option
				.setAttribute("onchange", "setFolderType('"
						+ option.id + "'," + number + ","
						+ count + ")");
		parentDiv.appendChild(new_folder);
	}

	function addHTMLPathBlock() {
		var count = 0;
		var counter = 0;
		var parentDiv = document.getElementById("parentDiv");
		var counter = parseInt(document
				.getElementById("blockCount").value) + 1;
		if (isNaN(counter)) {
			counter = 2;
		}
		var block = document.getElementById("block1");
		var new_block = block.cloneNode(true);
		new_block.setAttribute("style",
				"visibility: visible;display: block");

		var folderCount = new_block
				.getElementsByTagName("input")[2];
		folderCount.id = "folderCount" + (counter);

		var defaultPattern = new_block
				.getElementsByTagName("input")[0];
		defaultPattern.value = (counter);
		defaultPattern.checked = false;
		/*
		 * if(counter == 1){ defaultPattern.checked = flase; }
		 */

		new_block.id = "block" + (counter);

		var folderBlock = new_block.getElementsByTagName("div")[1];
		folderBlock.id = "folderBlock" + (counter);

		var folderName = new_block
				.getElementsByTagName("input")[1];
		folderName.id = "folderName_" + (counter) + "_1";
		folderName.name = "folderName";

		var option = new_block.getElementsByTagName("select")[0];
		option.id = "folderType" + (counter) + "_1";
		option.name = "folderType";
		option.setAttribute("onchange", "setFolderType('"
				+ option.id + "'," + (counter) + ",1)");

		var addFolder = new_block.getElementsByTagName("input")[3];
		addFolder.setAttribute("onclick",
				"addFolder('folderBlock" + (counter) + "',"
						+ (counter) + ")");

		var fileOption = new_block
				.getElementsByTagName("select")[1];
		fileOption.id = "fileType_" + (counter);
		fileOption.name = "fileType";
		fileOption.setAttribute("onchange",
				"setFileType(this.id," + (counter) + ")");

		var file = new_block.getElementsByTagName("input")[4];
		file.id = "fileName_" + (counter);
		file.name = "fileName";

		var extension = new_block.getElementsByTagName("input")[5];
		extension.id = "extension_" + (counter);
		extension.name = "fileExt";

		var blockCounter = document
				.getElementById("blockCount");
		blockCounter.value = counter;

		var deleteOption = new_block.getElementsByTagName("a")[0];
		deleteOption.id = "delete" + (counter);
		deleteOption.name = "delete" + (counter);
		deleteOption.setAttribute('onclick', "deleteBlock("
				+ counter + ")");

		var blocks = new_block.getElementsByTagName("input")[6];
		if (typeof blocks !== "undefined") {
			blocks.value = counter;
		}

		parentDiv.appendChild(new_block);
	}

	function deleteBlock(blockID) {
		var element = document
				.getElementById("block" + blockID);
		element.parentNode.removeChild(element);
	}



	function setFolderType(id, block, row) {
		var selectedOption = document.getElementById(id).options[document
				.getElementById(id).selectedIndex].value;
		if (selectedOption != 'resourceName'
				&& selectedOption != "") {
			document.getElementById('folderName_' + block + "_"
					+ row).style.visibility = "visible";
		} else {
			document.getElementById('folderName_' + block + "_"
					+ row).style.visibility = "hidden";
		}
	}

	function addHeader() {
		var count = 0;
		var counter = 0;
		var folder = document.getElementById("headerDiv_0");
		var new_folder = folder.cloneNode(true);
		new_folder.setAttribute("style",
				"visibility: visible;display: block");
		count = count + 1;
		new_folder.id = "headerDiv_" + count;

		var deleteOption = new_folder
				.getElementsByTagName("input")[3];
		deleteOption.id = "deleteHeaderDiv_" + count;
		deleteOption.setAttribute("style",
				"visibility: visible;display: block");
		headerBlock.appendChild(new_folder);
	}

	function addDeleteHeader() {
		var count = 0;
		var counter = 0;
		var folder = document.getElementById("delheaderDiv_0");
		var new_folder = folder.cloneNode(true);
		new_folder.setAttribute("style",
				"visibility: visible;display: block");
		count = count + 1;
		new_folder.id = "delheaderDiv_" + count;

		var deleteOption = new_folder
				.getElementsByTagName("input")[2];
		deleteOption.id = "deletedelHeaderDiv_" + count;
		deleteOption.setAttribute("style",
				"visibility: visible;display: block");

		delheaderBlock.appendChild(new_folder);
	}

	function addRequestHeader() {
		var count = 0;
		var counter = 0;
		var folder = document
				.getElementById("requestHeaderDiv_0");
		var new_folder = folder.cloneNode(true);
		new_folder.setAttribute("style",
				"visibility: visible;display: block");
		count = count + 1;
		new_folder.id = "requestHeaderDiv_" + count;

		var deleteOption = new_folder
				.getElementsByTagName("input")[3];
		deleteOption.id = "deleteRequestHeaderDiv_" + count;
		deleteOption.setAttribute("style",
				"visibility: visible;display: block");

		requestHeaderBlock.appendChild(new_folder);
	}

	function addRequestDeleteHeader() {
		var count = 0;
		var counter = 0;
		var folder = document
				.getElementById("delRequestHeaderDiv_0");
		var new_folder = folder.cloneNode(true);
		new_folder.setAttribute("style",
				"visibility: visible;display: block");
		count = count + 1;
		new_folder.id = "delRequestHeaderDiv_" + count;

		var deleteOption = new_folder
				.getElementsByTagName("input")[2];
		deleteOption.id = "deletedelRequestHeaderDiv_" + count;
		deleteOption.setAttribute("style",
				"visibility: visible;display: block");

		delRequestHeaderBlock.appendChild(new_folder);
	}
	

	function deleteSearchString(cc) {
		var pare = cc.split("_");
		var id = "searchStringDiv_" + pare[1];
		var child = document.getElementById(id);
		var parent = document.getElementById("searchStringBlock");
		parent.remove();
	}
	var count = 0;
	var counter = 0;
	function addAttributes() {
		
		if(document.getElementById("count").value != "" && count < parseInt(document.getElementById("count").value)) {
			count = parseInt(document.getElementById("count").value);
		}
		
		var folder = document.getElementById("attributeDiv_0");
		var new_folder = folder.cloneNode(true);
		new_folder.setAttribute("style",
				"visibility: visible;display: block");
		count = count + 1;
		counter = counter + 1;
		new_folder.id = "attributeDiv_" + count;
		
		attributesBlock.appendChild(new_folder);
		var new_folder_id="#"+new_folder.id;
		var transAttrName = "#transformationAttributeName_"+count;
		var transAttrOptions = "#transformationAttributeOptions_"+count;
		var deleteOption = "#deleteAttributeDiv_"+count;
		
		$(new_folder_id).find("#transformationAttributeName").attr("id","transformationAttributeName_"+count);
		$(new_folder_id).find(transAttrName).attr("name","transformationAttributeName_"+count);
		$(new_folder_id).find("#transformationAttributeOptions").attr("id","transformationAttributeOptions_"+count);
		$(new_folder_id).find(transAttrOptions).attr("name","transformationAttributeOptions_"+count);
		$(new_folder_id).find("input[name^=transformationAttributeDropdown]").each(function(){
			$(this).attr("name", "transformationAttributeDropdown_"+count);
		});
		$(new_folder_id).find("input[name^=transformationAttributeRequired]").each(function(){
			$(this).attr("name", "transformationAttributeRequired_"+count);
		});
		$(new_folder_id).find("#deleteAttributeDiv").attr("id","deleteAttributeDiv_"+count);
		$(new_folder_id).find(deleteOption).attr("name","deleteAttributeDiv_"+count);
		
	}
	function deleteAttributeField(attributeFieldId) {
		var splitId = attributeFieldId.split("_");
		var id = "attributeDiv_" + splitId[1];
		var child = document.getElementById(id);
		var parent = document.getElementById("attributesBlock");
		parent.removeChild(child);
	}