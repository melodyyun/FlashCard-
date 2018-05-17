import React from 'react';

class DrawButton extends React.Component{
    constructor(){
        super()

        this.drawCard = this.drawCard.bind(this);
    }

    drawCard(){
        this.props.drawCard();
    }

    render(props){
        return(
            <div>
                <button onClick={this.drawCard}>DrawCard</button>
            </div>
        )
    }
}

export default DrawButton;