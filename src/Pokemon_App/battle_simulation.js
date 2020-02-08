import {battling_trainer, battling_pokemon, raid_boss, battle_obj} from './battle_classes.js';

/*
battle_obj: {


	weather: (String),
	raid_boss: {
		// Raid boss time is 180s for 1-4 and 300s for 5
		stars:
		time:
		attack:
		defense:
		quick_moves:
		charge_moves:
		hp:

	},
	trainer_list: []
		(each contains)
		{
			pokemonObj{num}: {
				name: (pokemon_name),
				types: [],
				quick_moves: [], ->
					(each contains)
					{
						name: (String)
						type: (String)
						power: (int)
						energy: (int)
						time: (int)
						dps: (float)
						eps: (float)
						type_bonus: (float)
					}
				charge_moves: [], ->
					(each contains)
					{
						name: (String)
						type: (String)
						power: (int)
						energy: (int)
						time: (int)
						dps: (float)
						eps: (float)
						type_bonus: (float)
					}
				max_cp: (int)
				stamina: (int)
				attack: (int)
				defense: (int)
				actual_cp: 
				appraised_attack:
				appraised_defense:
				appraised_stamina:
				actual_quick_move:
				actual_charge_move:
			}

		}
	}
}
*/

/*
META:

Levels 1-3	200	1
Levels 3-4	400	1
Levels 5-7	600	1
Levels 7-9	800	1
Levels 9-11	1000	1
Levels 11-13	1300	2
Levels 13-15	1600	2
Levels 15-17	1900	2
Levels 17-19	2200	2
Levels 19-21	2500	2
Levels 21-23	3000	3
Levels 23-25	3500	3
Levels 25-27	4000	3
Levels 27-29	4500	3
Levels 29-31	5000	3
Levels 31-33	6000	4
Levels 33-35	7000	4
Levels 35-37	8000	4
Levels 37-39	9000	4
Levels 39-40	10000	4
*/
/*

function simulate_battle(battle_obj){

	var raid_boss = battle_obj.raid_boss;
	var trainer_list = battle_obj.trainer_list;
	var raid_boss_hp = raid_boss.hp;
	// Simulate battle
	var time = 0;
	// Time step is 100
	const step = 100;
	while (time < raid_boss.time && raid_boss_hp != 0) {

		// Iterate through trainers
		for (let t = 0; t < trainer_list.length; t++){
			var damage_at_iteration = 0;
			trainer = trainer_list[t];
			attacking_pokemon = trainer.pokemon_list[trainer.current_pokemon_index];
			
			// Calculate damage to raid boss
			// Check if you can attack or if you're waiting
			if (attacking_pokemon.time_to_wait <= 0){
				// See if you can use a charge move
				if (attacking_pokemon.current_energy >= abs(attacking_pokemon.charge_move.energy)){
					// Use charge move
					attacking_pokemon.current_energy += attacking_pokemon.charge_move.energy;

// damage formula ***** TODO ***** add attack bonus (1) for matching pokemon and (2) resistance/advantage
					damage_at_iteration += floor(.5 * attacking_pokemon.charge_move.power * (attacking_pokemon.attack / raid_boss.defense) * attacking_pokemon.weather_bonus_multiplier * trainer.friendship_bonus_multiplier) + 1;

					attacking_pokemon.time_to_wait += attacking_pokemon.charge_move.time;

				}else {
					attacking_pokemon.current_energy += attacking_pokemon.quick_move.energy;
					damage_at_iteration += floor(.5 * attacking_pokemon.quick_move.power * (attacking_pokemon.attack / raid_boss.defense) * attacking_pokemon.weather_bonus_multiplier * trainer.friendship_bonus_multiplier) + 1;
					attacking_pokemon.time_to_wait += attacking_pokemon.quick_move.time;
				}


			}

			// Calculate damage to attacking pokemon
			var raid_boss_damage = 0;
			if (raid_boss.time_to_wait <= 0){
				if (raid_boss.current_energy >= abs(raid_boss.charge_move.energy)){
					raid_boss.current_energy += raid_boss.charge_move.energy;
					raid_boss_damage = floor(.5 * attacking_pokemon.charge_move.power * (raid_boss.attack / attacking_pokemon.defense) + 1;
					raid_boss.time_to_wait += raid_boss.charge_move.time;
				} else {
					raid_boss.current_energy += raid_boss.quick_move.energy;
					damage_at_iteration += floor(.5 * raid_boss.quick_move.power * (raid_boss.attack / attacking_pokemon.defense) + 1;
					raid_boss.time_to_wait += raid_boss.quick_move.time;
				}
			}

			// Reduce attacking pokemon's hp
			attacking_pokemon.current_hp -= raid_boss_damage;
			if (attacking_pokemon.current_hp <= 0){
				trainer.current_pokemon_index += 1;
			}

			raid_boss_hp -= damage_at_iteration


			if (attacking_pokemon.current_energy > 100){
				attacking_pokemon.current_energy = 100;
			}
			


			// Add the waiting time
			attacking_pokemon.time_to_wait -= step;

		}
		time += step;
	}
	
	console.log(battle_obj);

	// First we need to get all of the trainers first pokemon

	// Then we need to run the time discretely and perform damage calculation

	// Change to next mon every time one dies

}
*/
const handleSubmit = () => {
	console.log("INSIDE HANDLE SUBMISSION");
}


module.exports.handleSubmit = handleSubmit;


