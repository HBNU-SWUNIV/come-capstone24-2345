import puppeteer from 'puppeteer';
import { connectDB } from '../../../util/database';

const crawlingHandler = async (req, res) => {
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

    try {
      const crawlUrl = `https://www.diningcode.com/list.dc?query=${query.region}&keyword=${query.keywords.join('%2C')}`;
      const context = browser.defaultBrowserContext();
      await context.overridePermissions(crawlUrl, ['geolocation']);

      await page.goto(crawlUrl);

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

      for (let href of hrefs) {
        await page.goto(href, { waitUntil: 'domcontentloaded' });

        let title = await page.$eval('h1.tit', (title) => title.innerText);
        let category = await page.$$eval('div.btxt a', (categorys) =>
          categorys.length !== 0
            ? categorys.map((category) => category.innerText)
            : null
        );
        category.shift(); // 첫 인덱스는 지역명이기에 제거

        let address = await page.$$eval('span.profile_jibun a', (addresses) =>
          addresses.length !== 0
            ? addresses.map((address) => address.innerText)
            : null
        );
        if (address == null) {
          address = await page.$$eval('li.locat a', (addresses) =>
            addresses.length !== 0
              ? addresses.map((address) => address.innerText)
              : null
          );
        }
        if (address) address = address.join(' ');

        let phone = await page.$eval('li.tel', (tel) => tel.innerText);
        let tag = await page.$$eval('li.tag a', (tags) =>
          tags.length !== 0 ? tags.map((tag) => tag.innerText) : null
        );

        let img = await page.$$eval('div.store-pic img', (imgs) =>
          imgs.length !== 0 ? imgs.map((img) => img.src) : null
        );

        let result = await db.collection(`${city}_place`).insertOne({
          type,
          data: { title, category, address, phone, tag, img },
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      await page.close();
      await browser.close();
    }
  };

  if (req.method === 'GET') {
    // await crawling(
    //   { region: '대전', keywords: ['20대', '데이트', '카페'] },
    //   'daejeon',
    //   '카페'
    // )();
    // await crawling(
    //   { region: '대전', keywords: ['20대', '데이트', '술집'] },
    //   'daejeon',
    //   '술집'
    // )();
    // await crawling(
    //   { region: '대전', keywords: ['20대', '데이트', '양식'] },
    //   'daejeon',
    //   '양식'
    // )();
    // await crawling(
    //   { region: '대전', keywords: ['20대', '데이트', '중식'] },
    //   'daejeon',
    //   '중식'
    // )();
    // await crawling(
    //   { region: '대전', keywords: ['20대', '데이트', '일식'] },
    //   'daejeon',
    //   '일식'
    // )();
    // await crawling(
    //   { region: '대전', keywords: ['20대', '데이트', '한식'] },
    //   'daejeon',
    //   '한식'
    // )();
    await crawling(
      { region: '대전%20동구', keywords: ['20대', '술집', '데이트'] },
      'daejeon',
      '술집'
    )();
    await crawling(
      { region: '대전%20중구', keywords: ['20대', '술집', '데이트'] },
      'daejeon',
      '술집'
    )();
    await crawling(
      { region: '대전%20서구', keywords: ['20대', '술집', '데이트'] },
      'daejeon',
      '술집'
    )();
    await crawling(
      { region: '대전%20유성구', keywords: ['20대', '술집', '데이트'] },
      'daejeon',
      '술집'
    )();
    await crawling(
      { region: '대전%20대덕구', keywords: ['20대', '술집', '데이트'] },
      'daejeon',
      '술집'
    )();

    console.log('크롤링 완료');
    return res.status(200).send('Complete crawling');
  }
};

export default crawlingHandler;
