import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const trends = [
  { platform: 'tiktok', keyword: 'quiet luxury budgeting',     velocity_score: 94.2, volume: 847000,  category: 'finance', region: 'US' },
  { platform: 'tiktok', keyword: 'cash stuffing 2026',         velocity_score: 88.7, volume: 612000,  category: 'finance', region: 'US' },
  { platform: 'tiktok', keyword: 'no spend month challenge',   velocity_score: 82.1, volume: 430000,  category: 'finance', region: 'US' },
  { platform: 'tiktok', keyword: 'treasury bills explained',   velocity_score: 76.4, volume: 291000,  category: 'finance', region: 'US' },
  { platform: 'tiktok', keyword: 'vibe coding income',         velocity_score: 97.1, volume: 1200000, category: 'tech',    region: 'US' },
  { platform: 'tiktok', keyword: 'api business passive income',velocity_score: 91.3, volume: 780000,  category: 'tech',    region: 'US' },
  { platform: 'tiktok', keyword: 'cursor ai tutorial',         velocity_score: 85.6, volume: 540000,  category: 'tech',    region: 'US' },
  { platform: 'tiktok', keyword: 'supabase free tier',         velocity_score: 71.2, volume: 198000,  category: 'tech',    region: 'US' },
  { platform: 'tiktok', keyword: 'glazed donut skin 2026',     velocity_score: 89.4, volume: 920000,  category: 'beauty',  region: 'US' },
  { platform: 'tiktok', keyword: 'cloud skin routine',         velocity_score: 83.7, volume: 610000,  category: 'beauty',  region: 'US' },
  { platform: 'reddit', keyword: 'build in public',            velocity_score: 78.9, volume: 340000,  category: 'tech',    region: 'US' },
  { platform: 'reddit', keyword: 'saas bootstrapped',          velocity_score: 74.2, volume: 280000,  category: 'tech',    region: 'US' },
  { platform: 'x',      keyword: 'recession hedge 2026',       velocity_score: 86.1, volume: 520000,  category: 'finance', region: 'US' },
  { platform: 'x',      keyword: 'alt assets gen z',           velocity_score: 79.3, volume: 380000,  category: 'finance', region: 'US' },
]

async function seed() {
  console.log('Seeding trends table...')
  const { data, error } = await supabase.from('trends').insert(trends).select()
  if (error) { console.error('Error seeding:', error.message); process.exit(1) }
  console.log(`✅ Seeded ${data.length} trends successfully`)
}

seed()
