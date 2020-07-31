
const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob;


module.exports = async ({ page, request }) => {}


//funcion selecciona combo con xpaths 
async function fillSelectWithXPathDia(page, xpathcombo, xpathvalue) {

  var combo = await page.waitForXPath(xpathcombo, { timeout: 120000 })
  var id_combo = await combo.getProperty("id")
  var value = combo ? await page.waitForXPath(xpathvalue, { timeout: 120000 }) : "no data"
 

  if (value !== "no data") {
    
    var valueCombo = await value.getProperty("value")
    await page.select(`select#${id_combo._remoteObject.value}`, valueCombo._remoteObject.value)
  }
  console.log( id_combo._remoteObject.value, valueCombo._remoteObject.value)
}

async function fillSelectWithXPathSucursal(page, xpathcombo, xpathvalue) {

  var combo = await page.waitForXPath(xpathcombo, { timeout: 120000 })
  var id_combo = await combo.getProperty("id")
  var value = combo ? await page.waitForXPath(xpathvalue, { timeout: 120000 }) : "no data"

  console.log(text._remoteObject.value, n)
  if (value !== "no data") {
    var valueCombo = await value.getProperty("value")
    await page.click (`select#${id_combo._remoteObject.value}`)
    await page.type(`select#${id_combo._remoteObject.value}`, valueCombo._remoteObject.value)
    await page.click(`select#${id_combo._remoteObject.value}`, valueCombo._remoteObject.value)
  }
  console.log( id_combo._remoteObject.value, valueCombo._remoteObject.value)
}

//scrapping 
async function scrappingMegatlon () {
  await puppeteer.launch({
    headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox',
      '--window-size=1920,1080',
      '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"']
  })
    .then(async browser => {
      const page = await browser.newPage();
      const args = "https://megatlon.com/clases-online";
      const datos = {
        dni: "35366603",
        name: "yanina glaser",
        tel: "1138542914",
        email: "yaninaglaser@gmail.com"
      }
  
      const datosReserva = { 
        dia: '//*[@id="dia"]/option[2]',
        horario: '//*[@id="horarios"]/option[12]',
        sucursal: '//*[@id="sucursal"]/option[9]',
        profe: "Norman"
      }
      // pagina 1
      await page.goto(args);
      await page.type('input#identityNumber', datos.dni)
      await page.keyboard.press('Enter');
      await page.waitForNavigation();
  
      // pagina 2
      await page.type('input#nombreApellido', datos.name)
      await page.type('input#telefono', datos.tel)
      await page.type('input#email', datos.email)
      await page.keyboard.press('Enter');
      await page.waitForNavigation();
  
      // pagina 3
      await page.type('input#profe_sugerido', datosReserva.profe)
      await page.waitForFunction(() => document.querySelector("#dia").length > 0);
      await fillSelectWithXPathDia(page, '//*[@id="dia"]', datosReserva.dia)
      await page.waitForFunction(() => document.querySelector("#sucursal").length > 0);
      await fillSelectWithXPathSucursal(page, '//*[@id="sucursal"]', datosReserva.sucursal) 
      await page.select('select#sucursal','Megatlon Barracas')//este combo a veces se llena y a veces no
      await page.waitForFunction(() => document.querySelector("#horarios").length > 0);
      await fillSelectWithXPathDia(page, '//*[@id="horarios"]', datosReserva.horario)   
      await page.waitForSelector('button[type="submit"]'); 
     /* await page.evaluate(() => {
        document.querySelector('button[type="submit"]').click();
    });*/
    }).catch(function (error) {
      console.error(error);
    });
  
}
scrappingMegatlon()
const job = new CronJob('00 00 00  * * *', function() {
	const d = new Date();
  console.log('At midnigth', d);
  scrappingMegatlon()
});
console.log('After job instantiation');
job.start();
