// data/blog.ts

export type BlogCategory =
  | 'Tips & Tricks'
  | 'Post-Production'
  | 'Behind the Scenes'
  | 'Equipment'
  | 'Industry Insights';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: BlogCategory;
  date: string;
  readingTime: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: '5 Tips for Cinematic Video Production',
    slug: 'cinematic-video-production-tips',
    excerpt:
      'Learn the essential techniques to elevate your video production quality. From lighting setups to camera movements, these tips will transform your footage.',
    content: `
      <p>Creating cinematic video content requires more than just a good camera. It's about understanding the craft and applying proven techniques that filmmakers have used for decades.</p>

      <h2>1. Master Your Lighting</h2>
      <p>Lighting is arguably the most important element in cinematography. The way light falls on your subject can completely change the mood and quality of your footage. Start with three-point lighting and experiment from there.</p>

      <h2>2. Use Camera Movement Purposefully</h2>
      <p>Every camera movement should serve the story. Smooth dollies, subtle pushes, and motivated pans add production value. Invest in a good gimbal or slider to achieve professional results.</p>

      <h2>3. Shoot in Log or RAW</h2>
      <p>Shooting in a flat color profile gives you maximum flexibility in post-production. You can shape the look exactly how you want it in the color grade.</p>

      <h2>4. Pay Attention to Audio</h2>
      <p>Bad audio ruins good video. Invest in quality microphones and always monitor your levels. Clean audio is just as important as beautiful visuals.</p>

      <h2>5. Tell a Story</h2>
      <p>Technical perfection means nothing without emotional connection. Every shot should contribute to the narrative you're building.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop',
    category: 'Tips & Tricks',
    date: '2024-03-15',
    readingTime: '5 min read',
    author: {
      name: 'Umer Films',
    },
    tags: ['cinematography', 'tips', 'production'],
  },
  {
    id: 'post-2',
    title: 'The Art of Color Grading in Film',
    slug: 'art-of-color-grading',
    excerpt:
      'Discover how color grading can dramatically change the mood and storytelling of your videos. A deep dive into professional color workflows.',
    content: `
      <p>Color grading is where footage transforms into cinema. It's the final creative step that unifies your visuals and sets the emotional tone of your project.</p>

      <h2>Understanding Color Theory</h2>
      <p>Before diving into software, understand the basics of color theory. Complementary colors create contrast, while analogous colors create harmony. Use this knowledge to guide your creative decisions.</p>

      <h2>The Color Grading Process</h2>
      <h3>Primary Correction</h3>
      <p>Start by balancing your footage. Correct exposure, white balance, and contrast to create a neutral starting point.</p>

      <h3>Secondary Correction</h3>
      <p>Target specific areas or colors for adjustment. This is where you shape skin tones, enhance skies, or isolate elements for creative effect.</p>

      <h3>Creative Grade</h3>
      <p>Apply your creative look. Whether it's a warm vintage feel or a cold, desaturated tone, this is where your vision comes to life.</p>

      <h2>Popular Look Styles</h2>
      <p>Teal and orange remains popular for its natural skin tone flattery. Film emulation LUTs recreate the look of classic film stocks. High contrast with lifted blacks is trending for modern commercials.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1550948537-130a1ce83314?q=80&w=2000&auto=format&fit=crop',
    category: 'Post-Production',
    date: '2024-03-08',
    readingTime: '7 min read',
    author: {
      name: 'Umer Films',
    },
    tags: ['color-grading', 'post-production', 'davinci-resolve'],
  },
  {
    id: 'post-3',
    title: 'Behind the Scenes: Wedding Filmmaking',
    slug: 'behind-scenes-wedding-filmmaking',
    excerpt:
      'An inside look at capturing the perfect wedding day moments. Learn about preparation, equipment choices, and storytelling techniques.',
    content: `
      <p>Wedding filmmaking is one of the most rewarding—and challenging—forms of video production. You get one chance to capture moments that will be treasured for generations.</p>

      <h2>Pre-Wedding Preparation</h2>
      <p>Scout the venue beforehand. Know where the best light will be, identify potential shooting locations, and plan your coverage strategy. Create a shot list but remain flexible.</p>

      <h2>Essential Equipment</h2>
      <ul>
        <li>Two camera bodies minimum (backup is crucial)</li>
        <li>Fast zoom lenses (24-70mm, 70-200mm)</li>
        <li>Prime lens for low light (35mm or 50mm f/1.4)</li>
        <li>External audio recorder and wireless lavs</li>
        <li>Monopod or gimbal for ceremony coverage</li>
      </ul>

      <h2>Capturing Authentic Moments</h2>
      <p>The best wedding films feel genuine because they capture real emotions. Don't over-direct. Observe, anticipate, and be ready when magic happens.</p>

      <h2>Telling the Story</h2>
      <p>A wedding film is more than documentation—it's storytelling. Focus on the details that make each couple unique. The way they look at each other, the tears of joy, the laughter with friends.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
    category: 'Behind the Scenes',
    date: '2024-02-28',
    readingTime: '6 min read',
    author: {
      name: 'Umer Films',
    },
    tags: ['wedding', 'behind-the-scenes', 'filmmaking'],
  },
  {
    id: 'post-4',
    title: 'Drone Cinematography: A Complete Guide',
    slug: 'drone-cinematography-guide',
    excerpt:
      'Master aerial videography with this comprehensive guide covering regulations, techniques, and creative applications for stunning drone footage.',
    content: `
      <p>Drone cinematography has revolutionized video production, making aerial shots accessible to creators at every level. Here's everything you need to know to get started.</p>

      <h2>Understanding Regulations</h2>
      <p>Before you fly, understand your local laws. In the US, the FAA requires Part 107 certification for commercial drone pilots. Many areas have no-fly zones near airports and government buildings.</p>

      <h2>Choosing Your Drone</h2>
      <p>For professional work, the DJI Mavic 3 or Inspire series are industry standards. Consider sensor size, flight time, and obstacle avoidance features when making your choice.</p>

      <h2>Essential Shots</h2>
      <h3>Reveal</h3>
      <p>Start on an object, then pull back to reveal the landscape. One of the most dramatic uses of aerial footage.</p>

      <h3>Orbit</h3>
      <p>Circle around a subject while keeping it centered. Great for showing scale and context.</p>

      <h3>Top Down</h3>
      <p>Shooting straight down creates abstract, graphic compositions that are impossible from ground level.</p>

      <h2>Post-Production Tips</h2>
      <p>Drone footage often needs stabilization and color correction. Log profiles give you room to match aerial shots with ground footage.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2000&auto=format&fit=crop',
    category: 'Equipment',
    date: '2024-02-20',
    readingTime: '8 min read',
    author: {
      name: 'Umer Films',
    },
    tags: ['drone', 'aerial', 'equipment', 'tutorials'],
  },
  {
    id: 'post-new-1',
    title: 'Authentic Storytelling: The Future of Videography in 2025',
    slug: 'authentic-storytelling-videography-2025',
    excerpt:
      'In 2025, audiences crave connection over perfection. Learn why "real" is the new "cinematic" and how to weave authentic human elements into your storytelling.',
    content: `
      <p>The landscape of videography is shifting beneath our feet. As we move into 2025, the polished, hyper-perfect commercial look is giving way to something rawer, more genuine, and infinitely more powerful: <strong>Authentic Storytelling</strong>.</p>

      <h2>The Shift to "Real"</h2>
      <p>Audiences are becoming increasingly savvy. They can spot a manufactured moment from a mile away. The trend now is to capture the "in-between" moments—the nervous laugh before a speech, the deep breath before a big jump, the messy, unscripted reality of life.</p>

      <h2>How to Capture Authenticity</h2>
      <p>Authenticity cannot be faked, but it can be facilitated. Here is how:</p>
      <ul>
        <li><strong>Build Rapport:</strong> Spend time with your subjects without the camera rolling. Let them trust you.</li>
        <li><strong>Keep Rolling:</strong> Don't cut immediately after the action. Often, the most genuine reaction happens after the "performance" is over.</li>
        <li><strong>Embrace Imperfection:</strong> A slightly shaky handheld shot that captures a raw emotion is worth infinitely more than a perfectly stabilized but soulless gimbal shot.</li>
      </ul>

      <h2>The Technical Side of "Raw"</h2>
      <p>Creating an authentic look doesn't mean ignoring quality. It means using your tools to support the narrative. Use natural lighting where possible. Choose lenses that feel intimate, like a 35mm or 50mm, which replicate the human field of view. Grade your footage to feel grounded and organic, rather than over-stylized.</p>

      <p>In 2025, your job isn't just to make things look good—it's to make them <em>feel</em> true.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2000&auto=format&fit=crop',
    category: 'Industry Insights',
    date: '2024-12-20',
    readingTime: '6 min read',
    author: {
      name: 'Umer Naeem',
    },
    tags: ['storytelling', 'authenticity', 'trends', '2025'],
  },
  {
    id: 'post-new-2',
    title: 'Short-Form Mastery: Capturing Attention in Seconds',
    slug: 'short-form-video-mastery-2025',
    excerpt:
      'Vertical video is here to stay. Discover the secrets to creating high-impact short-form content that stops the scroll and engages viewers instantly.',
    content: `
      <p>The vertical revolution is complete. Platforms like TikTok, Reels, and Shorts are no longer just for dance challenges—they are the primary way millions consume video content. For a videographer in 2025, mastering short-form is not optional.</p>
      
      <h2>The 3-Second Rule</h2>
      <p>You have three seconds (or less) to hook your viewer. Start <em>in media res</em>—in the middle of the action. Use a visually striking shot or a burning question to freeze the thumb scroll.</p>

      <h2>Composition for 9:16</h2>
      <p>Shooting vertical requires a different mindset. You can't just crop your wide shots. Frame for the vertical slice. Fill the frame with your subject. Use the height to emphasize scale—tall buildings, full-body fashion shots, and intimate portraits shine here.</p>

      <h2>Visual Rhythm & Pacing</h2>
      <p>Short-form demands a snappier pace. Use music to drive your edits. Match cuts on the beat. But remember: fast doesn't mean chaotic. Your edits should still flow logically and guide the viewer's eye.</p>

      <blockquote>"In the age of infinity scrolling, attention is the most valuable currency."</blockquote>

      <h2>Optimizing for Loops</h2>
      <p>The best short-form content loops perfectly. End your video in a way that seamlessly transitions back to the beginning. This encourages re-watching, which signals the algorithm to boost your content.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop',
    category: 'Tips & Tricks',
    date: '2025-01-05',
    readingTime: '5 min read',
    author: {
      name: 'Umer Naeem',
    },
    tags: ['vertical-video', 'social-media', 'editing', 'short-form'],
  },
  {
    id: 'post-new-3',
    title: 'AI Tools for Videographers: Enhancing, Not Replacing',
    slug: 'ai-tools-videography-2025',
    excerpt:
      'AI is changing the game. From automated rotoscoping to intelligent audio cleanup, explore the top AI tools that will speed up your workflow in 2025.',
    content: `
      <p>Artificial Intelligence is the buzzword of the decade, but for videographers, it's a practical reality. In 2025, AI isn't coming for your job—it's coming to take away the boring parts of it.</p>

      <h2>Intelligent Editing Assistants</h2>
      <p>Tools like <strong>Auto-Pod</strong> and features within DaVinci Resolve and Premiere Pro can now automatically cut dead air, sync multicam footage, and even create rough cuts based on a script. This frees you up to focus on the creative flow.</p>

      <h2>Audio Magic</h2>
      <p>Bad audio is a thing of the past. AI-powered audio enhancers can isolate dialogue from noisy backgrounds with terrifying accuracy. Tools like Adobe Podcast Enhance have set a new standard, making iPhone audio sound like a studio recording.</p>

      <h2>Generative Fill & Inserts</h2>
      <p>Missed a shot? Generative fill for video is becoming usable. While you shouldn't rely on it for main action, it's a lifesaver for extending backgrounds or removing unwanted objects from a frame without hours of manual tracking.</p>

      <h2>The Human Element</h2>
      <p>Despite these advancements, AI cannot replicate human empathy or creative intuition. Use these tools to handle the drudgery so you can spend more energy on the art. The videographers who thrive in 2025 will be the ones who successfully blend AI efficiency with human soul.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
    category: 'Equipment',
    date: '2025-01-12',
    readingTime: '7 min read',
    author: {
      name: 'Umer Naeem',
    },
    tags: ['AI', 'technology', 'workflow', 'editing'],
  }
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPosts(limit?: number): BlogPost[] {
  const sorted = getAllBlogPosts();
  return limit ? sorted.slice(0, limit) : sorted;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts
    .filter((post) => post.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getRelatedBlogPosts(currentPostId: string, category: BlogCategory, limit: number = 3): BlogPost[] {
  const sameCategoryPosts = blogPosts
    .filter((post) => post.id !== currentPostId && post.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (sameCategoryPosts.length >= limit) {
    return sameCategoryPosts.slice(0, limit);
  }

  const otherPosts = blogPosts
    .filter((post) => post.id !== currentPostId && post.category !== category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return [...sameCategoryPosts, ...otherPosts].slice(0, limit);
}

export function getAllCategories(): BlogCategory[] {
  const categories = new Set(blogPosts.map((post) => post.category));
  return Array.from(categories);
}
