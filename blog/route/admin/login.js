const {User} = require('../../model/user');
const bcrypt = require('bcrypt');
const login = async (req,res)=>{
    //接收请求参数
    const {email,password} = req.body;
    //如果用户没有输入邮件地址
    // if(email.trim().length == 0 || password.trim().length == 0) return res.status(400).send("<h4>邮件或者密码不正确</h4>");
    if(email.trim().length == 0 || password.trim().length == 0) return res.status(400).render("admin/error",{msg:'邮件或者密码不正确'});
    //根据邮箱地址查询用户信息
    //如果查询到了用户 user变量的值是对象类型，对象中存储的是用户信息
    //如果没有查询到用户，user变量为空
    let user = await User.findOne({email});
    //如果查询到了用户
    if(user){
        let isValid = await bcrypt.compare(password,user.password);
        if(isValid){
            req.session.username = user.username;
            //将用户角色存储在session对象中
            req.session.role = user.role;
            //登陆成功
            // res.send('登录成功');
            req.app.locals.userInfo = user;
            //对用户的角色进行判断
            if(user.role == 'admin'){
                //重定向到用户列表页面
                res.redirect('/admin/user');
            }else{
                //重定向到博客首页
                res.redirect('/home/')
            }
            
        }else{
            //登陆的密码不正确时
            res.status(400).render('admin/error',{msg:'邮箱地址或者密码错误'});
        }

    }else{
        //如果没有查询到用户
        res.status(400).render('admin/error',{msg:'邮箱地址或者密码错误'});
    }

}
module.exports = login;