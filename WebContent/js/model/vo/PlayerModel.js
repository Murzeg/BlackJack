/**
 * @author Sergey Khvostantsev
 *
 * rooty.net
 */

// Construct
var PlayerModel = function( playerID )
{
	this.cards = [];
	
	this.playerID = playerID;
	this.isActive = false;
	
	this.win = false;
	this.lose = false;
};

/**
 * Returns the score of the current cards hold by the player.
 */
PlayerModel.prototype.getCurrentCardsScore = function()
{
    var score = 0;
    var cardValue = 0;
    var acesCount = 0;

    for ( var i = 0; i < this.cards.length; i++ )
    {
    	cardValue = this.cards[i].getCardScore();
        
        if ( cardValue == 11 ) 
        {
        	acesCount += 1;
        }
        
        score += cardValue;
    }
    
    /* Check to see if Aces should be counted as 1 or 11 */
    while( score > 21 && acesCount > 0)
    {
        score -= 10;
        acesCount -=1;
    }
    
    return score;
};


/**
 * Add card from the deck.
 */
PlayerModel.prototype.addCard = function( card )
{
    this.cards.push( card );
};


/**
 * Remove all current cards from the hand.
 */
PlayerModel.prototype.removeCards = function()
{
	this.cards.splice( 0, this.cards.length );
};


/**
 * Reset win/lose flags.
 */
PlayerModel.prototype.resetRoundStatus = function()
{
	this.win = false;
	this.lose = false;
};


/**
 * 
 * @returns {Array} Getter for this.cards
 */
PlayerModel.prototype.getPlayerCards = function()
{
    return this.cards;
};

/**
 * @returns Appropriate player's name.
 * 
 * NOTE: if player "isActive", return different name with "(Active)" suffix
 *  
 */
PlayerModel.prototype.getPlayerName = function()
{
	if( !this.playerID )
	{
		return "Dealer";
	}
	else
		return "Player " + this.playerID + ( this.isActive ? ' (Active)' : '' );
};

/**
 * @returns { int } Getter for this.playerID;
 */
PlayerModel.prototype.getPlayerID = function()
{
	return this.playerID;
};

/**
 * @returns {Boolean} Getter for this.isActive; 
 */
PlayerModel.prototype.isActivePlayer = function()
{
	return this.isActive;
};

/**
 * @returns {Boolean} Return true if the possible "Hit" button could be enabled. 
 */
PlayerModel.prototype.isHitEnabled = function()
{
	return this.isActive;
};

/**
 * @returns {Boolean} Return true if the possible "Stick" button could be enabled. 
 */
PlayerModel.prototype.isStickEnabled = function()
{
	return this.isActive;
};


/**
 * @returns { Boolean } Getter for this.win;
 */
PlayerModel.prototype.didWinHappen = function()
{
	return this.win;
};

/**
 * @returns { Boolean } Getter for this.lose;
 */
PlayerModel.prototype.didLoseHappen = function()
{
	return this.lose;
};

/**
 * @returns { Boolean } Returns true if the result (WIN | LOSE) 
 * has been already set for this player.
 */
PlayerModel.prototype.isRoundOver = function()
{
	return this.win || this.lose;
};

/**
 * 
 * @returns { int } Cards number in the player's hand.
 */
PlayerModel.prototype.getCardCount = function()
{
	return this.cards.length;
};
