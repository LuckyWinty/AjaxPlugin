window.onload=function(){
	console.log("start");
	Ajax({
		url:"../json/data.json",
		type:"get",

		success:function(data){
			console.log(data);
		}
	});
}