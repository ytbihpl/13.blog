const { Article } = require('../../model/article');
//导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req,res)=>{
    //获取页码值
    const page = req.query.page;
    //从数据库中查询数据
    let result = await pagination(Article).page(page).size(4).display(3).find().populate('author').exec();
    result = JSON.parse(JSON.stringify(result));
    //渲染模板并传递数据
    res.render('home/default',{
        result:result
    })
}