var dates = [];
var datesfromJson = [];
var http_count = [];
var https_count = [];
var data_for_chart = [];
var totalCount = [];
var no_of_days = 7;
var bandwidthCountArray = [];
var data_for_bandwidthChart = [];

//function to format the date in yyyy-mm-dd format

// mayank's variables  used by method calls 
 var columnArray,chartTitle,chartWidth,chartHeight,annotation_placement,vAxisTitle,hAxisTitle,left_color,right_color,chart_position,chart_alignment;
var columnArray=[];
var series_404=[];
var series_409=[];
var data_for_400=[];
data_for_400.push(['Date','404','409', {type: 'string', role: 'annotation'}]);
var series_500=[];
var series_504=[];
var data_for_500=[];
data_for_500.push(['Date','500','504', {type: 'string', role: 'annotation'}]);
var allStatusCodeArray=[[],[],[],[],[],[],[],[],[]];
var sumOfStatusCodeArray=[];
var apiResponse;
data_for_bandwidthChart.push(['Date', 'bandwidth']);
// variables for boxes error hit etc ...

 var today = new Date();
 var prevDate = myDate(1);
var totalReqCount = 0;
var errorRatio = 0;
var bandwidthCount = 0;
var cacheHit = 0;
var prevData;	
	
	
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

//function to find of last nth day in yyyy-mm--dd format
function myDate(day) {
    var date = new Date();
    var dd = date.getDate() - day;
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var newDate = yyyy + '-' + mm + '-' + dd;

    return newDate;
}
function buildDate(yearString,yearMonth,yearDay)
{
	
	return  new Date(yearString, yearMonth, yearDay);
}
//this is the function that gets loaded initially
function init(no_of_days)
{

var now = new Date();
console.log("formatted date " + formatDate(now));

console.log("unformatted date " + now);
for (var i = 1; i <= no_of_days; i++) {

    dates.push(myDate(i))
}

console.log("past "+ no_of_days+" dates are " + dates);
// first array to specify the labels of x and y axis 
data_for_chart.push(['Date', 'http count', 'https count', {type: 'string', role: 'annotation'}]);
getJsons();
google.charts.load("current", { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawStackedColumnChart);

// call ur draw method here 
google.charts.setOnLoadCallback(drawAllColumnCharts);
google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawAllLineCharts);
	//draw_boxes_data();
	
}

function getJsons() 
{
    
	
    for (var j =dates.length-1; j >=0 ; j--) 
	{

        $.ajax(
		{
            async: false,
            type: 'GET',
            url: "http://nview.nviz.co/summaryJsons/" + dates[j] + ".json",
            success: function(response) {
                apiResponse = response;
            },
            complete: function(xhr, textStatus) 
			{
                // console.log(xhr);
                // console.log(xhr.responseText);
                //console.log(textStatus);

            }
        }).done(function(response) 
		{
            //console.log("Inside ajax call to jsan url");
            console.log(response);
			
        });
        // populate ALL status Code Array keys 
        var counter = 0;
        if (apiResponse != undefined) 
		{
            http_count[j] = apiResponse.summary.protocol.http.count;
            https_count[j] = apiResponse.summary.protocol.https.count;
            datesfromJson[j] = (Object.keys(apiResponse.summary.date))[0];
            //var str=apiResponse.name.split(".");
            //datesfromJson[j]=$.trim(str[0]);
            totalCount[j] = apiResponse.summary.date[dates[j]].count;
            data_for_chart.push([datesfromJson[j], http_count[j], https_count[j], totalCount[j]]);

            //400 series errors


            $.each(apiResponse.summary.httpStatusCode, function (key, value) {
                 if(counter <= 8)
                 {
                allStatusCodeArray[counter].push(value.count);
            }
                counter++;
                if (key.length == 3 && key.startsWith("4")) {
                    //console.log("Error Codes: "+key, value.count);
                    if (key == '404') {
                        series_404[j] = value.count;
                    }
                    if (key == '409') {
                        series_409[j] = value.count;
                    }

                }
                else if (key.length == 3 && key.startsWith("5")) {
                    //console.log("Error Codes: "+key, value.count);
                    //series_500.push(value.count);
                    if (key == '500') {
                        series_500[j] = value.count;
                    }
                    if (key == '504') {
                        series_504[j] = value.count;
                    }

                }

            });
            var d = apiResponse.date;
            data_for_500.push([buildDate(d.year, d.month, d.day), series_404[j], series_409[j], series_409[j] + series_404[j]]);
            data_for_400.push([buildDate(d.year, d.month, d.day), series_500[j], series_504[j], series_500[j] + series_504[j]]);
            var bandwidth = apiResponse.summary.scByte.scByte.sum;
            //bandwidthCountArray[j] = parseFloat((bytesToSize(bandwidth)).toFixed(2));
			bandwidthCountArray[j]=Number((bytesToSize(bandwidth)).toFixed(2));
            data_for_bandwidthChart.push([buildDate(d.year, d.month, d.day), bandwidthCountArray[j]]);
			
			
			
			// code for boxes for error hit count and etc......
			if(prevDate==dates[j])
			{
				
				prevData=apiResponse;
				totalReqCount = prevData.summary.date[prevDate].count;
				bandwidthCount = prevData.summary.scByte.scByte.sum;
				bandwidthCount = bytesToSize(bandwidthCount);
				var totalHits = (prevData.summary.cdnCacheStatus.TCP_EXPIRED_MISS.count + prevData.summary.cdnCacheStatus.TCP_HIT.count + prevData.summary.cdnCacheStatus.TCP_EXPIRED_HIT.count + prevData.summary.cdnCacheStatus.CONFIG_NOCACHE.count + prevData.summary.cdnCacheStatus.TCP_MISS.count + prevData.summary.cdnCacheStatus.NONE.count);
				var tcpHits = prevData.summary.cdnCacheStatus.TCP_HIT.count;
				cacheHit = (tcpHits / totalHits) * 100;
				
				var totalError = 0;
				var errorCount = 0;
				if(prevData.summary.httpStatusCode[200]!=undefined)
				{totalError+=prevData.summary.httpStatusCode[200].count;}
				if(prevData.summary.httpStatusCode[206]!=undefined)
				{totalError+=prevData.summary.httpStatusCode[206].count;}
				if(prevData.summary.httpStatusCode[301]!=undefined)
				{totalError+=prevData.summary.httpStatusCode[301].count;}
				if(prevData.summary.httpStatusCode[302]!=undefined)
				{totalError+=prevData.summary.httpStatusCode[302].count;}
				if(prevData.summary.httpStatusCode[304]!=undefined)
				{totalError+=prevData.summary.httpStatusCode[304].count;}
				if(prevData.summary.httpStatusCode[404]!=undefined)
				{
					totalError+=prevData.summary.httpStatusCode[404].count;
					errorCount+=prevData.summary.httpStatusCode[404].count;
				}
				if(prevData.summary.httpStatusCode[409]!=undefined)
				{
					totalError+=prevData.summary.httpStatusCode[409].count;
					errorCount+=prevData.summary.httpStatusCode[409].count
				}
				if(prevData.summary.httpStatusCode[500]!=undefined)
				{totalError+=prevData.summary.httpStatusCode[500].count}
			
				errorRatio = (errorCount / totalError) * 100;
				$("#totalReqCount").html(totalReqCount);
				$("#errorRatio").html(errorRatio.toFixed(2) + "%");
				$("#bandwidthCount").html(bandwidthCount.toFixed(2) + " GB");
				$("#cacheHit").html(cacheHit.toFixed(2) + "%");
				
			}
	
			
        }

        //console.log("date from object is " + (Object.keys(apiResponse.summary.date))[0]);
        // console.log("http count from this object is " + apiResponse.summary.protocol.http.count);
        // console.log("https count from this object is " + apiResponse.summary.protocol.https.count);
    }
	
	for(var i=0;i<allStatusCodeArray.length;i++)
	{
		var sum=0;
			for(var j=0;j<allStatusCodeArray[i].length;j++)
			{
				sum+=allStatusCodeArray[i][j];
			}
			sumOfStatusCodeArray[i]=sum;
	}
    console.log("http counts " + http_count);
    console.log("date array values " + datesfromJson);
    console.log("https counts " + https_count);
    console.log("data_for_chart " + data_for_chart);
	console.log("series_404 " + series_404);
	console.log("series_409 " + series_409);
	console.log("series_500 " + series_500);
	console.log("series_504 " + series_504);
	
	
}


init(7);

function drawStackedColumnChart() 
{

    var data = google.visualization.arrayToDataTable(data_for_chart);
    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1, {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
        },
        2
    ]);


    var options = 
	{
	    title: "HTTP/HTTPS Count Visualisation",
	    width: 600,
	    height: 500,
	    annotations: {
	        alwaysOutside: true
	    },
	    bar: { groupWidth: "35%" },
	    legend: { position: 'top', alignment: 'end' },
	    vAxis: { title: "Count" },
	    hAxis: { title: "Date", scaleType: 'Continuous' },
	    colors: ['#1b9e77', '#d95f02'],
	    isStacked: true,
	};
    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
    chart.draw(data, options);
}

//first create global variables and then initialize them in this method 
function setDefaultValues()
{
	
	 chartTitle='';
	 chartWidth=600;
	 chartHeight =500;
	 annotation_placement=true;
	 vAxisTitle ='Count';
	 hAxisTitle ='Date';
	 left_color ='#1b9e77';
	 right_color='#d95f02';
	 chart_position='top';
	 chart_alignment='end';
}
function specifyDataAndOptionsForColumnChartsWithParams(dataWithColumnNames,chartTitle,chartWidth,chartHeight,annotation_placement,vAxisTitle,hAxisTitle,left_color,right_color,chart_position,chart_alignment)
{
	
	var data = new google.visualization.arrayToDataTable(dataWithColumnNames);
    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1, 
		{
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
        },
        2
    ]);

    var options = 
	{
	    title: chartTitle,
	    width: chartWidth,
	    height: chartHeight,
	    annotations: {
	        alwaysOutside: annotation_placement
	    },
	    bar: { groupWidth: "35%" },
	    legend: { position: chart_position, alignment: chart_alignment },
	    vAxis: { title: vAxisTitle },
	    hAxis: { title: hAxisTitle, format: 'MMM dd, yyyy', slantedText: hAxisslantedText },
	    colors: [left_color, right_color],
	    isStacked: true,
	};
    var dataANDOptions = [];
    dataANDOptions.push(data);
    dataANDOptions.push(options);
    return dataANDOptions;

}
// this fucntion will call draw metod for all charts 
function drawAllColumnCharts()
{
	// intialize global variables
	setDefaultValues();
//chartTitle,chartWidth,chartHeight,annotation_placement,vAxisTitle,hAxisTitle,left_color,right_color,chart_position,chart_alignment
	var dataANDOptions=specifyDataAndOptionsForColumnChartsWithParams(data_for_400,'400_Error_values',chartWidth,chartHeight,annotation_placement,vAxisTitle,hAxisTitle,left_color
	,right_color,chart_position,chart_alignment);
	var chart = new google.visualization.ColumnChart(document.getElementById("400_Error_values"));
    chart.draw(dataANDOptions[0], dataANDOptions[1]);
	//dataANDOptions=[];
	// intialize global variables
	setDefaultValues();
//chartTitle,chartWidth,chartHeight,annotation_placement,vAxisTitle,hAxisTitle,left_color,right_color,chart_position,chart_alignment
	 dataANDOptions=specifyDataAndOptionsForColumnChartsWithParams(data_for_500,'500_Error_values',chartWidth,chartHeight,annotation_placement,vAxisTitle,hAxisTitle,left_color
	,right_color,chart_position,chart_alignment);
    chart = new google.visualization.ColumnChart(document.getElementById("500_Error_values"));
    chart.draw(dataANDOptions[0], dataANDOptions[1]);
	
	
}


  function drawPieChart() 
  {

        var data = google.visualization.arrayToDataTable([
		  ['ErrorCode', 'Count'],
          ['200',Math.round(sumOfStatusCodeArray[0]/no_of_days)],
          ['206', Math.round(sumOfStatusCodeArray[1]/no_of_days)],
          ['301', Math.round(sumOfStatusCodeArray[2]/no_of_days)],
          ['302', Math.round(sumOfStatusCodeArray[3]/no_of_days)],
          ['304', Math.round(sumOfStatusCodeArray[4]/no_of_days)],
          ['404', Math.round(sumOfStatusCodeArray[5]/no_of_days)],
		  ['409', Math.round(sumOfStatusCodeArray[6]/no_of_days)],
		  ['500', Math.round(sumOfStatusCodeArray[7]/no_of_days)],	
		  ['504', Math.round(sumOfStatusCodeArray[8]/no_of_days)]
		  
        ]);

        var options = {
          title: 'ERROR COUNT'
		  
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}

//////////Line chart/////////////////

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, 3));
};

var chartCurveType;
var hAxisfontSize;
var hAxisslantedText;

function setDefaultValuesForLineChart() {

    chartTitle = '';
    chartWidth = 600;
    chartHeight = 500;
    chartCurveType = 'function';
    vAxisTitle = '';
    hAxisTitle = "Date";
    hAxisfontSize: 10;
    hAxisslantedText: true;
}

function specifyDataAndOptionsForLineChartsWithParams(dataWithColumnNames, chartTitle, chartWidth, chartHeight, chartCurveType, vAxisTitle, hAxisTitle, hAxisfontSize, hAxisslantedText) 
{

    var data = new google.visualization.arrayToDataTable(dataWithColumnNames);
    var view = new google.visualization.DataView(data);

    var options = {
        title: chartTitle,
        curveType: chartCurveType,
        legend: { position: 'top', alignment: 'end' },
        width: chartWidth,
        height: chartHeight,
        vAxis: { title: vAxisTitle },
        hAxis: {
            title: hAxisTitle,
            textStyle: {
                fontSize: hAxisfontSize // or the number you want
            },
            slantedText: hAxisslantedText
        }

    };
    var dataANDOptions = [];
    dataANDOptions.push(data);
    dataANDOptions.push(options);
    return dataANDOptions;

}

function drawAllLineCharts() {
    // intialize global variables
    setDefaultValuesForLineChart();
    //chartTitle,chartWidth,chartHeight,annotation_placement,vAxisTitle,hAxisTitle,left_color,right_color,chart_position,chart_alignment
    var dataANDOptions = specifyDataAndOptionsForLineChartsWithParams(data_for_bandwidthChart, 'Total bandwidth used per day in last week', chartWidth, chartHeight, chartCurveType, 'Bandwidth (in GB)', 'Date', 10, true);
    var chart = new google.visualization.LineChart(document.getElementById("linechart_values"));
    chart.draw(dataANDOptions[0], dataANDOptions[1]);
}

