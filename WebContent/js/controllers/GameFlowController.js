/**
 * Game flow controller.
 */
var GameFlowController = function( $rootScope, model, appModel, $timeout, $interval )
{
	this.model = model;
	this.appModel = appModel;
	
	this.$rootScope = $rootScope;
	
	// TODO: added for animation delays 
	this.$timeout = $timeout;
	this.$interval = $interval;
};


/**
 * Start new game creation process.
 */
GameFlowController.prototype.startNewGame = function()
{
	// create game objects
	this.model.cardsStack = new CardsStack();
	this.model.players = new ParticipatingPlayersModel( this.appModel.MAX_PLAYERS_NUMBER );
	this.model.dealer = new PlayerModel( 0 );
	
	// Local vars references for convenience
	var cardsStack = this.model.cardsStack;
	var players = this.model.players;
	var dealer = this.model.dealer;
	
	
	// add 2 default players 
	players.addPlayer();
	players.addPlayer();

	this.startGameRound();
	
	// TODO: disabled
//	this.$rootScope.safeApplyPlain();
};


/**
 * 
 */
GameFlowController.prototype.startGameRound = function()
{
	console.log( "========= New Round =========" );
	
	// Local vars references for convenience
	var cardsStack = this.model.cardsStack;
	var players = this.model.players.getPlayersGroup();
	var dealer = this.model.dealer;
	
	// reset required vars
	this.model.roundInProgress = true;
	
	// deal cards to all players
	var currentPlayer;
	
	for( var playerIndex in players )
	{
		currentPlayer = players[ playerIndex ];
		
		// deal 2 cards for each player
		currentPlayer.addCard( cardsStack.dealCard() );
		currentPlayer.addCard( cardsStack.dealCard() );
	}
	
	// deal 2 cards to the dealer
	dealer.addCard( cardsStack.dealCard() );
	dealer.addCard( cardsStack.dealCard() );
	
	// check dealer cards scores right after the round started
	this.checkDealersScore();
	
	// set active player to the first player
	this.setActivePlayer( this.model.players.getStartingPlayer() );
};


GameFlowController.prototype.playNextRound = function()
{
	this.cleanUpFromPreviousRound();
	
	this.startGameRound();
};


/**
 * 
 */
GameFlowController.prototype.switchToNextPlayer = function()
{
	if( this.checkRoundOver() )
	{
		this.model.roundInProgress = false;
	}
	
	this.setActivePlayer( this.model.players.getNextToPlayer( this.model.activePlayer ) );
};


GameFlowController.prototype.checkRoundOver = function()
{
	return this.model.players.didAllPlayersFinishGame();
};


GameFlowController.prototype.setActivePlayer = function( newActivePlayer )
{
	// set previous player to inactive
	if( this.model.activePlayer )
		this.model.activePlayer.isActive = false;
	
	// if new player is available
	if( newActivePlayer )
	{
		this.model.activePlayer = newActivePlayer;
		newActivePlayer.isActive = true;
		
		// check player's score at the beginning to check for BlackJack
		this.checkPlayerScore( newActivePlayer );
	}
	// if no more players available in this round, 
	// then it's dealer's turn
	else
	{
		this.doDealerTurn();
		
		// check final scores
		this.checkDealersScore();
		
		// if dealer didn't get BlackJack
		if( this.model.roundInProgress )
		{
			this.checkAllParticipantsScore();
		}
		
		this.model.roundInProgress = false;
	}
};


GameFlowController.prototype.doDealerTurn = function()
{
	var dealer = this.model.dealer;
	
	while( dealer.getCurrentCardsScore() < this.appModel.DEALERS_MAX_CARD_SCORE )
	{
		dealer.addCard( this.model.cardsStack.dealCard() );
	}
};



// ==== Cards score checking === //

/**
 * Checking dealer's current score, after the round start,
 * in case if there is Blackjack
 * 
 * @param inputPlayer
 */
GameFlowController.prototype.checkDealersScore = function()
{
	var dealersScore = this.model.dealer.getCurrentCardsScore();
	
	// check if got BlackJack on first 2 cards
	if( dealersScore === this.appModel.BLACK_JACK_SCORE && this.model.dealer.getCardCount() == 2 )
	{
		this.model.players.setAllPlayersResultToLose();
		
		console.log( "DEALER got - BlackJack!!!" );
		
		this.model.roundInProgress = false;
	}
};

/**
 * Checking player's current score, before the dealer move.
 * If player "busting" which causes immediate result.
 * 
 * @param inputPlayer
 */
GameFlowController.prototype.checkPlayerScore = function( inputPlayer )
{
	var playersScore = inputPlayer.getCurrentCardsScore();

	if( playersScore > this.appModel.BLACK_JACK_SCORE )
	{
		console.log( inputPlayer.getPlayerName() + " score: " + playersScore );
		
		console.log( inputPlayer.getPlayerName() + " busting.." );
		
		inputPlayer.lose = true;
		
		// turn moved to the next player
		this.switchToNextPlayer();
	}
	else if( playersScore === this.appModel.BLACK_JACK_SCORE )
	{
		console.log( inputPlayer.getPlayerName() + " score: " + playersScore );
		
		// Check for BlackJack on first 2 cards
		if( inputPlayer.getCardCount() == 2 )
		{
			console.log( inputPlayer.getPlayerName() + " got - BlackJack!!!" );
			
			inputPlayer.win = true;
		}
		
		// switch turn to the next player, be already got MAX 21 points
		this.switchToNextPlayer();
	}
};


/**
 * Checking all the participating players game results (which aren't been calculated before)
 * And comparing them with the dealer's score.
 * 
 */
GameFlowController.prototype.checkAllParticipantsScore = function()
{
	var players = this.model.players.getPlayersGroup();
	var currentPlayer;
	var playersScore;
	
	var dealersScore = this.model.dealer.getCurrentCardsScore();
	
	console.log( "dealer score: " + dealersScore );
	
	// we are not checking for dealer's BlackJack here,
	// it was done before in "checkDealersScore" method
	
	// if dealer "busting"
	if( dealersScore > this.appModel.BLACK_JACK_SCORE )
	{
		console.log( "DEALER busting.." );
		
		this.model.players.setAllAvailablePlayersResultToWin();
	}
	
	// compare each player's score with the dealer's score
	for( var i in players )
	{
		currentPlayer = players[ i ];
		playersScore = currentPlayer.getCurrentCardsScore();
		
		console.log( currentPlayer.getPlayerName() + " score: " + playersScore );
		
		// if the player got more scores than the dealer, but player
		// didn't get "busting" before
		if( playersScore > dealersScore && !currentPlayer.lose )
		{
			console.log( currentPlayer.getPlayerName() + " WIN!" );
			
			currentPlayer.win = true;
		}
		// if the dealer got more scores than the player, but if player
		// didn't get WIN or LOSE result before
		else if( dealersScore > playersScore && !currentPlayer.isRoundOver() )
		{
			console.log( currentPlayer.getPlayerName() + " LOSE!" );
			
			currentPlayer.lose = true;
		}
	}
};
	
//==== End of - Cards score checking === //



/**
 * 
 */
GameFlowController.prototype.cleanUpFromPreviousRound = function()
{
	// remove cards from previous round
	// and reset all required flags/vars
	var players = this.model.players.getPlayersGroup();
	var currentPlayer;
	
	for( var i in players )
	{
		currentPlayer = players[ i ];
		
		currentPlayer.removeCards();
		currentPlayer.resetRoundStatus();
	}
	
	// remove dealer cards
	this.model.dealer.removeCards();
	this.model.dealer.resetRoundStatus();
};


// --- User actions handlers --- //

/**
 * "Hit" action handler.
 * @param inputPlayer
 */
GameFlowController.prototype.hitActionHandler = function( inputPlayer )
{
	// deal one more card to this player
	inputPlayer.addCard( this.model.cardsStack.dealCard() );
	
	this.checkPlayerScore( inputPlayer );
};

/**
 * "Stick" action handler.
 * @param inputPlayer
 */
GameFlowController.prototype.stickActionHandler = function( inputPlayer )
{
	// switch turn to the other player
	this.switchToNextPlayer();
};

/**
 * "Quit" action handler.
 * @param inputPlayer
 */
GameFlowController.prototype.quitActionHandler = function( inputPlayer )
{
	this.model.players.deletePlayer( inputPlayer );
};

/**
 * Add new player into the game.
 * NOTE: available only when the game round is over.
 * @param
 */
GameFlowController.prototype.addNewPlayer = function()
{
	this.model.players.addPlayer();
};




GameFlowController.prototype.continuePlaying = function()
{
	
};

