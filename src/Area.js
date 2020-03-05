import React, {Component} from "react";
import Home from "./Home";

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
        this.setDialogue(childData);

    };
    getChildArea = (childData) => {
        this.resetDialogue();
        this.setState({area: childData});
        localStorage.setItem('area', childData);
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
            return <div className="home">{this.getDialogue()}<Home childDialogue={this.getChildDialogue}
                                                                   childArea={this.getChildArea}
                                                                   noEvent={this.noEvent}/></div>;
        } else if (area === 'home') {
            return <div className="home">{this.getDialogue()}<Home childDialogue={this.getChildDialogue}
                                                                   childArea={this.getChildArea}
                                                                   noEvent={this.noEvent}/></div>;
        } else if (area === 'garden') {
            return this.garden();
        } else if (area === 'forest') {
            return this.forest();
        } else if (area === 'catcity') {
            return this.catcity();
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

    garden() {
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

    forest() {
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
                    self.events("Magimiu", 1);
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
            }

            if (event["Magimiu"] === 2) {
                self.setNPCDialogue("Magimiu", <div>I've been waiting for SO long ! <br/>
                    Come faster !

                    <button onClick={() =>

                        self.setDialogue(
                            <div>The grass field smells really good today. Oh, seems like it's not only the grass'
                                smell. <br/>
                                Magimiu put a delicious looking chocolate cake on a trunk of a tree. <br/> Was that
                                trunk always here ? Well, it's not like you care right.<br/>

                                <button onClick={() =>
                                    self.setNPCDialogue("Magimiu", <div>Okay so, first of all I need to explain you the
                                        lore. Wait a minute. <br/>
                                        <button onClick={() =>
                                            self.setDialogue(<div>She takes a book out of her hat, you can read "Script"
                                                written on the cover.<br/>
                                                Haha. Does she thinks that we're living in a simulation ?

                                                <button onClick={() =>
                                                    self.setNPCDialogue("Magimiu", <div>Alright. So, basically, there is
                                                        a bad guy, we are the good guys, and we need to win ! <br/>
                                                        Now, kill this cake ! Come on ! It's the training ! Actually you
                                                        don't HAVE to kill it.<br/> Just do what your soul tells you to
                                                        do.
                                                        <button onClick={() =>
                                                            self.setDialogue(
                                                                <div>Yes. You are against any kind of physical abuse
                                                                    made to cake.<br/> Actually, you don't even like
                                                                    chocolate.<br/>
                                                                    And chocolate is harmful for cats. Good
                                                                    decision, {self.props.name}.<br/>
                                                                    You show your paws to Magimiu. Why are you doing
                                                                    this ? <br/> No one knows. Except you, of course.
                                                                    <button onClick={() =>
                                                                        self.setNPCDialogue("Magimiu", <div>
                                                                            Wow... Your paws... They are so...
                                                                            Hypnotizing.
                                                                            You are truly remarkable, {self.props.name}.<br/>
                                                                            <button onClick={() =>
                                                                                self.setDialogue(
                                                                                    <div>Magimiu blushes. She is really
                                                                                        interested in your
                                                                                        paws.<br/> Good job !

                                                                                    </div>)}>Next
                                                                            </button>
                                                                        </div>)}>Look at my paws.</button>
                                                                </div>)}>Sorry I am strongly against physical abuse to
                                                            cakes. I will proceed to show you my paws.</button>

                                                        <button onClick={() =>
                                                            self.setDialogue(<div>
                                                                You look at the cake. The delicious smell of chocolate
                                                                and cream attracts you.<br/>
                                                                You proceed to eat the whole cake. Its sweet taste makes
                                                                you shiver from pleasure.<br/>
                                                                What a delicious treat !

                                                                <button onClick={() => self.setNPCDialogue("Magimiu",
                                                                    <div>I... Asked you to kill it. NOT TO EAT IT !<br/>
                                                                        And that cake was pretty expensive ! Please
                                                                        !<br/>

                                                                        <button
                                                                            onClick={() => self.setNPCDialogue("Magimiu",
                                                                                <div>
                                                                                    Do you eat your enemies ?
                                                                                    <button
                                                                                        onClick={() => self.setNPCDialogue("Magimiu",
                                                                                            <div>
                                                                                                Of course you don't
                                                                                                !<br/> Uh... Wait...
                                                                                                What did you just
                                                                                                say...?<br/>
                                                                                                Uh. Anyway... Let's move
                                                                                                on.
                                                                                            </div>)}>Yes</button>
                                                                                    <button onClick={() =>
                                                                                        self.setNPCDialogue("Magimiu",
                                                                                            <div>
                                                                                                Of course you don't !
                                                                                            </div>)}>No
                                                                                    </button>

                                                                                </div>)}>Why would you rather kill it
                                                                            than eat it ?
                                                                        </button>
                                                                    </div>)}>Next</button>

                                                            </div>)}>Why kill the cake when we can just eat it ?
                                                        </button>


                                                    </div>)}>Next</button>


                                            </div>)}>Next
                                        </button>

                                    </div>)}>What are we doing here ?
                                </button>

                            </div>)}>Yes, calm down.</button></div>);
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

        function eventList() {
            if (event["Magimiu"] === 0 || event["Magimiu"] === 2) {
                self.setDialogue(<div>You can see a weird grass path not so far away.<br/>
                    You also hear noises in that direction<br/>
                    <button onClick={() => grassField()}>Follow the grass path</button>
                </div>);
            } else {
                self.noEvent()
            }
        }

        return <div className="home">
            {this.state.dialogue}
            <button onClick={() => eventList()}>Check the area</button>
            <button onClick={() => self.goToArea('garden')}>{this.props.name}'s House</button>
            <button onClick={() => trees()}>Trees</button>
            <button onClick={() => grassPath()}>Grass path</button>
            <button onClick={() => stonePath()}>Stone path</button>
        </div>
    }

    catcity() {
        const self = this;
        let event = JSON.parse(this.state.eventData);

        function nextDia() {
            if (event["Magimiu"] === 1) {

                self.setDialogue(<div>As you keep on walking, you recognize Magimiu. <br/> She looks at you,
                    excited.<br/>

                    <button onClick={() =>
                        self.setNPCDialogue("Magimiu", <div>Hey ! It's you again !
                            Are you looking for a job ? <br/>Please say yes. I need your help. It's about the end of the
                            world !<br/>

                            <button
                                onClick={() => self.setNPCDialogue("Magimiu", <div>I knew it ! You're pawsome ! Anyway,
                                    meet me in
                                    the forest ! <br/>
                                    I'll be waiting for you ! And you'd better come. Don't make me wait...
                                    <button onClick={() => self.setDialogue(<div>She smiles at you before running to the
                                        forest. <br/>
                                        Well. At least you can earn money now.<br/>
                                        {self.events("Magimiu", 2)}
                                    </div>)}>Next</button>
                                </div>)}>Yes
                            </button>
                            <button onClick={() => self.setNPCDialogue("Magimiu", <div>What do you mean NO !? <br/>
                                <button
                                    onClick={() => self.setDialogue(<div>She takes her magical staff and starts meowing
                                        weird words. <br/>
                                        She smiles at you.<br/>
                                        <button
                                            onClick={() => self.setNPCDialogue("Magimiu", <div>Of course you'll help !
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
                self.setDialogue(<div>As you keep on walking, you see a weird Catizen. <br/> She seems to be a Mage
                    according to her clothes.<br/>
                    <button onClick={() =>
                        self.setNPCDialogue("Magimiu", <div>CATIZENS ! Help save the world ! Hey you here !
                            Are you looking for a job ? <br/>Please say yes. I need your help. It's about the end of the
                            world !<br/>
                            <button
                                onClick={() => self.setNPCDialogue("Magimiu", <div>Yes young catizen !<br/> My magic
                                    detects that your name is...
                                    {self.props.name} ! Okay, to be honest I've read it somewhere.<br/> Anyway, meet me
                                    in the forest ! <br/>
                                    I'll be waiting for you ! And you'd better come. Don't make me wait...
                                    <button onClick={() => self.setDialogue(<div>She smiles at you before running to the
                                        forest. <br/>
                                        Well. At least you can earn money now.<br/>
                                        {self.events("Magimiu", 2)}
                                    </div>)}>Next</button>
                                </div>)}>Yes
                            </button>
                            <button onClick={() => self.setNPCDialogue("Magimiu", <div>What do you mean NO !? <br/>
                                <button
                                    onClick={() => self.setDialogue(<div>She takes her magical staff and starts meowing
                                        weird words. <br/>
                                        She smiles at you.<br/>
                                        <button
                                            onClick={() => self.setNPCDialogue("Magimiu", <div>Of course you'll help !
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

        function eventList() {
            if (event["Magimiu"] < 2 || event["Magimiu"] === undefined) {
                self.setDialogue(<div>You arrived at Cat City. <br/>
                    It's a beautiful place where most of the Catizen live. <br/>You can see markets, the huge castle,
                    schools...<br/>
                    Basically everything a city needs.<br/>
                    <button onClick={() => nextDia()}>Next</button>
                </div>);
            } else {
                self.noEvent();
            }
        }

        return <div className="home">
            {this.state.dialogue}
            <button onClick={eventList}>Check the area</button>
            <button onClick={() => self.goToArea('forest')}>Forest near {this.props.name}'s House</button>
        </div>
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