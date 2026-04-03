import { BlogArticle } from '@/components/legacy/BlogArticle'

export default function Blog3Page() {
  return (
    <BlogArticle
      title="Adequate Sleep"
      image="https://media.istockphoto.com/id/596783998/photo/healthy-food-in-heart-and-water-diet-concept.jpg?s=612x612&w=0&k=20&c=LSU3_Gh0wmplIqqs8yBH1H3RK4UtwvIZsV8NCJlGWZc="
      author="Admin"
      lastUpdated="Apr 9, 2024"
      readTime="2 min read"
      sections={[
        {
          heading: 'Why Sleep Is Essential',
          paragraphs: [
            'Adequate sleep improves concentration, memory, and emotional stability.',
            'Sleep also supports immunity, metabolism, and recovery from physical and mental stress.',
          ],
          bullets: [
            'Improves mood regulation',
            'Enhances learning and decision making',
            'Lowers risk of chronic illness over time',
          ],
        },
        {
          heading: 'Sleep Hygiene Tips',
          paragraphs: [
            'Maintain a fixed bedtime and wake schedule, including weekends.',
            'Keep the bedroom dark, quiet, and cool while reducing screen time before sleep.',
          ],
          bullets: [
            'Avoid caffeine and nicotine late in the day',
            'Avoid heavy meals right before bed',
            'Use a short wind-down routine every night',
          ],
        },
        {
          heading: 'Recovery Connection',
          paragraphs: [
            'In rehabilitation, quality sleep helps lower stress and improves treatment adherence.',
            'Improved sleep often correlates with better day-time energy and coping ability.',
          ],
        },
      ]}
    />
  )
}
