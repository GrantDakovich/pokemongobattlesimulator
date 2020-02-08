import React, {Component} from 'react';

class Pokemon_Selector extends Component {
	constructor(props){
		super(props);
	}

	render(){
		var poke_list = this.props.pokemon_list;
		let options = poke_list.map((data) => 
      		<option value={data}>
        		{data}
      		</option>
    	);
    	
		return(
			<div>
				Select <br/>
		        <select onChange={(event) => {this.props.selectPokemon(event.target.value, this.props.lineup_number)}}>
		          	<option default value="">--Select Pokemon--</option>
		          	{options}
		        </select>
		    </div>
		);
	}
}

export default Pokemon_Selector;