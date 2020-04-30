import XMLHttpRequest from 'xmlhttprequest';

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

var callGolfApiAsync = function() {
    this.get = function(callback){
        var bmwTournament = 'https://api.sportsdata.io/golf/v2/json/Leaderboard/343';

        var xmlHttp = new XMLHttpRequest();
        
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true); // true for asynchronous 
        xmlHttp.setRequestHeader('Ocp-Apim-Subscription-Key', '6be4b90a71bd47d7a7a8c08e0f5ae0aa');
        xmlHttp.send(null);
        return xmlHttp.response;
    }
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

function handleApiResponse() {
    var client = new callGolfApiAsync();
    var tournament;
    client.get(function(response) {
        var data = JSON.parse(response);
        tournament = getTournament(data);
    });
    return tournament;
}

function getTournamentData(){
    handleApiResponse();
}

