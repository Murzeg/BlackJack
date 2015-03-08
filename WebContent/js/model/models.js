var DEBUG_MODE = false;

BlackJack.service( "applicationModel", [ '$rootScope', function( $rootScope ) 
{
	var self = this;
	
	// Const
	this.BLACK_JACK_SCORE = 21;
	this.DEALERS_MAX_CARD_SCORE = 17;
	
	// Max players count
	this.MAX_PLAYERS_NUMBER = 4;


//	this.saveUseAI = function()
//	{
//		store('useAI', self.useAI );
//	};

	this.loadSavedSettings = function()
	{
		// load GameMode
//		if( store('twoPlayersMode') !== null )
//			self.twoPlayersMode = store('twoPlayersMode');
	};
	
	
	// init
	
	// load values from Storage
	this.loadSavedSettings();
	
}]);

BlackJack.service( "gameModel", [ '$rootScope', 'applicationModel', function( $rootScope , applicationModel ) 
{
	var cardsStack;
	var players;
	var dealer;
	
	var activePlayer;
	
	var roundInProgress = false;
   	
}]);
