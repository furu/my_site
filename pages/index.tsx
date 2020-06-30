import Link from "next/link";
import Layout from "../components/layout";

export default () => {
  return (
    <Layout>
      <header>
        <h1>49.212.143.129</h1>
      </header>

      <h2>Contents</h2>
      <ul>
        <li>
          <Link href="/log">
            <a>Log</a>
          </Link>
        </li>
        <li>
          <a href="https://nakiroku.tfrkd.org/" target="_blank">
            nakiroku
          </a>{" "}
          -{" "}
          <a href="https://github.com/furu/nakiroku" target="_blank">
            source code
          </a>
        </li>
        <li>
          <a href="https://speakerdeck.com/pecosantoyobe" target="_blank">
            My Presentations
          </a>{" "}
          on{" "}
          <a href="https://speakerdeck.com/" target="_blank">
            Speaker Deck
          </a>
        </li>
      </ul>

      <h2>Profile</h2>
      <ul>
        <li>
          Twitter:{" "}
          <a href="https://twitter.com/pecosantoyobe" target="_blank">
            @pecosantoyobe
          </a>
        </li>
        <li>
          GitHub:{" "}
          <a href="https://github.com/furu" target="_blank">
            furu
          </a>
        </li>
      </ul>
    </Layout>
  );
};
