window.onload=function(){
	console.log("start");
	Ajax.init({
		url:"http://localhost:8080/AjaxCROSTest/data.json",
		type:"get",
		dataType:"jsonp",
		data:{"help":"me","to":"die"},
		callback:"test",
		time:"10",
		success:function(data){
			console.log(data);
		},
		fail:function(ex){
			console.log(ex);
		}
	});
	//$.ajax({
	//	url:"http://localhost:8080/AjaxCROSTest/data.json",
	//	type:"get",
	//	dataType:"jsonp",
	//	data:{},
	//	success:function(data){
	//		console.log("ajax-------------------------------------------");
	//		console.log(data);
	//	},
	//	error:function(ex){
	//		console.log(ex);
	//	}
	//});
	//$.ajax({
	//	type: "get",
	//	url: "http://localhost:8080/AjaxCROSTest/data.json",
	//	dataType: "jsonp",
	//	data: {
	//	},
	//	beforeSend: function(xhr) {
	//	},
	//	success: function(data) {
	//		console.log("--------------"+data);
    //
	//	}
	//});
}