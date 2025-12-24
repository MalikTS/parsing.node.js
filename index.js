const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


const parse = async () => {

    const getHTML = async (url) => {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    }

    const $ = await getHTML('https://byrutgame.org/top-torrent-games/')
    const pageNumber = $('div.pages > a').eq(-2).text()

    for (let i = 1; i < pageNumber; i++) {
        const selector = await getHTML(`https://byrutgame.org/top-torrent-games/page/${i}/`)

        selector('.short_item').each((i, element) => {
            const title = selector(element).find('div.short_title').text();
            const link = selector(element).find('a').attr('href');

            fs.appendFileSync('./data.txt', `${title}${link}\n`);
        })
    }

}

parse()
