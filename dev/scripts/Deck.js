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
            // displayEditDeck: null,
            // displayStudyDeck: null,
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
        console.log(this.props.display);
        
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
            cardBack: ''
        })
    }

    render(){
        return (
            <div onClick={this.handleDeckClick}>
                <div>
                    <h4>{this.props.deckName}</h4>
                    <p>{this.props.deckDescription}</p>
                    <p>{this.props.likes}</p>
                    <button>review</button>
                    <button onClick={() => this.props.deleteDeck(this.props.DeckIdKey)}>❌</button>
                    <button>edit</button>
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