# Write Functions

## createGolfer(string name, uint id, cost)
  - Use to create a new golfer.
  - Only the contract owner can create a new golfer
  - Will reject if the id passed already references another golfer
  - Emits a NewGolferEvent


## createLeague(uint tournamentID, string _leagName)
  - Creates a new league associated with the tournamentID passed in
  - A league cannot be created if the tournamentID does not exist
  - A single account cannot create more than 1 league
  - Emits a NewLeague event

## createTournament(uint tournamentID, string name, uint32 startTime, uint 32 EndTime)

  - Created a new tournament with specified id, name, startTime and EndTime
  - StartTime and EndTime are in seconds since Epoch
  - Will reject if tournamentID passed already references a tournament
  - Only contract owner can create a tournament
  - Input constraints:
    - StartTime > now
    - EndTime > startTime
    - tournamentID > 0
    - name.length > 0


## modifyGolferCost(uint golferID, uint newCost)
  - newCost is in ether
  - Updates the golferCost
  - rejects if golferID does not map to an existing golfer


## updateGolferTournamentScore(uint golferID, uint tournamentID, int score )
  - Only contract owner can modify the golfer score
  - Will need to tie this into the oracle at some point
  - Rejects if golfer ID or tournamentID does not exist

## updateLeagueLeader(uint leagueID)
  - A call to this function first updated all user scores and then finds the leader of the league passed in


## updateTournamentEndTime(uint tournamentID, uint newEndTime)
  - updates the endTime of the given tournamentID
  - Rejects if tournamentID does not exist
  - Currently used to end tournament early for testing purposes
  - Eventually will reject if newEndTime < currentEndTime

## updateTournamentStartTime(uint tournamentID, uint newStartTime)
  - Updates the startTime of the given tournamentID
  - Rejects if tournamentID does not exist
  - Rejects if newStartTime < currentStartTime

## updateUserScores(uint tournamentID)
  - A call to this function updates all bets associated with the tournamentID passed in

## placeBet(uint16[6] golferIDs, uint32 leagueID) payable
  - An ethereum address can only have one bet associated with it
  - Must pass ether value equal to the cost of all of the golfers combined
  - Rejects if leagueID does not exist


## withdrawEther( uint leagueID)
  - Calls updateLeagueLeader before determining if caller is league winner
  - Allows users to withdraw ether from the contract if they are the winner of a league
  - Rejects if user is not the winner
  - Rejects if the tournament associated with the league is not over
  - Pays out the entire pot associated with the league

## rounounceOwnership

## transferOwnership

# Get Functions
## getLeagueMoneyPot(uint leagueID)
  - Gets the current money pot of the specified league
## getBet()
  - gets the bet associated with the callers ethereum address
## getLeagueLeader(uint leagueID)
  - gets the current leagueLeader
