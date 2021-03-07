export type ImageInfo = {
  url: string;
  width: number;
  height: number;
};

const fmJsonQuery = (() => {
  const q = new URLSearchParams('');
  q.append('fm', 'json');
  return q.toString();
})();

export async function imageInfo(imageUrl: string): Promise<ImageInfo> {
  const res = await fetch(`${imageUrl}?${fmJsonQuery}`).catch((err) => {
    console.error(err);
    throw new Error(err);
  });
  const info = await res.json();
  const imageInfo: ImageInfo = {
    url: imageUrl,
    width: 0,
    height: 0
  };
  // この辺の詳細な仕様は不明なので様子見.
  // Orientationについて
  // イメージセンサーからのビットマップデータの保存方向(軸)とカメラの向きの関係性?
  // 背面カメラ
  // スマホを通常の持ち方にする(縦長) : 6
  // スマホを左に倒す(横長) : 1
  // スマホを右に倒す(横長) : 3
  // スマホをさかさまにする(縦長) : 8
  // 前面カメラ
  // スマホを通常の持ち方にする(縦長) : 8
  // スマホを左に倒す(背面カメラの向きに直すと右に倒す)(横長) : 3
  // あとの２方向は省略.
  // ここで必要なのは縦長か横長かの情報なので、
  // 以下のよれば 6 以上なら縦横を入れ替えた方がよさそう
  // https://github.com/blueimp/JavaScript-Load-Image/blob/master/js/load-image-orientation.js
  if (info.TIFF && info.Orientation && info.Orientation >= 6) {
    // アスペクト比的なものも保存しておく?
    imageInfo.width = info.PixelHeight;
    imageInfo.height = info.PixelWidth;
  } else {
    imageInfo.width = info.PixelWidth;
    imageInfo.height = info.PixelHeight;
  }

  return imageInfo;
}
