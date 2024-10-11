import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  content: string;
}

const postsContext = require.context('../app/(public)/blog/posts', false, /\.md$/);

export function getBlogPosts(): BlogPost[] {
  return postsContext.keys().map((filename) => {
    const slug = filename.replace(/^\.\//, '').replace(/\.md$/, '');
    const fileContents = postsContext(filename).default;
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      category: data.category,
      content,
    };
  });
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find(post => post.slug === slug);
}