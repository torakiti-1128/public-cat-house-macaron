import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nuvxofxufwokapkybfmy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dnhvZnh1Zndva2Fwa3liZm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3MzA2MzcsImV4cCI6MjA0MzMwNjYzN30.cUKvMUwU55MaIoTg2W-Gi86MI3DbPtigZOzNZEr83Y8'
export const supabase = createClient(supabaseUrl, supabaseKey)