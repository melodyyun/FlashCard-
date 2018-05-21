import React from 'react';
import Card from './Card';
import DrawButton from './DrawButton';
import firebase from 'firebase';

class StudyCardsPage extends React.Component {
    constructor(){
        super()
        this.state = {
            selectedDeckId:'',
            // cardFront: '',
            // cardBack: '',
            display: '',
            cardsArray: [],
            cardIdKey: '',
            currentCard: {
                cardFront: '',
                cardBack: '',
            }
        }
        this.updateCard = this.updateCard.bind(this);
    }

    componentWillMount() {

        const dbRefCardsList = firebase.database().ref(`user/decksList/${this.props.selectedDeckId}/cardsList/`);
        dbRefCardsList.on('value', (snapshot) => {
            const cardsListSnapshot = snapshot.val();
            //clone
            const cardsArrayClone = [];

            for (let cardKey in cardsListSnapshot) {
                cardsListSnapshot[cardKey].key = cardKey;
                cardsArrayClone.push(cardsListSnapshot[cardKey]);
            }

            //if there's no cards in the array then just return an empty string
            const currentCard = this.getRandomCard(cardsArrayClone) || { cardBack: '', cardFront: '' }
            
            this.setState({
                cardsArray: cardsArrayClone,
                currentCard: currentCard,
                display: this.props.changeDisplay,
                selectedDeckId: this.props.selectedDeckId,
            }, () => {
                // console.log('cards array clone', cardsArrayClone);
                // console.log('cards array state', this.state.cardsArray);
            });
        })
    };



    //----------------------------------------
    //Generating random card from cards array
    //----------------------------------------
    getRandomCard(cardsArrayClone) {
        //return a random card from the cardsArrayClone
        return cardsArrayClone[Math.floor(Math.random() * cardsArrayClone.length)];
    }

    updateCard() {
        const cardsArray = this.state.cardsArray;
        this.setState({
            currentCard: this.getRandomCard(cardsArray)
        })
    }

    render() {
        return (
            <div>
                <p>this is the study page</p>
                <button name="home" value={this.props.selectedDeckId} onClick={(e) => this.props.changeDisplay(e)}><i className="fas fa-home"></i></button>
                <button name="edit" value={this.props.selectedDeckId} onClick={(e) => this.props.changeDisplay(e)}><i className="fas fa-edit"></i></button>
                <Card 
                    front = {this.state.currentCard.cardFront}
                    back = {this.state.currentCard.cardBack}
                    updateCard = {this.updateCard}
                    getRandomCard = {this.getRandomCard}/>
                <DrawButton
                    drawCard={this.updateCard} />
            </div>
        )
    }
}

export default StudyCardsPage;

{/* <FontAwesome name='fa-home' /> */}