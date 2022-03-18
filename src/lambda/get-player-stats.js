const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.BASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event) => {
  const { playerName = '' } = event.queryStringParameters || {};

  console.log(event.queryStringParameters, playerName);
  const { data: player, error } = await supabase
    .from('player')
    .select(`
      id,
      player_id,
      player_name,
      player_known_name,
      player_birth_date,
      country_id,
      country_name,
      country_code,
      stats:stat(
        minutes_played,
        team_possession_percentage,
        xg,
        shots,
        goals,
        tackles,
        interceptions,
        pressures,
        passes,
        completed_passes,
        left_foot_passes,
        right_foot_passes,
        player_shots_faced
      )
    `)
    .ilike('player_name', `%${playerName}%`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        players: player,
      }),
    };
}