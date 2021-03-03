import { getTextlintKernelOptions } from '../utils/textlint';
import { getInsInfos, textLintInHtml } from './draftlint';

describe('mapInsertIndices()', () => {
  it('should returns indices that is actually insertion positions', async () => {
    expect(
      getInsInfos('<p>テスト</p>', [
        {
          index: 6
        }
      ])
    ).toEqual([{ index: 6, insIndex: 6, range: [3, 6] }]);
    expect(
      getInsInfos('<p>テス&gt;ト</p>', [
        {
          index: 6
        }
      ])
    ).toEqual([{ index: 6, insIndex: 2, range: [3, 10] }]);
    expect(
      getInsInfos('<p>テス&gt;ト</p>', [
        {
          index: 4
        }
      ])
    ).toEqual([{ index: 4, insIndex: 4, range: [3, 10] }]);
    expect(
      getInsInfos('<p>テス&gt;ト</p>', [
        {
          index: 4
        },
        {
          index: 6
        }
      ])
    ).toEqual([
      { index: 6, insIndex: 2, range: [3, 10] },
      { index: 4, insIndex: 4, range: [3, 10] }
    ]);
  });
});
describe('textLintInSections()', () => {
  const presets = getTextlintKernelOptions({
    presets: [
      {
        presetId: 'ja-technical-writing',
        preset: require('textlint-rule-preset-ja-technical-writing')
      }
    ],
    rules: undefined,
    ruleOptions: {},
    filterRules: []
  });
  it('should inserts message that from textlint', async () => {
    const res = await textLintInHtml(
      '<p>今日は、おいしい、ものが、食べれた。</p>',
      presets
    );
    expect(res.html).toStrictEqual(
      '<p>今日は、おいしい、ものが、<span style="color: red;" id=":textLintMessage:0">一つの文で"、"を3つ以上使用しています</span>食べれ<span style="color: red;" id=":textLintMessage:1">ら抜き言葉を使用しています。</span>た。</p>'
    );
    expect(res.messages).toStrictEqual([
      {
        id: ':textLintMessage:0',
        message: '一つの文で"、"を3つ以上使用しています',
        ruleId: 'ja-technical-writing/max-ten',
        severity: 2
      },
      {
        id: ':textLintMessage:1',
        message: 'ら抜き言葉を使用しています。',
        ruleId: 'ja-technical-writing/no-dropping-the-ra',
        severity: 2
      }
    ]);
  });
  it('should inserts no messages', async () => {
    const res = await textLintInHtml(
      '<p>テストが成功するところを確認できた。</p>',
      presets
    );
    expect(res.html).toStrictEqual('');
    expect(res.messages).toStrictEqual([]);
  });
});
