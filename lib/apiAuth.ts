import { supabase } from './supabase'

export async function validateApiKey(key: string, endpoint: string) {
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('key', key)
    .single()

  if (error || !data) return { valid: false, reason: 'Invalid API key' }

  if (data.requests_used >= data.requests_limit) {
    return {
      valid: false,
      reason: `Rate limit exceeded. Plan: ${data.plan} (${data.requests_limit} requests/mo)`,
    }
  }

  await supabase
    .from('api_keys')
    .update({ requests_used: data.requests_used + 1 })
    .eq('id', data.id)

  await supabase.from('usage_logs').insert({
    api_key_id: data.id,
    endpoint,
    response_status: 200,
    metadata: { plan: data.plan },
  })

  return { valid: true, keyData: data }
}
