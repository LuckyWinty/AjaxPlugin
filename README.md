# AjaxPlugin
This is a ajax tool which had been encapsulated using Native Javascript by myself.
##Introduction
    This plugin supported two types of request,Cross domain request and Same domain request.
    The Same domain request only supported the request "GET" and "POST" .
    And the  Cross domain request only supported "GET" request of jsonp.
    
###Tutorial
At first,you must import this plugin to you html file.

####Same domain request

#####Default params
    this.config={
		    	url:"",
    			type:"get",
    			async:true,
    			dataType:"json",
	    		contentType:"application/x-www-form-urlencoded; charset=UTF-8",
    			data:{}
    		};
#####Usage
    		Ajax.init({
    		url:"js/data.json",
    		type:"get",
    		dataType:"json",
	    	data:{"name":"winty","lastName":"chou"}, //Pass to the back-end parameters
    		beforeSend:function(){         
	    	},
    		success:function(data){  
	    	},
    		fail:function(ex){
		    	console.log(ex);
    		}
    	});
####Cross domain request
#####Default params
    this.config={
		    	url:"",
    			type:"get",
    			async:true,
    			dataType:"json",
	    		contentType:"application/x-www-form-urlencoded; charset=UTF-8",
    			data:{}
    		};
#####Usage
	    	Ajax.init({
    		url:"http://localhost:8080/AjaxCROSTest/data.json",
		    type:"get",//The type must be get
    		dataType:"jsonp",//The dataType must be jsonp
    		data:{"name":"winty","lastName":"chou"}, //Pass to the back-end parameters
    		callback:"callback",	//callback function name
	    	beforeSend:function(){
    		},
	    	success:function(data){
    		},
	    	fail:function(ex){
    			console.log(ex);
    		}
	    });
