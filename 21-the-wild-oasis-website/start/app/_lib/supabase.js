import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://nablisuhtesjbdcomcpx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hYmxpc3VodGVzamJkY29tY3B4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTE1ODk5NiwiZXhwIjoyMDQ0NzM0OTk2fQ.8f5-mOPDrxoQ_V4cFlGyx-32TlycH4XnOVkuR9VkDH0"
);

// process.env.SUPABASE_URL
// process.env.SUPABASE_SERVICE_KEY

export default supabase;
