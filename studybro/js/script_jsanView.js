var productListdataStoreBackUp, productFilteredData;
$(function () {
    function getJSANData() {
        var apiResponse;
        $.ajax({
            async: false,
            type: 'GET',
            url: "http://hmny6x.nviz.co/nv/ny/catalog/categories/575/v59/575.jsan",
            success: function (response) {
                apiResponse = response;
            },
            complete: function (xhr, textStatus) {
                //console.log(xhr);
            }
        }).done(function (response) {
            //console.log("Inside ajax call to jsan url");
            //console.log(response);
        });
        return apiResponse;
    }

    function getCategoryLatestVersion() {
        var apiResponse;
        $.ajax({
            async: false,
            type: 'GET',
            url: "http://hmny6x.nviz.co/nv/ny/catalog/categories/category/latestVersion.json",
            success: function (response) {
                apiResponse = response;
            },
            complete: function (xhr, textStatus) {
                //console.log(xhr);
            }
        }).done(function (response) {
            //console.log("Inside ajax call to jsan url");
            //console.log(response);
        });
        return apiResponse;
    }

    init();

    function init() {

        versionResponse = getCategoryLatestVersion();
        Version_number = versionResponse["Version number"];
        categories = getCategoriesFromJSON(Version_number);
        fillDrpCategory(categories);
        response = getJSANData();
        //console.log(versionResponse);
        //console.log(versionResponse.Timestamp);
        //console.log(versionResponse["Version number"]);
        // console.log("category_code"+category_code);
        console.log("Retrieving JSAN data");
        console.log(response);
        // Setting data     

        setStoreData();
        productFilteredData = $.extend(true, [], productListdataStoreBackUp);
        //GenerateTable();
    }

    function getCategoriesFromJSON(Version_number) {
        var apiResponse;
        $.ajax({
            async: false,
            type: 'GET',
            url: "http://hmny6x.nviz.co/nv/ny/catalog/categories/category/" + Version_number + "/category.jsan",
            success: function (response) {
                apiResponse = response;
            },
            complete: function (xhr, textStatus) {
                //console.log(xhr);
            }
        }).done(function (response) {
            //console.log("Inside ajax call to jsan url");
            //console.log(response);
        });
        return apiResponse;
    }

    function fillDrpCategory(categories) {
        $("#selCategory").empty();
        if (categories != undefined) {
            $("#selCategory").append("<option style='background-color: #fff;color:#000;' value=''>--Select Category--</option>")
            for (var i = 0; i < categories.Master_category_categoryCode.length; i++) {
                $("#selCategory").append("<option style='background-color: #fff;color:#000;' value='" + categories.Master_category_categoryCode[i] + "'>" + categories.Master_category_titleName[i] + "</option>")
            }
        }
    }

    function createFields(object) {
        object["relevance_results_name"] = [];
        object["relevance_results_images"] = [];
        object["relevance_price_value"] = [];
        object["relevance_results_summary"] = [];
        object["relevance_results_averageRating"] = [];
        object["relevance_results_code"] = [];
        object["relevance_results_stockLevel"] = [];
        object["relevance_results_stockLevelStatus"] = [];
    }

    function setStoreData() {
        productListdataStoreBackUp = response;
        productListDataCompareList = response;
        // productData = response;

        createFields(productListdataStoreBackUp);

        initializeProductListdataStoreBackUp();

    }

    function initializeProductListdataStoreBackUp() {
        for (var i = 0; i < response.Result_results_name.length; i++) {
            //////console.log(response.Master_results_name[response.Result_results_name[i]]);
            productListdataStoreBackUp["relevance_results_name"][i] = response.Master_results_name[response.Result_results_name[i]]
            productListdataStoreBackUp["relevance_results_images"][i] = "image" + i;
            productListdataStoreBackUp["relevance_price_value"][i] = response.Master_results_price_value[response.Result_results_price_value[i]];
            productListdataStoreBackUp["relevance_results_summary"][i] = response.Master_results_summary[response.Result_results_summary[i]];
            productListdataStoreBackUp["relevance_results_averageRating"][i] = response.Master_results_averageRating[response.Result_results_averageRating[i]];
            productListdataStoreBackUp["relevance_results_code"][i] = response.Master_results_code[response.Result_results_code[i]];
        }
    }

    function GenerateTable() {
        var productData = [];
        for (var i = 0; i < productListdataStoreBackUp.relevance_results_code.length; i++) {
            var stockLevel_index = productListdataStoreBackUp.Result_results_stock_stockLevel[i];
            var stockLevelStatus_index = productListdataStoreBackUp.Result_results_stock_stockLevelStatus_code[i];
            var stocklLevel = productListdataStoreBackUp.Master_results_numberOfReviews[stockLevel_index];
            var stockStatus = productListdataStoreBackUp.Master_results_stock_stockLevelStatus_code[stockLevelStatus_index];
            var review_index = productListdataStoreBackUp.Result_results_numberOfReviews[i];
            var noReviews = productListdataStoreBackUp.Master_results_numberOfReviews[review_index];
            var product = {
                code: productListdataStoreBackUp.relevance_results_code[i],
                name: productListdataStoreBackUp.relevance_results_name[i],
                price: productListdataStoreBackUp.relevance_price_value[i],
                image: productListdataStoreBackUp.relevance_results_images[i],
                price: productListdataStoreBackUp.relevance_price_value[i],
                summary: productListdataStoreBackUp.relevance_results_summary[i],
                rating: parseFloat(productListdataStoreBackUp.relevance_results_averageRating[i]).toFixed(2),
                stocklevel: stocklLevel,
                stockStatus: stockStatus,
                noOfReviews: noReviews
            }
            productData.push(product);
        }
        $newHeight = $(window).height() - 150;
        $("#tblAllProducts").bootstrapTable("destroy");
        $("#tblAllProducts").bootstrapTable({
            method: 'get',
            data: productData,
            formatNoMatches: function () {
                return productData.length == 0 ? 'No Products Available' : 'No Products Available';
            },
            formatShowingRows: function (pageFrom, pageTo, totalRows) {
                //return "";//sprintf('Showing %s to %s of %s rows', pageFrom, pageTo, totalRows);
                return 'Showing prducts ' + pageFrom + ' to ' + pageTo + ' of ' + totalRows + ' Products';//sprintf('Showing %s to %s of %s rows', from, to, total);
            },
            cache: false,
            height: $newHeight,//538,//700            
            striped: true,
            pagination: true,
            pageSize: 20,
            pageList: [20, 50, 100],
            search: true,
            singleSelect: true,
            minimumCountColumns: 2,
            paginationPreText: "<<",
            paginationNextText: ">>",
            clickToSelect: false,
            columns: [
                {
                    field: 'code',
                    title: 'Code',
                    class: 'col-md-1',
                    sortable: true,
                    halign: 'center',
                    valign: 'middle',
                    align: 'center',
                }, {
                    field: 'name',
                    title: 'Name',
                    visible: true,
                    halign: 'center',
                    align: 'left',
                    valign: 'middle',
                    class: 'col-md-2',
                    sortable: true
                }, {
                    field: 'price',
                    title: 'Price',
                    visible: true,
                    halign: 'center',
                    align: 'center',
                    valign: 'middle',
                    class: 'col-md-1',
                    sortable: true
                },
                {
                    field: 'summary',
                    title: 'Summary',
                    halign: 'center',
                    align: 'left',
                    valign: 'middle',
                    class: 'col-md-3',
                }, {
                    field: 'noOfReviews',
                    title: 'Total Reviews',
                    halign: 'center',
                    align: 'center',
                    valign: 'middle',
                    class: 'col-md-1',
                    sortable: true
                }, {
                    field: 'rating',
                    title: 'Rating',
                    halign: 'center',
                    align: 'center',
                    valign: 'middle',
                    class: 'col-md-1',
                    sortable: true
                }, {
                    field: 'stocklevel',
                    title: 'Stock Level',
                    halign: 'center',
                    align: 'center',
                    valign: 'middle',
                    class: 'col-md-1',
                    sortable: true
                }, {
                    field: 'stockStatus',
                    title: 'Stock Status',
                    halign: 'center',
                    align: 'center',
                    valign: 'middle',
                    class: 'col-md-1',
                    sortable: true
                }, {
                    field: 'action',
                    title: 'Reviews',
                    align: 'center',
                    valign: 'middle',
                    class: 'col-md-1',
                    formatter: function (value, row, index) {
                        return [
                            '<a class="showReviews" title="Show Reviews" style="cursor:pointer">Reviews</a>',
                        ].join('');
                    },
                    events: operateEvents
                }
            ]
        }).on('all.bs.table', function (e, name, args) {
            $('#tblAllProducts').bootstrapTable('resetView', { height: $newHeight });
        });

        $(window).resize(function () {
            $("#tblAllProducts").bootstrapTable('resetView', {
                height: $newHeight
            });
        });
    };

    function GenerateFacetsTable(facetsData) {
        $newHeight = $(window).height() - 150;
        $("#tblAllFacets").bootstrapTable("destroy");
        $("#tblAllFacets").bootstrapTable({
            method: 'get',
            data: facetsData,
            formatNoMatches: function () {
                return facetsData.length == 0 ? 'No Factes Available' : 'No Facets Available';
            },
            formatShowingRows: function (pageFrom, pageTo, totalRows) {
                //return "";//sprintf('Showing %s to %s of %s rows', pageFrom, pageTo, totalRows);
                return 'Showing facets ' + pageFrom + ' to ' + pageTo + ' of ' + totalRows + ' Facets';//sprintf('Showing %s to %s of %s rows', from, to, total);
            },
            cache: false,
            height: $newHeight,//538,//700            
            striped: true,
            pagination: true,
            pageSize: 20,
            pageList: [20, 50, 100],
            search: true,
            singleSelect: true,
            minimumCountColumns: 2,
            paginationPreText: "<<",
            paginationNextText: ">>",
            clickToSelect: false,
            columns: [
                {
                    field: 'name',
                    title: 'Facet Name',
                    visible: true,
                    halign: 'center',
                    align: 'center',
                    valign: 'middle',
                    class: 'col-md-1',
                    sortable: true
                }, {
                    field: 'nameIndex',
                    title: 'Summary',
                    visible: false
                }, {
                    field: 'category',
                    title: 'Type',
                    class: 'col-md-1',
                    sortable: true,
                    halign: 'center',
                    valign: 'middle',
                    align: 'center',
                }, {
                    field: 'categoryIndex',
                    title: 'Name',
                    visible: false
                }, {
                    field: 'count',
                    title: 'Products Count',
                    halign: 'center',
                    align: 'center',
                    valign: 'middle',
                    class: 'col-md-1',
                    sortable: true
                }, {
                    field: 'action',
                    title: 'Products',
                    align: 'center',
                    valign: 'middle',
                    class: 'col-md-1',
                    formatter: function (value, row, index) {
                        return [
                            '<a class="showProducts" title="Show Products" style="cursor:pointer">Products</a>',
                        ].join('');
                    },
                    events: operateEvents
                }
            ]
        }).on('all.bs.table', function (e, name, args) {
            $('#tblAllFacets').bootstrapTable('resetView', { height: $newHeight });
        });

        $(window).resize(function () {
            $("#tblAllFacets").bootstrapTable('resetView', {
                height: $newHeight
            });
        });
    }

    window.GenerateTableProductsModal = function (filteredData) {
        var productData = [];
        for (var i = 0; i < filteredData.relevance_results_code.length; i++) {
            var product = {
                code: filteredData.relevance_results_code[i],
                name: filteredData.relevance_results_name[i],
                price: filteredData.relevance_price_value[i],
            }
            productData.push(product);
        }
        $newHeightTbl = $("#productModalBody").height() - 20;
        $("#tblFacetsProducts").bootstrapTable("destroy");
        $("#tblFacetsProducts").bootstrapTable({
            method: 'get',
            data: productData,
            formatNoMatches: function () {
                return productData.length == 0 ? 'No Products Available' : 'No Products Available';
            },
            formatShowingRows: function (pageFrom, pageTo, totalRows) {
                //return "";//sprintf('Showing %s to %s of %s rows', pageFrom, pageTo, totalRows);
                return 'Products ' + pageFrom + ' to ' + pageTo + ' of ' + totalRows + ' Products';//sprintf('Showing %s to %s of %s rows', from, to, total);
            },
            cache: false,
            height: $newHeightTbl,//538,//700            
            striped: true,
            pagination: true,
            pageSize: 20,
            search: true,
            singleSelect: true,
            minimumCountColumns: 2,
            paginationPreText: "<<",
            paginationNextText: ">>",
            clickToSelect: false,
            columns: [
                {
                    field: 'code',
                    title: 'Code',
                    class: 'col-md-1',
                    sortable: true,
                    halign: 'center',
                    valign: 'middle',
                    align: 'center',
                }, {
                    field: 'name',
                    title: 'Name',
                    visible: true,
                    halign: 'center',
                    align: 'left',
                    valign: 'middle',
                    class: 'col-md-2',
                    sortable: true
                }, {
                    field: 'price',
                    title: 'Price',
                    visible: true,
                    halign: 'center',
                    align: 'center',
                    valign: 'middle',
                    class: 'col-md-1',
                    sortable: true
                }
            ]
        }).on('all.bs.table', function (e, name, args) {
            $('#tblFacetsProducts').bootstrapTable('resetView', { height: $newHeightTbl });
        });

        $(window).resize(function () {
            $("#tblFacetsProducts").bootstrapTable('resetView', {
                height: $newHeightTbl
            });
        });
    };

    function GetFacetsValues() {
        var facetsCategories = response.Master_facets_facets_name;
        var facetNames = response.Master_facets_facets_facetResults_name;
        var facetValues = response.Result_facets_facets_facetResults_name;
        var facetRows = [];
        for (var i = 0; i < facetValues.length; i++) {
            for (var j = 0; j < facetValues[i].length; j++) {
                var facetIndex = facetValues[i][j];
                var facetCount = response.Master_facets_facets_facetResults_count[response.Result_facets_facets_facetResults_count[i][j]];
                var facet = {
                    category: facetsCategories[i],
                    categoryIndex: i,
                    name: facetNames[facetIndex],
                    nameIndex: j,
                    count: facetCount
                }
                facetRows.push(facet);
            }
        }
        GenerateFacetsTable(facetRows);
    }

    $("#selCategory").on("change", function () {
        var category = $("#selCategory").val();
        var versions = getVersions(category);
        $("#selVersions").empty();
        if (versions != undefined) {
            $("#selVersions").append("<option style='background-color: #fff;color:#000;' value=''>--Select Version--</option>")
            for (var i = 0; i < versions.length; i++) {
                $("#selVersions").append("<option style='background-color: #fff;color:#000;' value='" + versions[i]["Version number"] + "'>" + versions[i]["Version number"] + "</option>")
            }
        }
    });

    $("#selVersions").on("change", function () {
        var category = $("#selCategory").val();
        var version = $("#selVersions").val();
        var myUrl = "http://hmny6x.nviz.co/nv/ny/catalog/categories/" + category + "/" + version + "/" + category + ".jsan";
        console.log(myUrl);
        var data = getData(myUrl);
        if (data != undefined) {
            response = $.extend(true, [], data);
            setStoreData();
            productFilteredData = $.extend(true, [], productListdataStoreBackUp);
            GenerateTable();
            GetFacetsValues();
        }
        else {
            alert("No data available");
        }
    })

    function getData(myUrl) {
        var data;
        $.ajax({
            async: false,
            type: 'GET',
            url: myUrl,
            success: function (response) {
                data = response;
                console.log(response);
            },
            complete: function (xhr, textStatus) {
                //console.log(xhr);
            }
        }).done(function (response) {
            //console.log("Inside ajax call to jsan url");
            //console.log(response);
        });
        return data;
    }

    function getVersions(category) {
        var apiResponse;
        //var myUrl = "data.json";
        var myUrl = "http://hmny6x.nviz.co/nv/ny/catalog/categories/" + category + "/history.json";
        console.log(myUrl);
        $.ajax({
            async: false,
            type: 'GET',
            url: myUrl,
            dataType: 'json',
            success: function (response) {
                apiResponse = response;
            },
            complete: function (xhr, textStatus) {
                console.log(xhr);
                //console.log(xhr.responseText);
                console.log(textStatus);

            }
        }).done(function (response) {
            //console.log("Inside ajax call to jsan url");
            //console.log(response);
        });
        return apiResponse;
    }
})

var productindex = 0;

var filteredData = [];

window.operateEvents = {
    'click .showReviews': function (e, value, row, index) {
        var productData = $.extend(true, [], productListdataStoreBackUp);
        productData["product_name"] = row.name;
        productData["product_code"] = row.code;
        var index = (productData.Master_results_code).indexOf(row.code);
        productindex = index;
        generatePageResults('divReviews', 'reviews-template', productData);
        //alert("hello");
        $("#ReviewModal").modal("show");

    },

    'click .showProducts': function (e, value, row, index) {
        filteredData = getAllProductsBasedOnBrandIndexes(row.categoryIndex, row.nameIndex);
        GenerateTableProductsModal(filteredData);
        $("#ProductsModal").modal("show");
    }
}

Handlebars.registerHelper('reviewsHandlebar', function () {
    var productReviews = [];
    var reviewIndexes = response.Result_results_reviews_headline[productindex];
    for (var i = 0; i < reviewIndexes.length; i++) {
        productReviews["reviewHeadlines"] = response.Result_results_reviews_headline[reviewIndexes[i]];
        productReviews["reviewRating"] = response.Master_results_reviews_rating[response.Result_results_reviews_rating[productindex][reviewIndexes[i]]];
        productReviews["reviewComment"] = response.Master_results_reviews_comment[response.Result_results_reviews_comment[productindex][reviewIndexes[i]]];
    }
    return productReviews;
});

function generatePageResults(target_hmtl_component, source_template_component, responseDataOnPage) {
    var content = document.getElementsByClassName(target_hmtl_component);
    var productTemplate = document.getElementById(source_template_component).innerHTML;
    var template = Handlebars.compile(productTemplate);
    content.innerHTML = template(responseDataOnPage);
}

function getAllProductsBasedOnBrandIndexes(i, j) {
    var pcode = [];
    var pindex = [];
    var filtereddata = $.extend(true, [], productListdataStoreBackUp);
    var productCodeIndexes = response.Result_facets_facets_facetResults_products[i][j];

    for (var k = 0; k < productCodeIndexes.length; k++) {
        pcode[k] = response.Master_facets_facets_facetResults_products[productCodeIndexes[k]];
        pindex[k] = (productListdataStoreBackUp.Master_results_code).indexOf(pcode[k]);

    }

    filtereddata["relevance_results_name"] = [];
    filtereddata["relevance_results_images"] = [];
    filtereddata["relevance_price_value"] = [];
    filtereddata["relevance_results_summary"] = [];
    filtereddata["relevance_results_averageRating"] = [];
    filtereddata["relevance_results_code"] = [];

    for (var d = 0; d < pindex.length; d++) {
        ////////console.log("d is"+d);
        filtereddata["relevance_results_name"]
            .push(productListdataStoreBackUp.relevance_results_name[pindex[d]]);
        filtereddata["relevance_results_images"]
            .push(productListdataStoreBackUp.relevance_results_images[pindex[d]]);
        filtereddata["relevance_price_value"]
            .push(productListdataStoreBackUp.relevance_price_value[pindex[d]]);
        filtereddata["relevance_results_summary"]
            .push(productListdataStoreBackUp.relevance_results_summary[pindex[d]]);
        filtereddata["relevance_results_averageRating"]
            .push(productListdataStoreBackUp.relevance_results_averageRating[pindex[d]]);
        filtereddata["relevance_results_code"]
            .push(productListdataStoreBackUp.relevance_results_code[pindex[d]]);

    }

    return filtereddata;
}