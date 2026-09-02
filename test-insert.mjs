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

const supabase = createClient(url, key, { db: { schema: 'next_auth' } })

async function testInsert() {
  console.log("Testing insert into next_auth.users...")
  
  const testUser = {
    name: "Test Trigger User",
    email: "test.trigger@example.com",
    image: "https://example.com/avatar.png"
  }

  const { data, error } = await supabase.from('users').insert(testUser).select()
  
  if (error) {
    console.error("❌ INSERT FAILED:", error)
  } else {
    console.log("✅ INSERT SUCCESS:", data)
    
    // Clean up
    console.log("Cleaning up test user...")
    await supabase.from('users').delete().eq('email', testUser.email)
  }
}

testInsert()
