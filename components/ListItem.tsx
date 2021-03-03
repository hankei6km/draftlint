import React from 'react';
import Link from '../components/Link';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { PagesIndex } from '../types/client/contentTypes';

type Props = {
  data: PagesIndex;
};

const ListItem = ({ data }: Props) => (
  <GridListTile>
    <Link href="/docs/[id]" as={`/docs/${data.id}`}>
      {data.title}
    </Link>
    <GridListTileBar title={data.title} titlePosition="top" />
  </GridListTile>
);

export default ListItem;
