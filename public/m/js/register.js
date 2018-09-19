$(function(){

    $('#register-btn').on('tap',function(){
        var username = $("[name='username']").val();
        var username = $("[name='username']").val();
        var password = $("[name='password']").val();
        var mobile = $("[name='mobile']").val();
        var vCode = $("[name='vCode']").val();
        var againPass = $("[name='againPass']").val();
console.log(vCode)

        if(!(/^1[34578]\d{9}$/.test(mobile))){
                mui.toast("请输入合法的手机号");
                return;
            }
        //var username={regstr:/^[\w]{1,6}$/,tip:'请输入1-6位的英文、数字、下划线'};
        //if(!(/^[\w]{1,6}$/.test(username))){
        //    alert("用户名");
        //    return false;
        //}



            $.ajax({
                url:'/user/register',
                type:'post',
                data:{
                    username:username,
                    password:password,
                    mobile:mobile,
                    vCode:vCode
                },
                success:function(res){
                    console.log(res);
                    mui.toast('注册完成');
                    setTimeout(function(){
                       location.href = "login.html"
                    },2000);
                }
            });
    });



        //    获取认证
    $('#getCode').on('tap',function(){
            $.ajax({
                url:'/user/vCode',
                type:'get',
                success:function(res){
                    console.log(res.vCode);
                }
            });

    });

});
