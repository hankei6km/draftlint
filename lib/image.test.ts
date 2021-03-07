import { FetchMock } from 'jest-fetch-mock';
import { imageInfo } from './image';
import { queryParams } from '../test/testUtils';
// https://github.com/jefflau/jest-fetch-mock/issues/83
const fetchMock = fetch as FetchMock;
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('getSortedPagesData()', () => {
  it('should returns image info', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        PixelWidth: 1000,
        PixelHeight: 500
      })
    );
    const res = await imageInfo('test');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toEqual('test?fm=json');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      fm: 'json'
    });
    expect(res).toStrictEqual({ url: 'test', width: 1000, height: 500 });
  });
  it('should adjust rotation', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        TIFF: {},
        Orientation: 6,
        PixelWidth: 1000,
        PixelHeight: 500
      })
    );
    const res = await imageInfo('test');
    expect(res).toStrictEqual({ url: 'test', width: 500, height: 1000 });
  });
});
