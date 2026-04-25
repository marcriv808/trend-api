import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey } from '@/lib/apiAuth'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key')

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing x-api-key header', docs: 'https://your-domain.com/docs' },
      { status: 401 }
    )
  }

  const auth = await validateApiKey(apiKey, '/api/v1/trends')
  if (!auth.valid) {
    return NextResponse.json({ error: auth.reason }, { status: 403 })
  }

  const platform = req.nextUrl.searchParams.get('platform') || 'tiktok'
  const category = req.nextUrl.searchParams.get('category')
  const region = req.nextUrl.searchParams.get('region') || 'US'
  const limit = Math.min(Number(req.nextUrl.searchParams.get('limit')) || 10, 50)

  let query = supabase
    .from('trends')
    .select('*')
    .eq('platform', platform)
    .eq('region', region)
    .order('velocity_score', { ascending: false })
    .limit(limit)

  if (category) query = query.eq('category', category)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch trends' }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    platform,
    region,
    count: data.length,
    trends: data,
    pulled_at: new Date().toISOString(),
    plan: auth.keyData?.plan,
    requests_remaining: auth.keyData?.requests_limit - auth.keyData?.requests_used - 1,
  })
}
