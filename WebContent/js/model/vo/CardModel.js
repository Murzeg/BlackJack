/**
 * Cards suits enum.
 */

var CardSuits = 
{
	hearts: 1,
	clubs: 2,
	spades:	3,
	diamonds: 4
};

// Construct
var CardModel = function( cardID, suit )
{
	this.cardID = cardID;
	this.suit = suit;
};

/**
 * Returns card's score.
 */
CardModel.prototype.getCardScore = function()
{
    var score = this.cardID;
    
    if (this.cardID >= 10)
    {
    	score = 10;
    }
    
    if( this.cardID == 1) 
    {
    	score = 11;
    }
    
    return score;
};


 /**
  * Returns card's name.
  */
CardModel.prototype.getCardLabel = function()
{
    var cardLabel;
    
    switch ( this.cardID )
    {
        case 1:
        	cardLabel = "A";
            break;
        case 13:
        	cardLabel = "K";
            break;
        case 12:
        	cardLabel = "Q";
            break;
        case 11:
        	cardLabel = "J";
            break;
        default:
        	cardLabel = this.cardID;
            break;
    }
    
    return cardLabel + this.getCardSuitSymbol();
};

/**
 * Returns card's suit symbol.
 */
CardModel.prototype.getCardSuitSymbol = function()
{
    var suitName = '';
    
    switch ( this.suit )
    {
        case 1:
            suitName = "&hearts;";
            break;
        case 2:
            suitName = "&clubs;";
            break;
        case 3:
            suitName = "&spades;";
            break;
        case 4:
            suitName = "&diams;";
            break;
    }
    
    return suitName;
};

/**
 * @returns {String} Suit color, depending on suit type.
 */
CardModel.prototype.getSuitColor = function()
{
	if( this.suit == CardSuits.clubs || this.suit == CardSuits.hearts )
	{
		return 'red';
	}
	else
	{
		return 'black';
	}
};
