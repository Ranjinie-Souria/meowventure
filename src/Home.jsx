import React from 'react';

class Home extends React.Component {
    bed() {
        let self = this;
        let count = 1;
        self.props.childDialogue(<div>Your comfy bed, it smells just like you. <br/>Maybe you don't actually smell good
            but,
            for some reason, <br/>
            your bed is very appealing. Looking at it makes you want to take a nap.<br/>
            <button onClick={() => nap()}>Take a little nap</button>
        </div>);

        function nap() {
            if (count < 5) {
                count += 1;
                self.props.childDialogue(<div>Zzzz... Just 5 minutes. <br/>
                    That's what you said after having {count} delicious hours of sleep. <br/>
                    Do you want to sleep more ?
                    <button onClick={() => nap()}>Sleep more</button></div>)
            } else {
                self.props.childDialogue(<div>You took {count} hours of naps. I think that's enough. <br/>
                    Don't you feel like going outside ? No ? Well that's up to you.</div>)
            }
        }
    }

    exit() {
        this.props.childDialogue(<div>The exit door. Do you want to leave your home ?<br/>
            <button onClick={() => this.props.childArea('garden')}>Leave home</button>
        </div>);
    }


    render() {
        return (<div>
                <button onClick={() => this.props.childDialogue(<div>There is nothing important to see here.<br/>
                </div>)}>Check the area
                </button>
                <button onClick={() => this.bed()}>Bed</button>
                <button onClick={() => this.exit()}>Door</button>
            </div>
        );
    }
}

export default Home;

