import React from 'react';
import firebase from 'firebase';
import Card from './Card';
import DrawButton from './DrawButton'
import DeleteCardButton from './DeleteCardButton'

class CardsList extends React.Component{
    constructor(){
        super();
        this.state = {
            displayAddCard: true,
            cardFront: '',
            cardBack: '',
            selectedDeckId: '',
            cardsArray: [],
            // currentCard: {
            //     cardFront: '',
            //     cardBack: '',
            // }
        }
        this.updateCard = this.updateCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createCard = this.createCard.bind(this);
    }

    // componentWillReceiveProps(){
    //     console.log('componentWillReceiveProps:',this.props.selectedDeckId);
    // }
    componentWillMount(){
        
        //firebase
        // const dbRefCardsList = firebase.database().ref(`user/decksList/${this.props.deckIdKey}/cardsList/`);
        
        const dbRefCardsList = firebase.database().ref(`user/decksList/${this.props.selectedDeckId}/cardsList/`);
        dbRefCardsList.on('value', (snapshot) => {
            const cardsListSnapshot = snapshot.val();
            //clone
            const cardsArrayClone = [];

            for(let cardKey in cardsListSnapshot){
                cardsListSnapshot[cardKey].key = cardKey;
                cardsArrayClone.push(cardsListSnapshot[cardKey]);
            }
            
            //if there's no cards in the array then just return an empty string
            // const currentCard = this.getRandomCard(cardsArrayClone) || { cardBack: '', cardFront: ''}
            this.setState({
                cardsArray: cardsArrayClone,
                // currentCard: currentCard
            });
        })
    };

    //----------------------------------------
    //Generating random card from cards array
    //----------------------------------------
    getRandomCard(cardsArrayClone){
        //return a random card from the cardsArrayClone
        return cardsArrayClone[Math.floor(Math.random() * cardsArrayClone.length)];
    }

    updateCard(){
        const cardsArray = this.state.cardsArray;
        this.setState({
            currentCard: this.getRandomCard(cardsArray)
        })
    }

    //--------------
    //Card deletion
    //--------------

    deleteCard(cardKey){
        firebase.database().ref(`user/decksList/${this.props.selectedDeckId}/cardsList/${cardKey}`).remove();
    }

    //--------------
    //Card creation
    //--------------
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    createCard(e, key) {
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
        return(
            <div>
                {/* create card */}
                <form action="" onSubmit={(e) => this.createCard(e, this.props.selectedDeckId)}>
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
                <ul>
                    {this.state.cardsArray.map((card) => {
                        return(
                            <div key={card.key} >
                                <DeleteCardButton 
                                    cardIdKey={card.key}
                                    deleteCard={this.deleteCard}/>
                                <Card 
                                    cardIdKey={card.key}
                                    front={card.cardFront}
                                    back={card.cardBack}/>
                            </div>
                        )
                    })}
                </ul>
                {/* <Card 
                    front={this.state.currentCard.cardFront}
                    back={this.state.currentCard.cardBack}/>
                <DrawButton 
                    drawCard={this.updateCard}/> */}
            </div>
        )
    }
};

export default CardsList;
