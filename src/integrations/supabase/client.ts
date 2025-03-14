
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qjfnyysuajsritwbindx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqZm55eXN1YWpzcml0d2JpbmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NDgzODEsImV4cCI6MjA1NzIyNDM4MX0.SWCc3GkX_e8mVpZPcB3-eBvDN0v-m1iTh7vNzESLBLs';

// Create a Supabase client with real-time functionality enabled
export const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Enable realtime for messages and chats using channel-based API
export const setupRealtimeSubscription = () => {
  // Create a channel for chat messages
  supabase.channel('public:chat_messages')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'chat_messages'
    }, payload => {
      console.log('Change received!', payload);
    })
    .subscribe();

  // Create a channel for chats
  supabase.channel('public:chats')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'chats'
    }, payload => {
      console.log('Chat change received!', payload);
    })
    .subscribe();
};

// Call the function to set up realtime
setupRealtimeSubscription();
