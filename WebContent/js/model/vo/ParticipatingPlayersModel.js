
// Construct
var ParticipatingPlayersModel = function()
{
	this.players = [];
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
ParticipatingPlayersModel.prototype.addPlayer = function( inputPlayer )
{
    this.players.push( inputPlayer );
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

