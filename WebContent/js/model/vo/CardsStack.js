/**
 * @author Sergey Khvostantsev
 *
 * rooty.net
 */

// Construct
var CardsStack = function()
{
	this.stack = [];
	
	this.generateDeck();
};


// Static consts (actually vars =\)
CardsStack.prototype.CARDS_IN_DECK_COUNT = 52;
CardsStack.prototype.SUITS_COUNT = 4;
CardsStack.prototype.EACH_SUIT_CARDS_COUNT = CardsStack.prototype.CARDS_IN_DECK_COUNT / CardsStack.prototype.SUITS_COUNT;


/**
 * Generate cards deck.
 */
CardsStack.prototype.generateDeck = function()
{
	var cardID;
	var suit;
	
	for( var i = 0 ; i < this.CARDS_IN_DECK_COUNT ; i++ )
	{
        suit = i % this.SUITS_COUNT + 1;
        cardID = i % this.EACH_SUIT_CARDS_COUNT + 1;
        
        this.stack.push( new CardModel( cardID, suit ) );
    }
	
	this.shuffle();
};


/**
 * Deal cards.
 * @returns top card from the deck.
 */
CardsStack.prototype.dealCard = function()
{
	// if no more cards been found in the stack, then
	// generate a new one
    if ( !this.stack.length )
    {
        this.generateDeck();
        this.shuffle();
    }
    
    return this.stack.pop();
};


/**
 * Shuffle cards deck.
 */
CardsStack.prototype.shuffle = function() 
{
	var arr = this.stack;
	
    for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
};

/**
 * Returns cards stack list.
 * @returns {Array}
 */
CardsStack.prototype.getCardsStack = function()
{
	return this.stack;
};


/**
 * Returns card z-index, based on the card element position in array.
 * @param card
 */
CardsStack.prototype.getCardZindex = function( card )
{
	return this.stack.indexOf( card );
};

