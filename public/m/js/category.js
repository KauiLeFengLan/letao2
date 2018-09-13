$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //运动馆一分类
    $.ajax({
        url:'/category/queryTopCategory',
        type:'get',
        success:function(res){
            //console.log(res);
            var html = template('category-first',{result:res.rows});
            //console.log(html);
            $('#links').html(html);
        }
    });

    //二级分类

    $('#links').on('click','a',function(){
        var id = $(this).attr('data-id');

        $.ajax({
            url:'/category/querySecondCategory',
            type:'get',
            data:{
                id:id
            },
            success:function(rows){
                var html = template('category-lt',rows);
                //console.log(html)
                $('#brand-list').html(html);
            }
        });
    });

});