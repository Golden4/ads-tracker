import puppeteer from "puppeteer";

const LAUNCH_OPTS = {
    args: [
        '--no-sandbox'
    ]
}

let browser;
let page;

export async function startSession() {
    if(!browser) {
        browser = await puppeteer.launch({
            handles: false,
            slowMo: 100,
            devtools: true
        });
    }
    if (!page) {
        page = await browser.newPage();
        await page.setViewport({
            width: 1920,
            height: 1080
        })
    }
}

export async function endSession() {
    await browser.close();
}

export async function getPageContent(link) {
    try {
        if (!browser)
            await startSession();
        await page.goto(link);
        // await autoScroll(page);
        const content = await page.content();
        // browser.close();
        return content;
    } catch (error) {
        await endSession();
        throw error;
    }
}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}