import React, {Component} from "react";

class CatCity extends Component {


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

    nextDia() {
        const self = this;
        let event = JSON.parse(this.props.eventData);
        if (event["Magimiu"] === 1) {
            self.props.childDialogue(<div>As you keep on walking, you recognize Magimiu. <br/> She looks at you,
                excited.<br/>

                <button onClick={() =>
                    self.props.childNpcDialogue("Magimiu", <div>Hey ! It's you again !
                        Are you looking for a job ? <br/>Please say yes. I need your help. It's about the end of the
                        world !<br/>

                        <button
                            onClick={() => self.props.childNpcDialogue("Magimiu", <div>I knew it ! You're pawsome !
                                Anyway,
                                meet me in
                                the forest ! <br/>
                                I'll be waiting for you ! And you'd better come. Don't make me wait...
                                <button
                                    onClick={() => self.props.childDialogue(<div>She smiles at you before running to the
                                        forest. <br/>
                                        Well. At least you can earn money now.<br/>
                                        {self.events("Magimiu", 2)}
                                    </div>)}>Next</button>
                            </div>)}>Yes
                        </button>
                        <button onClick={() => self.props.childNpcDialogue("Magimiu", <div>What do you mean NO !? <br/>
                            <button
                                onClick={() => self.props.childDialogue(<div>She takes her magical staff and starts
                                    meowing
                                    weird words. <br/>
                                    She smiles at you.<br/>
                                    <button
                                        onClick={() => self.props.childNpcDialogue("Magimiu", <div>Of course you'll help
                                            !
                                            Anyway, meet me in the forest ! <br/>
                                            I'll be waiting for you ! And you'd better come. Don't make me wait...
                                            {self.events("Magimiu", 2)}
                                            {self.getCloseButton()}
                                        </div>)}>Yes, Master.
                                    </button>
                                </div>)}>Next
                            </button>
                        </div>)}>No
                        </button>


                    </div>)}>Next
                </button>
            </div>);
        } else if (event["Magimiu"] === 0 || event["Magimiu"] === undefined) {
            self.props.childDialogue(<div>As you keep on walking, you see a weird Catizen. <br/> She seems to be a Mage
                according to her clothes.<br/>
                <button onClick={() =>
                    self.props.childNpcDialogue("Magimiu", <div>CATIZENS ! Help save the world ! Hey you here !
                        Are you looking for a job ? <br/>Please say yes. I need your help. It's about the end of the
                        world !<br/>
                        <button
                            onClick={() => self.props.childNpcDialogue("Magimiu", <div>Yes young catizen !<br/> My magic
                                detects that your name is...
                                {self.props.name} ! Okay, to be honest I've read it somewhere.<br/> Anyway, meet me
                                in the forest ! <br/>
                                I'll be waiting for you ! And you'd better come. Don't make me wait...
                                <button
                                    onClick={() => self.props.childDialogue(<div>She smiles at you before running to the
                                        forest. <br/>
                                        Well. At least you can earn money now.<br/>
                                        {self.events("Magimiu", 2)}
                                    </div>)}>Next</button>
                            </div>)}>Yes
                        </button>
                        <button onClick={() => self.props.childNpcDialogue("Magimiu", <div>What do you mean NO !? <br/>
                            <button
                                onClick={() => self.props.childDialogue(<div>She takes her magical staff and starts
                                    meowing
                                    weird words. <br/>
                                    She smiles at you.<br/>
                                    <button
                                        onClick={() => self.props.childNpcDialogue("Magimiu", <div>Of course you'll help
                                            !
                                            <br/> My magic detects that your name is...
                                            {self.props.name} ! Okay, to be honest I've read it somewhere.<br/>
                                            Anyway, meet me in the forest ! <br/>
                                            I'll be waiting for you ! And you'd better come. Don't make me wait...
                                            {self.events("Magimiu", 2)}
                                            {self.getCloseButton()}
                                        </div>)}>Yes, Master.
                                    </button>
                                </div>)}>Next
                            </button>
                        </div>)}>No
                        </button>


                    </div>)}>Next
                </button>
            </div>);
        }
    }

    eventList() {
        const self = this;
        let event = JSON.parse(self.props.eventData);
        if (event["Magimiu"] < 2 || event["Magimiu"] === undefined) {
            self.props.childDialogue(<div>You arrived at Cat City. <br/>
                It's a beautiful place where most of the Catizen live. <br/>You can see markets, the huge castle,
                schools...<br/>
                Basically everything a city needs.<br/>
                <button onClick={() => self.nextDia()}>Next</button>
            </div>);
        } else {
            self.props.childDialogue(<div>There is nothing important to see here.<br/>
            </div>);
        }
    }

    render() {
        return <div className="home">
            <button onClick={() => this.eventList()}>Check the area</button>
            <button onClick={() => this.props.childArea('forest')}>Forest near {this.props.name}'s House</button>
        </div>
    }
}

export default CatCity;


    

    
