import React from "react";

class Battle extends React.Component {
    constructor(props) {
        super(props);
        const playerData = JSON.parse(localStorage.getItem('playerData'));
        this.state = {
            nom: playerData.nom,
            classe: playerData.classe,
            gender: playerData.gender,
            hp: playerData.stats[0],
            pw: playerData.stats[1],

        }
    }


    render() {
        return (<h1>Battle</h1>);
    }


}

export default Battle;