/**
 * Game flow controller.
 */
var GameFlowController = function( $rootScope, model, appModel, $timeout, $interval )
{
	this.model = model;
	this.appModel = appModel;
	
	this.$rootScope = $rootScope;
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
	this.model.players = new ParticipatingPlayersModel();
	this.model.dealer = new PlayerModel( "Dealer" );
	
	// Local vars references for convenience
	var cardsStack = this.model.cardsStack;
	var players = this.model.players;
	var dealer = this.model.dealer;
	
	players.addPlayer( new PlayerModel( "Player1" ) );
	players.addPlayer( new PlayerModel( "Player2" ) );
	

	this.startGameRound();
	
	// TODO: check this
	this.$rootScope.safeApplyPlain();
};


/**
 * 
 */
GameFlowController.prototype.startGameRound = function()
{
	// Local vars references for convenience
	var cardsStack = this.model.cardsStack;
	var players = this.model.players.getPlayersGroup();
	var dealer = this.model.dealer;
	
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
	
	// set active player to the first player
	this.setActivePlayer( this.model.players.getStartingPlayer() );
	
};

/**
 * 
 */
GameFlowController.prototype.switchToNextPlayer = function()
{
	this.setActivePlayer( this.model.players.getNextToPlayer( this.model.activePlayer ) );
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
	}
	// if no more players available in this round, 
	// then it's dealer's turn
	else
	{
		this.doDealerTurn();
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



// --- User actions handlers --- //

/**
 * "Hit" action handler.
 * @param inputPlayer
 */
GameFlowController.prototype.hitActionHandler = function( inputPlayer )
{
	// deal one more card to this player
	inputPlayer.addCard( this.model.cardsStack.dealCard() );
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




GameFlowController.prototype.continuePlaying = function()
{
	
};

