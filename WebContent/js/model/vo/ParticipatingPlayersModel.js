
// Construct
var ParticipatingPlayersModel = function( MAX_PLAYERS_NUMBER )
{
	this.players = [];
	
	this.MAX_PLAYERS_NUMBER = MAX_PLAYERS_NUMBER;
};

/**
 * @returns {Player object} Return first player from the Array. 
 */
ParticipatingPlayersModel.prototype.getStartingPlayer = function()
{
	if( this.players.length )
		return this.players[ 0 ];
	else
		return null;
};

/**
 * Retrieves next player from the list to the player specified.
 * 
 * If there are no more players available, return 'null'.
 *   
 * @param currentPlayer
 * @returns
 */
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

/**
 * Retrieves next player from the list to the player specified.
 * 
 * If there are no more players available NEXT to this player, then
 * return Previous player.
 * 
 * @param currentPlayer
 * @returns
 */
ParticipatingPlayersModel.prototype.getNextAvailablePlayer = function( currentPlayer )
{
	var playerIndex = this.players.indexOf( currentPlayer );
	
	if( ++playerIndex < this.players.length )
	{
		return this.players[ playerIndex ];
	}
	else
		return this.players[ playerIndex - 2 ];
};

/**
 * Delete player specified.
 * @param playerToDelete
 */
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

/**
 * Determines if the 'MaximumPlayersCount' has been reached.
 * @returns {Boolean}
 */
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

/**
 * Checking if all the players finished the game with any result ( WIN | LOSE )
 * @returns {Boolean}
 */
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


/**
 * Set each player result to be LOSE.
 */
ParticipatingPlayersModel.prototype.setAllPlayersResultToLose = function()
{
	var currentPlayer;
	
	for( var i in this.players )
	{
		currentPlayer = this.players[ i ];
		currentPlayer.lose = true;
	}
};

/**
 * Set each AVAILABLE (player whom result (WIN | LOSE) hasn't been set before) player result to be WIN.
 */
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

