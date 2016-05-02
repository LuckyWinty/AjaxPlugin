window.onload=function(){
		Ajax.init({
		url:"js/data.json",
		type:"get",
		dataType:"json",
		data:{"help":"me","to":"die"},
		showIndicator: true,
		beforeSend:function(){
		},
		success:function(data){
			console.log(data)
			var list="";
			data.names.forEach(function(item,index,array){
				list=list+"<li>"+item+"</li>";
			});
			document.getElementById('name-list').innerHTML=list;
		},
		fail:function(ex){
			console.log(ex);
		}
	});
}