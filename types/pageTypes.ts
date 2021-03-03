export type PageData = {
  id: string;
  updated: string; // この段階では Date にはしない
  notification?: {
    title: string;
    messageHtml: string;
    serverity: 'info' | 'warning' | 'alert';
  };
  title: string;
  articleTitle: string;
  html: string;
  mainVisual: string;
  description: string;
};

export const blankPageData = (): PageData => ({
  id: '',
  updated: '',
  title: '',
  articleTitle: '',
  html: '',
  mainVisual: '',
  description: ''
});
