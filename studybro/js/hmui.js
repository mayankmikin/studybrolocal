/**
 * 
 */
$(document).ready(function() {
    console.log( "ready!" );
    $.getJSON( "http://localhost:9080/hm/domains", function( resp ) {
    	 
        console.log(resp);
    });
});