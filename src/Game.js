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
            gender: playerData.gender,
            hp: playerData.stats[0],
            pw: playerData.stats[1],
            money: playerData.stats[2],
        };
    }

    render() {
        return <div>
            <CharacterSheet
                name={this.state.nom}
                classe={this.state.classe}
                gender={this.state.gender}
                hp={this.state.hp}
                pw={this.state.pw}
                money={this.state.money}
            />
            <div className="main">
                <Area name={this.state.nom}
                      classe={this.state.classe}
                      gender={this.state.gender}
                />
            </div>
        </div>
    }

}
export default Game;