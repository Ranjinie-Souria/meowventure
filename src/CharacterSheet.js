import React, {Component} from "react";

class CharacterSheet extends Component {
    getCatHead(fur, eyes) {
        return (
            <svg width="300" height="300" viewBox="100 180 500 300" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <rect fill="none" id="canvas_background" height="250" width="300" y="20" x="20"/>
                </g>
                <g>
                    <ellipse ry="51.5" rx="50.5" id="svg_3" cy="178.953125" cx="212" strokeOpacity="null"
                             strokeWidth="1.5" stroke="#000" fill={fur}/>
                    <path stroke="#000" transform="rotate(33.29050064086914 254.03759765625003,119.48893737792966) "
                          id="svg_4" d="m233.854438,145.430786l20.183163,-51.883708l20.183163,51.883708l-40.366326,0z"
                          strokeOpacity="null" strokeWidth="1.5" fill={fur}/>
                    <path stroke="#000" transform="rotate(-42.64216613769531 166.51176452636716,129.20672607421878) "
                          id="svg_5" d="m146.800628,151.706729l19.711137,-44.999996l19.711137,44.999996l-39.422275,0z"
                          strokeOpacity="null" strokeWidth="1.5" fill={fur}/>
                    <ellipse ry="9" rx="7" id="svg_6" cy="182.453125" cx="185.5" strokeOpacity="null" strokeWidth="1.5"
                             stroke="#000" fill={eyes}/>
                    <ellipse ry="9" rx="7" id="svg_9" cy="182.453125" cx="246.5" strokeOpacity="null" strokeWidth="1.5"
                             stroke="#000" fill={eyes}/>
                    <path transform="rotate(8.15350341796875 215.99999999999983,196.0381774902344) " stroke="#000"
                          d="m206.500001,192.029698c0,0.788286 0.311332,5.276344 0.678571,6.306291c0.259678,0.728283 -0.208026,2.726526 0.678571,3.153145c0.626917,0.301664 1.357143,0 3.392857,0c0.678571,0 3.392857,-1.576573 4.071428,-2.364859c0.678571,-0.788286 2.035714,-3.941432 1.357143,-3.941432c-1.357143,0 2.035714,3.153145 2.714286,3.153145c2.714286,0 3.392857,0 4.071428,0c0.678571,0 2.035714,-4.729718 2.035714,-7.094577l0,-0.788286"
                          id="svg_15" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" fill="none"/>
                    <line id="svg_16" y2="180.453125" x2="279.5" y1="183.453125" x1="258.5" fillOpacity="null"
                          strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="none"/>
                    <line id="svg_17" y2="176.453125" x2="139.5" y1="180.453125" x1="167.5" fillOpacity="null"
                          strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="none"/>
                    <line id="svg_18" y2="194.453125" x2="147.5" y1="194.453125" x1="170.5" fillOpacity="null"
                          strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="none"/>
                    <line id="svg_19" y2="197.453125" x2="272.5" y1="197.453125" x1="252.5" fillOpacity="null"
                          strokeOpacity="null" strokeWidth="1.5" stroke="#000" fill="none"/>
                    <ellipse stroke="#FFA9A2" ry="7.5" rx="8" id="svg_32" cy="196.953125" cx="174.5" strokeWidth="1.5"
                             fill="#FFAC8D"/>
                    <ellipse ry="7.5" rx="8" id="svg_33" cy="199.953125" cx="252.5" strokeWidth="1.5" stroke="#FFA9A2"
                             fill="#FFAC8D"/>
                </g>
            </svg>);
    }

    render() {
        const cat = JSON.parse(localStorage.getItem('playerData')).cat;
        return <div className="chara">
            <div>{this.props.name}<br/>
                {this.props.classe}, {this.props.gender}
                {this.getCatHead(cat[0], cat[1])}
            </div>
        </div>
    }
}

export default CharacterSheet;