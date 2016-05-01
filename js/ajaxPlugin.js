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
			//增加是否跨域判断
			if(params.data){
				this.defaultConfig.data=params.data;
				console.log(this.defaultConfig.data);
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
				xhr.addEventListener('onreadystatechange',this.complete);
				xhr.open(this.defaultConfig.type,this.defaultConfig.url,this.defaultConfig.async);
				xhr.send(null);
			}
			if(this.defaultConfig.type=="POST"||this.defaultConfig.type=="post"){
				xhr.addEventListener('onreadystatechange',this.complete);
				xhr.open(this.defaultConfig.type,this.defaultConfig.url,this.defaultConfig.async);
				if(params.contentType){
					this.defaultConfig.contentType=params.contentType;
				}
				xhr.setRequestHeader("Content-Type",this.defaultConfig.contentType);
				xhr.send(serialize(this.defaultConfig.data));
			}
		},
		complete:function(){
			if(xhr.readyState==4){
				try{
					if((xhr.status>=200&&xhr.state<300)||xhr.status==304){
						if(this.defaultConfig.success){
							this.defaultConfig.success(xhr.responseText);
						}
					}else{
						if(this.defaultConfig.error){
							this.defaultConfig.error();
						}else{
							console.log("Request was unsucessful:"+xhr.status);
						}
					}
				}catch(ex){
					console.log("Request did not return in a second.");
				}
			}
		},
	}
	function addURLParam(url,name,value){
		url+=(url.indexOf("?")==-1 ? "?" : "&");
		url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
		return url;
	}
	//序列化函数
	function serialize(data){
		var val="";
		var str="";
		for(var item in data){
			str=item+"="+data[item];
			val+=str+'&';
		}
		return val.slice(0,val.length-1);
	}
	window["Ajax"]=Ajax;
})();