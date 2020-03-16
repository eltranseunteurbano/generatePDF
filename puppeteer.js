const pupppeteer = require ('puppeteer');

const port = 'http://127.0.0.1:5500/pagUno/'


async function printPDF(){
    const browser = await pupppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1
    });
    await page.goto(port);

    await page.pdf({
        path: 'report.pdf',
        width:1920,
        height:1080,
        displayHeaderFooter: false,
        printBackground: true
    })

    await browser.close();

  
}

printPDF();