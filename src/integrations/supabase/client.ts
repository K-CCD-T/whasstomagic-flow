
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qjfnyysuajsritwbindx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqZm55eXN1YWpzcml0d2JpbmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NDgzODEsImV4cCI6MjA1NzIyNDM4MX0.SWCc3GkX_e8mVpZPcB3-eBvDN0v-m1iTh7vNzESLBLs';

export const supabase = createClient(supabaseUrl, supabaseKey);
