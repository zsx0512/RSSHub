const got = require('@/utils/got');
const cheerio = require('cheerio');


module.exports = async (ctx) => {
    const baseUrl = 'http://www.ahfeixi.gov.cn/public/column/13701?type=4&catId=7023411&action=list&nav=3';
    // 发起 HTTP GET 请求
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    
    const data = response.data; // response.data 为 HTTP GET 请求返回的 HTML，也就是简书首页的所有 HTML
    
    const $= cheerio.load(data); // 使用 cheerio 加载返回的 HTML
   
    const news = $('div[class=xxgk_nav_con]').find('li');
    console.log(news.html())
    const items = news.map(( i,elem) => {
            
        console.log($(elem).find('a').attr('title'))
        console.log($(elem).find('a').attr('href'))
        const d={
       
        // 文章标题
        title: $(elem).find('a').attr('title'),
        // 文章链接
        link: $(elem).find('a').attr('href'),
        // 文章作者
        author: '肥西县人民政府'
        };
         return d
    
})
console.log(items.toArray())
    ctx.state.data = {
        title: '肥西县人民政府-通知公告',
        link: baseUrl,
        description: '肥西县人民政府-通知公告',
        item: items.toArray()
    
       
    };
    
    console.log(ctx.state.data)
};
