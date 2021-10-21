const {User} = require('../../model/user');

module.exports = async (req,res)=>{
    req.app.locals.currentLink = 'user';
    //获取到地址栏中的id参数
    const {message,id} = req.query;
    //如果当前传递了id参数
    if(id){
        //修改操作
        let user = await User.findOne({_id:id});
        //渲染用户编辑页面(修改)
        res.render('admin/user-edit',{
            message:message,
            user:user,
            button:'修改',
            link:'/admin/user-modify?id='+id
        });
    }else{
        //添加操作
        res.render('admin/user-edit',{
            message:message,
            button:'新增',
            link:'/admin/user-edit'
        });
    }

}