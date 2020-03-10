import React from "react";

class Battle extends React.Component {
    constructor(props) {
        super(props);
        const playerData = JSON.parse(localStorage.getItem('playerData'));
        const npcData = JSON.parse(localStorage.getItem('currentBattle'));

        this.state = {
            nom: playerData.nom,
            classe: playerData.classe,
            gender: playerData.gender,
            hp: playerData.stats[0],
            pw: playerData.stats[1],
            skills: playerData.skills,
            turn: true,
            npcName: npcData["name"],
            npcSkills: npcData["skills"],
            npcHp: npcData["hp"],
            npcPw: npcData["pw"],
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
            return this.state.nom;
        } else {
            return this.state.npcName;
        }
    }

    skillDetails(skill) {
        let self = this;
        self.props.childDialogue(<div>{skill["name"]} : <br/><br/>{skill["desc"]}<br/><br/> Deals {skill["dmg"]} damage
            and costs {skill["cost"]} power.</div>);
    }
    getAction() {
        let skills = this.state.skills;
        let skillButtons = [];
        for (let i = 0; i < skills.length; i++) {
            skillButtons.push(
                <button
                    key={i}
                    onMouseOut={() => this.props.childDialogue("")}
                    onMouseOver={() => this.skillDetails(skills[i])}
                    onClick={() => this.useSkill(i)}>{skills[i]["name"]}
                </button>);
        }
        return skillButtons;
    }

    useSkill(i) {
        let skill = this.state.skills[i];
        let pw = this.state.pw;
        let npcHp = this.state.npcHp;
        const playerData = JSON.parse(localStorage.getItem('playerData'));
        if (skill["cost"] <= pw) {
            pw -= skill["cost"];
            npcHp -= skill["dmg"];
            playerData["stats"][1] = pw;
        } else {
            this.props.childDialogue("You don't have enough power to use this skill now !");
        }
        localStorage.setItem('playerData', JSON.stringify(playerData));
        this.setState({pw: pw, npcHp: npcHp});
        this.nextTurn();
    }

    render() {
        return (
            <div className="home">
                <div className="headBattle"><h1>Battle</h1><h4>Turn : {this.statTurn()}</h4>
                    <div style={{width: '50%', left: '200px'}} className="bar">
                        <div style={{width: this.state.npcHp + '%'}}
                             className="barInside">{this.state.npcHp}/{JSON.parse(localStorage.getItem('currentBattle'))["hp"]}</div>
                    </div>
                    <div className="bar" style={{width: '50%', left: '200px'}}>
                        <div style={{width: this.state.npcPw + '%', backgroundColor: 'aquamarine'}}
                             className="barInside">{this.state.npcPw}/{JSON.parse(localStorage.getItem('currentBattle'))["pw"]}
                        </div>
                    </div>
                </div>
                    <div className="btn-bt">{this.getAction()}</div>

            </div>);
    }

}

export default Battle;