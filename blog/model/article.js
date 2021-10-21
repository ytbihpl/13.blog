//1.引入mongoose模块
const mongoose = require('mongoose');
//2.创建文章集合规则
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        minlength:4,
        maxlength:20,
        required:[true,'请填写文章标题']
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'请输入作者']
    },publishDate:{
        type:Date,
        default:Date.now,
    },cover:{
        type:String,
        default:null
    },content:{
        type:String
    }
});
//3.根据规则创建集合
const Article = mongoose.model('Article',articleSchema);
//4.将集合规则做为模块成员进行导出
module.exports = {
    Article
}
