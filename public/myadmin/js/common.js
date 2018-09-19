//登录拦截
$.ajax({
	url:'/employee/checkRootLogin',
	type:'get',
	async:false,
	success:function(res){
		if(res.error && res.error == 400 ) {
			location.href = 'login.html';
		}
	}
});


$(function(){
	//退出登录
	$('.login_out_bot').click(function(){
		if(confirm("确认退出?")){
			$.ajax({
				url:'/employee/employeeLogout',
				type:'get',
				success:function(res){
					if(res.success){
						location.href = 'login.html';
					}
				}
			});
		}
	});




















	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});