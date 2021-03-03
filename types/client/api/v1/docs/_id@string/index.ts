import { PagesContent } from '../../../../contentTypes';
import { GetContentQuery } from '../../../../queryTypes';
import { mockMethods } from 'aspida-mock';
import { mockDataDocs } from '../../../../mockData';

export type Methods = {
  get: {
    query?: GetContentQuery;
    resBody: PagesContent;
  };
};

export default mockMethods<Methods>({
  get: ({ values }) => {
    const contents = mockDataDocs.contents;
    // stub 使いたいが、どの辺が production に残るかわからないので
    // とりあえずコードを書く.
    const idx = contents.findIndex(({ id }) => id === values.id);
    if (idx < 0) {
      return {
        status: 404,
        resHeaders: {},
        resBody: {}
      };
    }
    const resBody = { ...contents[idx] };
    if (
      process.env.NODE_ENV === 'development' &&
      (resBody.id === 'try-it' || resBody.id === 'try-it-demo')
    ) {
      resBody.html = require('fs')
        .readFileSync('docs/try-it.html')
        .toString('utf-8')
        .replace(/\n/g, '');
    }
    return {
      status: 200,
      resHeaders: {},
      resBody
    };
  }
});
