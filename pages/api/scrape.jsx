import puppeteer from 'puppeteer';


export default async function handler(req, res) {
    const url = req.query.url;
    const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
    const regexHTTPS = /^(?:http(s)?:\/\/)/gm;
    const isURLValid = regex.test(url);
    
    if(isURLValid){
        const URL_HTTPS = !regexHTTPS.test(url) ? `https://${url}/` : url;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(URL_HTTPS);
        const htmlPage = await page.content();
        const resourceWithOriginPath = `<base href="${URL_HTTPS}">${htmlPage}</base>`;
        
        res.status(200).json({ data: resourceWithOriginPath });
        // await browser.close();
    }
}