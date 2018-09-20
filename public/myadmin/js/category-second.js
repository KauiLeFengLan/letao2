$(function(){
    var page = 1;
    var pageSize= 5;
    var totalpage = 0;

     getPage();

    $('#nextBtn').on('click',function(){
    page++;


    if(page > totalpage) {
        page = totalpage;
    }
    getPage();
});
    $('#prevBtn').on('click',function(){
    page--;
    if(page < 1) {
        page = 1;
    }
    getPage();
});

    function getPage(){
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type:'get',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(res){
                totalpage = Math.ceil(res.total / pageSize);
                var html = template('categorySecond-tpl',res);
                $('#categorySecond-box').html(html);
            }
        });
    }

    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'get',
        data:{
            page:1,
            pageSize:100
        },
        success:function(res){

            var html = template('categoryFile-tpl',res);
            $('#categoryFile-box').html(html);


        }


    });


    var previewImg = '';
    //上传图片
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data.result.picAddr)
            $("#preview").attr('src',data.result.picAddr);
            previewImg = data.result.picAddr;
        }
    });

    //实现二级分类的添加
    $('#save').on('click',function(){
        var categoryId = $.trim($("[name='categoryFirstName']").val());
        var brandName = $.trim($("[name='productName']").val());
        $.ajax({
            url:'/category/addSecondCategory',
            type:'post',
            data:{
                brandName:brandName,
                categoryId:categoryId,
                brandLogo:previewImg,
                hot:0
            },
            success:function(res){
                //console.log(res)
                if(res.success){
                    location.reload();
                }
            }
        })
    });

});