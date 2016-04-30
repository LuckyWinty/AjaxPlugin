;(function(){
	var Ajax=function(params){
		this.defaultConfig={
			url:"",
			type:"GET",
			async:true,
			datatype:"json",
			contentType:"application/x-www-form-urlencoded; charset=UTF-8",
			data:{}
		};
		console.log(this);
		this.start(params);
	};
	Ajax.init=function(params){
		new Ajax(params);
	},
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
				this.defaultConfig.url=params.url;
			}else{
				console.log("url cannot be null!");
			}
			if(params.type){
				this.defaultConfig.type=params.type;
			}
			if(params.async){
				this.defaultConfig.async=params.async;
			}
			if(params.datatype){
				this.defaultConfig.async=params.datatype;
			}
			if(params.data){
				this.defaultConfig.data=params.data;
			}
			if(params.success){
				this.defaultConfig.success=params.success;
			}
			if(params.error){
				this.defaultConfig.error=error;
			}
			if((this.defaultConfig.type=="GET")||(this.defaultConfig.type=="get")){
				for(var item in this.defaultConfig.data){
					this.defaultConfig.url=addURLParam(this.defaultConfig.url,item,this.defaultConfig.data[item]);
				}
				xhr.addEventListener('onreadystatechange',function(){
					if(xhr.readyState==4){
						if((xhr.status>=200&&xhr.state<300)||xhr.status==304){
							if(this.defaultConfig.success){
								this.defaultConfig.success(xhr.responseText);
							}
						}else{
							console.log("Request was unsucessful:"+xhr.status);
						}
					}
				});
				xhr.open(this.defaultConfig.type,this.defaultConfig.url,this.defaultConfig.async);
				xhr.send(null);
			}
			if(this.defaultConfig.type=="POST"||this.defaultConfig.type=="post"){

			}
		},
		success:function(){
		},
		error:function(){

		}
	}
	function addURLParam(url,name,value){
		url+=(url.indexOf("?")==-1 ? "?" : "&");
		url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
		return url;
	}
	window["Ajax"]=Ajax;
})();