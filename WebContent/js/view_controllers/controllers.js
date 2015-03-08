
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
	
	$scope.onViewContentChanged = function()
	{
		console.log("gameViewCtrl_loaded");
		
		// Start new game when the view controller has been loaded
		gameController.startNewGame();
	};
	
	$scope.getCardPosition = function( card )
	{
		var cardLayer = $scope.model.cardsStack.getCardZindex( card );
		
		// TODO: add some additional processing
		return cardLayer;
	};
	
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

	
	// End of Game view handlers
//	$scope.onGotoSettingsPageClick = function()
//	{
//		$location.path( '/' );
//	};
	
	
	// Proxy method
//	$scope.isSoloPlayer = function()
//	{
//		return gameController.isSoloPlayer();
//	};
//	
//	// AppModel proxy method //
//	$scope.getTimeLimitString = function()
//	{
//		return gameModel.getTimeLimitString();
//	};
	
	
}]);

