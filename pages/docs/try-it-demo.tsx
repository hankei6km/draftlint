// import { GetStaticProps } from 'next';
import { GetServerSideProps } from 'next';
import ErrorPage from 'next/error';
// import { makeStyles } from '@material-ui/core';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import { PageData } from '../../types/pageTypes';
import { getPagesData } from '../../lib/pages';

// const useStyles = makeStyles(() => ({}));

export default function DemoPage({
  pageData
}: {
  pageData: PageData;
  preview: boolean;
}) {
  // const classes = useStyles();
  if (pageData === undefined || !pageData.title) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout apiName={'docs'} {...pageData} notification={pageData.notification}>
      <Link href="/">{'Back to Home'}</Link>
    </Layout>
  );
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const pageData = await getPagesData('pages', {
//     ...context,
//     params: { id: 'docs' }
//   });
//   const items = await getSortedPagesData('docs');
//   return { props: { pageData, items } };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageData = await getPagesData('docs', {
    ...context,
    // preview mode ではなくサーバーサイドのレンダリングで preview の処理を実行.
    // 実際に preview mode を開始(cookie に previewData セット)しても実害はなさそうだが、
    // 外から開始のリンク踏めるのもどうかと思ったので.
    params: { id: 'try-it', previewDemo: 'true' }
  });
  return {
    props: {
      pageData,
      preview: context.preview ? context.preview : null
    }
  };
};
