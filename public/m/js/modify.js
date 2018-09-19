$(function(){
    $('#modify-btn').on('tap',function(){

        var originPassword = $.trim($('[name = "originPassword"]').val());

        var newPass =$.trim( $('[name = "newPass"]').val());

        var confirmNewPass = $.trim($('[name = "confirmNewPass"]').val());

        var vCode = $.trim($('[name = "vCode"]').val());

        if(!originPassword) {
            mui.toast('请输入原密码');
            return;
        }
        if(newPass !=confirmNewPass) {
            mui.toast('密码不一致');
            return;
        }
        $.ajax({
           url:'/user/updatePassword',
            type:'post',
            data:{
                oldPassword:originPassword,
                newPassword:newPass,
                vCode:vCode
            },
            success:function(res){
                console.log(res)
                if(res.error && res.error == 403) {
                    mui.toast('旧密码错误!');
                }
                if(res.success){
                    mui.toast('修改密码成功');
                    setTimeout(function(){
                       location.href = 'login.html'
                    },2000);

                }
            }
        });
    });

    $('#getCode').on('tap',function(){
        $.ajax({
           url:'/user/vCodeForUpdatePassword' ,
           type:'get',
           success:function(res){
               console.log(res.vCode);
           }
        });
    });
});