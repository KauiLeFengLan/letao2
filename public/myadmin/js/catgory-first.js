
$(function(){
    var page = 1;
    var pageSize = 10;

    var totalPage = 0;


    getPage();
    //下一页
    $('#next').on('click',function(){

        page++;
        if(page > totalPage) {
            page = totalPage;
            $('#next').addClass('disabled');
        }

        getPage();
    });
    //上一页
    $('#erev').on('click',function(){
        page--;
        if(page < 1) {
            page = 1;
            $('#erev').addClass('disabled');
        }
        getPage();
    });

    function getPage(){
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(res){
                totalPage = Math.ceil(res.total / pageSize);
                console.log(res)
                var html = template('catgoryFirstBox',res);
                //console.log(html);
                $('#catgoryFirst-tpl').html(html);
            }
        });
    };


    //添加一级分类
    $('#save').on('click',function(){
        var catgoryFirstName = $.trim($("[name='catgoryFirstName']").val());

        if(!catgoryFirstName){
            $('#modalBody span').text('请输入一级分类名称');
        }

        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:{
                categoryName:catgoryFirstName
            },
            success:function(res){
                if(res.success){
                    location.reload();
                }
            }
        })
    })
});