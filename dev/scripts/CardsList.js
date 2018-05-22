import React from 'react';
import firebase from 'firebase';
import Card from './Card';
import DrawButton from './DrawButton'
import DeleteCardButton from './DeleteCardButton'
import styled from 'styled-components';

const Li = styled.li`
    width: 300px;
    list-style: none;
    position: relative;
`
const CardForm = styled.div`
    position: relative;
    height: 300px;
`

class CardsList extends React.Component{
    constructor(){
        super();
        this.state = {
            displayAddCard: true,
            cardFront: '',
            cardBack: '',
            selectedDeckId: '',
            cardsArray: [],
        }
        this.updateCard = this.updateCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createCard = this.createCard.bind(this);
    }

    componentWillMount(){
        const dbRefCardsList = firebase.database().ref(`user/decksList/${this.props.selectedDeckId}/cardsList/`);
        dbRefCardsList.on('value', (snapshot) => {
            const cardsListSnapshot = snapshot.val();
            //clone
            const cardsArrayClone = [];

            for(let cardKey in cardsListSnapshot){
                cardsListSnapshot[cardKey].key = cardKey;
                cardsArrayClone.push(cardsListSnapshot[cardKey]);
            }

            this.setState({
                cardsArray: cardsArrayClone,
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
                <CardForm className="createDeckFormParent wrapper">
                    <form className="createDeckForm formBg marginTop2" action="" onSubmit={(e) => this.createCard(e, this.props.selectedDeckId)}>
                        <h3>Create a Card!</h3>
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
                        <input className="btn primary" type="submit" />
                    </form>
                </CardForm>
                <ul>
                    {this.state.cardsArray.map((card) => {
                        return(
                            <Li key={card.key}>
                                <DeleteCardButton
                                    cardIdKey={card.key}
                                    deleteCard={this.deleteCard} />
                                <Card 
                                    cardIdKey={card.key}
                                    front={card.cardFront}
                                    back={card.cardBack}/>
                            </Li>
                        )
                    })}
                </ul>
            </div>
        )
    }
};

export default CardsList;
