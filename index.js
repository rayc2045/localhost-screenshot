const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    ignoreDefaultArgs: ['--enable-automation'],
    args: ['--incognito', '--window-size=1920,1080'],
    defaultViewport: { width: 1280, height: 1080 }, // or null
    // headless: false, // Open browserTODO:
    // devtools: true
  });

  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5500/', { waitUntil: 'networkidle0' });

  const targets = await page.$$('.screenshot');
  const targetHeaders = await page.$$eval('.screenshot > .card > h1', el =>
    el.map(item => item.textContent)
  );
  createFolder('./screenshot');

  // console.log('delay...'); await delay(3); // wait for animation complete
  // console.log('page scroll...'); await autoScroll(page);
  console.log('screenshot...');
  await page.evaluate(() => document.body.style.background = 'transparent');

  // Screenshot Test
  const itemNum = 102;
  const itemName = 'Transparent 102 – Wheat';
  
  await targets[itemNum - 1].screenshot({
    path: `./screenshot/${itemName}.png`,
    omitBackground: true,
  });

  // for (let i = 0; i < targets.length; i++) {
  //   try {
  //     // get screenshot of a particular element
  //     const title = targetHeaders[i].trim();
  //     await targets[i].screenshot({
  //       path: `./screenshot/${
  //         i + 1 < 10 ? `Transparent 00${i + 1} – ${title}` :
  //         i + 1 < 100 ? `Transparent 0${i + 1} – ${title}` :
  //         `Transparent ${i + 1} – ${title}`
  //       }.png`,
  //       omitBackground: true,
  //     });
  //   } catch(e) {
  //     // if element is 'not visible', spit out error and continue
  //     console.log(`couldn't take screenshot of element with index: ${i}. cause: `,  e)
  //   }
  // }

  await browser.close();

  /* _______________________________________________________
   * _______________________________________________________
   * _______________________________________________________
  */

  function createFolder(dirPath) {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  }

  function delay(time) {
    return new Promise(function(resolve) { 
      setTimeout(resolve, time * 1000)
    });
  }

  async function autoScroll(page){
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 1000;
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
})();