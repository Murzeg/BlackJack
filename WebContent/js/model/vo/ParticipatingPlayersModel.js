
// Construct
var ParticipatingPlayersModel = function( MAX_PLAYERS_NUMBER )
{
	this.players = [];
	
	this.MAX_PLAYERS_NUMBER = MAX_PLAYERS_NUMBER;
};

ParticipatingPlayersModel.prototype.getStartingPlayer = function()
{
	if( this.players.length )
		return this.players[ 0 ];
	else
		return null;
};


ParticipatingPlayersModel.prototype.getNextToPlayer = function( currentPlayer )
{
	var playerIndex = this.players.indexOf( currentPlayer );
	
	if( ++playerIndex < this.players.length )
	{
		return this.players[ playerIndex ];
	}
	else
		return null;
};


ParticipatingPlayersModel.prototype.deletePlayer = function( playerToDelete )
{
	// do not delete player if he/she is the last one
	if( this.players.length > 1 )
	{
		var playerIndex = this.players.indexOf( playerToDelete );
		
		if( playerIndex > -1 )
		{
			this.players.splice( playerIndex, 1 );
		}
	}
};


/**
 * Add new player into the game.
 */
ParticipatingPlayersModel.prototype.addPlayer = function()
{
	if( this.players.length + 1 <= this.MAX_PLAYERS_NUMBER )
	{
		var maxPlayerID = 0;
		
		var currentPlayer;
		
		// get max player ID
		for( var i in this.players )
		{
			currentPlayer = this.players[ i ];
			
			if( currentPlayer.getPlayerID() > maxPlayerID )
				maxPlayerID = currentPlayer.getPlayerID();
		}
		
		// create new player with the ID = ++maxPlayerID
		this.players.push( new PlayerModel( ++maxPlayerID ) );
	}
};


ParticipatingPlayersModel.prototype.wasMaximumPlayersCountReached = function()
{
	return this.players.length == this.MAX_PLAYERS_NUMBER;
};

/**
 * @returns {Array} Participating players list.
 */
ParticipatingPlayersModel.prototype.getPlayersGroup = function()
{
	return this.players;
};


ParticipatingPlayersModel.prototype.didAllPlayersFinishGame = function()
{
	var currentPlayer;
	
	for( var i in this.players )
	{
		currentPlayer = this.players[ i ];
		
		if( currentPlayer && !currentPlayer.isRoundOver() )
		{
			return false;
		}
	}
	
	return true;
};


ParticipatingPlayersModel.prototype.setAllPlayersResultToLose = function()
{
	var currentPlayer;
	
	for( var i in this.players )
	{
		currentPlayer = this.players[ i ];
		currentPlayer.lose = true;
	}
};


ParticipatingPlayersModel.prototype.setAllAvailablePlayersResultToWin = function()
{
	var currentPlayer;
	
	for( var i in this.players )
	{
		currentPlayer = this.players[ i ];
		
		// set the result, only of the result hasn't been 
		// set before
		if( !currentPlayer.lose && !currentPlayer.win )
		{
			currentPlayer.win = true;
		}
	}
};

