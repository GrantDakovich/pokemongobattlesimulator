import React, {Component} from 'react';
import Trainer from './Trainer/Trainer.js';
import Raid_Boss from './Raid_Boss/Raid_Boss.js';
//import {handleSubmit} from './battle_simulation.js';
import {battle_obj} from './battle_classes.js';

class Trainer_Data {
	constructor(){
		this.pokemonObjs = [null,null,null,null,null,null];
	}
}



class Pokemon_App extends Component {
	constructor(props){
		super(props);
		var init_trainer = new Trainer_Data();
		this.state = {
			pokemon_list: [],
			trainer_list: [init_trainer],
		}
		this.boss_name_list = ["shuckle","kyogre","tyranitar"];
		this.weather = "";
		this.boss = this.boss_name_list[0];
		
	}
	

	// Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
	getAppProps = async () => {
		console.log("[Pokemon_App] here");
	    const response = await fetch('/pokemon_selector_request');
	    const body = await response.json();

	    if (response.status !== 200) {
	      throw Error(body.message); 
	    }
	    return body; 
	};

	componentDidMount(){
		this.getAppProps()
			.then(res => {
				this.setState({pokemon_list: res.pokemon_list});
			})
			.catch(err => {
				console.log(err);
			})

	}

	addTrainer(){
		var new_trainer = new Trainer_Data();
		this.state.trainer_list.push(new_trainer);

		// Just refresh with the same state
		this.setState(this.state);

	}

	submitBattle(){
    	this.state.trainer_list.map((trainer) => {
    		trainer.pokemonObjs.map((pokemonObj) => {
    			console.log(pokemonObj);
    		})
    	});
    	var battle = new battle_obj(this.state.trainer_list, "shuckle", this.weather);
    	console.log(battle.simulate_battle())
	}
	changeWeather(new_weather){
		console.log("Weather has changed");
		this.weather = new_weather;
		console.log(new_weather);
	}
	changeBoss(new_boss){
		console.log("Boss has changed");
		this.boss = new_boss;
		console.log(new_boss);
	}

	render() {

		let trainersJSX = [];
		for (let i = 0; i < this.state.trainer_list.length; i++){
			trainersJSX.push(<Trainer pokemon_list={this.state.pokemon_list} trainer_obj={this.state.trainer_list[i]}/>);
		}

		let bossJSX = [];
		for (let i = 0; i < this.boss_name_list.length; i++){
			bossJSX.push(<option value={this.boss_name_list[i]}>{this.boss_name_list[i]}</option>)
		}

		return(
			<div>
				Pokemon_App <br/><br/>
				Raid Boss Selector:
				<select onChange={(event) => {this.changeBoss(event.target.value)}}>
					{bossJSX}
				</select>
				
				<br/>
				Weather:
				<select onChange={(event) => {this.changeWeather(event.target.value)}}>
					<option default value="">--Select Weather--</option>
					<option value="Sunny/Clear">Sunny/Clear</option>
					<option value="Fog">Sunny/Fog</option>
					<option value="Windy">Windy</option>
					<option value="Partially Cloudy">Partially Cloudy</option>
					<option value="Cloudy">Cloudy</option>
					<option value="Rain">Rain</option>
					<option value="Snow">Snow</option>
				</select>
				{trainersJSX}
				<button onClick={this.addTrainer.bind(this)}>Add Trainer</button>
				<br/>
				
				<br/>
				<button onClick={this.submitBattle.bind(this)}>Submit</button>
			</div>
		);
	}
}


export default Pokemon_App;





