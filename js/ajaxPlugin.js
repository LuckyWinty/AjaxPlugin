var Ajax=function(params){
	this.defaultConfig={
		url:"",
        type:"GET",
        
	}
     this.start(params);
}
Ajax.prototype={
	createXHR:function(){
		if(typeof XMLHttpRequest!='undefined'){
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject!='undefined'){
			if(typeof arguments.callee.activeXString!='string'){
				var versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],i,len;
				for(i=0,len=versions.length;i<len;i++){
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString=versions[i];
						break;
					}catch(ex){
						
					}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		}else{
			throw new Error("No XHR object available.");
		}
	},
	start:function(params){
      var xhr=new this.createXHR();
      if(params.url){

      }
      xhr.open();

	},
	success:function(){
        
	},
	error:function(){

	}
}