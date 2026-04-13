import React from "react";
import CharacterSheet from "./Game";

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
            visibilityBtn: true
        }
    }

    nextTurn() {
        if (this.state.npcHp <= 0) {
            this.setState({turn: false, visibilityBtn: false});
            this.showSkills();
            this.props.spDialogue("You won the battle !");
        } else if (this.state.hp <= 0) {
            this.setState({turn: false, visibilityBtn: false});
            this.showSkills();
            this.props.spDialogue("You lost the battle !");
        } else {
            let next = this.state.turn;
            next = !next;
            this.setState({turn: next});
            if (!next) {
                this.npcAttack();
            } else {
                this.props.childDialogue('');
                this.setState({visibilityBtn: true});
                this.showSkills();
            }
        }
    }


    statTurn() {
        let next = this.state.turn;
        if (next) {
            return this.state.nom;
        } else {
            return this.state.npcName;
        }
    }

    showSkills() {
        let visibilityBtn = this.state.visibilityBtn;
        if (visibilityBtn) {
            return 'visible';
        } else {
            return 'hidden';
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
            if (playerData["stats"][1] < 0) {
                playerData["stats"][1] = 0;
            }
            localStorage.setItem('playerData', JSON.stringify(playerData));
            this.setState({pw: pw, npcHp: npcHp, visibilityBtn: false});
            let npc = JSON.parse(localStorage.getItem('currentBattle'));
            if (npcHp < 0) {
                npcHp = 0;
            }
            npc["hp"] = npcHp;
            localStorage.setItem('currentBattle', JSON.stringify(npc));
            this.showSkills();
            this.props.spDialogue(<div>You used {skill["name"]}, you dealt {skill["dmg"]} damage !
                <button onClick={() => this.nextTurn()}>Next</button></div>)
        } else {
            this.props.childDialogue("You don't have enough power to use this skill now !");
            this.setState({visibilityBtn: true});
            this.showSkills();
        }


    }

    npcAttack() {
        this.setState({visibilityBtn: false});
        this.showSkills();
        let npcSkills = this.state.npcSkills;
        let pw = this.state.npcPw;
        let skill = Math.floor(Math.random() * npcSkills.length);
        while (npcSkills[skill][2] > pw) {
            skill = Math.floor(Math.random() * npcSkills.length);
        }
        pw -= npcSkills[skill][2];
        const playerData = JSON.parse(localStorage.getItem('playerData'));
        playerData["stats"][0] = this.state.hp - npcSkills[skill][1];
        if (playerData["stats"][0] < 0) {
            playerData["stats"][0] = 0;
        }
        localStorage.setItem('playerData', JSON.stringify(playerData));
        let npc = JSON.parse(localStorage.getItem('currentBattle'));
        if (pw < 0) {
            pw = 0;
        }
        npc["pw"] = pw;
        localStorage.setItem('currentBattle', JSON.stringify(npc));
        this.setState({npcPw: pw, hp: playerData["stats"][0]});
        this.props.spDialogue(<div>{this.state.npcName} used {npcSkills[skill][0]}, you
            took {npcSkills[skill][1]} damage !
            <button onClick={() => this.nextTurn()}>Next</button></div>)
    }


    render() {
        return (
            <div className="home"><CharacterSheet
                name={this.state.nom}
                classe={this.state.classe}
                gender={this.state.gender}
                hp={this.state.hp}
                pw={this.state.pw}
                money={this.state.money}
            />
                <div className="headBattle"><h1>Battle</h1><h4>Turn : {this.statTurn()}</h4>
                    <div style={{width: '50%', left: '200px'}} className="bar">
                        <div style={{width: this.state.npcHp + '%'}}
                             className="barInside">{this.state.npcHp}/{JSON.parse(localStorage.getItem('currentBattle'))["hp"]}
                        </div>
                    </div>
                    <div className="bar" style={{width: '50%', left: '200px'}}>
                        <div style={{width: this.state.npcPw + '%', backgroundColor: 'aquamarine'}}
                             className="barInside">{this.state.npcPw}/{JSON.parse(localStorage.getItem('currentBattle'))["pw"]}
                        </div>
                    </div>
                </div>
                <div
                    style={{visibility: this.showSkills()}}
                    className="btn-bt">
                    {this.getAction()}
                </div>
            </div>
        );
    }

}
export default Battle;
