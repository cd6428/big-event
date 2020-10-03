//这里是重置密码的逻辑

$(function () {
    var form = layui.form;
    form.verify({
        diff: function (value) {
            var oldpwd = $('input[name="oldPwd"]').val();
            if (oldpwd === value) {
                return '新密码不能与原密码相同'
            }
        },
        repwd: function (value) {
            var newpwd = $('input[name="newPwd"]').val();
            if (newpwd !== value) {
                return '两次输入的密码不一致'
            }
            //表单验证的功能是在点提交按钮后自动进行触发判断.并不需要写在submit事件的里面.
        }
        
    })
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        var fd = $(this).serialize();
        $.ajax({
            type: 'post',
            url: 'my/updatepwd',
            data: fd,
            success: function (res) {
                if (res.status === 0) {
                    layer.msg(res.message);
                }
            }
        })

    })
})