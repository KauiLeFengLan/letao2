$(function(){
    $('#search-btn').on('click',function(){


        var keyword = $(this).siblings('input').val();

        if(keyword){
            keyArr.push(keyword);

            localStorage.setItem('keyArr',JSON.stringify(keyArr));

            location.href = "search-result.html?keyword=" + keyword;
            //console.log(1)
        }

    });

    var keyArr = [];

    if(localStorage.getItem('keyArr')){
        keyArr = JSON.parse(localStorage.getItem('keyArr'));
        console.log(keyArr);
        var html = template('historyTpi',{result:keyArr});
        $('#history-box').html(html);
        console.log(html);
    }
    //存储数据关键字

    $('#clearBtn').on('click',function(){
        $('#history-box').html("");
        localStorage.removeItem('keyArr');
        location.href = "search.html";
    });
});