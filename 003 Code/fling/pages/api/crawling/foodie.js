import puppeteer from 'puppeteer';
import { connectDB } from '../../../util/database';

const crawlingHandler = (req, res) => {
  const crawling = (query, city, type) => async () => {
    const client = await connectDB;
    const db = client.db('Fling');

    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--disable-notifications', // 알림 요청을 자동으로 차단
        '--disable-geolocation', // 위치 권한 요청 비활성화
      ],
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 900,
      height: 700,
    });

    const context = browser.defaultBrowserContext();
    await context.overridePermissions(`https://www.diningcode.com/${query}`, [
      'geolocation',
    ]);

    await page.goto(`https://www.diningcode.com/${query}`);

    await page.waitForSelector('div.Poi__List__Wrap');

    while (true) {
      const searchMoreBtn = await page.$(
        'button[aria-label="search more in here"]'
      );
      if (searchMoreBtn) {
        await searchMoreBtn.click();
      } else {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기
    }

    const hrefs = await page.$$eval('div.Poi__List__Wrap a', (links) =>
      links.map((link) => link.href)
    );

    // let places = [];

    for (let href of hrefs) {
      await page.goto(href, { waitUntil: 'domcontentloaded' });

      let title = await page.$eval('h1.tit', (element) => element.innerText);
      let category = await page.$$eval('div.btxt > a', (anchors) =>
        anchors.map((element) => element.innerText)
      );
      category.shift();
      let address = await page.$$eval('li.locat > a', (elements) =>
        elements.map((element) => element.innerText)
      );
      address = address.join(' ');
      let phone = await page.$eval('li.tel', (element) => element.innerText);
      let tag = await page.$$eval('li.tag a', (elements) =>
        elements.map((element) => element.innerText)
      );

      let result = await db.collection(`${city}_foodie`).insertOne({
        city,
        type,
        data: { title, category, address, phone, tag },
      });
      // places.push({ title, category, address, phone, tag });
    }

    // fs.writeFileSync(`${fileName}.js`, JSON.stringify(places));

    browser.close();
  };

  if (req.method === 'GET') {
    (async () => {
      await crawling('list.dc?query=대전%20이색카페', 'daejeon', 'cafe')();

      await crawling(
        'list.dc?query=대전%20술집&keyword=20대%2C데이트%2C술집',
        'daejeon',
        'bar'
      )();

      await crawling(
        'list.dc?query=대전%20맛집&keyword=20대%2C데이트%2C양식',
        'daejeon',
        'western'
      )();

      await crawling(
        'list.dc?query=대전%20맛집&keyword=20대%2C데이트%2C일식',
        'daejeon',
        'japan'
      )();

      crawling(
        'list.dc?query=대전%20맛집&keyword=20대%2C데이트%2C중식',
        'daejeon',
        'china'
      )();

      await crawling(
        'list.dc?query=대전%20맛집&keyword=20대%2C데이트%2C한식',
        'daejeon',
        'korea'
      )();
    })().then(() => res.end());
  }
};

export default crawlingHandler;
