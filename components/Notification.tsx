import React, { useEffect, useState, ElementType } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { TypographyProps, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSnackbar } from 'notistack';

export type NotificationComponent = {
  notificationComponent: React.ElementType<React.HTMLAttributes<HTMLElement>>;
  notificationTitleComponent: ElementType<any>;
};
export type NotificationVariant = {
  notificationTitleVariant: TypographyProps['variant'];
};

const useMessageStyles = makeStyles((theme) => ({
  'Notification-body': {
    flexGrow: 1
  },
  'Notification-title': {
    color: 'inherit'
  },
  'Notification-message': {
    ...theme.typography.body1,
    maxWidth: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    '& a': {
      color: 'inherit'
    }
  },
  'Notification-simple-message': {
    ...theme.typography.body1,
    '& a': {
      color: 'inherit'
    }
  }
}));

type MessageProps = {
  title: string;
  messageHtml: string;
};

function Message({ title, messageHtml }: MessageProps) {
  const classes = useMessageStyles({});
  const [messageOpened, setMessageOpened] = useState(false);

  if (title) {
    return (
      <Box className={classes['Notification-body']}>
        <Typography component="h2" variant="h5">
          <Button
            // component={component.notificationTitleComponent}
            // variant={variant.notificationTitleVariant}
            className={classes['Notification-title']}
            onClick={() => {
              setMessageOpened(!messageOpened);
            }}
            endIcon={
              <ExpandMoreIcon
                style={{
                  transform: messageOpened ? 'rotate(180deg)' : ''
                }}
              />
            }
          >
            {title}
          </Button>
        </Typography>
        <Collapse in={messageOpened}>
          <div
            className={classes['Notification-message']}
            dangerouslySetInnerHTML={{ __html: messageHtml }}
          />
        </Collapse>
      </Box>
    );
  }
  return (
    <div
      className={classes['Notification-simple-message']}
      dangerouslySetInnerHTML={{ __html: messageHtml }}
    />
  );
}
const useContentStyles = makeStyles((theme) => ({
  // _app.tsx で SnackbarProvider の className を上書きすることで
  // container 側の幅を広げている.
  'Notification-root': {
    display: 'flex',
    alignItems: 'start',
    padding: theme.spacing(1),
    color: ({ serverity }: ContentProps) =>
      serverity === 'info'
        ? theme.palette.info.contrastText
        : serverity === 'warning'
        ? theme.palette.warning.contrastText
        : theme.palette.error.contrastText,
    backgroundColor: ({ serverity }: ContentProps) =>
      serverity === 'info'
        ? theme.palette.info.main
        : serverity === 'warning'
        ? theme.palette.warning.main
        : theme.palette.error.main
  },
  'Notification-close': {
    padding: theme.spacing(1)
  }
}));

type ContentProps = {
  serverity: 'info' | 'warning' | 'alert';
  onClose: () => void;
} & MessageProps;

function Content(props: ContentProps) {
  const { onClose, ...others } = props;
  const classes = useContentStyles({ ...props });
  return (
    <Paper className={classes['Notification-root']} role="alert">
      <Message {...others} />
      <IconButton
        aria-label="close nofification"
        color="inherit"
        className={classes['Notification-close']}
        onClick={() => {
          onClose();
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
}

const Notification = (others: Omit<ContentProps, 'onClose'> & {}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    enqueueSnackbar(`${others.title}:${others.messageHtml}`, {
      preventDuplicate: true,
      persist: true,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      content: (key, _message) => (
        <div id={`${key}`}>
          <Content
            {...others}
            onClose={() => {
              closeSnackbar(key);
            }}
          />
        </div>
      )
    });
  }, [enqueueSnackbar, closeSnackbar, others]);
  return <></>;
};

export default Notification;
