const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoose = require('mongoose');

const pokemon_model = mongoose.model('pokemon_model', {
	name: {
		type: String,
		required: true
	},
	types: {
		type: Array,
		required: true
	},
	max_cp: {
		type: Number,
		required: true
	},
	stamina: {
		type: Number,
		required: true
	},
	attack: {
		type: Number,
		required: true
	},
	defense: {
		type: Number,
		required: true
	},
	prod: {
		type: String,
		required: true
	},
	quick_moves: {
		type: Array,
		required: true
	},
	charge_moves: {
		type: Array,
		required: true
	}
}, 'pokemon_collection_feb');




/*const getPokemonByName = (tname, callback) => {

	console.log("[server.js][getPokemonByName] starting");
	mongoose.connect('mongodb://127.0.0.1:27017/pokemon_db',{
		//useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	});
	console.log(tname);

	pokemon_model.find({max_cp: 1115}, function(err, data) {
		console.log(err);
		console.log('data: ' + data);
		if (err){
			console.log("[server.js][getPokemonByName][ERROR] Cannot find pokemon by name");
			callback(null);
		}
		else {
			callback(data);
		}
		//mongoose.connection.close();
	});
	
}*/

const readPokemonCollection = (callback) => {

	console.log("[server.js][readPokemonCollection] starting");

	mongoose.connect('mongodb://127.0.0.1:27017/pokemon_db',{
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	});

	pokemon_model.find({}, (err, data) => {
		if (err){
			console.log("[server.js][readPokemonCollection][ERROR] Cannot read pokemon collection");
			callback([]);
		}
		else{
		
			callback(data);

		}
		mongoose.connection.close();
	})

}


const getPokemonNameList = (callback) => {
	readPokemonCollection((pokemon_collection) => {
		var pokemon_list = [];
		for (let i = 0; i < pokemon_collection.length; i++){
			pokemon_list.push(pokemon_collection[i].name);
		}
		callback(pokemon_list);
	})
	
}

const getPokemonData = (pokemonName, callback) => {

	mongoose.connect('mongodb://127.0.0.1:27017/pokemon_db',{
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	});

	pokemon_model.findOne({"name": pokemonName}, (err, data) => {
		if (err){
			console.log("[server.js][getPokemonData][ERROR] Cannot read pokemon_collection");
			callback([]);
		}
		else{
		
			callback(data);

		}
		mongoose.connection.close();
	})
}

exports.getPokemonNameList = getPokemonNameList;
exports.getPokemonData = getPokemonData;












