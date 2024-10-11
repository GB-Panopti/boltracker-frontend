import { LandingHeader } from '@/components/ui/landing/header';
import { getBlogPost, getBlogPosts } from '@/lib/blogPosts';
import { marked } from 'marked';

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: BlogPostProps) {
  const post = getBlogPost(params.slug);
  const content = marked(post.content);

  return (
    <>
      <article className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-4">
        <span>{post.date}</span> • <span>{post.category}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </>
  );
}
