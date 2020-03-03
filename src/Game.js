import React, {Component} from "react";
import CharacterSheet from "./CharacterSheet";
import Area from "./Area";

class Game extends Component {
    constructor(props) {
        super(props);
        const playerData = JSON.parse(localStorage.getItem('playerData'));
        this.state = {
            nom: playerData.nom,
            classe: playerData.classe,
            gender: playerData.g,
        };
    }

    render() {
        return <div>
            <CharacterSheet
                name={this.state.nom}
                classe={this.state.classe}
                gender={this.state.gender}/>;

            <div className="main"><Area/></div>

        </div>
    }

}
export default Game;