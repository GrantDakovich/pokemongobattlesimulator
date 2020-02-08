var battling_trainer = class battling_trainer {
	constructor(battling_pokemon_list){
		this.healing = false; // Is the trainer currently healing
		this.current_pokemon_index = 0; // Current pokemon initialized to first pokemon
		this.friendship_bonus_multiplier = 1; 
		this.pokemon_list = battling_pokemon_list;

	}
}

var battling_pokemon = class battling_pokemon {
	constructor(pokemon_obj, weather){

		const cpm_dict = {"200": 0.1, "400": 0.22, "600": .3, 
			"800": .35, "1000": .415, "1300": .455, "1600": .49, 
			"1900": .52, "2200": .56, "2500": .59, "3000": .62, 
			"3500": .64, "4000": .67, "4500": .709, "5000": .725,
			"6000": .74, "7000": .752, "8000": .767, "9000": .778, 
			"10000": .79
		}
		const weather_dict = {
			"": [],
			"Sunny/Clear": ["Grass", "Ground", "Fire"],
			"Fog": ["Ghost", "Dark"],
			"Windy": ["Dragon", "Flying", "Psychic"],
			"Partially Cloudy": ["Normal", "Rock"],
			"Cloudy": ["Fairy", "Fighting", "Poison"],
			"Rain": ["Water", "Electric", "Bug"],
			"Snow": ["Ice", "Steel"]
		}
		this.weather_bonus_multiplier = 1;
		for (let t = 0; t < pokemon_obj.types.length; t++){
			if (weather_dict[weather].includes(pokemon_obj.types[t])){
				this.weather_bonus_multiplier = 1.2;
			}
		}
		this.name = pokemon_obj.name;
		this.initial_hp = Number(pokemon_obj.hp);
		this.current_hp = Number(pokemon_obj.hp);
		this.cpm = cpm_dict[pokemon_obj.stardust];
		this.attack = (pokemon_obj["attack"] + pokemon_obj["appraised_attack"]) * this.cpm;
		this.defense = (pokemon_obj["defense"] + pokemon_obj["appraised_defense"]) * this.cpm;
		this.current_energy = 0;
		this.time_to_wait = 0;
		this.quick_move = null;
		this.charge_move = null;

		for (let i = 0; i < pokemon_obj.quick_moves.length; i++){
			if (pokemon_obj.actual_quick_move == pokemon_obj.quick_moves[i].name){
				this.quick_move = pokemon_obj.quick_moves[i];
				break;
			}
		}
		for (let i = 0; i < pokemon_obj.charge_moves.length; i++){
			if (pokemon_obj.actual_charge_move == pokemon_obj.charge_moves[i].name){
				this.charge_move = pokemon_obj.charge_moves[i];
				break;
			}
		}
		
	}
}
/*var raid_boss = class raid_boss {

	constructor(boss_name, quick_move, charge_move){
		const bossname_to_level_table = {"shuckle": 2}
		const level_to_hp_table = {1:600,2:1800,3:3000,4:7500,5:12500};
		const level_to_time_table = {1:180,2:180,3:180,4:180,5:300};
		// Request boss object
		this.name = boss_name;
		this.stars = bossname_to_level_table[boss_name];
		this.hp = level_to_hp_table[bossname_to_level_table[boss_name]];
		this.time = level_to_time_table[bossname_to_level_table[boss_name]];
		this.attack = 1;
		this.defense = 1;
		this.time_to_wait = 0;
		this.current_energy = 0;
		this.quick_move = quick_move;
		this.charge_move = charge_move;
	}
}*/
var battle_obj = class battle_obj {
	constructor(trainer_list_front_end, raid_boss_name, weather){
		var battling_trainer_list = this.convert_trainers(trainer_list_front_end, weather);
		var boss = {
			name: "shuckle",
			stars: 2,
			hp: 1800,
			time: 18000,
			attack: 17,
			defense: 396,
			time_to_wait: 0,
			current_energy: 0,
			quick_move: {
				name: "Rock Throw",
				type: "Rock",
				power: 12,
				energy: 7,
				time: 900,
				dps: 13.3,
				eps: 7.8
			},
			charge_move: {
				name: "Stone Edge",
				type: "Rock",
				power: 100,
				energy: -100,
				time: 2300,
				dps: 43.5,
				eps: -43.5
			}

		}
		this.raid_boss = boss; // Raid boss time is 180s for 1-4 and 300s for 5
		this.battling_trainer_list = battling_trainer_list;
	}
	convert_trainers(trainer_list, weather){
		const new_trainer_list = [];
		for (let i = 0; i < trainer_list.length; i++) {
			const poke_list = trainer_list[i].pokemonObjs;
			const new_poke = [];
			for (let p = 0; p < poke_list.length; p++) {
				var battle_mon = null;
				if (poke_list[p] != null){
					battle_mon = new battling_pokemon(poke_list[p],weather);
				}
				new_poke.push(battle_mon);
			}
			var new_trainer = new battling_trainer(new_poke);
			new_trainer_list.push(new_trainer);
		}

		return new_trainer_list;
	}
	simulate_battle(){
		console.log("###############");
		console.log(this.raid_boss);
		console.log(this.battling_trainer_list);
		console.log("###############");
		var raid_boss = this.raid_boss;
		var trainer_list = this.battling_trainer_list;
		var raid_boss_hp = raid_boss.hp;
		// Simulate battle
		var time = 0;
		// Time step is 100
		const step = 100;
		while (time < raid_boss.time && raid_boss_hp >= 0) {
			// Iterate through trainers
			for (let t = 0; t < trainer_list.length; t++){
				var damage_at_iteration = 0;
				var trainer = trainer_list[t];
				if (trainer != null){
					var attacking_pokemon = trainer.pokemon_list[trainer.current_pokemon_index];
					if (attacking_pokemon != null){
						// Calculate damage to raid boss
						// Check if you can attack or if you're waiting
						
						if (attacking_pokemon.time_to_wait <= 0){
							// See if you can use a charge move
							if (attacking_pokemon.current_energy >= Math.abs(attacking_pokemon.charge_move.energy)){
								// Use charge move
								attacking_pokemon.current_energy += attacking_pokemon.charge_move.energy;

			// damage formula ***** TODO ***** add attack bonus (1) for matching pokemon and (2) resistance/advantage
								damage_at_iteration += Math.floor(.5 * attacking_pokemon.charge_move.power * (attacking_pokemon.attack / raid_boss.defense) * attacking_pokemon.weather_bonus_multiplier * trainer.friendship_bonus_multiplier) + 1;

								attacking_pokemon.time_to_wait += attacking_pokemon.charge_move.time;

							}
							else {
								attacking_pokemon.current_energy += attacking_pokemon.quick_move.energy;
								damage_at_iteration += Math.floor(.5 * attacking_pokemon.quick_move.power * (attacking_pokemon.attack / raid_boss.defense) * attacking_pokemon.weather_bonus_multiplier * trainer.friendship_bonus_multiplier) + 1;
								attacking_pokemon.time_to_wait += attacking_pokemon.quick_move.time;
							}


						}
						
						// Calculate damage to attacking pokemon
						var raid_boss_damage = 0;
						console.log(raid_boss.time_to_wait);
						if (raid_boss.time_to_wait <= 0){
							if (raid_boss.current_energy >= Math.abs(raid_boss.charge_move.energy)){
								raid_boss.current_energy += raid_boss.charge_move.energy;
								raid_boss_damage = Math.floor(.5 * attacking_pokemon.charge_move.power * (raid_boss.attack / attacking_pokemon.defense)) + 1;
								raid_boss.time_to_wait += raid_boss.charge_move.time;	
							} else {
								raid_boss.current_energy += raid_boss.quick_move.energy;
								raid_boss_damage += Math.floor(0.5 * raid_boss.quick_move.power * (raid_boss.attack / attacking_pokemon.defense)) + 1;
								raid_boss.time_to_wait += raid_boss.quick_move.time;
							}
						}
						
						// Reduce attacking pokemon's hp
						console.log("raid_boss damage: " + raid_boss_damage);
						attacking_pokemon.current_hp -= raid_boss_damage;
						if (attacking_pokemon.current_hp <= 0){
							console.log(attacking_pokemon.name + " died at " + time);
							trainer.current_pokemon_index += 1;
						}

						raid_boss.time_to_wait -= step;
						raid_boss_hp -= damage_at_iteration;


						if (attacking_pokemon.current_energy > 100){
							attacking_pokemon.current_energy = 100;
						}

						// Add the waiting time
						attacking_pokemon.time_to_wait -= step;
					}
				}
				
			}
			console.log("Damage: " + damage_at_iteration);
			for (let t = 0; t < trainer_list.length; t++){
				var trainer = trainer_list[t];
				if (trainer != null){
					var attacking_pokemon = trainer.pokemon_list[trainer.current_pokemon_index];
					if (attacking_pokemon != null){
						console.log("POKEMON: Name: " + attacking_pokemon.name + "\n" + "HP: " + attacking_pokemon.current_hp + "\n" + "Time: " + time);
						console.log("RAID BOSS: Name: " + raid_boss.name + "\n" + "HP: " + raid_boss_hp);
					}
				}
			}
			time += step;
		}
		if (raid_boss_hp <= 0){
			return "Winner!";
		}
		else{
			return "Loser";
		}
		
		//console.log(battle_obj);

		// First we need to get all of the trainers first pokemon

		// Then we need to run the time discretely and perform damage calculation

		// Change to next mon every time one dies

	}
}

module.exports.battle_obj = battle_obj;




