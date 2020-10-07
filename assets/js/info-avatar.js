//头像裁切功能的实现
$(function () {
    $('.cropper-box > img').cropper({
        aspectRatio: 1,
        preview: '.img-preview'
    })

    $('#select-img').click(function () {
        $('#myfile').click();
    })

    //这是上传图片到裁切区
    $('#myfile').change(function (e) {
        var files = e.target.files;
        // console.log(files["0"]);
        // console.log(files);
        var newUrl = URL.createObjectURL(files[0]);
        $('.cropper-box > img').cropper('destroy');
        $('#image').attr('src', newUrl);
        $('.cropper-box > img').cropper({
            aspectRatio: 1,
            preview: '.img-preview'
        })
    })


    //裁剪图片,使用cropper插件的一个方法.
    $('#confirm-btn').click(function () {
        var dataUrl = $('#image')
            .cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        })
            .toDataURL('image/png');
        
        $.ajax({
            type: 'post',
            url: 'my/update/avatar',
            // avatar: dataUrl
            //太粗心了.这样的代码你都能写的出来!!!
            data: {
                avatar: dataUrl
            },
            success: function (res) {
                if (res.status === 0) {
                    layer.msg(res.message);
                    parent.loadUserInfo();
                }
            }
        })
    })
    

})