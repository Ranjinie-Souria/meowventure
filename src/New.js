import React, {Component} from "react";
class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            classe: 'mage',
            gender: 'F',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value});
        console.log(value);
    }

    handleSubmit(event) {
        const nom = this.state.nom;
        const classe = this.state.classe;
        const gender = this.state.gender;
        event.preventDefault();
        const newData = '{"nom" : "'+nom+'","classe" : "'+classe+'","g" : "'+gender+'"}';
        let data;

        if(nom !== ''){
            if(window.confirm('You will play as '+nom+', ' +gender+', the '+classe+'. Is that okay ? ')) {
                if(!localStorage.getItem('playerData')) {
                    data = newData;
                    localStorage.setItem('playerData',data.toString());
                }
                alert("Your character has been created successfully. Welcome to our world, "+nom+" ! ♥");
                window.location.reload(true);
            }
        }
        else {
            alert("Please enter a name !");
        }


    }

    render() {
        return (
            <section><h1>Welcome</h1>
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
                        /></label>
                        <br/>
                        <label>Your pawers :
                        <select defaultValue="mage" name="classe"
                                onChange={(e) => this.handleChange(e)}>
                            <option name="classe" value="mage">Mage</option>
                            <option name="classe" value="warrior">Warrior</option>
                            <option name="classe" value="ranger">Ranger</option>
                            <option name="classe" value="priest">Cooking Cat</option>
                        </select> </label>
                        <br/>
                        <label>Gender :</label>
                        <label>M :
                        <input
                        name="gender"
                        type="radio"
                        value="M"
                        onChange={(e) => this.handleChange(e)}
                        /></label>
                        <label>F :
                        <input
                            defaultChecked={true}
                            value="F"
                            name="gender"
                            type="radio"
                            onChange={(e) => this.handleChange(e)}
                        /></label>
                        <br/>
                        <input type="submit" value="Ok" onClick={(e) => this.handleSubmit(e)} />
                    </form>
                </div>
            </div></section>
        );
    }

}
export default New;