const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.BASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event) => {
  const { data: match, error } = await supabase
    .rpc('get_matches_info')
    

    return {
      statusCode: 200,
      body: JSON.stringify({
        matches: match,
      }),
    };
}