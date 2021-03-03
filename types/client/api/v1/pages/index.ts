import { mockMethods } from 'aspida-mock';
import { PagesContents, PagesList, PagesIds } from '../../../contentTypes';
import { GetFieldsIdQuery, GetPagesItemQuery } from '../../../queryTypes';
import { mockDataPages } from '../../../mockData';

export type Methods = {
  get: {
    resBody: PagesContents;
    polymorph: [
      {
        query: GetFieldsIdQuery;
        resBody: PagesIds;
      },
      {
        query: GetPagesItemQuery;
        resBody: PagesList;
      }
    ];
  };
};

// mock も production のコードに残る?
// polymoprh 用のデータは middleware に記述
export default mockMethods<Methods>({
  get: () => {
    return {
      status: 200,
      resHeaders: {},
      resBody: mockDataPages
    };
  }
});
