window.onload=function(){
	//底部选项卡链接跳转 start
	mui(".mui-bar-tab").on("tap","a",function(){
			document.location.href=this.href;
		});	
	//底部选项卡链接跳转 end	
	
	//返回首页小图标 start
	var circleHome=document.createElement("a");
	circleHome.innerHTML="<img src='images/icon-home.png' class='circle-home-img'/>";
	var body=document.getElementById("body");
	body.appendChild(circleHome);
	circleHome.setAttribute("class","circle-home-a");
	circleHome.setAttribute("href","index.html");	
	//返回首页小图标 end
			
	//首页轮播 start
	var gallery=mui('.mui-slider');
	gallery.slider({
		interval:5000
	});	
	//首页轮播 end
		
	//上滑查看更多详情 上滑效果 start
	$(document).ready(function(){
		//阻止微信端默认的弹性操作
		$(document).on('touchmove',function(event){
			event.preventDefault();
		})
			
		var aLi=$(".list li");
		var startY,moveY,endY;
		var nowIndex,nextIndex;
//		var viewHeight=$(window).height();
		var viewHeight=document.body.clientHeight;
		aLi.on("touchstart",function(event){
			//手指按下时，停在Y轴的坐标
			startY=event.originalEvent.changedTouches[0].pageY;
			//得到当前li的页数
			nowIndex=$(this).index();
			
			aLi.on("touchmove",function(event){
			//手指按下但不松开，进行移动时，不断在改变的Y轴的坐标	
				moveY=event.originalEvent.changedTouches[0].pageY;
				
				if(moveY<startY){				// 上滑
					nextIndex=nowIndex+1;
					if(nextIndex>1){
						nextIndex=0;
					}
					aLi.eq(nextIndex).show().addClass("current").siblings().removeClass("current");
					//先获取手指移动的距离
					var s=startY-moveY;
					aLi.eq(nextIndex).css("top",viewHeight-s);
				}else if(moveY>startY){    		//下滑
					//得到下一张
					nextIndex=nowIndex-1;
					if(nextIndex<0){
						nextIndex=1;
					}
					aLi.eq(nextIndex).show().addClass("current").siblings().removeClass("current");
					var s=moveY-startY;
					aLi.eq(nextIndex).css("top",-viewHeight+s);
				}else{ 							//手指原点
					
				}
			})

			aLi.on("touchend",function(){
				endY=event.originalEvent.changedTouches[0].pageY;
				aLi.eq(nextIndex).css("top",0);
				aLi.eq(nextIndex).css("transition","top 1s ease 0s");
				//为了解决暴力用户的重复触摸，需要做的是，如果切屏还在继续，不允许用户操作切屏
				//支撑切屏的动力：touchstart touchmove touchend
				//手指一松开，就不允许用户切屏：移除所有touch事件

				//如果用户只是在当前屏幕轻触了一下，那么不对它进行事件的移除
				if(endY!=startY){
					aLi.off("touchstart touchmove touchend");
				}
				
			})
		})
			//过渡效果结束后触发事件
			aLi.on("webkitTransitionEnd",function(){
				//当过渡执行完毕后，就将过渡清空，免得影响move时的效果
				aLi.eq(nextIndex).css("transition","");
				//过渡执行完毕以后，为了不出现层级覆盖的问题，所以需要将除了当前张以外的所有张都隐藏掉
				aLi.eq(nextIndex).siblings().hide();


				aLi.on("touchstart",function(event){
			//手指按下时，停在Y轴的坐标
			startY=event.originalEvent.changedTouches[0].pageY;
			//得到当前li的页数
			nowIndex=$(this).index();
			
			aLi.on("touchmove",function(event){
			//手指按下但不松开，进行移动时，不断在改变的Y轴的坐标	
				moveY=event.originalEvent.changedTouches[0].pageY;
				
				if(moveY<startY){				// 上滑
					nextIndex=nowIndex+1;
					if(nextIndex>1){
						nextIndex=0;
					}
					aLi.eq(nextIndex).show().addClass("current").siblings().removeClass("current");
					//先获取手指移动的距离
					var s=startY-moveY;
					aLi.eq(nextIndex).css("top",viewHeight-s);
				}else if(moveY>startY){    		//下滑
					//得到下一张
					nextIndex=nowIndex-1;
					if(nextIndex<0){
						nextIndex=1;
					}
					aLi.eq(nextIndex).show().addClass("current").siblings().removeClass("current");
					var s=moveY-startY;
					aLi.eq(nextIndex).css("top",-viewHeight+s);
				}else{ 							//手指原点
					
				}
			})

			aLi.on("touchend",function(){
				aLi.eq(nextIndex).css("top",0);
				aLi.eq(nextIndex).css("transition","top 1s ease 0s");
				//为了解决暴力用户的重复触摸，需要做的是，如果切屏还在继续，不允许用户操作切屏
				//支撑切屏的动力：touchstart touchmove touchend
				//手指一松开，就不允许用户切屏：移除所有touch事件
				aLi.off("touchstart touchmove touchend");
			})
		})
			})
	});
	//上滑查看更多详情 上滑效果 end
	
	
	//首页公告 start
	$('#pic_list_3').cxScroll({
	  direction: 'bottom',
	  prevBtn: false,
	  nextBtn: false
	});
	//首页公告 end
	
}
