const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.BASE_URL, process.env.SUPABASE_KEY)

function processMatchData(matchData) {
  const [{
    match_id,
    match_date,
    match_home_team_id,
    home_team_name,
    home_team_first_color,
    match_away_team_id,
    away_team_name,
    away_team_first_color,
    match_home_score,
    match_away_score,
    match_home_penalty_score,
    match_away_penalty_score,
  }, ...matches] = matchData;

  const processedMatchData = {
    match_id,
    match_date,
    match_home_team_id,
    home_team_name,
    home_team_first_color,
    match_away_team_id,
    away_team_name,
    away_team_first_color,
    match_home_score,
    match_away_score,
    match_home_penalty_score,
    match_away_penalty_score,
    players: []
  };
  
  let home_stats = {};
  let away_stats = {};
  let players = [];
  for (const data of matchData) {
    if (data.team_id === match_home_team_id) {
      home_stats = {
        passes: (home_stats.passes || 0) + data.passes,
        shots: (home_stats.shots || 0) + data.shots,
        goals: (home_stats.goals || 0) + data.goals,
        xg: (home_stats.xg || 0) + data.xg,
        pressures: (home_stats.pressures || 0) + data.pressures,
        completed_passes: (home_stats.completed_passes || 0) + data.completed_passes,
        interceptions: (home_stats.interceptions || 0) + data.interceptions,
        tackles: (home_stats.tackles || 0) + data.tackles,
      };
    } else {
      away_stats = {
        passes: (away_stats.passes || 0) + data.passes,
        shots: (away_stats.shots || 0) + data.shots,
        goals: (away_stats.goals || 0) + data.goals,
        xg: (away_stats.xg || 0) + data.xg,
        pressures: (away_stats.pressures || 0) + data.pressures,
        completed_passes: (away_stats.completed_passes || 0) + data.completed_passes,
        interceptions: (away_stats.interceptions || 0) + data.interceptions,
        tackles: (away_stats.tackles || 0) + data.tackles,
      };
    }
    players.push({
      player_name: data.player_name,
      player_known_name: data.player_known_name,
      team_id: data.team_id,
      player_id: data.player_id,
      passes: data.passes,
      shots: data.shots,
      goals: data.goals,
      xg: data.xg,
      pressures: data.pressures,
      completed_passes: data.completed_passes,
      interceptions: data.interceptions,
      tackles: data.tackles,
    })
  }

  return {
    match_id,
    match_date,
    match_home_team_id,
    home_team_name,
    home_team_first_color,
    match_away_team_id,
    away_team_name,
    away_team_first_color,
    match_home_score,
    match_away_score,
    match_home_penalty_score,
    match_away_penalty_score,
    home_stats,
    away_stats,
    players,
  };
}

exports.handler = async (event) => {
  const { matchId } = event.queryStringParameters;
  const { data: matchData, error } = await supabase
    .rpc('get_full_match_info', { param_match_id: parseInt(matchId,10) })

    return {
      statusCode: 200,
      body: JSON.stringify(processMatchData(matchData)),
    };
}