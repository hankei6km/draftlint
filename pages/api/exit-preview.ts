import { NextApiRequest, NextApiResponse } from 'next';

// enter のように apiName で分ける?
export default (_: NextApiRequest, res: NextApiResponse) => {
  // https://microcms.io/blog/nextjs-preview-mode
  res.clearPreviewData();

  // https://github.com/vercel/next.js/blob/b41f9baaa413d5dac29faf107663214c0923c8bd/examples/cms-contentful/pages/api/exit-preview.js
  // Redirect the user back to the index page.
  // どこにリダイレクトするのが良い?
  res.writeHead(307, { Location: '/' });
  res.end();
};
