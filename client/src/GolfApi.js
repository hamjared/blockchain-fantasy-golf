const  fetch = require('node-fetch');
/*
FORMATTING:
    To get the formatted data call: getTournamentData()
    The function getTournamentData() returns a javascript object with this format:

    {
        "name": "BMW Championship",
        "playerList": [
        {
            "name": "Justin Thomas",
            "tournamentScore": 98.1,
            "rounds": [
            {
                "number": "0",
                "totalScore": 24,
                "holeScores": [
                1,
                0,
                ...
                ]
            },
            {
                "number": "1",
                "totalScore": 26,
                "holeScores": [
                    ...
                ]
            }
            ],
            "rank": 0
        },
        {
            "name": "Patrick Cantlay",
            ...
        }
        ]
    }
*/

async function fetchGolfApi() {
    var bmwTournament = 'https://api.sportsdata.io/golf/v2/json/Leaderboard/343';

    var response = await fetch(bmwTournament, {
      headers: {
        'Ocp-Apim-Subscription-Key': '509d9efec91f4808b555f938238fe217'
      }
    });

    var data = await response.json();
    console.log(data);
    return data;
}

function getRounds(player){
    var rounds = [];
    for(var key in player.Rounds){
      var round = {};
      round.number = key;
      round.totalScore = 0;
      round.holeScores = [];
      round.totalScore = player.Rounds[key].Score;
      for(var hole in player.Rounds[key].Holes){
        round.holeScores.push(player.Rounds[key].Holes[hole].Score);
      }
      rounds.push(round);
    }
    return rounds;
}

function getTournament(data){
    var tournament = {};
    tournament.name = data.Tournament.Name;

    var playerListInitial = data.Players;
    var playerList = [];
    var rankCount = 0;
    for(var key in playerListInitial){
        var player = {};
        player.name = playerListInitial[key].Name;
        player.tournamentScore = playerListInitial[key].TotalStrokes;
        player.rounds = getRounds(playerListInitial[key]);
        player.rank = rankCount;
        rankCount++;
        playerList.push(player);
    }
    tournament.playerList = playerList;
    return tournament;
}

async function handleApiResponse() {
    var data = await fetchGolfApi();
    return getTournament(data);
}
  
function  getTournamentData(){
    return handleApiResponse();
}

module.exports = {getTournamentData}