import { rewrite, rewriteCode, rewriteEmbed } from './rewrite';

describe('rewrite()', () => {
  it('should chains plugs', () => {
    const p1 = jest.fn().mockReturnValue(null);
    const p2 = jest.fn().mockReturnValue(null);
    const html = rewrite('<p>test</p>').use(p1).use(p2).run();
    expect(html).toEqual('<p>test</p>');
    expect(p1).toHaveBeenCalledTimes(1);
    expect(p1.mock.calls[0][0]('body').html()).toEqual('<p>test</p>');
    expect(p2).toHaveBeenCalledTimes(1);
    expect(p2.mock.calls[0][0]('body').html()).toEqual('<p>test</p>');
  });
});

describe('rewriteEmbed()', () => {
  it('should wrap iframe by div', () => {
    const html = rewrite('<p>test1</p><iframe></iframe><p>test2</p>')
      .use(rewriteEmbed())
      .run();
    expect(html).toEqual(
      '<p>test1</p><div class="embed"><iframe></iframe></div><p>test2</p>'
    );
  });
  it('should wrap iframe by div(youtube)', () => {
    const html = rewrite(
      '<p>test1</p><iframe title="YouTube embed"></iframe><p>test2</p>'
    )
      .use(rewriteEmbed())
      .run();
    expect(html).toEqual(
      '<p>test1</p><div class="embed youtube"><iframe title="YouTube embed"></iframe></div><p>test2</p>'
    );
  });
});

describe('rewriteCode()', () => {
  it('should highlighting codeblock', () => {
    const html = rewrite(
      '<p>test1</p><pre><code>const a=1;</code></pre><p>test2</p>'
    )
      .use(rewriteCode())
      .run();
    expect(html).toEqual(
      '<p>test1</p><pre><code class="hljs"><span class="hljs-keyword">const</span> a=<span class="hljs-number">1</span>;</code></pre><p>test2</p>'
    );
  });
});
