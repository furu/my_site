import Head from "next/head";

export default ({ children }) => {
  return (
    <>
      <Head>
        <title>49.212.143.129</title>
      </Head>
      <div className="markdown-body">{children}</div>
    </>
  );
};
