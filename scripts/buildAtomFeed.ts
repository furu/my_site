import fs from "fs";
import path from "path";
import { getSortedPostsData } from "../lib/posts";
import { Feed } from "feed";

/*
function escape(string: string): string {
  return string
    .replace(/&/g, "&amp;")
    .replace(/'/g, "&apos;")
    .replace(/"/g, "&quot;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;");
}
*/

/*
async function buildAtomFeed() {
  const posts = await getSortedPostsData();

  const latestPost: any = posts[0];

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>https://tfrkd.org/log</id>
  <title>log - 49.212.143.129</title>
  <author>
    <name>furu</name>
    <email>ba09219@gmail.com</email>
  </author>
  <updated>${new Date(latestPost.date).toISOString()}</updated>
  <link type="application/atom+xml" rel="self" href="https://tfrkd.org/log/feed.atom"/>
  <link rel="hub" href="http://log-tfrkd.superfeedr.com/"/>
  ${posts
    .map((post: any) => {
      return `<entry>
    <id>https://tfrkd.org/log/${post.slug}</id>
    <title>${escape(post.title)}</title>
    <link type="text/html" rel="alternate" href="https://tfrkd.org/log/${
      post.slug
    }"/>
    <updated>${new Date(post.date).toISOString()}</updated>
    <content type="html">${escape(post.contentHtml)}</content>
    </entry>`;
    })
    .join("\n")}
</feed>`;

  fs.writeFileSync(path.join(process.cwd(), "out/log/feed.atom"), feed);
}
*/

async function buildAtomFeed() {
  const posts = await getSortedPostsData();
  const latestPost: any = posts[0];

  const feed = new Feed({
    id: "https://tfrkd.org/log",
    title: "log - 49.212.143.129",
    author: {
      name: "furu",
      email: "ba09219@gmail.com"
    },
    updated: new Date(latestPost.date),
    link: "https://tfrkd.org/log/feed.atom",
    copyright: ""
  });

  posts.forEach((post: any) => {
    feed.addItem({
      id: `https://tfrkd.org/log/${post.slug}`,
      title: post.title,
      link: `https://tfrkd.org/log/${post.slug}`,
      date: new Date(post.date),
      content: post.contentHtml
    });
  });

  fs.writeFileSync(path.join(process.cwd(), "out/log/feed.atom"), feed.atom1());
  console.log(`Atom feed was generated to out/log/feed.atom`);
}

buildAtomFeed();
