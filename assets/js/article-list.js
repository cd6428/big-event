$(function () {
    //这是在文章列表中简单的做了一下列表的展示功能
    function loadArticleList() {
        $.ajax({
            type: 'get',
            url: 'my/article/list',
            data: {
                pagenum: 1,
                pagesize: 10
            },
            success: function (res) {
                if (res.status === 0) {
                    var tel = template('article-tel', res);
                    $('.layui-table tbody').html(tel)
                }
            }
        })
    }
    loadArticleList();


    //下次从这个地方接着往后面做相关的功能















    
})