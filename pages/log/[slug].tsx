import { GetStaticProps, GetStaticPaths } from "next";
import { getPostData, getAllPostSlugs } from "../../lib/posts";
import Head from "next/head";
import Layout from "../../components/layout";
import Date from "../../components/date";

export default ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title} | 49.212.143.129</title>
      </Head>
      <article>
        <header>
          <h1>{postData.title}</h1>
        </header>
        <Date dateString={postData.date} />
        <section
          className="content"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.slug as string);

  return {
    props: {
      postData
    }
  };
};
