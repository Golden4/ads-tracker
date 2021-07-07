import cherio from "cheerio";
import chalk from "chalk";
import {getPageContent} from './parser.js';

async function init() {
    const carItems = [];
    let pageNumber = 1;
    let isEnd = false;
    while(!isEnd) {
        const pageHtml = await getPageContent(getLink(pageNumber));
        const $ = cherio.load(pageHtml);
        isEnd = true;
        $('.ListingItem-module__main').each((i, item) => {
            const urlElem = $('.ListingItemTitle-module__link', item);
            const url = urlElem.attr('href');
            const title = urlElem.text();
            const price = $('.ListingItem-module__price', item).text();
            carItems.push({
                url,
                title,
                price
            });
            // isEnd = false;
        });
        pageNumber++;
    }
    console.log(carItems);
    console.log(carItems.length)
}

function getLink(page) {
    return `https://auto.ru/ufa/cars/mitsubishi/all/?sort=cr_date-desc&page=${page}`;
}

(async function main() {
    try {
        await init();
    } catch (error) {
        console.log(chalk.red('Error has occurred'));
        console.log(error);
    }
})();