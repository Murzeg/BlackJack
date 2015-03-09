/**
 * @author Sergey Khvostantsev
 *
 * rooty.net
 */

/**
 * GameFlowController declaration.
 */
BlackJack.factory( "gameController", [ '$rootScope', 'applicationModel', 'gameModel', '$timeout', '$interval', '$http', function( $rootScope, applicationModel, gameModel, $timeout, $interval ) 
{
	return new GameFlowController( $rootScope, gameModel, applicationModel, $timeout, $interval );
                                       	
}]);


/**
 * GameView controller (presentation model) declaration. 
 */
BlackJack.controller('gameViewCtrl', ['$scope', '$location', '$window', '$routeParams', 'gameController', 'gameModel', 'applicationModel', '$timeout', function ( $scope, $location, $window, $routeParams, gameController, gameModel, applicationModel, $timeout ) 
{
	$scope.model = gameModel;
	$scope.appModel = applicationModel;
	
	// Triggers when this view has been loaded by Angular
	$scope.onViewContentChanged = function()
	{
		console.log("gameViewCtrl_loaded");
		
		// Start new game when the view controller has been loaded
		gameController.startNewGame();
	};
	
	/**
	 * Returns card position/offset depending on this card z-index.
	 */
	$scope.getCardPosition = function( card )
	{
		var cardLayer = $scope.model.cardsStack.getCardZindex( card );
		
		// divide by 2 to make 0.5px offset for each card
		// so the deck won't look so high
		return cardLayer / 2; 
	};
	
	/**
	 * Returns true if the "Play Next Round" button can be enabled.
	 */
	$scope.isPlayNextRoundButtonEnabled = function()
	{
		return !gameModel.roundInProgress;
	};
	
	
	// ------
	// Public methods to be accessible from views
	// ------

	// Particular player actions handlers
	
	$scope.hitActionHandler = function( inputPlayer )
	{
		gameController.hitActionHandler( inputPlayer );
	};
	
	$scope.stickActionHandler = function( inputPlayer )
	{
		gameController.stickActionHandler( inputPlayer );
	};
	
	$scope.quitActionHandler = function( inputPlayer )
	{
		gameController.quitActionHandler( inputPlayer );
	};
	
	
	// Game flow controls handlers 
	$scope.playNextRound = function()
	{
		gameController.playNextRound();
	};
	
	$scope.addNewPlayer = function()
	{
		gameController.addNewPlayer();
	};
	
}]);

