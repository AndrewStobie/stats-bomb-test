const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.BASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event) => {
  const { recordFormat = 'EU' } = event.queryStringParameters || {};
  const { data: teamInfo, error } = await supabase
    .from('team')
    .select('*');


  const teams = teamInfo.map(team => ({
    ...team,
    record: recordFormat !== 'US' ? `${team.wins}-${team.draws}-${team.losses}` : `${team.wins}-${team.losses}-${team.draws}`
  }));

    return {
      statusCode: 200,
      body: JSON.stringify({
        teams,
      }),
    };
}