import cheerio from 'cheerio';

export function splitStrToParagraph(html: string): string {
  const $ = cheerio.load(html);
  $('body')
    .children()
    .each((_idx, elm) => {
      if (elm.type === 'tag' && elm.tagName === 'p') {
        const $elm = $(elm);
        let $p = cheerio.load('<p></p>')('p');
        const $pArray: typeof $p[] = [];
        let brCnt = 0;
        const $contents = $elm.contents();
        $contents.each((idx, e) => {
          if (e.type === 'tag' && e.tagName === 'br') {
            // <br> を数える
            brCnt++;
          } else {
            if (brCnt === 1) {
              // <br> が１つだけあったので、そのまま追加
              $p.append($contents.get(idx - 1));
            } else if (brCnt >= 2) {
              // <br> が複数存在していたので <p> として分割
              $pArray.push($p);
              $p = cheerio.load('<p></p>')('p');
            }
            $p.append($(e));
            brCnt = 0;
          }
        });
        $pArray.push($p);
        $elm.replaceWith(
          $pArray
            .filter(($p) => $p.contents().length > 0)
            .map(($p) => $p.parent().html())
            .join('')
        );
      }
    });
  return $('body').html() || '';
}

export function getPageHtml(title: string, html: string): string {
  const $ = cheerio.load(splitStrToParagraph(html));
  // const $ = cheerio.load(html);
  if ($('h1').length === 0) {
    $('body').prepend('<h1></h1>');
    $('h1').text(title);
  }
  return $('body').html() || '';
}

function _slideHeading($: cheerio.Root, h: number) {
  const slided = `h${h + 1}`;
  $(`h${h}`).each((_idx, elm) => {
    const $elm = $(elm);
    const hs = cheerio.load(`<${slided}>${$elm.html()}</${slided}>`)(slided);
    $elm.replaceWith(hs);
  });
}

export function slideHeading($: cheerio.Root) {
  _slideHeading($, 5);
  _slideHeading($, 4);
  _slideHeading($, 3);
  _slideHeading($, 2);
  _slideHeading($, 1);
}

export function getTitleAndContent(
  title: string,
  html: string
): {
  articleTitle: string;
  html: string;
} {
  const $ = cheerio.load(splitStrToParagraph(html));
  // const $ = cheerio.load(html);
  const h1 = $('body h1:first');
  if (h1.length === 0) {
    slideHeading($);
    return {
      articleTitle: title,
      html: $('body').html() || ''
    };
  }
  h1.remove();
  slideHeading($);
  return {
    articleTitle: $(h1[0]).html() || '',
    html: $('body').html() || ''
  };
}
