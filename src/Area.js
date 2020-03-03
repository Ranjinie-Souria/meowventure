import React, {Component} from "react";
class Area extends Component {
    constructor(props){
        super(props);
        const area = localStorage.getItem('area');
        this.state = {
            dialogue: '',
            area: area,
        };
    }

    resetDialogue(){
        this.setState({dialogue: ''});
    }
    setDialogue(dialogue){
        this.setState({
            dialogue: <div><div className="dialogue">{dialogue}</div>
            <button className="dialogue-button" onClick={()=>this.resetDialogue()}>X</button></div>})
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
            self.setDialogue(<div>Your comfy bed. Looking at it makes you want to take a nap.<br/>
            <button onClick={() => nap()}>Take a little nap</button></div>);
            function nap() {
                if (count < 5) {
                    count += 1;
                    self.setDialogue(<div>Zzzz... Just 5 minutes. And.. You had {count} delicious hours of sleep. Do you want to sleep more ?
                        <button onClick={() => nap()}>Sleep more</button></div>)
                }
                else {
                    self.setDialogue(<div>You took {count} hours of naps. I think that's enough.</div>)
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

    garden(){
        const self = this;
        function flowers() {
            self.setDialogue(<div>Beautiful roses and trees.<br/></div>);
        }

        function exit() {
            self.setDialogue(<div>This path leads to the forest. Do you want to leave your garden ?<br/>
                <button onClick={() => self.goToArea('forest')}>Leave garden</button></div>);
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


    }


    render() {
        return this.getArea();
    }

}
export default Area;