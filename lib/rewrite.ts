import cheerio from 'cheerio';
import hljs from 'highlight.js';
// https://microcms.io/blog/syntax-highlighting-on-server-side

// './html.ts とかなり似たような使われ方をするが、
// こちらは主に見た目に関連する処理を行う.
type rewritePlug = ($: cheerio.Root) => Error | null;

export function rewriteCode(): rewritePlug {
  return ($) => {
    $('pre code').each((_idx, elm) => {
      const result = hljs.highlightAuto($(elm).text());
      $(elm).html(result.value);
      $(elm).addClass('hljs');
    });
    return null;
  };
}

type chain = {
  use: (p: rewritePlug) => chain;
  run: () => string;
};

export function rewrite(body: string): chain {
  const $ = cheerio.load(body);

  const plugs: rewritePlug[] = [];
  const runFunc = () => {
    plugs.forEach((v) => v($));
    return $('body').html() || '';
  };
  const useFunc = (p: rewritePlug) => {
    plugs.push(p);
    return {
      use: useFunc,
      run: runFunc
    };
  };
  return {
    use: useFunc,
    run: runFunc
  };
}
