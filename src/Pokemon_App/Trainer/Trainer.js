import React, {Component} from 'react';

import PropTypes from 'prop-types';

import style from './Trainer.module.css'

import Pokemon_Selector from './Pokemon_Selector/Pokemon_Selector.js';
import Pokemon from "./Pokemon/Pokemon.js"

class Trainer extends Component {
	constructor(props){
		super(props);
		// Props contains 'trainer_obj'
	}

	getPokemonByName = async (mon_name) => {
		const response = await fetch('/get_pokemon_data?name=' + mon_name);
	    const body = await response.json();

	    if (response.status !== 200) {
	      throw Error(body.message); 
	    }
	    return body; 
	}

	selectPokemon(mon_name, lineup_number){


		this.getPokemonByName(mon_name)
			.then(res => {
				console.log(res);

				// First we need to add some fields to this object 
				// that we can add to so that the user can set the cp and other stats
				res.mongo_obj.actual_cp = 0;
				res.mongo_obj.appraised_attack = 0;
				res.mongo_obj.appraised_defense = 0;
				res.mongo_obj.appraised_stamina = 0;
				res.mongo_obj.stardust = 0;
				res.mongo_obj.actual_quick_move = null;
				res.mongo_obj.actual_charge_move = null;
				
				var pokemon_arr = this.props.trainer_obj.pokemonObjs;
				for (let i = 0; i < pokemon_arr.length; i++){
					if (lineup_number == i){
						pokemon_arr[i] = res.mongo_obj;
					}
				}
				/*
				if (lineup_number === "1"){
					this.props.trainer_obj.pokemonObj1 = res.mongo_obj
				}
				else if (lineup_number === "2"){
					this.props.trainer_obj.pokemonObj2 = res.mongo_obj
				}
				else if (lineup_number === "3"){
					this.props.trainer_obj.pokemonObj3 = res.mongo_obj
				}
				else if (lineup_number === "4"){
					this.props.trainer_obj.pokemonObj4 = res.mongo_obj
				}
				else if (lineup_number === "5"){
					this.props.trainer_obj.pokemonObj5 = res.mongo_obj
				}
				else if (lineup_number === "6"){
					this.props.trainer_obj.pokemonObj6 = res.mongo_obj
				}*/
				this.forceUpdate();
				
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		/*
		let pokemon1 = null;
		let pokemon2 = null;
		let pokemon3 = null;
		let pokemon4 = null;
		let pokemon5 = null;
		let pokemon6 = null;
		*/

		var pokemon_tags = [null,null,null,null,null,null];

		var pokemon_arr = this.props.trainer_obj.pokemonObjs;
		for (let i = 0; i < pokemon_arr.length; i++){
			if (pokemon_arr[i] != null){
				pokemon_tags[i] = <Pokemon name={pokemon_arr[i].name} max_cp={pokemon_arr[i].max_cp} quick_moves={pokemon_arr[i].quick_moves} charge_moves={pokemon_arr[i].charge_moves} pokemon_obj={pokemon_arr[i]}/>
			}
		}

		/*if (this.props.trainer_obj.pokemonObj1 != null){
			var obj = this.props.trainer_obj.pokemonObj1;
			pokemon1 = <Pokemon name={obj.name} max_cp={obj.max_cp} quick_moves={obj.quick_moves} charge_moves={obj.charge_moves} pokemon_obj={this.props.trainer_obj.pokemonObj1}/>
		}
		if (this.props.trainer_obj.pokemonObj2 != null){
			var obj = this.props.trainer_obj.pokemonObj2;
			pokemon2 = <Pokemon name={obj.name} max_cp={obj.max_cp} quick_moves={obj.quick_moves} charge_moves={obj.charge_moves} pokemon_obj={this.props.trainer_obj.pokemonObj2}/>
		}
		if (this.props.trainer_obj.pokemonObj3 != null){
			var obj = this.props.trainer_obj.pokemonObj3;
			pokemon3 = <Pokemon name={obj.name} max_cp={obj.max_cp} quick_moves={obj.quick_moves} charge_moves={obj.charge_moves} pokemon_obj={this.props.trainer_obj.pokemonObj3}/>

		}
		if (this.props.trainer_obj.pokemonObj4 != null){
			var obj = this.props.trainer_obj.pokemonObj4;
			pokemon4 = <Pokemon name={obj.name} max_cp={obj.max_cp} quick_moves={obj.quick_moves} charge_moves={obj.charge_moves} pokemon_obj={this.props.trainer_obj.pokemonObj4}/>

		}
		if (this.props.trainer_obj.pokemonObj5 != null){
			var obj = this.props.trainer_obj.pokemonObj5;
			pokemon5 = <Pokemon name={obj.name} max_cp={obj.max_cp} quick_moves={obj.quick_moves} charge_moves={obj.charge_moves} pokemon_obj={this.props.trainer_obj.pokemonObj5}/>

		}
		if (this.props.trainer_obj.pokemonObj6 != null){
			var obj = this.props.trainer_obj.pokemonObj6;
			pokemon6 = <Pokemon name={obj.name} max_cp={obj.max_cp} quick_moves={obj.quick_moves} charge_moves={obj.charge_moves} pokemon_obj={this.props.trainer_obj.pokemonObj6}/>

		}*/

		return(
			<div className={style.Trainer_Container}>
				Pokemon 1<br/>
				<Pokemon_Selector selectPokemon={this.selectPokemon.bind(this)} lineup_number="0" pokemon_list={this.props.pokemon_list}/><br/>
				{pokemon_tags[0]}
				Pokemon 2<br/>
				<Pokemon_Selector selectPokemon={this.selectPokemon.bind(this)} lineup_number="1" pokemon_list={this.props.pokemon_list}/><br/>
				{pokemon_tags[1]}
				Pokemon 3<br/>
				<Pokemon_Selector selectPokemon={this.selectPokemon.bind(this)} lineup_number="2" pokemon_list={this.props.pokemon_list}/><br/>
				{pokemon_tags[2]}
				Pokemon 4<br/>
				<Pokemon_Selector selectPokemon={this.selectPokemon.bind(this)} lineup_number="3" pokemon_list={this.props.pokemon_list}/><br/>
				{pokemon_tags[3]}
				Pokemon 5<br/>
				<Pokemon_Selector selectPokemon={this.selectPokemon.bind(this)} lineup_number="4" pokemon_list={this.props.pokemon_list}/><br/>
				{pokemon_tags[4]}
				Pokemon 6<br/>
				<Pokemon_Selector selectPokemon={this.selectPokemon.bind(this)} lineup_number="5" pokemon_list={this.props.pokemon_list}/><br/>
				{pokemon_tags[5]}
			</div>
		);
	}
}

Trainer.propTypes = {
	trainerNumber: PropTypes.number.isRequired
}

export default Trainer;








