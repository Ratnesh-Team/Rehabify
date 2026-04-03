import { BlogArticle } from '@/components/content/BlogArticle'

export default function Blog2Page() {
  return (
    <BlogArticle
      title="Meditation and Mindfulness"
      image="https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/04/Spoons_Spices_1296x728-header.jpg?h=1528"
      author="Ratnesh Maurya"
      lastUpdated="Apr 9, 2024"
      readTime="2 min read"
      sections={[
        {
          heading: 'Role in Recovery',
          paragraphs: [
            'Meditation and mindfulness help regulate stress and make cravings easier to manage.',
            'Regular practice improves emotional stability and helps build resilience in difficult moments.',
          ],
          bullets: [
            'Reduces anxiety and stress response',
            'Improves self-awareness and impulse control',
            'Supports healthier response to triggers',
          ],
        },
        {
          heading: 'Combine with Physical Activity',
          paragraphs: [
            'Exercise and mindful breathing can work together to improve sleep, mood, and focus.',
            'Even short daily sessions can have measurable impact over time.',
          ],
          bullets: [
            'Start with 5 to 10 minutes daily',
            'Use breathing exercises before sleep',
            'Pair walks with mindful observation',
          ],
        },
        {
          heading: 'Build a Sustainable Routine',
          paragraphs: [
            'Consistency is more important than duration. Pick a realistic schedule and stick to it.',
            'Join a support group or accountability circle for better long-term adherence.',
          ],
        },
      ]}
    />
  )
}
