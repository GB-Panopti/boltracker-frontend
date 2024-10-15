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
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.category}</span>
            </div>
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: content }} 
            />
          </div>
        </article>
      </main>
    </div>
  );
}
