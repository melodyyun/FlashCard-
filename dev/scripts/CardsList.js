import React from 'react';
import firebase from 'firebase';
import Card from './Card';
import DrawButton from './DrawButton'
import DeleteCardButton from './DeleteCardButton'

class CardsList extends React.Component{
    constructor(){
        super();
        this.state = {
            cardsArray: [],
            currentCard: {
                cardFront:'',
                cardBack: '',
            }
        }
        this.updateCard = this.updateCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }

    componentWillMount(){
        //firebase
        const dbRefCardsList = firebase.database().ref(`user/decksList/${this.props.deckIdKey}/cardsList/`);
        dbRefCardsList.on('value', (snapshot) => {
            const cardsListSnapshot = snapshot.val();
            //clone
            const cardsArrayClone = [];

            for(let cardKey in cardsListSnapshot){
                cardsListSnapshot[cardKey].key = cardKey;
                cardsArrayClone.push(cardsListSnapshot[cardKey]);
            }
            //if there's no cards in the array then just return an empty string
            const currentCard = this.getRandomCard(cardsArrayClone) || { cardBack: '', cardFront: ''}
            this.setState({
                cardsArray: cardsArrayClone,
                currentCard: currentCard
            });
        })
    };

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

    deleteCard(cardKey){
        console.log('card key:',cardKey);
        firebase.database().ref(`user/decksList/${this.props.deckIdKey}/cardsList/${cardKey}`).remove();
    }

    render(){
        return(
            <div>
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
                <Card 
                    front={this.state.currentCard.cardFront}
                    back={this.state.currentCard.cardBack}/>
                <DrawButton 
                    drawCard={this.updateCard}/>
            </div>
        )
    }
};

export default CardsList;
