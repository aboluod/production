define(function (require, exports, module) {
    var angular = require('angular');
    var asyncLoader = require('angular-async-loader');

    require('angular-ui-router');
    var app = angular.module('app', ['ui.router']);
    
    app.config(function(){
    	layui.define(['layer','element', 'util'], function(exports){
			  var $ = layui.jquery
			  ,layer = layui.layer
			  ,util = layui.util
			  ,element = layui.element()
			  ,device = layui.device()
			  
			  //阻止IE7以下访问
			  if(device.ie && device.ie < 8){
				  layer.alert('如果您非得使用ie浏览，那么请使用ie8+');
			  }
    		  //右下角固定Bar
    		  //固定块
			  util.fixbar({
			    bar1: true
			    ,bar2: true
			    //,css: {right: 100, bottom: 100}
			    ,click: function(type){
			    	//layer.msg('请联系管理员！')
			    }
			  });
			  
			  $(document).on("click",".middle-ul span",function(){
					$(this).next().toggle();
			  });
			  $(document).on("click",".aboutus dl dt",function(){
					$(this).next().toggle();
			  });
			  //监听导航点击
			  element.on('nav(aboutus-tree)', function(elem){
			    var bar = $('<span class="layui-nav-bar" id="layui-nav-bar-active"></span>');
			    $("#layui-nav-bar-active").remove();
			    elem.append(bar);
			    bar.css({
	              top: 0
	              ,height: 45
	              ,opacity: 1
	            });
			  });
			 //监听导航点击
			  element.on('nav(helpcenter-tree)', function(elem){
			  });
    	});
    });
    app.filter('cut', function () {
    	  return function (value, wordwise, max, tail) {
    	    if (!value) return '';

    	    max = parseInt(max, 10);
    	    if (!max) return value;
    	    if (value.length <= max) return value;

    	    value = value.substr(0, max);
    	    if (wordwise) {
    	      var lastspace = value.lastIndexOf(' ');
    	      if (lastspace != -1) {
    	        value = value.substr(0, lastspace);
    	      }
    	    }

    	    return value + (tail || ' …');
    	  };
    });
    
    app.run([
		'$state',
		'$stateParams',
		'$rootScope',
		function($state, $stateParams, $rootScope) {
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
			$rootScope.$on("$stateChangeSuccess", function(currentRoute,previousRoute) {//路由切换事件
				$rootScope.title = $state.current.title;
				console.log($state);
			});
		} ]);
    
    asyncLoader.configure(app);

    module.exports = app;
});
