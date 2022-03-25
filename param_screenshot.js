const puppeteer = require('puppeteer-core');
const fs = require('fs');
const { log } = require('console');

const projectName = 'infinite-mondrian-art';
const fileNameFront = 'Mondrian Art';

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    ignoreDefaultArgs: ['--enable-automation'],
    args: ['--incognito', '--window-size=1920,1080'],
    defaultViewport: { width: 1280, height: 1080 }, // or null
    // headless: false,
    // devtools: true
  });

  const page = await browser.newPage();

  // const targets = await page.$$('.screenshot');
  // const targetHeaders = await page.$$eval('.screenshot > .card > h1', el =>
  //   el.map(item => item.textContent)
  // );
  createFolder('./screenshot');
  log('screenshot...');
  await page.evaluate(() => document.body.style.background = 'transparent');

  for (let i = 0; i < 1000; i++) {
    await page.goto(
      `http://127.0.0.1:5500/projects/${projectName}/?index=${i}`,
      { waitUntil: 'networkidle0' }
    );

    const target = await page.$('.screenshot');
    const file = `${fileNameFront} #${i + 1}.png`;
    // const file = `${
    //   i + 1 < 10 ? `${fileNameFront} #00${i + 1}` :
    //   i + 1 < 100 ? `${fileNameFront} #0${i + 1}` :
    //   `${fileNameFront} #${i + 1}`
    // }.png`;

    try {
      await target.screenshot({
        path: `./screenshot/${file}`,
        omitBackground: true,
      });
    } catch(e) {
      // if element is 'not visible', spit out error and continue
      log(`couldn't take screenshot of element with index: ${i}. cause: `,  e)
    }

    log(`Save "${file}"`);
  }

  await browser.close();
  log('Complete screenshot')


  // _____________________________


  function createFolder(dirPath) {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  }
})();