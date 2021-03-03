import React from 'react';
// import NoSsr from '@material-ui/core/NoSsr';
import { parseISO, format } from 'date-fns';

const dateFormatString = 'yyyy-MM-dd';
// const dateFormatString = 'yyyy-MM-dd HH:mm';

type Props = {
  dateString: string;
  dateFormat?: string;
};
export default function Date({
  dateString,
  dateFormat = dateFormatString
}: Props) {
  const date = parseISO(dateString);
  // content 側は UTC、format でブラウザ側の tz を利用(たぶん)
  // server と client の設定によっては、
  // デバッグ中に "Warning: Text content did not match." が表示されることがある
  // NoSsr を使うと空白が目立つ.
  // とりあえず、親の方で Skeleton を使う.
  // 正しい対応方法は?
  return <time dateTime={dateString}>{format(date, dateFormat)}</time>;
}
