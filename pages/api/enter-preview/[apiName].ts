import { NextApiRequest, NextApiResponse } from 'next';
import { previewSetupHandler } from '../../../lib/preview';

// apiName によって、どの API のプレビューか決定する..
// apiName で動的に扱うにはリダイレクト先をどこかで決める必要がある。
// と、思ったのだが、やはり分ける?

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  let location = '';
  switch (req.query.apiName) {
    case 'pages':
      // pages では slug は実質的には使わない(問題出るか?)
      // slug が指す id が含まれる location へリダイレクトさせる
      switch (id) {
        case 'home':
          location = `/`;
          break;
        case 'dosc':
          location = `/dosc/`;
          break;
      }
      break;
    case 'docs':
      location = `/${req.query.apiName}/${id}`;
      break;
  }
  if (location) {
    res.writeHead(307, { Location: location });
    return res.end('Preview mode enabled');
  }

  return res.status(404).end();
};

export default previewSetupHandler(handler);
