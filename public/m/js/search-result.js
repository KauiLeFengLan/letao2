var keyword = getParamsByUrl(location.href,'keyword');

var page = 1;

var html = "";

var This = null;

var priceSort = 1;

$(function(){

    mui.init({
        pullRefresh : {
            container:'#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback : getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    $('#priceSort').on('tap',function(){
        priceSort = priceSort == 1 ? 2 : 1;

         html = "";

         page = 1;

        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
        if (priceSort == 2) {

            $('#priceSort span').removeClass('mui-icon mui-icon-arrowup');
            $('#priceSort span').addClass('mui-icon mui-icon-arrowdown');
        }else {
            $('#priceSort span').removeClass(' mui-icon mui-icon-arrowdown');
            $('#priceSort span').addClass('mui-icon mui-icon-arrowup');
        }
    });

    $('#priceSort-left').on('tap',function(){
        priceSort = priceSort == 1 ? 2 : 1;

        html = "";

        page = 1;

        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
        if (priceSort == 1) {

            $('#priceSort-left span').removeClass('mui-icon mui-icon-arrowup');
            $('#priceSort-left span').addClass('mui-icon mui-icon-arrowdown');
        }else {
            $('#priceSort-left span').removeClass(' mui-icon mui-icon-arrowdown');
            $('#priceSort-left span').addClass('mui-icon mui-icon-arrowup');
        }
    })
});
//获取地址栏中的参数
function getParamsByUrl(url,name){
    //substr截取字符串
    //console.log(url.substr(url.indexOf('?')+1));
    var params = url.substr(url.indexOf('?')+1);

    var param = params.split('&');

    for(var i = 0; i < param.length; i++){

        var current = param[i].split('=');


        if(current[0] == name ){

            return current[1];
        }
    }
    return null;
}

function getData(){

    if (!This) {
        This = this;
    }
    $.ajax({
        url:'/product/queryProduct',
        type:'get',
        data: {
            page: page++,
            pageSize: 3,
            proName: keyword,
            price:priceSort
        },
        success:function(res){


                html += template('searchTpl',res);
                //console.log(html);
                $('#search-box').html(html);

            This.endPullupToRefresh(res.data.length == 0);

            //console.log(res);
            //This.endPullupToRefresh(true|false);


        }
    });
}