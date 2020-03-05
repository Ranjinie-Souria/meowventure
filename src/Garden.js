import React from 'react';

class Garden extends React.Component {
    constructor(props) {
        super(props);
    }

    events(data, value) {
        let event = this.props.eventData;
        this.props.childDialogue('');
        if (this.props.eventData) {
            event = JSON.parse(event);
        } else {
            event = {};
        }
        event[data] = value;
        event = JSON.stringify(event);
        localStorage.setItem('eventData', event);
        this.props.childEvent(event);
    }

    flowers() {
        const self = this;
        let event = JSON.parse(this.props.eventData);
        if (!event) {
            window.location.reload();
        }
        if (!event["flowers"]) {
            self.events("flowers", 0);
        }
        if (event["flowers"] === 0 || !event["flowers"]) {
            self.props.childDialogue(<div>Your flowers seem to be thirsty. Would you like to give them some water ?<br/>
                <button onClick={() => self.events("flowers", 1)}>Water the plants</button>
            </div>);
        } else if (event["flowers"] === 1) {
            self.props.childDialogue(<div>Your flowers are absolutely perfect ! Do you want to kill them ?<br/>
                <button onClick={() => self.events("flowers", 2)}>Water the plants until they die</button>
            </div>);
        } else if (event["flowers"] > 1) {
            self.props.childDialogue(<div>Your flowers are dead. You drowned them. You were never a good gardener.<br/>
            </div>);
        }
    }

    exit() {
        const self = this;
        let event = JSON.parse(this.props.eventData);
        this.props.childDialogue(<div>This path leads to the forest. Cat City is not so far away from it. <br/>
            Do you want to leave your garden ?<br/>
            <button onClick={() => this.props.childArea('forest')}>Leave the garden</button>
        </div>);
    }


    render() {
        return <div className="home">
            <button onClick={() => this.props.childArea('home')}>Home</button>
            <button onClick={() => this.flowers()}>Flowers</button>
            <button onClick={() => this.exit()}>Forest</button>
        </div>;
    }
}

export default Garden;