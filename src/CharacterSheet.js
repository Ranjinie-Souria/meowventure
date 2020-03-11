import React, {Component} from "react";
import './cat.css';
class CharacterSheet extends Component {


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
        const cat = JSON.parse(localStorage.getItem('playerData')).cat;
        return <div className="chara">
            <div className="bar">
                <div style={{width: this.props.hp + '%'}}
                     className="barInside">{this.props.hp}/100
                </div>
            </div>
            <div className="bar">
                <div style={{width: this.props.pw + '%', backgroundColor: 'aquamarine'}}
                     className="barInside">{this.props.pw}/100
                </div>
            </div>
            <div className="money">{this.props.money}</div>
            {this.getCat(cat[0], cat[1])}
            <div className="chara2"><h3>{this.props.name}<br/>
                {this.props.classe.toUpperCase()}, {this.props.gender}</h3></div>
        </div>
    }
}

export default CharacterSheet;