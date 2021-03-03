import { ParsedUrlQuery } from 'querystring';
import { GetStaticPropsContext } from 'next';
import client, { fetchConfig } from './client';
import {
  PagesList,
  PagesIds,
  // PagesContent,
  blankPagesList
  // blankPageContent
} from '../types/client/contentTypes';
import { GetQuery, GetContentQuery } from '../types/client/queryTypes';
import { PageData, blankPageData } from '../types/pageTypes';
import { applyPreviewDataToIdQuery } from './preview';
import { getTitleAndContent } from './html';
import { textLintInHtml } from './draftlint';
import { rewrite, rewriteCode } from './rewrite';
import { ApiNameArticle } from '../types/apiName';
import { getTextlintKernelOptions } from '../utils/textlint';
// import { getTextlintKernelOptions } from '../utils/textlint';

const allIdsLimit = 120000;
// const itemsPerPage = 10;

export async function getSortedPagesData(
  apiName: ApiNameArticle,
  query: GetQuery = {}
): Promise<PagesList> {
  try {
    const res = await client[apiName].get({
      query: {
        ...query,
        fields:
          'id,createdAt,updatedAt,publishedAt,revisedAt,title,html,mainVisual'
      },
      config: fetchConfig
    });
    return res.body;
  } catch (err) {
    // res.status = 404 などでも throw される(試した限りでは)
    // res.status を知る方法は?
    console.error(`getSortedPagesData error: ${err.name}`);
  }
  return blankPagesList();
}

export async function getPagesIdsList(
  apiName: ApiNameArticle,
  query: GetQuery = {}
): Promise<PagesIds> {
  try {
    const res = await client[apiName].get({
      query: {
        ...query,
        fields: 'id'
      },
      config: fetchConfig
    });
    return res.body;
  } catch (err) {
    console.error(`getPagesIdsList error: ${err.name}`);
  }
  return blankPagesList();
}

export async function getAllPagesIds(
  apiName: ApiNameArticle,
  query: GetQuery = {}
) {
  try {
    return (
      await getPagesIdsList(apiName, {
        ...query,
        limit: query.limit !== undefined ? query.limit : allIdsLimit
      })
    ).contents.map(({ id }) => id);
  } catch (err) {
    console.error(`getAllPagesIds error: ${err.name}`);
  }
  return [];
}

export async function getPagesData(
  apiName: ApiNameArticle,
  {
    params = { id: '' },
    preview = false,
    previewData = {}
  }: GetStaticPropsContext<ParsedUrlQuery>
): Promise<PageData> {
  try {
    const [id, query] = applyPreviewDataToIdQuery<GetContentQuery>(
      preview,
      previewData,
      apiName,
      params.id as string,
      {
        fields:
          'id,createdAt,updatedAt,publishedAt,revisedAt,title,description,html,mainVisual'
      }
    );
    const res = await client[apiName]._id(id).$get({
      query: query,
      config: fetchConfig
    });
    const { articleTitle, html } = getTitleAndContent(
      res.title,
      res.html || ''
    );
    const ret: PageData = {
      ...blankPageData(),
      id: res.id,
      updated: res.updatedAt,
      title: res.title,
      articleTitle,
      html: rewrite(html).use(rewriteCode()).run(),
      mainVisual: res.mainVisual?.url || '',
      description: res.description || ''
    };
    // params.previewDemo は boolean ではない
    if (preview || params.previewDemo === 'true') {
      ret.notification = {
        title: '[DRAFT]',
        messageHtml: '<p><a href="/api/exit-preview">プレビュー終了</a></p>',
        serverity: 'info'
      };
      const { html, messages, list } = await textLintInHtml(
        ret.html,
        params.previewDemo !== 'true'
          ? undefined
          : getTextlintKernelOptions({
              presets: [
                {
                  presetId: 'ja-technical-writing',
                  preset: require('textlint-rule-preset-ja-technical-writing')
                }
              ],
              rules: {
                ruleId: 'ja-space-between-half-and-full-width',
                rule: require('textlint-rule-ja-space-between-half-and-full-width'),
                options: {
                  space: 'always'
                }
              }
            })
      );
      if (messages.length > 0) {
        ret.html = html;
        ret.notification.messageHtml = `${ret.notification.messageHtml}${list}`;
        ret.notification.serverity = 'warning';
      }
    }
    return ret;
  } catch (err) {
    // console.error(`getPagesData error: ${err.name}`);
    console.error(`getPagesData error: ${err}`);
  }
  return blankPageData();
}
