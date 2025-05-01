export interface QuestionPaper {
  id: string;
  title: string;
  category: string;
  grade: string;
  subject: string;
  year: string;
  term: string;
  imageUrl: string;
  downloadUrl: string;
}

export const categories = [
  'Board Exams',
  'Practice Tests',
  'Mock Tests',
  'Previous Year Papers'
];

export const grades = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'];

export const subjects = [
  'Mathematics',
  'Science',
  'English',
  'Social Studies',
  'Computer Science'
];

export const questionPapers: QuestionPaper[] = [
  {
    id: '1',
    title: 'Mathematics Final Exam 2023',
    category: 'Board Exams',
    grade: 'Grade 10',
    subject: 'Mathematics',
    year: '2023',
    term: 'Final',
    imageUrl: '/placeholder.svg?height=400&width=300',
    downloadUrl: '/sample.pdf'
  },
  {
    id: '2',
    title: 'Science Mid-Term Test',
    category: 'Practice Tests',
    grade: 'Grade 9',
    subject: 'Science',
    year: '2023',
    term: 'Mid-Term',
    imageUrl: '/placeholder.svg?height=400&width=300',
    downloadUrl: '/sample.pdf'
  },
  {
    id: '3',
    title: 'English Mock Exam',
    category: 'Mock Tests',
    grade: 'Grade 8',
    subject: 'English',
    year: '2023',
    term: 'Practice',
    imageUrl: '/placeholder.svg?height=400&width=300',
    downloadUrl: '/sample.pdf'
  },
  // Add more sample data as needed
];

