/**
 * @author Sergey Khvostantsev
 *
 * rooty.net
 */

var DEBUG_MODE = false;

BlackJack.service( "applicationModel", [ '$rootScope', function( $rootScope ) 
{
	// Const
	this.BLACK_JACK_SCORE = 21;
	this.DEALERS_MAX_CARD_SCORE = 17;
	
	// Max players count
	this.MAX_PLAYERS_NUMBER = 4;

}]);

BlackJack.service( "gameModel", [ '$rootScope', 'applicationModel', function( $rootScope , applicationModel ) 
{
	var cardsStack;
	var players;
	var dealer;
	
	var activePlayer;
	
	var roundInProgress = false;
   	
}]);
