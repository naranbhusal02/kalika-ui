export interface BlogContent {
  type: 'text' | 'image' | 'code';
  content: string;
  title?: string;
  language?: string;
  imageUrl?: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  likes: number;
  contents: BlogContent[];
  comments: Comment[];
}

export const blogs: BlogPost[] = [
  {
    id: '1',
    title: 'New Features in Modern Web Development',
    excerpt: 'Exploring the latest features and best practices in web development...',
    author: {
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg?height=50&width=50',
      bio: 'Senior Web Developer | Tech Educator'
    },
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Technology',
    tags: ['JavaScript', 'Web Development', 'Programming'],
    likes: 142,
    contents: [
      {
        type: 'text',
        content: 'The landscape of web development is constantly evolving, bringing new features and improvements to how we write code.'
      },
      {
        type: 'code',
        title: 'Traditional Approach',
        language: 'javascript',
        content: `try {
  await processData();
} catch (error) {
  console.error(error);
}`
      },
      {
        type: 'text',
        content: 'With the new features, we can write more concise and maintainable code.'
      },
      {
        type: 'image',
        imageUrl: '/placeholder.svg?height=400&width=800',
        content: 'New approach visualization'
      },
      {
        type: 'code',
        title: 'Modern Approach',
        language: 'javascript',
        content: `const result = await processData().catch(error => {
  console.error(error);
  return null;
});`
      }
    ],
    comments: [
      {
        id: '1',
        author: 'John Doe',
        content: 'This is really helpful! Thanks for sharing.',
        date: '2024-01-16',
        likes: 5
      },
      {
        id: '2',
        author: 'Alice Smith',
        content: 'Great explanation of the new features.',
        date: '2024-01-16',
        likes: 3
      }
    ]
  }
];

export const categories = Array.from(new Set(blogs.map(blog => blog.category)));
export const tags = Array.from(new Set(blogs.flatMap(blog => blog.tags)));

