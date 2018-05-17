import React from 'react';
import firebase from 'firebase';
import Card from './Card';
import DrawButton from './DrawButton'

class CardsList extends React.Component{
    constructor(){
        super();
        this.state = {
            cardsArray: [
                { id: 1, front: 'hi', back: 'bye' },
                { id: 2, front: 'hi2', back: 'bye2' },
                { id: 3, front: 'hi3', back: 'bye3' }
            ],
            currentCard: {}
        }
        this.updateCard = this.updateCard.bind(this)
    }

    componentWillMount(){
        //firebase
        //--------------------------------------
        //how do I pass the deck key into here?
        //--------------------------------------
        const dbRefCardsList = firebase.database().ref(`user/decksList/${this.props.deckKey}/cardsList/`);
        dbRefCardsList.on('value', (snapshop) => {
            const cardsListSnapshot = snapshop.val();
        })
        //setting the cards array/state before render
        const cardsArrayClone = this.state.cardsArray;
        this.setState({
            cardsArray: cardsArrayClone,
            currentCard: this.getRandomCard(cardsArrayClone)
        });
    }

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

    render(){
        return(
            <div>
                <div>
                    <Card 
                        front = {this.state.currentCard.front}
                        back = {this.state.currentCard.back}/>
                </div>
                <DrawButton 
                    drawCard={this.updateCard}/>
            </div>
        )
    }
};

export default CardsList;
