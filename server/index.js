const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');

const database_handler = require('./database_handler.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/pokemon_selector_request', (req, res) => {
	console.log('[index.js][/pokemon_selector_request] Entering...');
	database_handler.getPokemonNameList((pokemon_list) => {
		res.send({pokemon_list: pokemon_list});
	});
});

app.get('/get_pokemon_data', (req, res) => {
	console.log("[index.js][/get_pokemon_data] Entering...")

	var mon_name = req.query.name;
	database_handler.getPokemonData(mon_name, (data) => {
		res.send({ mongo_obj: data });
	})
})




app.listen(5000, () => console.log('Listening on port 5000'));


