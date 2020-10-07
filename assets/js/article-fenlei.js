$(function () {
    //这是调用接口展示数据,其实可以封装成为一个函数
    function loadArticle() {
        $.ajax({
            type: 'get',
            url: 'my/article/cates',
            success: function (res) {
                if (res.status === 0) {
                    var tel = template('article-fenlei-tel', res);
                    $('.layui-table tbody').html(tel);
                }
                else {
                    layer.msg(res.message)
                }
            }
        })
    }
    loadArticle();
    var form = layui.form;
    //添加分类功能
    $('#add-fenlei').click(function () {
        var index = layer.open({
            type:1,
            title:'添加文章分类',
            content: $('#add-fenlei-tel').html(),
            area: ['500px', '300px']
        })

        $('#confirm-add').submit(function (e) {
            e.preventDefault();
            var fd = $(this).serialize();
            $.ajax({
                type: 'post',
                url: 'my/article/addcates',
                data: fd,
                success: function (res) {
                    layer.close(index);
                    loadArticle();
                }
            })
        })
    })


    //接下来做删除的部分.事件委托
    $('.layui-table tbody').on('click', '.delete-btn', function (e) {
        var id = e.target.dataset.id;
        layer.confirm('你确认要删除吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                type: 'get',
                url: 'my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status === 0) {
                        layer.close(index);
                        loadArticle();
                    }
                    else {
                        layer.msg(res.message)
                    }
                }
            })
        });
        
    })


    //接下来是编辑部分的逻辑
    $('.layui-table tbody').on('click', '.edit-btn', function (e) {
        var index = layer.open({
            type: 1,
            title: '编辑文章分类',
            content: $('#edit-fenlei-tel').html(),
            area: ['500px', '300px']
        })

        //通过指定id获取数据,并且将其填到弹出层的form表单内部.
        var id = e.target.dataset.id;
        $.ajax({
            type: 'get',
            url: 'my/article/cates/'+id,
            success: function (res) {
                if (res.status === 0) {
                    form.val('edit-article',res.data)
                }
            }
        })

        //调用接口,更改编辑文章分类
        $('#edit-add').submit(function (e) {
            e.preventDefault();
            var fd = $(this).serialize();
            $.ajax({
                type: 'post',
                url: 'my/article/updatecate',
                data: fd,
                success: function (res) {
                    if (res.status === 0) {
                        layer.close(index);
                        loadArticle();
                    }
                }
            })
        })
    })
})