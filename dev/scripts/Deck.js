import React from 'react';
import firebase from 'firebase';
import CardsList from './CardsList';

class Deck extends React.Component{
    constructor(){
        super();
        this.state = {
            display: 'home',
            selectedDeckId: ''
        };
    }

    componentDidMount(){
        this.setState({
            display: this.props.display,
        });       
    }

    render(){
        return (
            <div onClick={this.handleDeckClick}>
                <div>
                    <h4>{this.props.deckName}</h4>
                    <p>{this.props.deckDescription}</p>
                    <p>{this.props.likes}</p>
                    <button name="study" value={this.props.DeckIdKey} onClick={(e) => this.props.changeDisplay(e)}>Study</button>
                    <button onClick={() => this.props.deleteDeck(this.props.DeckIdKey)}>❌</button>
                    <button name="edit" value={this.props.DeckIdKey} onClick={(e) => this.props.changeDisplay(e)}>edit</button>
                </div>
            </div>
        )
    }
}

export default Deck;