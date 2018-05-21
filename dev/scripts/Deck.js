import React from 'react';
import firebase from 'firebase';
import CardsList from './CardsList';
import { log } from 'util';

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
                    <p>{this.props.deckLikes}<i className="fas fa-heart"></i></p>

                    {/* delete button */}
                    {this.props.deckDelete === true ?
                        <button onClick={() => this.props.deleteDeck(this.props.DeckIdKey)}><i className="fas fa-times"></i></button>
                        : null
                    }
                    <button name="study" value={this.props.DeckIdKey} onClick={(e) => this.props.changeDisplay(e)}>Study</button>
                    <button name="edit" value={this.props.DeckIdKey} onClick={(e) => this.props.changeDisplay(e)}>Edit</button>
                </div>
            </div>
        )
    }
}

export default Deck;