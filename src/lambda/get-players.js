const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.BASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event) => {
  const { data: player, error } = await supabase
    .from('player')
    .select('*');

    return {
      statusCode: 200,
      body: JSON.stringify({
        players: player,
      }),
    };
}