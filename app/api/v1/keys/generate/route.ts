import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { randomBytes } from 'crypto'

const PLAN_LIMITS: Record<string, number> = {
  free: 100,
  pro: 10000,
  enterprise: 100000,
}

export async function POST(req: NextRequest) {
  const adminSecret = req.headers.get('x-admin-secret')
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { email, plan = 'free' } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  if (!PLAN_LIMITS[plan]) {
    return NextResponse.json(
      { error: `Invalid plan. Choose: ${Object.keys(PLAN_LIMITS).join(', ')}` },
      { status: 400 }
    )
  }

  const key = `tmm_${randomBytes(24).toString('hex')}`

  const { data, error } = await supabase
    .from('api_keys')
    .insert({ key, email, plan, requests_limit: PLAN_LIMITS[plan], requests_used: 0 })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: 'Failed to create key', detail: error.message }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    key: data.key,
    email: data.email,
    plan: data.plan,
    requests_limit: data.requests_limit,
    created_at: data.created_at,
  })
}
