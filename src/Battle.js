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
            skills: playerData.skills,
            turn: true,
        }
    }

    nextTurn() {
        let next = this.state.turn;
        next = !next;
        this.setState({turn: next});
    }

    statTurn() {
        let next = this.state.turn;
        if (next) {
            return 'Player';
        } else {
            return 'Enemy';
        }
    }

    getAction() {
        let skills = this.state.skills;
        let skillButtons = [];
        for (let i = 0; i < skills.length; i++) {
            skillButtons.push(
                <button
                    key={i}
                    onMouseOut={() => this.props.childDialogue("")}
                    onMouseOver={(e) => this.skillDetails(skills[i])}
                    onClick={() => this.useSkill(i)}>{skills[i]["name"]}
                </button>);
        }
        return skillButtons;
    }

    skillDetails(skill) {
        this.props.childDialogue(<div>{skill["name"]} : <br/><br/>{skill["desc"]}<br/><br/> Deals {skill["dmg"]} damage
            and costs {skill["cost"]} power.</div>);
    }

    useSkill(i) {
        let skill = this.state.skills[i];
        this.nextTurn();
        return console.log(skill);
    }

    render() {
        return (
            <div className="home">
                <div className="headBattle"><h1>Battle</h1><h4>Turn : {this.statTurn()}</h4>
                    <div className="btn-bt">{this.getAction()}</div>
                </div>
            </div>);
    }

}

export default Battle;