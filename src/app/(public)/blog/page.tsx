'use client';

import { ArticleCard } from '@/components/ArticleCard';
import { LandingHeader } from '@/components/ui/landing/header';
import { getBlogPosts } from '@/lib/blogPosts';
import { useEffect, useState } from 'react';

export default function BlogPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(getBlogPosts());
    }, []);

    return (
        <>
            <LandingHeader />
            <section className="bg-white dark:bg-gray-900 mt-12">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Blog</h2>
                        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Geavanceerde strategieën voor Bol.com productonderzoek</p>
                    </div>
                    <div className="grid gap-8 lg:grid-cols-2">
                        {posts.map((post) => (
                            <ArticleCard key={post.slug} {...post} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}