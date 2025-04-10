import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imgpbvfdrxjiapezhrrg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltZ3BidmZkcnhqaWFwZXpocnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMzU5MjQsImV4cCI6MjA1OTgxMTkyNH0.o30_Sfbyc9Fhi5QpKw1rbDfk81bqe6ixHLU2k63VRSA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
