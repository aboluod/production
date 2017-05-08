// JavaScript Document
var productReminderDate;
function calendar_init(obj,args){
	var title_bg_color = (args && args.title_bg_color)?args.title_bg_color:""; //按钮区域背景颜色
	var title_color = (args && args.title_color)?args.title_color:""; //按钮区域字体颜色
	var line_style = (args && args.line_style)?args.line_style:"solid 0px"; //自定义分隔线样式
	var day_bg_color = (args && args.day_bg_color)?args.day_bg_color:""; //星期的背景颜色
	var day_color = (args && args.day_color)?args.day_color:""; //星期的背景颜色
	var date_bg_color = (args && args.date_bg_color)?args.date_bg_color:""; //日期的背景颜色
	var date_color = (args && args.date_color)?args.date_color:""; //日期的背景颜色
	var date_active_color = (args && args.date_active_color)?args.date_active_color:"#fabe00"; //特殊日期颜色
	var line_height = (args && args.line_height)?args.line_height:30; //特殊日期颜色

	var today = new Date();//今天的日期，备用
	productReminderDate=args.text;


	obj.attr("onselectstart","return false;").css("-moz-user-select","none");//阻止元素中的文本被双击时变成选中状态
	var cal_width = obj.width();
	
	if(cal_width < 200){
		obj.html("<span style='color:red'>错误：日历区域宽度小于200px，日历无法正常显示!</span>");
		return;
	}
	var cal_height = obj.height();
	
	var pane_height = cal_width/7;
	//-0.08用于兼容Firefox、Opera
	if(navigator.userAgent.indexOf("OPR") > -1 || navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Opera") > -1){
		pane_height = cal_width/7 -0.08;
	}
	
	var line1 = $("<div></div>");
	line1.width("100%")
		.height(line_height)
		.css("border-bottom",line_style)
		.css("background",title_bg_color);
	
	var btn_year_down = $("<div><span>&lt;&lt;</span></div>");
	btn_year_down.width("20%");
	btn_year_down.children("span").click(function(e){
		var val = obj.find("div.date_value").text();
		var old_year = parseInt(val.substring(0,4));
		var old_month = parseInt(val.substring(val.indexOf("年") + 1,val.lastIndexOf("月")));
		var year = old_year - 1;
		val = year + "年" + old_month + "月";
		calendar_core(val,obj,date_active_color,line_height);
		obj.find("div.date_value").text(val);
	});
	
	var btn_month_down = $("<div><span>&lt;</span></div>");
	btn_month_down.width("10%");
	btn_month_down.children("span").click(function(e){
		var val = obj.find("div.date_value").text();
		var old_year = parseInt(val.substring(0,4));
		var old_month = parseInt(val.substring(val.indexOf("年") + 1,val.lastIndexOf("月")));
		var year;
		var month;
		if(old_month > 1){
			month = old_month - 1;
			year = old_year;
		}else {
			month = 12;
			year = old_year - 1;
		}
		
		val = year + "年" + month + "月";
		calendar_core(val,obj,date_active_color,line_height);
		obj.find("div.date_value").text(val);
	});
	
	var date_value = $("<div></div>");
	date_value.width("40%");
	date_value.addClass("date_value");
	date_value.text(today.getFullYear() + "年" + (today.getMonth() + 1) + "月");
	
	var btn_month_up = $("<div><span>&gt;</span></div>");
	btn_month_up.width("10%");
	btn_month_up.children("span").click(function(e){
		var val = obj.find("div.date_value").text();
		var old_year = parseInt(val.substring(0,4));
		var old_month = parseInt(val.substring(val.indexOf("年") + 1,val.lastIndexOf("月")));
		var year;
		var month;
		if(old_month < 12){
			month = old_month + 1;
			year = old_year;
		}else {
			month = 1;
			year = old_year + 1;
		}
		
		val = year + "年" + month + "月";
		calendar_core(val,obj,date_active_color,line_height);
		obj.find("div.date_value").text(val);
	});
	
	var btn_year_up = $("<div><span>&gt;&gt;</span></div>");
	btn_year_up.width("20%");
	btn_year_up.children("span").click(function(e){
		var val = obj.find("div.date_value").text();
		var old_year = parseInt(val.substring(0,4));
		var old_month = parseInt(val.substring(val.indexOf("年") + 1,val.lastIndexOf("月")));
		var year = old_year + 1;
		val = year + "年" + old_month + "月";
		calendar_core(val,obj,date_active_color,line_height);
		obj.find("div.date_value").text(val);
	});
	
	
	line1.append(btn_year_down).append(btn_month_down).append(date_value).append(btn_month_up).append(btn_year_up);
	obj.append(line1);
	obj.find("a").css("color","#000").css("text-decoration","none");
	line1.find("div").css("float","left")
		.css("text-align","center")
		.css("line-height",line_height + "px")
		.css("font-size","100%")
		.css("color",title_color)
		.css("font-weight","bold")
		.height(line_height+20+"px");
	line1.find("span").css("cursor","pointer");
	
	var line2 = $("<div></div>");
	line2.width("100%")
		.height(line_height)
		.css("background",day_bg_color)
		.css("color",day_color);
	obj.append(line2);
	
	var days = new Array("周日","周一","周二","周三","周四","周五","周六");//星期	
	for(var i=0;i<7;i++){
		var pane = $("<div></div>");
		pane.width(pane_height);
		pane.height(line_height);
		pane.css("line-height",line_height + "px");			
		pane.css("float","left");
		pane.css("text-align","left");
		pane.css("font-size","80%");
		pane.css("font-family","Microsoft Yahei");
		//pane.css("font-weight","bold");
		pane.text(days[i]);
		line2.append(pane);
	}
	
	var line3 = $("<div></div>");
	line3.width("100%")
		.height("auto")
		.css("background",date_bg_color)
		.css("overflow","hidden")
		.css("color",date_color)
	    .css("font-family","Microsoft Yahei")
		.css("font-size","6px");
	line3.addClass("calendar_dates");

	obj.append(line3);
	
	calendar_core(date_value.text(),obj,date_active_color,line_height);
}


//约定：val为“2016年9月这样的字符串”
function calendar_core(val,obj,date_active_color,line_height){
	obj.find(".calendar_pane").remove();
	
	var pane_height = obj.width()/7;
	//-0.08用于兼容Firefox、Opera
	if(navigator.userAgent.indexOf("OPR") > -1 || navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Opera") > -1){
		pane_height = obj.width()/7 -0.08;
	}
	var month_big = new Array("1","3","5","7","8","10","12"); //包含所有大月的数组
	var month_small = new Array("4","6","9","11"); //包含所有小月的数组

	var today = new Date();
	var year;
	var month;
	var date = today.getDate();
	
	if(val){
		year = parseInt(val.substring(0,4));
		month = parseInt(val.substring(val.indexOf("年") + 1,val.lastIndexOf("月")));
	}else{
		year = today.getFullYear();
		month = today.getMonth() + 1;
	}
	
	var temp_date = new Date(year,month - 1);
	var start = temp_date.getDay() ;
	var end;

	if(array_contain(month_big, month)){
		end = start + 31;
	}
	else if(array_contain(month_small, month)){
		end = start + 30;
	}
	else{
		if(isLeapYear(year)){
			end = start + 29;
		}
		else{
			end = start + 28;
		}
	}

   //上个月日期
    var end2;
    var month2=month-1;
	var temp_date2 = new Date(year,month2,0);
	var start2 = temp_date2.getDay();
	var start3 = temp_date2.getDate();
	var lastDay = year + "-" + month2 + "-" + temp_date2.getDate();//上个月的最后一天
	if(array_contain(month_big, month2)){
		end2 =  31;
	}
	else if(array_contain(month_small, month2)){
		end2 =  30;
	}
	else{
		if(isLeapYear(year)){
			end2 =  29;
		}
		else{
			end2 =  28;
		}
	}
	//alert("month2:"+month2+"|end2:"+end2+"|start2:"+start2+"|month2:"+month2+"|start3:"+start3+"|lastDay:"+lastDay+"|start:"+start);

	for(var i = 0; i < start; i++){		
		var pane = $("<div></div>");
		pane.addClass("calendar_pane");
		pane.width(pane_height-2+"px");
		pane.height(line_height+10+"px");
		pane.css("line-height",line_height + "px");
		pane.css("float","left");
		pane.css("text-align","left");
		pane.css("border-top","1px solid  rgba(200,200,200,0.25)");
		pane.css("border-left","1px solid  rgba(200,200,200,0.25)");
		pane.css("border-right","1px solid  rgba(200,200,200,0.25)");
		pane.css("border-bottom","1px solid  rgba(200,200,200,0.25)");
		var divValue = $(".calendar_pane").text(); 
		pane.css("color","#9fa4a4");
        pane.text(end2-start+1+i);
		obj.find(".calendar_dates").append(pane);

	}
	
	
	for(var i = start; i < end; i++){
		var pane = $("<div></div>");
		pane.addClass("calendar_pane");
		pane.width(pane_height-2+"px");
		pane.height(line_height+10+"px");
		pane.css("line-height",line_height + "px");
		pane.css("float","left");
		pane.css("text-align","left");
		pane.css("border-top","1px solid  rgba(200,200,200,0.25)");
		pane.css("border-left","1px solid  rgba(200,200,200,0.25)");
		pane.css("border-right","1px solid  rgba(200,200,200,0.25)");
		pane.css("border-bottom","1px solid  rgba(200,200,200,0.25)");
		pane.text(i - start + 1);
		//if(year == today.getFullYear() && (month == today.getMonth() + 1) && i-start+1 == date){
		//	pane.css("background-color",date_active_color);
		//	pane.css("font-family","Microsoft Yahei")
		//    pane.css("font-size","3px");
		//	pane.css("line-height","15px");
		//	//加入产品到期提醒 获取2016-11-25
		//	pane.text(i - start + 1+ "  安心投到期提醒");
		//}
		//加入产品到期提醒 获取2016-11-25
		//var year0="2017"; var month0="11"; var date0="25";
		//var year0=productReminderDate.split("-")[0]; var month0=productReminderDate.split("-")[1]; var date0=productReminderDate.split("-")[2];
		var arr =productReminderDate;
		var cunrtdata=year+'-'+p(month)+'-'+p(parseInt(i-start+1));
		 for(var item in arr) {
           if(arr[item]== cunrtdata){
            pane.css("background-color",date_active_color);
			pane.css("font-family","Microsoft Yahei")
		    pane.css("font-size","3px");
			pane.css("line-height","15px");
			//加入产品到期提醒 获取2016-11-25
			pane.text(i - start + 1+ " 投资产品到期提醒");
		   }
		 }

		obj.find(".calendar_dates").append(pane);
	}


  //获取下个月日期
    var startx;
	var endx;
    var monthx=month+1;
	var temp_datex = new Date(year,monthx,0);
	temp_datex.setDate(1); //第一天
	var startx1 = temp_datex.getDay();
	var startx2 = temp_datex.getDate();
	var lastDayx = year + "-" + monthx + "-" + temp_datex.getDate();//上个月的最后一天
	if(array_contain(month_big, monthx)){
		endx =  31;
	}
	else if(array_contain(month_small, monthx)){
		endx =  30;
	}
	else{
		if(isLeapYear(year)){
			endx =  29;
		}
		else{
			endx =  28;
		}
	}
  
  var j=startx2;
  for(var i =end; i <42; i++){		
		var pane = $("<div></div>");
		pane.addClass("calendar_pane");
		pane.width(pane_height-2+"px");
		pane.height(line_height+10+"px");
		pane.css("line-height",line_height + "px");
		pane.css("float","left");
		pane.css("text-align","left");
		pane.css("border-top","1px solid  rgba(200,200,200,0.25)");
		pane.css("border-left","1px solid  rgba(200,200,200,0.25)");
		pane.css("border-right","1px solid  rgba(200,200,200,0.25)");
		pane.css("border-bottom","1px solid  rgba(200,200,200,0.25)");
		var divValue = $(".calendar_pane").text(); 
		pane.css("color","#9fa4a4");
		pane.text(j);
		j++;
		obj.find(".calendar_dates").append(pane);
		
	}

  

}

//判断数组array中是否包含元素obj的函数，包含则返回true，不包含则返回false
function array_contain(array, obj){
	for (var i = 0; i < array.length; i++){
		if (array[i] == obj)
			return true;
	}
	return false;
}

//判断年份year是否为闰年，是闰年则返回true，否则返回false
function isLeapYear(year){
	var a = year % 4;
	var b = year % 100;
	var c = year % 400;
	if( ( (a == 0) && (b != 0) ) || (c == 0) ){
		return true;
	}
	return false;
}

//创建补0函数
function p(s) {
	return s < 10 ? '0' + s: s;
}
function Trim(str) { 
   return str.replace(/(^\s*)|(\s*$)/g, ""); 
}
