import { mockMiddleware } from 'aspida-mock';
import {
  mockDataPagesIds,
  mockDataPagesList,
  mockDataDocsIds,
  mockDataDocsList
} from './mockData';

// polymorph 対応
export default mockMiddleware([
  (req, res, next) => {
    if (
      req.path === '/api/v1/pages' &&
      req.method === 'GET' &&
      req.query?.fields === 'id'
    ) {
      res({
        status: 200,
        resBody: {
          ...mockDataPagesIds
        }
      });
      return;
    }
    next();
  },
  (req, res, next) => {
    if (
      req.path === '/api/v1/pages' &&
      req.method === 'GET' &&
      req.query?.fields === 'id,createdAt,updatedAt,publishedAt,revisedAt,title'
    ) {
      res({
        status: 200,
        resBody: {
          ...mockDataPagesList
        }
      });
      return;
    }
    next();
  },
  (req, res, next) => {
    if (
      req.path === '/api/v1/docs' &&
      req.method === 'GET' &&
      req.query?.fields === 'id'
    ) {
      res({
        status: 200,
        resBody: {
          ...mockDataDocsIds
        }
      });
      return;
    }
    next();
  },
  (req, res, next) => {
    if (
      req.path === '/api/v1/docs' &&
      req.method === 'GET' &&
      req.query?.fields ===
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,html,mainVisual'
    ) {
      res({
        status: 200,
        resBody: {
          ...mockDataDocsList
        }
      });
      return;
    }
    next();
  }
]);
