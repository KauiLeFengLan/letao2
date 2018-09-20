$(function(){
        var page = 1;
        var pageSize = 10;
        var totalpage = 0;

    getData();

    $('#nextBtn').on('click',function(){
        page++;


        if(page > totalpage) {
            page = totalpage;
            $('#nextBtn').text('最后一页').css('color','#ccc');
        }else{
            $('#nextBtn').text('下一页').css('color','');
            $('#prevBtn').text('上一页').css('color','');
        }
        getData();
    });
    $('#prevBtn').on('click',function(){
        page--;
        if(page < 1) {
            page = 1;
            $('#prevBtn').text('第一页').css('color','#ccc');
        }else{
            $('#prevBtn').text('上一页').css('color','');
            $('#nextBtn').text('下一页').css('color','');
        }
        getData();
    });

    function getData(){
        $.ajax({
            url:'/product/queryProductDetailList',
            type:'get',
            data:{
                page:page,
                pageSize:pageSize
            } ,
            success:function(res){
                //console.log(res)
                totalpage = Math.ceil(res.total / pageSize);
                var  html = template('productTpl',res);
                $('#productBox').html(html);
            }
        });
    }


    $.ajax({
        url:'/category/querySecondCategoryPaging',
        type:'get',
        data:{
            page:1,
            pageSize:100
        },
        success:function(res){
            //console.log(res)
            var html = template('secondTpl',res);
            $('#secondBox').html(html);
        }

    });


    //图片上传
    var imageArray = [];
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            imageArray.push(data.result);

        }
    });

    //添加商品
    $('#addProduct').on('click',function(){
        var proName = $.trim($("[name='proName']").val());
        var oldPrice = $.trim($("[name='oldPrice']").val());
        var price = $.trim($("[name='price']").val());
        var proDesc = $.trim($("[name='proDesc']").val());
        var size = $.trim($("[name='size']").val());
        var num = $.trim($("[name='num']").val());
        var brandId = $.trim($("[name='brandId']").val());

        $.ajax({
            url:'/product/addProduct',
            type:'post',
            data:{
                proName:proName,
                oldPrice:oldPrice,
                price:price,
                proDesc:proDesc,
                size:size,
                statu:1,
                num:num,
                brandId:brandId,
                pic:imageArray
            },
            success:function(res){
                //console.log(res)
                if(res.success){
                    location.reload();
                }else {
                    alert(res.message);
                }
            }
        });
    });


});