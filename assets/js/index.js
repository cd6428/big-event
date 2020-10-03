//调用接口获取用户基本信息,封装成为一个函数.
function loadUserInfo() {
    $.ajax({
        type: 'get',
        url: 'my/userinfo',
        // headers: {
        //     Authorization: sessionStorage.getItem('mytoken')
        // },
        success: function (res) {
            if (res.status === 0) {
                var userinfo = res.data;
                if (userinfo.user_pic) {
                    $('#nav-info').html(`<div class="avatar">
                        <img src='${userinfo.user_pic}'/>
                    </div>
                    <div class="welcome">欢迎${userinfo.username}</div>`);
                    $('#header-info img').attr('src', userinfo.user_pic);
                    $('#header-info span').text('欢迎'+userinfo.username)
                }
            }
        }
    })
}
loadUserInfo();


//退出功能的实现
$('#logout-btn').click(function () {
    layer.confirm('你确认要退出吗?', {
        icon: 3,
        title: '提示'
    }, function (index) {
        sessionStorage.removeItem('mytoken');
        layer.close(index);
        location.href = './login.html'
    }); 
})