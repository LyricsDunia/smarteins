import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import fm from 'front-matter';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({ metadata: {}, content: '' });
  const [error, setError] = useState(null);
  const [viewCount, setViewCount] = useState(0);
  const hasTrackedView = useRef(false); // ✅ Track if view was counted

  useEffect(() => {
    const loadPost = async () => {
      try {
        const modules = import.meta.glob('../src/content/*.md', { as: 'raw', eager: false });
        const lookingFor = `../src/content/${slug}.md`;

        if (modules[lookingFor]) {
          const text = await modules[lookingFor]();
          const parsed = fm(text);
          setPost({ 
            metadata: parsed.attributes, 
            content: parsed.body 
          });
          
          // ✅ Only track view once per component mount
          if (!hasTrackedView.current) {
            const viewKey = `blog_views_${slug}`;
            const currentViews = parseInt(localStorage.getItem(viewKey) || '0');
            const newViews = currentViews + 1;
            localStorage.setItem(viewKey, newViews.toString());
            setViewCount(newViews);
            hasTrackedView.current = true; // Mark as tracked
          } else {
            // Just load the existing count
            const viewKey = `blog_views_${slug}`;
            const currentViews = parseInt(localStorage.getItem(viewKey) || '0');
            setViewCount(currentViews);
          }
          
          setError(null);
        } else {
          throw new Error(`Blog post "${slug}" not found`);
        }
      } catch (err) {
        console.error("Markdown Load Error:", err);
        setError(err.message);
      }
    };

    if (slug) {
      loadPost();
    }
    
    // ✅ Reset tracking flag when slug changes
    return () => {
      hasTrackedView.current = false;
    };
  }, [slug]);

  if (error) {
    return (
      <div className="p-10 text-red-600 bg-red-50 border border-red-200 rounded m-5">
        <h2 className="font-bold text-xl mb-2">Blog Post Not Found</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto p-8 bg-white my-10 border border-gray-100 rounded-xl shadow-sm">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          {post.metadata.title || "Untitled"}
        </h1>
        <div className="text-sm text-gray-500 flex items-center gap-4 flex-wrap">
          {post.metadata.date && <span>📅 {post.metadata.date}</span>}
          {post.metadata.author && <span>✍️ {post.metadata.author}</span>}
          <span className="flex items-center gap-1">
            👁️ {viewCount.toLocaleString()} {viewCount === 1 ? 'view' : 'views'}
          </span>
        </div>
      </header>
      
      <div className="prose prose-blue lg:prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPost;