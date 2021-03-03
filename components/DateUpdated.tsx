import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Date from './Date';
import { pruneClasses } from '../utils/classes';
// import PageContext from '../Page/Context';

type Props = {
  updated?: string;
  classes?: { [key: string]: string };
};

const useStyles = makeStyles((theme) => ({
  'DateUpdated-root': {
    display: 'flex',
    alignItems: 'center',
    minWidth: '10em',
    maxWidth: '16em',
    overflow: 'hidden'
  },
  'DateUpdated-date': {
    width: '100%',
    marginLeft: theme.spacing(1)
  }
}));
const classNames = ['DateUpdated-root', 'DateUpdated-date'];

const DateUpdated = ({ updated = '', classes: inClasses }: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  // const pageData = useContext(PageContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(typeof window === 'undefined');
  }, []);
  return (
    <Box className={classes['DateUpdated-root']}>
      <AccessTimeIcon fontSize="small" color="action" />
      <Typography
        component="div"
        variant="body2"
        className={classes['DateUpdated-date']}
      >
        {loading ? (
          <Box />
        ) : (
          <Date
            dateString={
              updated // || pageData.updated
            }
          />
        )}
      </Typography>
    </Box>
  );
};

export default DateUpdated;
