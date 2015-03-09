/**
 * @author Sergey Khvostantsev
 *
 * rooty.net
 */

var BlackJack = angular.module( 'BlackJackApp', [ 'ngRoute' ]);

// --- Filter --- //
// Added decode filter to be able to show HTML-encoded symbols for the card suits
BlackJack.filter("decode",function()
{
    return function(str)
    { 
      var el = document.createElement("div");
      el.innerHTML = str;
      str =  el.innerText || el.textContent;
      return str;
    };
});


// --- Configuration --- //

BlackJack.config(['$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider ) 
{
//	$locationProvider.html5Mode( true );
	
	$routeProvider.
        when('/', 
        {
          templateUrl: 'partials/GameView.html',
          controller: 'gameViewCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });
}]);


// Add "safeApply" method
BlackJack.config([ '$provide', function( $provide ) 
{
	return $provide.decorator('$rootScope', [
	'$delegate', function($delegate) 
	{
		$delegate.safeApply = function(fn) 
		{
			var phase = $delegate.$$phase;
			
			if (phase === "$apply" || phase === "$digest") 
			{
				if (fn && typeof fn === 'function') 
				{
					fn();
				}
			}
			else
			{
				$delegate.$apply(fn);
				
				console.log( "$delegate.$apply(fn);" );
			}
		};
		
		$delegate.safeApplyPlain = function(fn) 
		{
			var phase = $delegate.$$phase;
			
			if (phase === "$apply" || phase === "$digest") 
			{}
			else
			{
				$delegate.$apply();
				
				console.log( "$delegate.$apply( <PLAIN> );" );
			}
		};
		
		return $delegate;
	}]);}
]);

// on RUN Angular handler
BlackJack.run( function() 
{
	// initialize FastClick library for a proper mobile TOUCH behavior
	new FastClick( document.body );
});

