const got = require('@/utils/got');
const cheerio = require('cheerio');


module.exports = async (ctx) => {
    const baseUrl = 'http://xiyuge88.info/';
    // 发起 HTTP GET 请求
    const response = await got({
        method: 'get',
        url: baseUrl,
    });

    const data = response.data; // response.data 为 HTTP GET 请求返回的 HTML，也就是简书首页的所有 HTML

    const $= cheerio.load(data); // 使用 cheerio 加载返回的 HTML

    const news = $('div[class=focus]');
    console.log(news.html())
    const items = news.map(( i,elem) => {

        console.log($(elem).find('a').attr('title'))
        console.log($(elem).find('img').attr('src'))
        const d={

        // 文章标题
        title: $(elem).find('img').attr('alt'),
        // 文章链接
        link: $(elem).find('a').attr('href'),
        image:  $(elem).find('img').attr('src'),
        description: $(elem).html()+ $(elem).parent().find('span[class=note]').html(),
        // 文章作者
        author: '细雨阁'
        };
         return d

})
console.log(items.toArray())
    ctx.state.data = {
        title: '细雨阁',
        link: baseUrl,
        description: '细雨阁',
        item: items.toArray()


    };

    console.log(ctx.state.data)
};
