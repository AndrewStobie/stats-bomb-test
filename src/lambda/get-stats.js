const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.BASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event) => {
  const { data: stat, error } = await supabase
    .from('stat')
    .select('*');

    return {
      statusCode: 200,
      body: JSON.stringify({
        stats: stat,
      }),
    };
}