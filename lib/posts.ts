import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export async function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);

  let allPostsData = [];

  for (let i = 0; i < fileNames.length; i += 1) {
    const slug = fileNames[i].replace(/\.md$/, "");
    const post = await getPostData(slug);
    allPostsData.push(post);
  }

  return allPostsData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName: string) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, "")
      }
    };
  });
}

export async function getPostData(slug: string) {
  const date = slug.match(/\d{4}-\d{2}-\d{2}/)[0];

  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    date,
    contentHtml,
    ...matterResult.data
  };
}
