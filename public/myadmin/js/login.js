$.ajax({
    url:'/employee/checkRootLogin',
    type:'get',
    async:false,
    success:function(res){
        if(res.success) {
            location.href = 'user.html';
        }
    }
});


$(function(){
    $('#login-btn').click(function(){
       var username = $.trim($("[name='username']").val());
       var password = $.trim($("[name='password']").val());

        if(!username){
            $('#userName').fadeIn(1000).delay(2000).fadeOut(1000);
            return;
        }

        if(!password){
            $('#Password').fadeIn(1000).delay(2000).fadeOut(1000);
            return;
        }

        $.ajax({
           url:'/employee/employeeLogin',
           type:'post',
           data:{
                username:username,
                password:password
            },

            success:function(res){
                $('#userName').fadeIn(1000).delay(2000).fadeOut(1000).text(res.message);
                if(res.success){
                    $('#userName').show(500).text('登录成功');
                    setTimeout(function(){
                        location.href = 'user.html';

                    },2000);
                }

            }
        });
    });
});