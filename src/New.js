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
        newData = JSON.stringify(newData);
        if (nom !== '') {
            if (window.confirm('You will play as ' + nom + ', ' + gender + ', the ' + classe + '. Is that okay ? ')) {
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
        return (<div className="svgCat">
            <svg viewBox="100 100 600 200" width="400" height="200" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <ellipse ry="51.5" rx="50.5" id="svg_3" cy="178.953125" cx="212" strokeOpacity="null"
                             strokeWidth="1.5" stroke="#000" fill={fur}/>
                    <path stroke="#000" transform="rotate(33.29050064086914 254.03759765625003,119.48893737792966) "
                          id="svg_4" d="m233.854438,145.430786l20.183163,-51.883708l20.183163,51.883708l-40.366326,0z"
                          strokeOpacity="null" strokeWidth="1.5" fill={fur}/>
                    <path stroke="#000" transform="rotate(-42.64216613769531 166.51176452636716,129.20672607421878) "
                          id="svg_5" d="m146.800628,151.706729l19.711137,-44.999996l19.711137,44.999996l-39.422275,0z"
                          strokeOpacity="null" strokeWidth="1.5" fill={fur}/>
                    <ellipse ry="9" rx="7" id="svg_6" cy="182.453125" cx="185.5" strokeOpacity="null" strokeWidth="1.5"
                             stroke="#000" fill={eyes}/>
                    <ellipse ry="9" rx="7" id="svg_9" cy="182.453125" cx="246.5" strokeOpacity="null" strokeWidth="1.5"
                             stroke="#000" fill={eyes}/>
                    <path transform="rotate(8.15350341796875 215.99999999999983,196.0381774902344) " stroke="#000"
                          d="m206.500001,192.029698c0,0.788286 0.311332,5.276344 0.678571,6.306291c0.259678,0.728283 -0.208026,2.726526 0.678571,3.153145c0.626917,0.301664 1.357143,0 3.392857,0c0.678571,0 3.392857,-1.576573 4.071428,-2.364859c0.678571,-0.788286 2.035714,-3.941432 1.357143,-3.941432c-1.357143,0 2.035714,3.153145 2.714286,3.153145c2.714286,0 3.392857,0 4.071428,0c0.678571,0 2.035714,-4.729718 2.035714,-7.094577l0,-0.788286"
                          id="svg_15" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" fill="none"/>
                    <line id="svg_16" y2="180.453125" x2="279.5" y1="183.453125" x1="258.5" fillOpacity="null"
                          strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="none"/>
                    <line id="svg_17" y2="176.453125" x2="139.5" y1="180.453125" x1="167.5" fillOpacity="null"
                          strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="none"/>
                    <line id="svg_18" y2="194.453125" x2="147.5" y1="194.453125" x1="170.5" fillOpacity="null"
                          strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="none"/>
                    <line id="svg_19" y2="197.453125" x2="272.5" y1="197.453125" x1="252.5" fillOpacity="null"
                          strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="none"/>
                    <rect stroke="#000" id="svg_22" height="0" width="1" y="230.453125" x="187.5" fillOpacity="null"
                          strokeOpacity="null" strokeWidth="1.5" fill={fur}/>
                    <ellipse stroke="#000" ry="42.5" rx="38" id="svg_23" cy="272.953125" cx="212.5" fillOpacity="null"
                             strokeOpacity="null" strokeWidth="1.5" fill={fur}/>
                    <line id="svg_24" y2="283.453125" x2="273.5" y1="253.453125" x1="246.5" fillOpacity="null"
                          strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="none"/>
                    <line id="svg_25" y2="267.453125" x2="151.5" y1="251.453125" x1="178.5" fillOpacity="null"
                          strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="none"/>
                    <line stroke="#000" id="svg_26" y2="334.453125" x2="185.5" y1="300.453124" x1="183.5"
                          fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" fill="none"/>
                    <line id="svg_27" y2="338.453125" x2="231.5" y1="309.453125" x1="232.5" fillOpacity="null"
                          strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="none"/>
                    <ellipse ry="8" rx="10" id="svg_28" cy="332.453125" cx="186.5" strokeWidth="1.5" stroke="#000"
                             fill={fur}/>
                    <ellipse ry="9" rx="10.5" id="svg_29" cy="336.453125" cx="235" strokeWidth="1.5" stroke="#000"
                             fill={fur}/>
                    <ellipse ry="8.5" rx="7" id="svg_30" cy="281.953125" cx="273.5" strokeWidth="1.5" stroke="#000"
                             fill={fur}/>
                    <ellipse ry="6.5" rx="6" id="svg_31" cy="267.953125" cx="152.5" strokeWidth="1.5" stroke="#000"
                             fill={fur}/>
                    <ellipse stroke="#FFA9A2" ry="7.5" rx="8" id="svg_32" cy="196.953125" cx="174.5" strokeWidth="1.5"
                             fill="#FFAC8D"/>
                    <ellipse ry="7.5" rx="8" id="svg_33" cy="199.953125" cx="252.5" strokeWidth="1.5" stroke="#FFA9A2"
                             fill="#FFAC8D"/>
                </g>
            </svg>
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
                            {this.getCat(this.state.fur, this.state.eyes)}

                            <input type="submit" value="Ok" onClick={(e) => this.handleSubmit(e)}/>
                        </form>
                    </div>
                </div>
            </section>
        );
    }

}

export default New;