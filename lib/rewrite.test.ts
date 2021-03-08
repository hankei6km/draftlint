import { FetchMock } from 'jest-fetch-mock';
import { rewrite, rewriteCode, rewriteEmbed, rewriteImg } from './rewrite';
// https://github.com/jefflau/jest-fetch-mock/issues/83
const fetchMock = fetch as FetchMock;
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('rewrite()', () => {
  it('should chains plugs', async () => {
    const p1 = jest.fn().mockReturnValue(null);
    const p2 = jest.fn().mockReturnValue(null);
    const html = await rewrite('<p>test</p>').use(p1).use(p2).run();
    expect(html).toEqual('<p>test</p>');
    expect(p1).toHaveBeenCalledTimes(1);
    expect(p1.mock.calls[0][0]('body').html()).toEqual('<p>test</p>');
    expect(p2).toHaveBeenCalledTimes(1);
    expect(p2.mock.calls[0][0]('body').html()).toEqual('<p>test</p>');
  });
});

describe('rewriteImg()', () => {
  it('should set size attr to img', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        PixelWidth: 1000,
        PixelHeight: 500
      })
    );
    const html = await rewrite(
      '<p>test1</p><img src="test" alt="test text" /><p>test2</p>'
    )
      .use(rewriteImg())
      .run();
    expect(html).toEqual(
      '<p>test1</p><img src="test?w=600&amp;h=300" alt="test text" width="600" height="300"><p>test2</p>'
    );
  });
});
describe('rewriteEmbed()', () => {
  it('should wrap iframe by div', async () => {
    const html = await rewrite('<p>test1</p><iframe></iframe><p>test2</p>')
      .use(rewriteEmbed())
      .run();
    expect(html).toEqual(
      '<p>test1</p><div class="embed"><iframe></iframe></div><p>test2</p>'
    );
  });
  it('should wrap iframe by div(youtube)', async () => {
    const html = await rewrite(
      '<p>test1</p><iframe title="YouTube embed" src="test?url=test%3Fv%3Dabc"></iframe><p>test2</p>'
    )
      .use(rewriteEmbed())
      .run();
    expect(html).toEqual(
      '<p>test1</p><div class="embed youtube"><lite-youtube videoid="abc" params="rel=0"></lite-youtube></div><p>test2</p>'
    );
  });
});

describe('rewriteCode()', () => {
  it('should highlighting codeblock', async () => {
    const html = await rewrite(
      '<p>test1</p><pre><code>const a=1;</code></pre><p>test2</p>'
    )
      .use(rewriteCode())
      .run();
    expect(html).toEqual(
      '<p>test1</p><pre><code class="hljs"><span class="hljs-keyword">const</span> a=<span class="hljs-number">1</span>;</code></pre><p>test2</p>'
    );
  });
});
