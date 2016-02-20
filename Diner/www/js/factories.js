angular.module('starter.factories', ['ionic', 'starter.controllers'])

.factory('Users', function() {
	return [
			{ name: 'Bew Harichanwong' },
			{ name: 'Brady Lee' },
			{ name: 'Richard Herndon' },
			{ name: 'Kanye West' },
			{ name: 'Cam Newton' },
			{ name: 'Papa John' },
			{ name: 'Lucille Ball' },
			{ name: 'Ingrid Bergman' },
			{ name: 'Noam Chomsky' },
			{ name: 'Ken Griffey, Jr.' },
			{ name: 'Paul Blart' },
			{ name: 'Ira Glass' },
			{ name: 'Regina Spektor' },
			{ name: 'James Blunt' },
			{ name: 'Michael Jordan' },
			{ name: 'Michael B. Jordan' },
			{ name: 'Don Cheadle' },
			{ name: 'Tim Meadows' },
			{ name: 'Dennis Quaid' }
		];
})

.factory('Friends', function() {
	return [
			{ name: 'Bew Harichanwong' },
			{ name: 'Brady Lee' },
			{ name: 'Richard Herndon' },
			{ name: 'Kanye West' },
			{ name: 'Lucille Ball' },
			{ name: 'Ingrid Bergman' },
			{ name: 'Noam Chomsky' },
			{ name: 'Regina Spektor' },
			{ name: 'James Blunt' },
			{ name: 'Michael Jordan' },
			{ name: 'Tim Meadows' },
			{ name: 'Dennis Quaid' }
		];
})

.factory('TabInfo', function() {
	return {
		name: 'A Delicious Meal!',
		restaurant: 'Chili\'s',
		ownerName: 'Brady Lee'
	};
})

.factory('TabMembers', function() {
	return [
			{ name: 'Bew Harichanwong' },
			{ name: 'Brady Lee' },
			{ name: 'Richard Herndon' },
			{ name: 'Ken Griffey, Jr.' },
			{ name: 'Paul Blart' },
			{ name: 'Ira Glass' },
			{ name: 'Cam Newton' },
			{ name: 'Papa John' },
			{ name: 'Lucille Ball' }
		];
})

.factory('Bill', function() {
	return [
			{ dish: 'Mozzarrella Sticks', price: '5.00', quantity: 2 },
			{ dish: 'Onion Rings', price: '6.50', quantity: 1 },
			{ dish: 'Cheeseburger', price: '10.50', quantity: 1 },
			{ dish: 'Enchiladas', price: '9.00', quantity: 1 },
			{ dish: 'Baby Back Ribs', price: '14.50', quantity: 1 },
			{ dish: 'Sam Adams', price: '7.00', quantity: 2 },
			{ dish: 'Margarita', price: '8.00', quantity: 3 }
		];
});