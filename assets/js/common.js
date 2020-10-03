var baseURL = 'http://ajax.frontend.itheima.net/'
$.ajaxPrefilter(function (options) {
    options.beforeSend = function () {
        NProgress.start();//在请求发送前调用开始进度条
    }
    
    if (options.url !== 'api/login' && options.url !== 'api/reguser') {
        options.headers = {
            Authorization: sessionStorage.getItem('mytoken')
        }
    }
    //我们在这里统一设置请求头,因为以my开头的url路径在发送ajax请求时都要携带请求头,所以我们可以在这里进行统一的设置,当然要进行判断,因为不是所有的url路径都要携带请求头,这里除去两种特殊的情况,login和reguser,所以我们做一个判断,之后在这里统一设置headers.


    options.url = baseURL + options.url;

    //jquery为我们提供了一个complete(),在请求发送完成后触发,不论这个请求时成功还是失败,都会触发该函数.
    options.complete = function (res) {
        NProgress.done();//请求完成后调用结束进度条
        if (res.responseJSON && res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            sessionStorage.removeItem('mytoken');
            location.href = './login.html'
        }
    }
})