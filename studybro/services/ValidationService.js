angular.module('hmModule').service('ValidationServcie', function() 
{
    this.nullcheck = function (x) 
    {
        if(x!=null)
        {
        	return true;
        }
        else
        {
        	return false;
        }
    }

});