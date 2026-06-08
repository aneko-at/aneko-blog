import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../../utils/posts';

export const GET: APIRoute = async () => {
  const allPosts = await getPublishedPosts();

  const searchData = allPosts.map(post => ({
    title: post.data.title,
    description: post.data.description,
    slug: post.id,
    tags: post.data.tags,
    date: post.data.pubDate.toISOString().split('T')[0],
  }));

  return new Response(JSON.stringify(searchData), {
    headers: { 'Content-Type': 'application/json' },
  });
};
