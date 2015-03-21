'use strict';

// Restaurants controller
angular.module('restaurants').controller('RestaurantsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Restaurants',
	function($scope, $stateParams, $location, Authentication, Restaurants) {
		$scope.authentication = Authentication;
		$scope.phoneNumbers = [""];
		$scope.menuItems = [{name:'', itemOptions:[{name:'',price:0.0}], price:0.0}];

		// Create new Restaurant
		$scope.create = function() {
			// Create new Restaurant object
			var restaurant = new Restaurants ({
				name: this.name,
				slogan: this.slogan,
				logo: this.logo,
				address: this.address,
				phoneNumbers: $scope.phoneNumbers,
				menuItems: $scope.menuItems,
				email: this.email
			});

			// Redirect after save
			restaurant.$save(function(response) {
				$location.path('restaurants/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Restaurant
		$scope.remove = function(restaurant) {
			if ( restaurant ) {
				restaurant.$remove();

				for (var i in $scope.restaurants) {
					if ($scope.restaurants [i] === restaurant) {
						$scope.restaurants.splice(i, 1);
					}
				}
			} else {
				$scope.restaurant.$remove(function() {
					$location.path('restaurants');
				});
			}
		};

		// Update existing Restaurant
		$scope.update = function() {
			var restaurant = $scope.restaurant;

			restaurant.$update(function() {
				$location.path('restaurants/' + restaurant._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Restaurants
		$scope.find = function() {
			$scope.restaurants = Restaurants.query();
		};

		// Find existing Restaurant
		$scope.findOne = function() {
			$scope.restaurant = Restaurants.get({
				restaurantId: $stateParams.restaurantId
			});
		};

		//Add phone number
		$scope.addPhoneNumber = function(phoneNumber,index){
				$scope.phoneNumbers[index] = phoneNumber;
				$scope.phoneNumbers.push('');
		}

		//Remove phone number
		$scope.removePhoneNumber = function(index){
			if(	$scope.phoneNumbers.length > 1 ){
				$scope.phoneNumbers.splice(index, 1);
			}

		}

		//Add Menu Item
		$scope.addMenuItem = function(name,itemOptions,price,index){

				var menuItem = {'name':name,'itemOptions':itemOptions,'price':price};

				$scope.menuItems[index] = menuItem;
				$scope.menuItems.push({name:'', itemOptions:[{name:'',price:0.0}], price:0.0});
		}

		//Remove Menu Item
		$scope.removeMenuItem = function(index){
			if(	$scope.menuItems.length > 1 ){
				$scope.menuItems.splice(index, 1);
			}

		}

		//Add Menu Item
		$scope.addItemOption = function(name,price,parentIndex,index){
				var itemOption = {'name':name,'price':price};
				$scope.menuItems[parentIndex].itemOptions[index] = itemOption;
				$scope.menuItems[parentIndex].itemOptions.push({name:'',price:0.0});
		}

		//Remove Menu Item
		$scope.removeItemOption = function(parentIndex,index){
			if(	$scope.menuItems[parentIndex].itemOptions.length > 1 ){
					$scope.menuItems[parentIndex].itemOptions.splice(index, 1);
			}
			console.log($scope.menuItems[parentIndex].itemOptions);
		}
	}
]);
