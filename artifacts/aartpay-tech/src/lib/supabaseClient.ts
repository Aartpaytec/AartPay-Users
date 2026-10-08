import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qbsqgoicgcwtvxtvccsr.supabase.co'
const supabaseKey = 'sb_publishable_Ub3sy5ZxoSA4c298rCXm3Q_i8gIslnK'

export const supabase = createClient(supabaseUrl, supabaseKey)
