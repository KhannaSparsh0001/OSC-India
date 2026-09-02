import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const envFile = fs.readFileSync('.env.local', 'utf8')
const env = {}
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) env[match[1]] = match[2].replace(/['"]/g, '').trim()
})

const url = env.NEXT_PUBLIC_SUPABASE_URL
const key = env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error("Missing Supabase URL or Key in .env.local")
  process.exit(1)
}

const supabase = createClient(url, key, { db: { schema: 'next_auth' } })

async function checkSchema() {
  console.log("Checking if next_auth schema and users table exist...")
  
  // Try to select from next_auth.users
  const { data, error } = await supabase.from('users').select('*').limit(1)
  
  if (error) {
    console.error("❌ ERROR: The next_auth.users table could not be accessed.")
    console.error("Reason:", error.message)
    console.log("The schema has NOT been updated in the remote Supabase project.")
  } else {
    console.log("✅ SUCCESS: The next_auth.users table exists!")
  }
}

checkSchema()
