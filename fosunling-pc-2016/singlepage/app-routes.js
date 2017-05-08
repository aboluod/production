define(function(require) {
	var app = require('./app');
	
	app.controller('NoticeController', function($scope, $stateParams, $state,$http,$sce) {
		
		var noticeList = function(){
			layui.define([ 'layer', 'laypage' ], function(exports) {
				var $ = layui.jquery, layer = layui.layer;
				var noticePage = function(curr, type) {
					$.getJSON('/about/noticeandnews', {
						pageno : curr || 1,
						pagesize : 10,
						infotype : type
					}, function(res) {
						// 此处仅仅是为了演示变化的内容
						$scope.datalist = res.data.records;
						$scope.$apply();
						// 显示分页
						layui.laypage({
							cont : 'notice-gg',
							pages : res.data.totalPages, // 通过后台拿到的总页数
							curr : curr || 1, // 当前页
							jump : function(obj, first) { // 触发分页后的回调
								if (!first) { // 点击跳页触发函数自身，并传递当前页：obj.curr
									noticePage(obj.curr, type);
								}
							}
						});
					});
				}
				$scope.select = function(type) {
					if (type == 1) {
						$scope.link = '[公告]';
					} else if (type == 2) {
						$scope.link = '[新闻]';
					}
					noticePage(1, type);
				}
				$scope.select(1);

				$scope.show = function(id) {
					$state.go('notice', {
						id : id
					},{
					});
				}
			});
		}
		
		var noticeDetail = function(){
			var dataDetail = $http.get('/about/getnotice?id='+$stateParams.id);
			dataDetail.then(function(resp){
				$scope.title = resp.data.data.title;
				$scope.content = $sce.trustAs($sce.HTML,resp.data.data.content);
			});
			$scope.noticelist = function(){
				$state.go('aboutus.notice');
			}
		}
		$scope.$on('$viewContentLoaded', function() {
			if('aboutus.notice'==$state.current.name){
				noticeList();
			}else{
				noticeDetail();
			}
		});
		
	});

	app.config([
			'$stateProvider',
			'$urlRouterProvider',
			function($stateProvider, $urlRouterProvider) {
				$urlRouterProvider.otherwise('/');
				
				$stateProvider
				// 帮助中心
				.state('helpcenter', {
					title : '帮助中心',
					url : '/helpcenter',
					templateUrl : 'templates/helpcenter/layout.html'
				}).state(
						'helpcenter.templates',
						{
							url : '/templates/*name',
							views : {
								'middle@helpcenter' : {
									templateUrl : function($stateParams) {
										return 'templates/helpcenter/'
												+ $stateParams.name + '.html';
									}
								}
							}
						})
				// 关于我们
				.state('aboutus', {
					title : '关于我们',
					url : '/aboutus',
					templateUrl : 'templates/aboutus/layout.html'
					
				}).state(
						'aboutus.templates',
						{
							url : '/templates/*name',
							views : {
								'middle@aboutus' : {
									templateUrl : function($stateParams) {
										return 'templates/aboutus/'
												+ $stateParams.name + '.html';
									}
								}
							}
						})
				// 公告列表
				.state('aboutus.notice', {
					title : '媒体中心',
					url : '/notice',
					views : {
						'middle@aboutus' : {
							templateUrl : 'templates/aboutus/notice.html',
							controller : 'NoticeController'
						}
					}
				})
				// 公告详情/about/getnotice
				.state('notice', {
					url : '/notice/*id',
					templateUrl : 'templates/aboutus/notice_details.html',
					controller : 'NoticeController'
				})
				// 手机app下载页
				.state('mobileapp', {
					title : 'APP下载',
					url : '/mobileapp',
					templateUrl : 'templates/downpage/mobileapp.html'
				})
				// 安全保障
				.state('security', {
					title : '安全保障',
					url : '/security',
					templateUrl : 'templates/safeguard/security.html'
				})
				// 星之灵
				.state('fosunling', {
					title : '星之灵',
					url : '/fosunling',
					templateUrl : 'templates/fosunling.html'
				});

			} ]);
});
