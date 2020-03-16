//Libreria para generar el pdf
const pupppeteer = require ('puppeteer');

//Libreria para hacer merge de varias paginas en un solo pdf
const merge = require('easy-pdf-merge');

var ports = [];

//Ruta de cada página
for (let i = 14; i <= 16; i++) {
    ports.push('http://localhost:5500/pag' + i + '/')
}

async function printPDF(){
    const browser = await pupppeteer.launch();
    const page = await browser.newPage();

    var pagesPDF = [];

    //Se recorre cada página y se guardar en pagesPDF
    for(var i = 0; i < ports.length; i++){
        await page.goto(ports[i], {waitUntil: 'networkidle2'});
        var pdfFileName =  'Pagina'+(i+1)+'.pdf';
        pagesPDF.push(pdfFileName);
        await page.pdf({path: pdfFileName, width:1920, height:1080, printBackground: true});
      }

    await browser.close();
    await mergeMultiplePDF(pagesPDF);
}

printPDF();

const mergeMultiplePDF = (pagesPDF) => {
    return new Promise((resolve, reject) => {
        merge(pagesPDF,'Reporte.pdf',function(err){

            if(err){
                console.log(err);
                reject(err)
            }

            console.log('Success');
            resolve()
        });
    });
};