import { NextRouter } from 'next/router';
import { NextApiRequest, NextApiResponse } from 'next';
// import { CreateMockRouterOptions } from 'next-router-provider';

export function mockRouter(): NextRouter {
  // https://github.com/vercel/next.js/issues/16864
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    // push: jest.fn(),
    push: jest.fn().mockImplementation(() => Promise.resolve()),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined), // This one fixed it for me
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn()
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true
  };
}

export function mockImage(srcSetter = jest.fn(), addEventListener = jest.fn()) {
  const orgImage = global.Image;
  return jest.fn().mockImplementation((w: number, h: number) => {
    const image = new orgImage(w, h);
    Object.defineProperty(image, 'src', {
      set: srcSetter,
      get: () => undefined
    });
    image.addEventListener = addEventListener;
    return image;
  });
}

export function mockNextApiRequest(query: NextApiRequest['query']) {
  return jest.fn().mockImplementation(() => {
    return ({
      _mockName: 'mockNextApiRequest',
      query: query
    } as unknown) as NextApiRequest;
  })();
}
export function mockNextApiResponse() {
  const mock = {
    end: jest.fn(),
    json: jest.fn(),
    status: jest.fn(),
    writeHead: jest.fn(),
    clearPreviewData: jest.fn(),
    setPreviewData: jest.fn()
  };
  const res = jest.fn().mockImplementation(() => {
    const o = {
      end: mock.end.mockReturnValue(mock),
      json: mock.json.mockReturnValue(mock),
      status: mock.status.mockReturnValue(mock),
      writeHead: mock.writeHead.mockReturnValue(mock),
      clearPreviewData: mock.clearPreviewData.mockReturnValue(mock),
      setPreviewData: mock.setPreviewData.mockReturnValue(mock)
    };
    const res = ({
      _mockName: 'mockNextApiResponse',
      ...o
    } as unknown) as NextApiResponse;
    return res;
  })();
  return res;
}

export function queryParams(src?: string): { [key: string]: string } {
  const q = new URLSearchParams(src ? src.split('?', 2)[1] : '');
  const ret: { [key: string]: string } = {};
  q.forEach((v, k) => {
    ret[k] = v;
  });
  return ret;
}
