import React from 'react';
import firebase from 'firebase';
//import CardsList from './CardsList';
import Deck from './Deck';

class DecksList extends React.Component{
    constructor(){
        super();
        this.state = {
            deckName: '',
            deckDescription: '',
            public: true,
            likes: null,
            displayAddCard: false,
            decksArray: [],
        }
        //bind here
        this.handleDeckClick = this.handleDeckClick.bind(this);
        this.deleteDeck = this.deleteDeck.bind(this);
    };

    componentDidMount() {
        const dbRef = firebase.database().ref('user/decksList');
        dbRef.on('value', (snapshot) => {
            const decksListSnap = snapshot.val();
            //clone
            const tempDecksList = [];
            //loop obj to push into clone array
            for(let deckKey in decksListSnap){
                // console.log(deckKey);
                // console.log(decksListSnap[deckKey]);
                //saving the unique key for later...
                decksListSnap[deckKey].key = deckKey;
                tempDecksList.push(decksListSnap[deckKey]);
            }
            //--------------------------------------------
            //why is this console.logging when I type???
            //--------------------------------------------
            //console.log(tempDecksList);

            //-------------------------------
            //filter public and private here
            //-------------------------------

            this.setState({
                decksArray: tempDecksList
            })
        });

        // const dbRef2 = firebase.database().ref('user/decksList/deck1/cardsList');
        // dbRef.on('value', (snapshot) => {
        //     const dbSnapshot = snapshot.val();
        // });
    }

    handleDeckClick(){
        //show two buttons edit or study

    }

    deleteDeck(deckKey){
        console.log(deckKey);
        firebase.database().ref(`user/decksList/${deckKey}`).remove();
    }

    render(){
        return(
            <ul>
                {this.state.decksArray.map((deck) => {
                    return (
                        <Deck 
                        key={deck.key}
                        DeckIdKey = {deck.key}
                        handleDeckClick = {this.handleDeckClick}
                        deckName = {deck.deckName}
                        deckDescription = {deck.deckDescription}
                        deckLikes = {deck.likes}
                        deleteDeck = {this.deleteDeck}
                        />
                    )
                })}
            </ul>
        )
    };
}

export default DecksList;