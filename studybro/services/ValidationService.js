angular.module('hmModule').service('ValidationServcie', function() 
{
    this.nullcheck = function (x) 
    {
        if((x!=null)&&(x!='')&&(x!=""))
        {
        	return true;
        }
        else
        {
        	return false;
        }
    }
    


});