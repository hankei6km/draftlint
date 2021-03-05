import { PagesContents, PagesList } from './contentTypes';

const mockDataPagesContents: PagesContents['contents'] = [
  {
    id: 'home',
    createdAt: '2021-02-18T04:06:49.846Z',
    updatedAt: '2021-02-27T10:04:12.063Z',
    publishedAt: '2021-02-18T04:06:49.846Z',
    revisedAt: '2021-02-18T04:06:49.846Z',
    title: 'Home',
    description: 'textlint と Next.js で始める静的サイトの校正支援',
    html:
      '<h1 id="h2ece168cea">textlint と Next.js で始める静的サイトの校正支援</h1><p>CodeSandbox で動作させるためのモックデータで表示しています。</p>',
    mainVisual: {
      url:
        'https://images.microcms-assets.io/assets/71827cdd928b42fbab94cd30dfbc2a85/1dd63bd0bb9c4345bb4e567fc68add4d/draftlint-logo.png',
      height: 480,
      width: 800
    }
  },
  {
    id: 'docs',
    createdAt: '2021-02-18T04:07:19.618Z',
    updatedAt: '2021-02-27T10:08:08.614Z',
    publishedAt: '2021-02-18T04:07:19.618Z',
    revisedAt: '2021-02-26T10:22:31.669Z',
    title: 'ドキュメント',
    mainVisual: {
      url:
        'https://images.microcms-assets.io/assets/71827cdd928b42fbab94cd30dfbc2a85/1dd63bd0bb9c4345bb4e567fc68add4d/draftlint-logo.png',
      height: 480,
      width: 800
    }
  },
  {
    id: 'about',
    createdAt: '2021-02-26T09:42:35.195Z',
    updatedAt: '2021-02-27T10:08:02.910Z',
    publishedAt: '2021-02-26T09:51:44.127Z',
    revisedAt: '2021-02-26T14:14:07.515Z',
    title: 'About draftlint',
    mainVisual: {
      url:
        'https://images.microcms-assets.io/assets/71827cdd928b42fbab94cd30dfbc2a85/1dd63bd0bb9c4345bb4e567fc68add4d/draftlint-logo.png',
      height: 480,
      width: 800
    }
  }
];
export const mockDataPages: PagesContents = {
  contents: mockDataPagesContents,
  totalCount: mockDataPagesContents.length,
  offset: 0,
  limit: 120000
};

export const mockDataPagesList: PagesList = {
  ...mockDataPages,
  contents: mockDataPages.contents.map((v) => ({
    ...v,
    html: undefined
  }))
};

export const mockDataPagesIds = {
  ...mockDataPages,
  contents: mockDataPages.contents.map(({ id }) => ({ id }))
};

const mockDataDocsContents: PagesContents['contents'] = [
  {
    id: 'try-it',
    createdAt: '2021-02-26T09:42:35.195Z',
    updatedAt: '2021-02-27T10:08:02.910Z',
    publishedAt: '2021-02-26T09:51:44.127Z',
    revisedAt: '2021-02-26T14:14:07.515Z',
    title: 'プレビューモードを試す',
    html:
      process.env.NODE_ENV === 'development'
        ? require('fs')
            .readFileSync('docs/try-it.html')
            .toString('utf-8')
            .replace(/\n/g, '')
        : '',
    mainVisual: {
      url:
        'https://images.microcms-assets.io/assets/71827cdd928b42fbab94cd30dfbc2a85/1dd63bd0bb9c4345bb4e567fc68add4d/draftlint-logo.png',
      height: 480,
      width: 800
    }
  }
];
export const mockDataDocs: PagesContents = {
  contents: mockDataDocsContents,
  totalCount: mockDataDocsContents.length,
  offset: 0,
  limit: 120000
};

export const mockDataDocsList: PagesList = {
  ...mockDataDocs,
  contents: mockDataDocs.contents.map((v) => ({
    ...v,
    html: undefined
  }))
};

export const mockDataDocsIds = {
  ...mockDataDocs,
  contents: mockDataDocs.contents.map(({ id }) => ({ id }))
};
