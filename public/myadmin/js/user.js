function daget(){
    $.ajax({
        url:'/user/queryUser',
        type:'get',
        data:{
            page:1,
            pageSize:10
        },
        success:function(res){
            console.log(res);
            var html = template('userTpl',res);
            //console.log(html);
            $('#user-box').html(html);
        }

    });
}

$(function(){
    daget();
    $('#user-box').on('click','.edit-btn',function(){

        var isDelete = parseInt($(this).attr('data-isDelete')) ;
        var id = $(this).attr('data-id');


        // 加载新内容,url地址与该地址下的选择器之间要有空格,表示该url下的#container
        //console.log(isDelete);
        $.ajax({
            url:'/user/updateUser',
            type:'post',
            data:{
                id:id,
                isDelete:isDelete ? 0 : 1

            },

            success:function(res){
              if(res.success){
                  console.log(123)
                  daget();
              }

            }
        });
    });
});


