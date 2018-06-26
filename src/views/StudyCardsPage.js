import React from 'react';
import Card from '../components/Card';
import DrawButton from '../components/DrawButton';
import firebase from 'firebase';

class StudyCardsPage extends React.Component {
    constructor(){
        super()
        this.state = {
            selectedDeckId:'',
            selectedDeckName: '',
            selectedDeckDescription: '',
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
        const dbRefDeck = firebase.database().ref(`user/${this.props.uid}/decksList/${this.props.selectedDeckId}`)

        dbRefDeck.on('value', (snapshot) => {
            const data = snapshot.val();
            this.setState({
                selectedDeckName: data.deckName,
                selectedDeckDescription: data.deckDescription,
            })
        });

        const dbRefCardsList = firebase.database().ref(`user/${this.props.uid}/decksList/${this.props.selectedDeckId}/cardsList/`);
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
                <div className="hero4">
                    <div className="wrapper">
                        <h1>{this.state.selectedDeckName}</h1>
                        <h3>{this.state.selectedDeckDescription}</h3>
                    </div>
                </div>
                <div className="wrapper center">
                    <div className="btn-container">
                        <button className="btn" name="home" value={this.props.selectedDeckId} onClick={(e) => this.props.changeDisplay(e)}>Home</button>
                        <button className="btn" name="edit" value={this.props.selectedDeckId} onClick={(e) => this.props.changeDisplay(e)}>Edit</button>
                    </div>
                    <Card 
                        front = {this.state.currentCard.cardFront}
                        back = {this.state.currentCard.cardBack}
                        updateCard = {this.updateCard}
                        getRandomCard = {this.getRandomCard}/>
                    <DrawButton
                        drawCard={this.updateCard} />
                </div>
            </div>
        )
    }
}

export default StudyCardsPage;
