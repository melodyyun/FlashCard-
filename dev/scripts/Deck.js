import React from 'react';
import firebase from 'firebase';
import CardsList from './CardsList';

class Deck extends React.Component{
    constructor(){
        super();
        this.state = {
            displayAddCard: true,
            cardFront: '',
            cardBack: '',
            cardsArray: [],
            //display states, set the state in componentDidMount not in constructor
            display: 'home',
            selectedDeckId: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.createCard = this.createCard.bind(this);
    }

    componentDidMount(){
        this.setState({
            display: this.props.display,
        });       
    }
    

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    createCard(e, key){
        e.preventDefault();        
        //info that will be set for each card
        const card = {
            cardFront: this.state.cardFront,
            cardBack: this.state.cardBack
        }

        const dbRefDeck = firebase.database().ref(`user/decksList/${key}/cardsList`);
        dbRefDeck.push(card);

        this.setState({
            cardFront: '',
            cardBack: '',
            selectedDeckId: this.props.DeckIdKey
        })
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
                <div>
                    <form action="" onSubmit={(e)=> this.createCard(e, this.props.DeckIdKey)}>
                        <input type="text"
                            name="cardFront"
                            placeholder="Front of card"
                            value={this.state.cardFront}
                            onChange={this.handleChange} required />
                        <input type="text"
                            name="cardBack"
                            placeholder="Back of card"
                            value={this.state.cardBack}
                            onChange={this.handleChange} required />
                        <input type="submit" />
                    </form>
                </div>
                
                <CardsList
                    deckIdKey={this.props.DeckIdKey} />
            </div>
        )
    }
}

export default Deck;