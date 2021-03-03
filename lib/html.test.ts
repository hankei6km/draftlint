import cheerio from 'cheerio';
import {
  getPageHtml,
  splitStrToParagraph,
  getTitleAndContent,
  slideHeading
} from './html';

describe('splitStrToParagraph()', () => {
  it('should splits html string in p tag at multiple br tag.', () => {
    expect(
      splitStrToParagraph('<p>test1<br>test2</p><p>test3<br><br>test4</p>')
    ).toStrictEqual('<p>test1<br>test2</p><p>test3</p><p>test4</p>');
    expect(
      splitStrToParagraph(
        '<p>test1<br>test2</p><p>test3<br><br><br><br>test4</p>'
      )
    ).toStrictEqual('<p>test1<br>test2</p><p>test3</p><p>test4</p>');
    expect(
      splitStrToParagraph(
        '<p>test1<br/>test2</p><p>test3<br /><br /><br/><br/>test4</p>'
      )
    ).toStrictEqual('<p>test1<br>test2</p><p>test3</p><p>test4</p>');
    expect(
      splitStrToParagraph(
        '<p>test1<br>test2</p><p>test3<br><br>test4<br><br></p>'
      )
    ).toStrictEqual('<p>test1<br>test2</p><p>test3</p><p>test4</p>');
    expect(
      splitStrToParagraph(
        '<h1>title1</h1><p>test1<br>test2</p><h2>title2</h2><p>test3<br><br><br><br>test4</p>'
      )
    ).toStrictEqual(
      '<h1>title1</h1><p>test1<br>test2</p><h2>title2</h2><p>test3</p><p>test4</p>'
    );
    expect(
      splitStrToParagraph(
        '<h1>title</h1><p>test1<br>test2</p><p>test3<br><br><br><br>test4</p>'
      )
    ).toStrictEqual(
      '<h1>title</h1><p>test1<br>test2</p><p>test3</p><p>test4</p>'
    );
    expect(
      splitStrToParagraph(
        '<h1>title</h1><p>test1<br>test2<br>test3<br><br><br><br>test4<br>test5</p>'
      )
    ).toStrictEqual(
      '<h1>title</h1><p>test1<br>test2<br>test3</p><p>test4<br>test5</p>'
    );
  });
});

describe('getPageHtml()', () => {
  it('should returns pageHtml', async () => {
    expect(getPageHtml('title1', '<p>test1</p>')).toStrictEqual(
      '<h1>title1</h1><p>test1</p>'
    );
    expect(getPageHtml('Home', '<h1>title2</h1><p>test2</p>')).toStrictEqual(
      '<h1>title2</h1><p>test2</p>'
    );
    expect(
      getPageHtml('Home', '<h1>title2</h1><p>test3<br><br>test4</p>')
    ).toStrictEqual('<h1>title2</h1><p>test3</p><p>test4</p>');
  });
});

describe('slideHeading()', () => {
  const getSlidedHtml = (html: string): string => {
    const $ = cheerio.load(html);
    slideHeading($);
    return $('body').html() || '';
  };
  it('should slide depth of heding', async () => {
    expect(getSlidedHtml('<h2>title1</h2>')).toStrictEqual('<h3>title1</h3>');
    expect(
      getSlidedHtml('<h2>title1</h2><p>test1</p><h2>title2</h2><p>test2</p>')
    ).toStrictEqual('<h3>title1</h3><p>test1</p><h3>title2</h3><p>test2</p>');
    expect(
      getSlidedHtml('<h2>title1</h2><p>test1</p><h3>title2</h3><p>test2</p>')
    ).toStrictEqual('<h3>title1</h3><p>test1</p><h4>title2</h4><p>test2</p>');
  });
});

describe('getTitleAndContent()', () => {
  it('should returns title and content', async () => {
    expect(getTitleAndContent('title1', '<p>test1</p>')).toStrictEqual({
      articleTitle: 'title1',
      html: '<p>test1</p>'
    });
    expect(
      getTitleAndContent('title1', '<h1>article title1</h1><p>test1</p>')
    ).toStrictEqual({
      articleTitle: 'article title1',
      html: '<p>test1</p>'
    });
    expect(
      getTitleAndContent(
        'title1',
        '<h1>article title1</h1><p>test1</p><h2>title2</h2><p>test2</p>'
      )
    ).toStrictEqual({
      articleTitle: 'article title1',
      html: '<p>test1</p><h3>title2</h3><p>test2</p>'
    });
    // h1 が複数はないか?
    expect(
      getTitleAndContent(
        'title1',
        '<h1>article title1</h1><p>test1</p><h1>title2</h1><p>test2</p>'
      )
    ).toStrictEqual({
      articleTitle: 'article title1',
      html: '<p>test1</p><h2>title2</h2><p>test2</p>'
    });
  });
});
