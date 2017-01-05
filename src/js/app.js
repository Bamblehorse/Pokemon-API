// Declare App
var app = angular.module('angularAPI', []);

// Customer Factory
app.factory('PokemonFactory', PokemonFactory);

PokemonFactory.$inject = ['$http'];

function PokemonFactory($http) {
	var self = this;
		self.url = 'http://pokeapi.co/api/v2/pokemon/';
		factory = {};
		factory.pokemon = [];
		factory.list = [];

	factory.getPokemonList = function(url) {
		$http.get(url).then(function(response) {
			factory.list.push(response.data);
		});
	};
	factory.getPokemonList(self.url);

	factory.getPokemon = function(url) {
		$http.get(url).then(function(response) {
			factory.pokemon.push(response.data);
		});
	};
	return factory;
}

// Main Controller
app.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', 'PokemonFactory'];

function MainCtrl (self, PF) {
	self.requestPokemon = function(url) {
		self.totalPokemon += 1;
		PF.getPokemon(url);
	};
	self.previous = function() {
		if (!self.list[self.position - 1]) {
			self.requestList('previous');
		}
		self.position -= 1;
	};
	self.next = function() {
		if (!self.list[self.position + 1]) {
			self.requestList('next');
		}
		self.position += 1;
	};
	self.requestList = function(direction) {
		var url = self.list[self.position][direction];
		PF.getPokemonList(url);
	};
	self.totalPokemon = 0;
	self.pokemon = PF.pokemon;
	self.list = PF.list;
	self.position = 0;
	self.loadStats = ["hp","attack",
					  "defense","special-attack",
					  "special-defense","speed"];
}
