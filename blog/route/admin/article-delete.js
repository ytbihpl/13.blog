const { Article } = require('../../model/article');
module.exports = async (req,res)=>{
    //获取要删除的文章id
    //根据id删除用户
    await Article.findOneAndDelete({_id:req.query.id});
    res.redirect('/admin/article');

}