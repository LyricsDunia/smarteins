import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fm from 'front-matter';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAllPosts = async () => {
      try {
        const modules = import.meta.glob('../src/content/*.md', { as: 'raw', eager: true });
        
        const postsData = Object.entries(modules).map(([path, content]) => {
          const parsed = fm(content);
          const slug = path.replace('../src/content/', '').replace('.md', '');
          
          // Get view count from localStorage
          const viewKey = `blog_views_${slug}`;
          const views = parseInt(localStorage.getItem(viewKey) || '0');
          
          return {
            slug,
            title: parsed.attributes.title || slug,
            date: parsed.attributes.date || '',
            author: parsed.attributes.author || '',
            excerpt: parsed.attributes.excerpt || parsed.attributes.description || '',
            views: views,
          };
        });

        // Sort by date (newest first)
        postsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setPosts(postsData);
      } catch (err) {
        console.error("Error loading blog posts:", err);
        setError("Failed to load blog posts");
      }
    };

    loadAllPosts();
  }, []);

  if (error) {
    return (
      <div className="p-10 text-red-600 bg-red-50 border border-red-200 rounded m-5">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 my-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog Posts</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-600">No blog posts found. Add .md files to src/content/</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article 
              key={post.slug}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
            >
              <Link to={`/blog/${post.slug}`} className="group">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                  {post.title}
                </h2>
                <div className="text-sm text-gray-500 mb-3 flex items-center gap-4 flex-wrap">
                  {post.date && <span>📅 {post.date}</span>}
                  {post.author && <span>✍️ {post.author}</span>}
                  <span>👁️ {post.views.toLocaleString()} {post.views === 1 ? 'view' : 'views'}</span>
                </div>
                {post.excerpt && (
                  <p className="text-gray-700">{post.excerpt}</p>
                )}
                <span className="inline-block mt-3 text-blue-600 font-medium group-hover:underline">
                  Read more →
                </span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;