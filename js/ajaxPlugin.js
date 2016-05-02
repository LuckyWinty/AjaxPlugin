;(function(){
	var Ajax=function(params){
		this.config={
			url:"",
			type:"get",
			async:true,
			dataType:"json",
			contentType:"application/x-www-form-urlencoded; charset=UTF-8",
			data:{}
		};
		this.start(params);
	};
	var xhr = null;
	Ajax.init=function(params){
		new Ajax(params);
	};
	Ajax.prototype={
		constructor: Ajax,
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
			xhr=new this.createXHR();
			if(params.url){
				this.config.url=params.url;
			}else{
				throw new Error("url cannot be null!");
			}
			if(params.type){
				this.config.type=params.type;
			}
			if(params.async){
				this.config.async=params.async;
			}
			if(params.dataType){
				this.config.dataType=params.dataType;
			}
			if(params.data){
				this.config.data=params.data;
			}
			if(params.success){
				this.config.success=params.success;
			}
			if(params.fail){
				this.config.fail=params.fail;
			}
			if(params.beforeSend){
				params.beforeSend();
			}

			var complete=function(){
				if(xhr.readyState==4){
						if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
							if(params.success){
								params.success(xhr.responseText);
							}
						}else{
							if(params.fail){
								params.fail();
							}else{
								throw new Error("Request was unsucessful:"+xhr.status);
							}
						}
				}
			}

			if(this.config.dataType=="json"||this.config.dataType=="JSON"){//非跨域
				if((this.config.type=="GET")||(this.config.type=="get")){
					for(var item in this.config.data){
						this.config.url=addURLParam(this.config.url,item,this.config.data[item]);
					}
					xhr.onreadystatechange=complete;
					xhr.open(this.config.type,this.config.url,this.config.async);
					xhr.send(null);
				}
				if(this.config.type=="POST"||this.config.type=="post"){
					xhr.addEventListener('readystatechange',complete);
					xhr.open(this.config.type,this.config.url,this.config.async);
					if(params.contentType){
						this.config.contentType=params.contentType;
					}
					xhr.setRequestHeader("Content-Type",this.config.contentType);
					xhr.send(serialize(this.config.data));
				}
			}else if((this.config.dataType=="jsonp")||(this.config.dataType=="JSONP")){//跨域
				if((this.config.type=="GET")||(this.config.type=="get")){//jsonp只能进行get请求跨域
					if(!params.url||!params.callback){
						throw new Error("params is illegal!");
					}else{
						this.config.callback=params.callback;
					}
					//创建script标签
					var cbName='callback';
					var head=document.getElementsByTagName('head')[0];
					this.config[this.config.callback]=cbName;
					var scriptTag=document.createElement('script');
					head.appendChild(scriptTag);

					//创建jsonp的回调函数
					window[cbName]=function(json){
						head.removeChild(scriptTag);
						clearTimeout(scriptTag.timer);
						window[cbName]=null;
						params.success&&params.success(json);
					};
					//超时处理
					if(params.time){
						scriptTag.timer=setTimeout(function(){
							head.removeChild(scriptTag);
							params.fail&&params.fail({message:"over time"});
							window[cbName]=null;
						},params.time);
					}
					this.config.url=this.config.url+"?callback="+cbName;
					for(var item in this.config.data){
						this.config.url=addURLParam(this.config.url,item,this.config.data[item]);
					}
                    scriptTag.src=this.config.url;
				}
			}else{
				throw new Error("dataType is error!");
			}
		}
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