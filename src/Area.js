import React, {Component} from "react";
import Home from "./Home";
import Garden from "./Garden";
import Forest from "./Forest";
import CatCity from "./CatCity"

class Area extends Component {
    constructor(props) {
        super(props);
        const area = localStorage.getItem('area');
        const eventData = localStorage.getItem('eventData');
        this.state = {
            dialogue: '',
            area: area,
            eventData: eventData,
        };

        this.getChildDialogue = this.getChildDialogue.bind(this)
        this.getChildArea = this.getChildArea.bind(this)

    }

    getChildDialogue = (childData) => {
        if (childData !== '') {
            this.setDialogue(childData);
        } else {
            this.resetDialogue();
        }
    };

    getChildNpcDialogue = (npc, childData) => {
        if (childData !== '') {
            this.setNPCDialogue(npc, childData);
        } else {
            this.resetDialogue();
        }
    };


    getChildArea = (childData) => {
        this.resetDialogue();
        this.setState({area: childData});
        localStorage.setItem('area', childData);
    };


    setChildEvent = (childData) => {
        this.setState({eventData: childData});
    };

    noEvent() {
        this.setDialogue(<div>There is nothing important to see here.<br/></div>);
    }

    resetDialogue() {
        this.setState({dialogue: ''});
    }

    setDialogue(dialogue) {
        this.setState({
            dialogue: <div>
                <div className="dialogue">{dialogue}</div>
                {this.getCloseButton()}
            </div>
        });
    }

    getCloseButton() {
        return <button className="dialogue-button" id="close" onClick={() => this.resetDialogue()}>X</button>;
    }

    setNPCDialogue(npc, dialogue) {
        this.setState({
            dialogue: <div className="dialogueNPC"><h2>{npc}</h2><br/>{dialogue}</div>
        })
    }

    getDialogue() {
        if (this.state.dialogue !== '') {
            return this.state.dialogue
        } else {
            return '';
        }
    }

    getArea() {
        const area = this.state.area;
        if (!area) {
            localStorage.setItem('area', 'home');
        }
        if (area === 'home' || !area) {
            return <div className="home">{this.getDialogue()}<Home childDialogue={this.getChildDialogue}
                                                                   childArea={this.getChildArea}
                                                                   name={this.props.name}
                                                                   classe={this.props.classe}
                                                                   gender={this.props.gender}
                                                                   noEvent={this.noEvent}/></div>;
        } else if (area === 'garden') {
            return <div className="home">{this.getDialogue()}<Garden childDialogue={this.getChildDialogue}
                                                                     eventData={this.state.eventData}
                                                                     childArea={this.getChildArea}
                                                                     childEvent={this.setChildEvent}
                                                                     name={this.props.name}
                                                                     classe={this.props.classe}
                                                                     gender={this.props.gender}
                                                                     noEvent={this.noEvent}/></div>;
        } else if (area === 'forest') {
            return <div className="home">{this.getDialogue()}<Forest childDialogue={this.getChildDialogue}
                                                                     childNpcDialogue={this.getChildNpcDialogue}
                                                                     eventData={this.state.eventData}
                                                                     childArea={this.getChildArea}
                                                                     childEvent={this.setChildEvent}
                                                                     name={this.props.name}
                                                                     classe={this.props.classe}
                                                                     gender={this.props.gender}
                                                                     noEvent={this.noEvent}/></div>;
        } else if (area === 'catcity') {
            return <div className="home">{this.getDialogue()}<CatCity childDialogue={this.getChildDialogue}
                                                                      childNpcDialogue={this.getChildNpcDialogue}
                                                                      eventData={this.state.eventData}
                                                                      childArea={this.getChildArea}
                                                                      childEvent={this.setChildEvent}
                                                                      name={this.props.name}
                                                                      classe={this.props.classe}
                                                                      gender={this.props.gender}
                                                                      noEvent={this.noEvent}/></div>;
        }
    }

    goToArea(theArea) {
        this.resetDialogue();
        localStorage.setItem('area', theArea);
        this.setState({area: theArea});
    }

    events(data, value) {
        let event = this.state.eventData;
        this.resetDialogue();
        if (this.state.eventData) {
            event = JSON.parse(event);
        } else {
            event = {};
        }
        event[data] = value;
        event = JSON.stringify(event);
        localStorage.setItem('eventData', event);
        this.setState({eventData: event});
    }

    checkEventData() {
        if (this.state.eventData) {
            return this.getArea();
        } else {
            localStorage.setItem('eventData', '{}');
            return this.getArea();
        }
    }


    render() {
        return this.checkEventData();
    }


}

export default Area;