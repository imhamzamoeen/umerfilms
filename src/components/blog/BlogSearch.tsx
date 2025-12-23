'use client';

import { useState, useEffect } from 'react';
import { BlogPost, BlogCategory, getAllCategories } from '@/data/blog';
import BlogCard from '@/components/home/BlogCard';

interface BlogSearchProps {
    initialPosts: BlogPost[];
}

export default function BlogSearch({ initialPosts }: BlogSearchProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All');
    const [filteredPosts, setFilteredPosts] = useState(initialPosts);
    const categories = getAllCategories();

    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = initialPosts.filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.tags?.some((tag) => tag.toLowerCase().includes(query));

            const matchesCategory =
                selectedCategory === 'All' || post.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
        setFilteredPosts(filtered);
    }, [searchQuery, selectedCategory, initialPosts]);

    return (
        <div className="container mx-auto px-4 pb-24">
            {/* Search and Filter Controls */}
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${selectedCategory === 'All'
                                ? 'bg-[#8B5CF6] text-white'
                                : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
                            }`}
                    >
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${selectedCategory === category
                                    ? 'bg-[#8B5CF6] text-white'
                                    : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-64 lg:w-80">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-[#2a2a2a] bg-[#111] py-2.5 pl-4 pr-10 text-sm text-white placeholder-gray-500 focus:border-[#8B5CF6] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                    <svg
                        className="absolute right-3 top-2.5 h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>

            {/* Grid */}
            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center">
                    <p className="text-xl text-gray-400">No interesting stories found matching your criteria.</p>
                    <button
                        onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                        className="mt-4 text-[#8B5CF6] hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
