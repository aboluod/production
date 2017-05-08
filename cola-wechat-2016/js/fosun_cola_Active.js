//活动首页弹框
$(document).ready(function(){
	var coI_rule=$("#coI_rule");
	var coI_boxBtn=$(".coI_boxBtn");
	coI_rule.click(function(){
		$("#coI_box").show();
	});
	coI_boxBtn.click(function(){
		$("#coI_box").hide();
	});
})
//信息填写页面select
$(document).ready(function(){
	var coIF_selectDiv=$(".coIF_selectDiv");
	var coIF_selectBox=$(".coIF_selectBox");
	var coIF_selectValue=$(".coIF_selectValue");
	coIF_selectDiv.click(function(){
		coIF_selectBox.fadeIn(200);
	});
	
	$(".coIF_selectBox li").click(function(){
		var li_value=$(this).html();
		coIF_selectValue.html(li_value);
		coIF_selectBox.fadeOut(200);
	});
	
})



	
	

