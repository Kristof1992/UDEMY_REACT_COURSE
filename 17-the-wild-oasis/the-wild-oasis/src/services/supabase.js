import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zhcbgrvbookeauyrwavl.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoY2JncnZib29rZWF1eXJ3YXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3NDI0MTEsImV4cCI6MjAyMjMxODQxMX0.Vn8VZE0juVpp5xgiF0gwgoicisIrgd-iCaSbucd1Log`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
