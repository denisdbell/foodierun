'use strict';

// Configuring the Articles module
angular.module('restaurants').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('restaurants', 'Restaurants', 'restaurants', 'dropdown', '/restaurants(/create)?');
		Menus.addSubMenuItem('restaurants', 'restaurants', 'List Restaurants', 'restaurants');
		Menus.addSubMenuItem('restaurants', 'restaurants', 'New Restaurant', 'restaurants/create');
	}
]);