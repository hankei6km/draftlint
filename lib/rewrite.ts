import cheerio from 'cheerio';
import hljs from 'highlight.js';
// https://microcms.io/blog/syntax-highlighting-on-server-side

// './html.ts とかなり似たような使われ方をするが、
// こちらは主に見た目に関連する処理を行う.
type rewritePlug = ($: cheerio.Root) => Error | null;

export function rewriteEmbed(): rewritePlug {
  return ($) => {
    // $('body > iframe').wrap('<div class="embed"></div>');
    $('body > iframe').each((_idx, elm) => {
      const $div = cheerio.load('<div class="embed"></div>')('div');
      const $elm = $(elm);
      if ($elm.attr('title') === 'YouTube embed') {
        // TODO: アスペクト比を makeStyle に渡す方法.
        $div.addClass('youtube');
      }
      $elm.wrap($div);
    });
    return null;
  };
}

export function rewriteCode(): rewritePlug {
  return ($) => {
    $('pre code').each((_idx, elm) => {
      const result = hljs.highlightAuto($(elm).text(), [
        // codeblock で class 名が指定できないと(さらに一部抜粋だと)
        // 認識率は高くないので絞る.
        // https://github.com/highlightjs/highlight.js/blob/master/SUPPORTED_LANGUAGES.md
        'typescript',
        //'tsx',
        'json',
        'yml',
        'yaml',
        'html',
        'css',
        'javascript',
        'jsx',
        'shell',
        'console',
        'bash',
        'sh',
        'zsh'
      ]);
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
