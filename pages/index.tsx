import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
// import { makeStyles } from '@material-ui/core';
import Layout from '../components/Layout';
import List from '../components/List';
// import Typography from '@material-ui/core/Typography';
import { PagesList } from '../types/client/contentTypes';
import { PageData } from '../types/pageTypes';
import { getSortedPagesData, getPagesData } from '../lib/pages';

// const useStyles = makeStyles(() => ({}));

type Props = {
  pageData: PageData;
  items: PagesList;
};

const IndexPage = ({ pageData, items }: Props) => {
  // const classes = useStyles();
  if (pageData === undefined || !pageData.title) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout
      apiName={'pages'}
      {...pageData}
      notification={pageData.notification}
    >
      <section>
        <List items={items} />
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const pageData = await getPagesData('pages', {
    ...context,
    params: { id: 'home' }
  });
  const items = await getSortedPagesData('docs', {
    filters: 'displayOnIndexPage[equals]true'
  });
  return { props: { pageData, items } };
};

export default IndexPage;
