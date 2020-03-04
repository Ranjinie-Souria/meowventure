import React, {Component} from "react";
class Area extends Component {
    constructor(props){
        super(props);
        const area = localStorage.getItem('area');
        const eventData = localStorage.getItem('eventData');
        this.state = {
            dialogue: '',
            area: area,
            eventData: eventData,
        };
    }

    resetDialogue(){
        this.setState({dialogue: ''});
    }
    setDialogue(dialogue){
        this.setState({
            dialogue: <div><div className="dialogue">{dialogue}</div>
                <button className="dialogue-button" id="close" onClick={() => this.resetDialogue()}>X</button>
            </div>
        })
    }

    setNPCDialogue(npc, dialogue) {
        this.setState({
            dialogue: <div className="dialogueNPC"><h2>{npc}</h2><br/>{dialogue}</div>
        })
    }

    getArea(){
        const area = this.state.area;
        if (!area){
            localStorage.setItem('area','home');
            return this.home();
        }
        else if (area === 'home'){
            return this.home();
        }
        else if (area === 'garden'){
            return this.garden();
        } else if (area === 'forest') {
            return this.forest();
        } else if (area === 'catcity') {
            return this.catcity();
        }
    }

    goToArea(theArea){
        this.resetDialogue();
        localStorage.setItem('area',theArea);
        this.setState({area: theArea});
    }

    home(){
        const self = this;
        function bed() {
            let count = 1;
            self.setDialogue(<div>Your comfy bed, it smells just like you. <br/>Maybe you don't actually smell good but,
                for some reason, <br/>
                your bed is very appealing. Looking at it makes you want to take a nap.<br/>
            <button onClick={() => nap()}>Take a little nap</button></div>);
            function nap() {
                if (count < 5) {
                    count += 1;
                    self.setDialogue(<div>Zzzz... Just 5 minutes. <br/>
                        That's what you said after having {count} delicious hours of sleep. <br/>
                        Do you want to sleep more ?
                        <button onClick={() => nap()}>Sleep more</button></div>)
                }
                else {
                    self.setDialogue(<div>You took {count} hours of naps. I think that's enough. <br/>
                        Don't you feel like going outside ? No ? Well that's up to you.</div>)
                }
            }
        }

        function exit() {
            self.setDialogue(<div>The exit door. Do you want to leave your home ?<br/>
                <button onClick={() => self.goToArea('garden')}>Leave home</button></div>);
        }

        return <div className="home">
            {this.state.dialogue}
            <button onClick={() => bed()}>Bed</button>
            <button onClick={() => exit()}>Door</button>

        </div>
    }

    events(data, value) {
        this.resetDialogue();
        let event = this.state.eventData;
        event = JSON.parse(event);
        event[data] = value;
        event = JSON.stringify(event);
        localStorage.setItem('eventData', event);
        this.setState({eventData: event});
    }

    garden(){
        const self = this;
        let event = this.state.eventData;
        event = JSON.parse(event);

        function flowers() {
            if (!event["flowers"]) {
                self.events("flowers", 0);
                self.setDialogue(<div>Your flowers seem to be thirsty. Would you like to give them some water ?<br/>
                    <button onClick={() => self.events("flowers", 1)}>Water the plants</button>
                </div>);
            }
            if (event["flowers"] === 0) {
                self.setDialogue(<div>Your flowers seem to be thirsty. Would you like to give them some water ?<br/>
                    <button onClick={() => self.events("flowers", 1)}>Water the plants</button>
                </div>);
            } else if (event["flowers"] === 1) {
                self.setDialogue(<div>Your flowers are absolutely perfect ! Do you want to kill them ?<br/>
                    <button onClick={() => self.events("flowers", 2)}>Water the plants until they die</button>
                </div>);
            } else if (event["flowers"] > 1) {
                self.setDialogue(<div>Your flowers are dead. You drowned them. You were never a good gardener.<br/>
                </div>);
            }
        }

        function exit() {
            self.setDialogue(<div>This path leads to the forest. Cat City is not so far away from it. <br/>
                Do you want to leave your garden ?<br/>
                <button onClick={() => self.goToArea('forest')}>Leave the garden</button>
            </div>);
        }

        return <div className="home">
            {this.state.dialogue}
            <button onClick={() => self.goToArea('home')}>Home</button>
            <button onClick={() => flowers()}>Flowers</button>
            <button onClick={() => exit()}>Forest</button>
        </div>
    }

    forest(){
        const self = this;
        let event = this.state.eventData;
        event = JSON.parse(event);

        function trees() {
            self.setDialogue(<div>As you look at the landscape, you can hear birds singing. <br/>
                The trees are very tall and you enjoy the sound of the wind playing with their leaves.<br/>
                It's a calming feeling but you don't have the time to look at the trees for hours.<br/> Or maybe you do
                ? <br/></div>);
        }

        function stonePath() {
            self.setDialogue(<div>This path leads to Cat City. <br/>
                Do you want to leave the forest ?<br/>
                <button onClick={() => self.goToArea('catcity')}>Go to Cat City</button>
            </div>);
        }

        function grassField() {
            function talk() {
                if (event["Magimiu"] === 0) {
                    self.setNPCDialogue('Magimiu',
                        <div>Hello ! You are {self.props.name}, right ? <br/>
                            I saw your house ! It's so pretty.
                            <br/> She smiles at you.

                            <button onClick={() => self.setNPCDialogue('Magimiu',
                                <div>It's written on your door.
                                    <button onClick={() => talk()}>Oh. That's true.</button></div>)}>
                                How do you know my name ?</button>

                            <button onClick={() => self.setNPCDialogue('Magimiu',
                                <div>I'm Magimiu ! The powerful mage !
                                    <button onClick={() => talk()}>Oh. That's true.</button></div>)}>
                                Who are you ?
                            </button>

                        </div>
                    );
                }
            }

            if (event["Magimiu"] === 0) {
                self.setDialogue(<div>A huge field of grass. <br/>
                    You thought there wouldn't be anything here but you see a Catizen looking at you.
                    <br/> She seems to be a Mage according to her clothes.
                    <button onClick={() => talk()}>Talk to her</button></div>);
            } else {
                self.setDialogue(<div>A huge field of grass. <br/>
                    There's nothing here, except bugs, and other tiny stuff that you can't see.<br/></div>);
            }
        }

        function grassPath() {
            self.setDialogue(<div>You have no idea where this path leads to. <br/>
                Actually, you aren't even sure that it's a path.<br/>
                <button onClick={() => grassField()}>Follow the grass path</button>
            </div>);
        }

        return <div className="home">
            {this.state.dialogue}
            <button onClick={() => self.goToArea('garden')}>{this.props.name}'s House</button>
            <button onClick={() => trees()}>Trees</button>
            <button onClick={() => grassPath()}>Grass path</button>
            <button onClick={() => stonePath()}>Stone path</button>
        </div>
    }

    catcity() {
        const self = this;
        return <div className="home">
            {this.state.dialogue}
            <button onClick={() => self.goToArea('forest')}>Forest near {this.props.name}'s House</button>
        </div>
    }


    render() {
        return this.getArea();
    }


}
export default Area;