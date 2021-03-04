import { rewrite, rewriteCode } from './rewrite';

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
