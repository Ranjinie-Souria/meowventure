import React, {Component} from "react";
class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            classe: 'mage',
            gender: 'F',
            eyes: 'brown',
            fur: 'yellow',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        const nom = this.state.nom;
        const classe = this.state.classe;
        const gender = this.state.gender;
        const eyes = this.state.eyes;
        const fur = this.state.fur;
        event.preventDefault();
        let newData = {};
        newData["nom"] = nom.charAt(0).toUpperCase() + nom.substring(1).toLowerCase();
        newData["classe"] = classe;
        newData["gender"] = gender;
        newData["cat"] = [fur, eyes];
        newData["stats"] = [100, 100, 100];
        newData["skills"] = [{
            "name": "Weapon",
            "desc": "Attack with your weapon",
            "dmg": 3,
            "cost": 0,
            "effect": undefined
        }];

        let firstSkill = {"name": "", "desc": "", "dmg": "", "cost": "", "effect": undefined};
        if (classe === 'mage') {
            firstSkill["name"] = "Fireball";
            firstSkill["desc"] = "A little fireball, useful to heat food when you don't have a microwave";
            firstSkill["dmg"] = 15;
            firstSkill["cost"] = 20;
        } else if (classe === 'ranger') {
            firstSkill["name"] = "Arrow Rain";
            firstSkill["desc"] = "Can't use an umbrella to dodge this one";
            firstSkill["dmg"] = 8;
            firstSkill["cost"] = 5;
        } else if (classe === 'warrior') {
            firstSkill["name"] = "Slash";
            firstSkill["desc"] = "Cut cut cut ! You learnt it by making sushi";
            firstSkill["dmg"] = 10;
            firstSkill["cost"] = 10;
        } else if (classe === 'priest') {
            firstSkill["name"] = "Charm";
            firstSkill["desc"] = "Who doesn't love your paws ?";
            firstSkill["dmg"] = 5;
            firstSkill["cost"] = 10;
            firstSkill["effect"] = ["stun", 1];
        }
        newData["skills"].push(firstSkill);
        const leNom = newData["nom"];
        newData = JSON.stringify(newData);
        if (nom !== '') {
            if (window.confirm('You will play as ' + leNom + ', ' + gender + ', the ' + classe + '. Is that okay ? ')) {
                if (!localStorage.getItem('playerData')) {
                    localStorage.setItem('playerData', newData);
                    event = {};
                    event["Magimiu"] = 0;
                    localStorage.setItem('eventData', JSON.stringify(event));
                }
                alert("Your character has been created successfully. Welcome to our world, " + nom + " ! ♥");
                window.location.reload(true);
            }
        } else {
            alert("Please enter a name !");
        }
    }


    getCat(fur, eyes) {
        return (<div className="cat">
            <div style={{background: fur}} className="face">
                <div className="cheek left"/>
                <div className="cheek right"/>
                <div className="whisker left"/>
                <div className="whisker right"/>
                <div className="whiskerb leftb"/>
                <div className="whiskerb rightb"/>
                <div className="eye left"/>
                <div className="eye right"/>
                <div style={{background: eyes}} className="eye2 left"/>
                <div style={{background: eyes}} className="eye2 right"/>
                <div className="mouth"/>
                <div className="mouth2"/>
                <div style={{borderLeft: '60px solid ' + fur}} className="ear left"/>
                <div style={{borderRight: '60px solid ' + fur}} className="ear right"/>
            </div>
        </div>);
    }


    render() {
        return (
            <section>
                <h1>Welcome</h1>
                <div className="box">
                    <div className="form">
                        <form>
                            <label>Your name :
                                <input
                                    required={true}
                                    name="nom"
                                    type="text"
                                    placeholder="Enter your name here"
                                    value={this.state.nom}
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </label>
                            <br/>
                            <label>Your pawers :
                                <select
                                    defaultValue="mage"
                                    name="classe"
                                    onChange={(e) => this.handleChange(e)}>
                                    <option name="classe" value="mage">Mage</option>
                                    <option name="classe" value="warrior">Warrior</option>
                                    <option name="classe" value="ranger">Ranger</option>
                                    <option name="classe" value="priest">Cooking Cat</option>
                                </select>
                            </label>
                            <br/>
                            <label>Gender :</label>
                            <label>M :
                                <input
                                    name="gender"
                                    type="radio"
                                    value="M"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </label>
                            <label>F :
                                <input
                                    defaultChecked={true}
                                    value="F"
                                    name="gender"
                                    type="radio"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </label>
                            <br/>
                            <label>Appearance :</label>
                            <label>Eyes :
                                <select
                                    defaultValue="brown"
                                    name="eyes"
                                    onChange={(e) => this.handleChange(e)}>
                                    <option name="eyes" value="brown">Hazelnut</option>
                                    <option name="eyes" value="green">Apple Green</option>
                                    <option name="eyes" value="red">Cherry Red</option>
                                    <option name="eyes" value="blue">Blueberry</option>
                                    <option name="eyes" value="orange">Honey</option>
                                    <option name="eyes" value="blueviolet">Candy Purple</option>
                                </select>
                            </label>
                            <label>Fur :
                                <select
                                    defaultValue="honey"
                                    name="fur"
                                    onChange={(e) => this.handleChange(e)}>
                                    <option name="fur" value="yellow">Honey</option>
                                    <option name="fur" value="pink">Cotton Candy</option>
                                    <option name="fur" value="white">Snow</option>
                                    <option name="fur" value="darkslategrey">Night</option>
                                    <option name="fur" value="brown">Chocolate</option>
                                    <option name="fur" value="grey">Comfy</option>
                                </select>
                            </label>
                            <div className="preview">{this.getCat(this.state.fur, this.state.eyes)}</div>

                            <input type="submit" value="Ok" onClick={(e) => this.handleSubmit(e)}/>
                        </form>
                    </div>
                </div>
            </section>
        );
    }

}

export default New;