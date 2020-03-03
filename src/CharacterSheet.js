import React, {Component} from "react";
import img from './img.png';
class CharacterSheet extends Component {

    render() {
        return <div className="chara">
            <img className="avatar" src={img} alt="chara"/>
            {this.props.name}<br/>
            {this.props.classe}, {this.props.gender}
        </div>
    }
}
export default CharacterSheet;