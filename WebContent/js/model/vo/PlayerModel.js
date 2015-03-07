
var PlayerModel = function( playerID )
{
	this.cards = [];
	
	this.playerID = playerID;
	this.isActive = false;
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
    
    /* Check to see if Aces should be 1 or 11 */
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
 * 
 * @returns {Array}
 */
PlayerModel.prototype.getPlayerCards = function()
{
    return this.cards;
};

/**
 * 
 * @returns
 */
PlayerModel.prototype.getPlayerName = function()
{
	return this.playerID;
};


PlayerModel.prototype.isHitEnabled = function()
{
	return this.isActive;
};

PlayerModel.prototype.isStickEnabled = function()
{
	return this.isActive;
};

