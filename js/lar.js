(function(){
    var loginBtn = l.q('#loginBtn');
    var registBtn = l.q('#registBtn');
    var more = l.qa('.more');
    var datas = l.qa('.data');
    var data = {};
    var len = datas.length;
    var tip = l.q('#tip');

    function tips(){
        var msg = '';
        var color = '';
        if(datas[1].value !== datas[2].value){
            msg = '错误';
            color = 'red';
        }else{
            msg = '正确';
            color = 'green';
        }
        tip.innerHTML = msg;
        tip.style.color = color;
    }

    datas[1].onkeyup = tips;
    datas[2].onkeyup = tips;
    // datas[1].onchange = tips;
    // datas[2].onchange = tips;


    l(loginBtn).click(function(){
        l.id('userForm').dom.submit();
    })    
    l(registBtn).click(function(){
        if(!name.value){
            more.each(function(i){
                l(this).cls().contains('more') && l(this).cls().remove('more');
            })
        }

        for(var i = 0; i < len; i++){
            if(!datas[i].value){
                alert('请将信息补全');
                return;
            }
            data[datas[i].dataset['key']] = datas[i].value;
        }
        if(data.password !== data.repassword){
            alert('两次密码不一致');
            return;
        }

        if(!l.check.phoneNumber(data.phone)){
            alert('请输入正确的手机号');
            return;
        }


        l.ajax({
            url:'index.ctrl.php?c=User&m=signUp&stc=1',
            method:'post',
            json:true,
            data:data,
            callback:function(){
                if(this.status == 200 && this.readyState ==4){
                    var data = this.content;
                    if(data.code == 1){
                        alert('注册成功');
                        window.location.href = 'lar.php'
                    }else{
                        alert('注册失败,请重试');

                    }
                    console.log(this);
                }else{
                    alert('注册失败,请重试')
                }
            }
        })

    })
}())