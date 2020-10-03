$(function () {
    //调用接口在个人资料页面中展示相关信息
    function loadUserInfo() {
        var form = layui.form;
        $.ajax({
            type: 'get',
            url: 'my/userinfo',
            success: function (res) {
                // $('#username').val(res.data.username);
                // $('.layui-form input[name="id"]').val(res.data.id);
                // $('.layui-form-item input[name="nickname"]').val(res.data.nickname);
                // $('.layui-form-item input[name="email"]').val(res.data.email);
                form.val('infobasic', res.data)
            }
        })
    }
    loadUserInfo();


    //调用接口更改用户信息
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        // var fd = $(this).serializeArray();
        // fd = fd.filter(function (item) {
        //     return item.name !== 'username'
        // });//这是在input中加readonly导致将username这一项数据也传递到了后端,但是后端规定的传递参数中是没有这一项的,所以我们要将这一项给过滤掉,或者利用数组的splice()删除那一项也可以,或者利用数组的filter()方法将那一项无用的给过滤掉也行.那如果我们在input中使用disabled来禁用按钮呢?

        var fd = $(this).serialize();
        //如果input框中加的是disabled来禁用这个按钮,直接这样就可以获取到我们所要的数据

        $.ajax({
            type: 'post',
            url: 'my/userinfo',
            data: fd,
            success: function (res) {
                if (res.status === 0) {
                    layer.msg('修改用户信息成功')
                }
            }
        })
    })


    //重置功能
    $('#resetbtn').click(function (e) {
        e.preventDefault();
        loadUserInfo();
    })
})