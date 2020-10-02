var form = layui.form;
form.verify({
    uname: function (value) {
        if (!/^[\S]{6,8}$/.test(value)) {
            return '请输入6-8位的字符串'
        }
    },

    pwd: function (value) {
        if (!/^[\d]{6}$/.test(value)) {
            return '密码必须是6位数字'
        }
    }

    // pwd: [
    //     /^[\d]{6}$/, '密码必须是6位数字'
    // ]
    //定义规则除了可以使用上述函数的方式也可以使用数组的方式来定义,第一个参数是要匹配的正则规则,第二个参数是如果不匹配那么需要提示的文字.这种方式更简单一点.
})



$('#login-form').submit(function (e) {
    e.preventDefault();
    var fd = $(this).serialize();
    $.ajax({
        type: 'post',
        url: 'api/login',
        data: fd,
        success: function (res) {
            if (res.status === 0) {
                sessionStorage.setItem('mytoken', res.token);//登录成功后会进行token的缓存,将token保存在sessionStorage中,当进入主页时第一件事就是验证token的可靠性.如果token是伪造的或者是不合法的,将会跳转到登录页面.
                location.href = './index.html'
            }
            else {
                layer.msg(res.message, { icon: 6 })//layui自带的弹窗功能,使用户体验更好.
            }
        }
    })
})


$('#logbut').click(function () {
    $('#login-form').hide();
    $('#reg-form').show();
})

$('#regbut').click(function () {
    $('#login-form').show();
    $('#reg-form').hide();
})


$('#reg-form').submit(function (e) {
    e.preventDefault();
    var fd = $(this).serialize();
    $.ajax({
        type: 'post',
        url: 'api/reguser',
        data: fd,
        success: function (res) {
            if (res.status === 0) {
                $('#regbut').click();
            } else {
                alert(res.message)
            }
        }
    })
})