import React, {Component} from "react";

class Forest extends Component {

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


    trees() {
        const self = this;
        let event = JSON.parse(this.props.eventData);
        self.props.childDialogue(<div>As you look at the landscape, you can hear birds singing. <br/>
            The trees are very tall and you enjoy the sound of the wind playing with their leaves.<br/>
            It's a calming feeling but you don't have the time to look at the trees for hours.<br/> Or maybe you do
            ? <br/></div>);
    }

    stonePath() {
        const self = this;
        let event = JSON.parse(this.props.eventData);
        self.props.childDialogue(<div>This path leads to Cat City. <br/>
            Do you want to leave the forest ?<br/>
            <button onClick={() => self.props.childArea('catcity')}>Go to Cat City</button>
        </div>);
    }

    grassField() {
        const self = this;
        let event = JSON.parse(this.props.eventData);


        function talk() {
            if (event["Magimiu"] === 0) {
                self.events("Magimiu", 1);
                self.props.childNpcDialogue('Magimiu',
                    <div>Hello ! You are {self.props.name}, right ? <br/>
                        I saw your house ! It's so pretty.
                        <br/> She smiles at you.

                        <button onClick={() => self.props.childNpcDialogue('Magimiu',
                            <div>It's written on your door.
                                <button onClick={() => talk()}>Oh. That's true.</button></div>)}>
                            How do you know my name ?</button>

                        <button onClick={() => self.props.childNpcDialogue('Magimiu',
                            <div>I'm Magimiu ! The powerful mage !
                                <button onClick={() =>
                                    self.props.childNpcDialogue("Magimiu",
                                        <div>
                                            What ! Aren't you impressed ?!

                                            <button onClick={
                                                self.props.childDialogue(<div>You dab in front of her and leave her
                                                    speechless. <br/>
                                                    Yeah, you weren't the favorite child when you were young.
                                                    <button
                                                        onClick={self.props.childNpcDialogue("Magimiu", <div>Wait ! You
                                                            said you were a {self.props.classe} !<br/>

                                                        </div>)}>Next</button>
                                                </div>)

                                            }>No, I don't care. I am a powerful {self.props.classe}.</button>

                                            <button onClick={
                                                self.props.childDialogue(<div>You proceed to clap, treating her like she
                                                    was a little kitten.<br/>
                                                    Actually, you have no idea how old she is. You don't even know your
                                                    age, nor your backstory.<br/>
                                                    Wait, have you lost your memory ? Are you okay, {self.props.name} ?

                                                    <button onClick={self.props.childNpcDialogue("Magimiu",
                                                        <div>You're so sweet haha ! Anyway, I gotta go now, see you
                                                            later !
                                                            <button
                                                                onClick={self.props.childDialogue(<div>She leaves the
                                                                    grass field.</div>)}>Bye Magimiu !</button>
                                                        </div>
                                                    )}>Next</button>

                                                </div>)
                                            }>Wah ! That's so cool a mage ! Incredible !
                                            </button>

                                            <button onClick={
                                                self.props.childDialogue(<div>You dab in front of her and leave her
                                                    speechless. <br/>
                                                    Yeah, you weren't the favorite child when you were young.</div>)
                                            }>Okay boomer.
                                            </button>

                                        </div>)


                                }>Oh. Well okay cool I guess.</button></div>)}>
                            Who are you ?
                        </button>

                    </div>
                );
            }
        }

        if (event["Magimiu"] === 0) {
            self.props.childDialogue(<div>A huge field of grass. <br/>
                You thought there wouldn't be anything here but you see a Catizen looking at you.
                <br/> She seems to be a Mage according to her clothes.
                <button onClick={() => talk()}>Talk to her</button></div>);
        } else if (event["Magimiu"] === 2) {
            self.props.childNpcDialogue("Magimiu", <div>I've been waiting for SO long ! <br/>
                Come faster !

                <button onClick={() =>

                    self.props.childDialogue(
                        <div>The grass field smells really good today. Oh, seems like it's not only the grass'
                            smell. <br/>
                            Magimiu put a delicious looking chocolate cake on a trunk of a tree. <br/> Was that
                            trunk always here ? Well, it's not like you care right.<br/>

                            <button onClick={() =>
                                self.props.childNpcDialogue("Magimiu", <div>Okay so, first of all I need to explain you
                                    the
                                    lore. Wait a minute. <br/>
                                    <button onClick={() =>
                                        self.props.childDialogue(<div>She takes a book out of her hat, you can read
                                            "Script"
                                            written on the cover.<br/>
                                            Haha. Does she thinks that we're living in a simulation ?

                                            <button onClick={() =>
                                                self.props.childNpcDialogue("Magimiu", <div>Alright. So, basically,
                                                    there is
                                                    a bad guy, we are the good guys, and we need to win ! <br/>
                                                    Now, kill this cake ! Come on ! It's the training ! Actually you
                                                    don't HAVE to kill it.<br/> Just do what your soul tells you to
                                                    do.
                                                    <button onClick={() =>
                                                        self.props.childDialogue(
                                                            <div>Yes. You are against any kind of physical abuse
                                                                made to cake.<br/> Actually, you don't even like
                                                                chocolate.<br/>
                                                                And chocolate is harmful for cats. Good
                                                                decision, {self.props.name}.<br/>
                                                                You show your paws to Magimiu. Why are you doing
                                                                this ? <br/> No one knows. Except you, of course.
                                                                <button onClick={() =>
                                                                    self.props.childNpcDialogue("Magimiu", <div>
                                                                        Wow... Your paws... They are so...
                                                                        Hypnotizing.
                                                                        You are truly
                                                                        remarkable, {self.props.name}.<br/>
                                                                        <button onClick={() =>
                                                                            self.props.childDialogue(
                                                                                <div>Magimiu blushes. She is really
                                                                                    interested in your
                                                                                    paws.<br/> Good job !

                                                                                </div>)}>Next
                                                                        </button>
                                                                    </div>)}>Look at my paws.</button>
                                                            </div>)}>Sorry I am strongly against physical abuse to
                                                        cakes. I will proceed to show you my paws.</button>

                                                    <button onClick={() =>
                                                        self.props.childDialogue(<div>
                                                            You look at the cake. The delicious smell of chocolate
                                                            and cream attracts you.<br/>
                                                            You proceed to eat the whole cake. Its sweet taste makes
                                                            you shiver from pleasure.<br/>
                                                            What a delicious treat !

                                                            <button
                                                                onClick={() => self.props.childNpcDialogue("Magimiu",
                                                                    <div>I... Asked you to kill it. NOT TO EAT IT !<br/>
                                                                        And that cake was pretty expensive ! Please
                                                                        !<br/>

                                                                        <button
                                                                            onClick={() => self.props.childNpcDialogue("Magimiu",
                                                                                <div>
                                                                                    Do you eat your enemies ?
                                                                                    <button
                                                                                        onClick={() => self.props.childNpcDialogue("Magimiu",
                                                                                            <div>
                                                                                                Of course you don't
                                                                                                !<br/> Uh... Wait...
                                                                                                What did you just
                                                                                                say...?<br/>
                                                                                                Uh. Anyway... Let's move
                                                                                                on.
                                                                                            </div>)}>Yes</button>
                                                                                    <button onClick={() =>
                                                                                        self.props.childNpcDialogue("Magimiu",
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
            self.props.childDialogue(<div>A huge field of grass. <br/>
                There's nothing here, except bugs, and other tiny stuff that you can't see.<br/></div>);
        }
    }

    grassPath() {
        const self = this;
        let event = JSON.parse(this.props.eventData);
        self.props.childDialogue(<div>You have no idea where this path leads to. <br/>
            Actually, you aren't even sure that it's a path.<br/>
            <button onClick={() => self.grassField()}>Follow the grass path</button>
        </div>);
    }

    eventList() {
        const self = this;
        let event = JSON.parse(this.props.eventData);
        if (event["Magimiu"] === 0 || event["Magimiu"] === 2) {
            self.props.childDialogue(<div>You can see a weird grass path not so far away.<br/>
                You also hear noises in that direction<br/>
                <button onClick={() => self.grassField()}>Follow the grass path</button>
            </div>);
        } else {
            self.props.childDialogue(<div>There is nothing important to see here.<br/>
            </div>);
        }
    }

    render() {
        const self = this;
        let event = JSON.parse(this.props.eventData);

        console.log(JSON.parse(this.props.eventData), event["Magimiu"]);
        return <div className="home">
            <button onClick={() => self.eventList()}>Check the area</button>
            <button onClick={() => self.props.childArea('garden')}>{self.props.name}'s House</button>
            <button onClick={() => self.trees()}>Trees</button>
            <button onClick={() => self.grassPath()}>Grass path</button>
            <button onClick={() => self.stonePath()}>Stone path</button>
        </div>
    }
}

export default Forest;