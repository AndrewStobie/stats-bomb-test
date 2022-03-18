const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.BASE_URL, process.env.SUPABASE_KEY)

function processTeamData(teamData) {
  const [{
    team_id,
    team_name,
    team_first_color,
    wins,
    losses,
    draws,
  }, ...teams] = teamData;

  let teamStats = {};
  let players = [];
  for (const data of teamData) {
    teamStats = {
      passes: (teamStats.passes || 0) + data.passes,
        shots: (teamStats.shots || 0) + data.shots,
        goals: (teamStats.goals || 0) + data.goals,
        xg: (teamStats.xg || 0) + data.xg,
        pressures: (teamStats.pressures || 0) + data.pressures,
        completed_passes: (teamStats.completed_passes || 0) + data.completed_passes,
        interceptions: (teamStats.interceptions || 0) + data.interceptions,
        tackles: (teamStats.tackles || 0) + data.tackles,
    };
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
    team_id,
    team_name,
    team_first_color,
    wins,
    losses,
    draws,
    players,
    teamStats
  };
}

exports.handler = async (event) => {
  const { teamId } = event.queryStringParameters;
  const { data: teamData, error } = await supabase
    .rpc('get_full_team_info', { param_team_id: parseInt(teamId,10) });
  
  console.log(teamData)

    return {
      statusCode: 200,
      body: JSON.stringify(processTeamData(teamData)),
    };
}