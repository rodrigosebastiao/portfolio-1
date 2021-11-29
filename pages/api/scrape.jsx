import puppeteer from 'puppeteer';


export default async function handler(req, res) {
    const url = req.query.url;
    const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;

    if(regex.test(url)){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const htmlPage = await page.content();
        const absolutePath = `<base href="${url}">${htmlPage}</base>`;
        
        res.status(200).json({ data: absolutePath });
        await browser.close();
    }
}