import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from './Link';
import { pruneClasses } from '../utils/classes';

const useStyles = makeStyles(() => ({
  'DescList-root': {},
  'DescList-term': { color: 'inherit' },
  'DescList-description': { color: 'inherit' },
  'DescList-description-link': { color: 'inherit' }
}));
const classNames = [
  'DescList-root',
  'DescList-term',
  'DescList-description',
  'DescList-description-link'
];

type Props = {
  items: { term: string; descs: { label: string; href?: string }[] }[];
  classes?: { [key: string]: string };
};

const DescList = ({ items, classes: inClasses }: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  return (
    <dl className={classes['DescList-root']}>
      {items.map((item, i) => {
        return (
          <div key={`${item.term}:${i}`}>
            <Typography
              // key={`${item.term}:${i}`}
              component="dt"
              variant="body1"
              className={classes['DescList-term']}
            >
              {item.term}
            </Typography>
            {item.descs.map((desc, ii) =>
              desc.href ? (
                <dd
                  key={`${item.term}:${i}:${ii}`}
                  className={classes['DescList-description']}
                >
                  <Typography
                    className={classes['DescList-description-link']}
                    component={Link}
                    href={desc.href}
                  >
                    {desc.label}
                  </Typography>
                </dd>
              ) : (
                <dd
                  key={`${item.term}:${i}:${ii}`}
                  className={classes['DescList-description']}
                >
                  <Typography>{desc.label}</Typography>
                </dd>
              )
            )}
          </div>
        );
      })}
    </dl>
  );
};

export default DescList;
