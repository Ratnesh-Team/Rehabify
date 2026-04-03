import { BlogArticle } from '@/components/content/BlogArticle'

export default function Blog1Page() {
  return (
    <BlogArticle
      title="Hydration and Balanced Diet"
      image="https://media.istockphoto.com/id/1277145238/photo/large-variety-of-multi-colored-dried-tea-leaves-and-flowers-on-the-table.jpg?s=612x612&w=0&k=20&c=e37c4_5934iFqFcuhTJIMNiW4vCoSvNGw6ZjgzW4COs="
      author="Admin"
      lastUpdated="Apr 9, 2024"
      readTime="2 min read"
      sections={[
        {
          heading: 'Why Hydration Matters',
          paragraphs: [
            'Drinking enough water supports the body in natural detoxification and helps liver and kidney function.',
            'Hydration improves digestion, nutrient absorption, and day-to-day energy during recovery.',
          ],
          bullets: [
            'Helps flush toxins from the body',
            'Supports healthy digestion and bowel function',
            'Helps maintain focus and physical stamina',
          ],
        },
        {
          heading: 'Balanced Nutrition in Recovery',
          paragraphs: [
            'A balanced plate with fruits, vegetables, whole grains, lean proteins, and healthy fats supports healing.',
            'Nutrition stabilizes mood, strengthens immunity, and reduces fatigue associated with recovery stress.',
          ],
          bullets: [
            'Eat colorful whole foods daily',
            'Plan meals to avoid skipped meals and binge cycles',
            'Limit ultra-processed snacks and sugary drinks',
          ],
        },
        {
          heading: 'Practical Daily Tips',
          paragraphs: [
            'Keep a reusable bottle nearby and set reminders to sip water through the day.',
            'Build a simple meal routine and seek support from a dietitian if needed.',
          ],
        },
      ]}
    />
  )
}
