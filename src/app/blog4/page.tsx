import { BlogArticle } from '@/components/content/BlogArticle'

export default function Blog4Page() {
  return (
    <BlogArticle
      title="Importance of Physical Activity"
      image="https://media.istockphoto.com/id/178800509/photo/alternative-medicine.jpg?s=612x612&w=0&k=20&c=VpaGQa9cvigvywdZHx-VMXy89v2RZulcF2i4xUElJrI="
      author="Admin"
      lastUpdated="Apr 9, 2024"
      readTime="2 min read"
      sections={[
        {
          heading: 'Core Health Benefits',
          paragraphs: [
            'Regular movement improves cardiovascular health, muscle strength, and weight management.',
            'Physical activity also supports better mood and lowers stress and anxiety.',
          ],
          bullets: [
            'Supports heart and metabolic health',
            'Builds stronger muscles and bones',
            'Improves sleep and daily energy levels',
          ],
        },
        {
          heading: 'Mental and Emotional Impact',
          paragraphs: [
            'Exercise releases endorphins and can reduce emotional volatility in recovery.',
            'Structured activity creates routine and can replace unhealthy habits.',
          ],
        },
        {
          heading: 'How to Start',
          paragraphs: [
            'Choose activities you enjoy and start with small, realistic goals.',
            'Aim for consistency over intensity and increase gradually week by week.',
          ],
          bullets: [
            'Target 150 minutes moderate activity per week',
            'Add basic strength work twice weekly',
            'Use rest days to recover and prevent burnout',
          ],
        },
      ]}
    />
  )
}
