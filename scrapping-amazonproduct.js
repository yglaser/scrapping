const puppeteer = require('puppeteer');
puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080','--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'] }).then(async browser => {
    const page = await browser.newPage();
var args = "iphone"
await page.goto("https://www.amazon.com/");

await page.type('input#twotabsearchtextbox', args)
await page.keyboard.press('Enter');
await page.waitForNavigation(); 
await page.screenshot({path: 'sample.png'})
const products = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('.s-result-item'));
    return links.map(link => {
      if (link.querySelector(".a-price-whole")) {
        return {
          name: link.querySelector(".a-size-medium.a-color-base.a-text-normal").textContent,
          url: link.querySelector(".a-link-normal.a-text-normal").href,
          image: link.querySelector(".s-image").src,
          price: parseFloat(link.querySelector(".a-price-whole").textContent.replace(/[,.]/g, m => (m === ',' ? '.' : ''))),
        };
      }
    }).slice(0, 5);
  });
  
  console.log(products.sort((a, b) => {
    return a.price - b.price;
  }));

  await browser.close();

}).catch(function(error) {
    console.error(error);
});


