import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../components/layout";
import Date from "../components/date";
import { getSortedPostsData } from "../lib/posts";

export default ({ allPostsData }) => {
  return (
    <Layout>
      <header>
        <h1>Log ({allPostsData.length})</h1>
      </header>

      <ul>
        {allPostsData.map(({ slug, date, title }) => (
          <li key={slug}>
            <Link href="/log/[slug]" as={`/log/${slug}`}>
              <a>{title}</a>
            </Link>{" "}
            - <Date dateString={date} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
};
