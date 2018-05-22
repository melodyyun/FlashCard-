import React from 'react';
import firebase from 'firebase';
import Deck from './Deck';
import Loader from './Loader';

class DecksList extends React.Component{
    constructor(){
        super();
        this.state = {
            deckName: '',
            deckDescription: '',
            public: true,
            likes: 0,
            displayAddCard: false,
            decksArray: [],
            //display states, set the state in componentDidMount not in constructor
            display: '',
        }
        //bind here
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
                //saving the unique key for later...
                decksListSnap[deckKey].key = deckKey;
                tempDecksList.push(decksListSnap[deckKey]);
            }
            //-------------------------------
            //filter public and private here
            //-------------------------------

            this.setState({
                decksArray: tempDecksList,
                display: this.props.display,
            })
        });
    }

    deleteDeck(deckKey){
        firebase.database().ref(`user/decksList/${deckKey}`).remove();
    }

    render(){
        return(
            <ul className="DecksList">
                {this.state.decksArray.map((deck) => {
                    return (
                        <Deck 
                        key={deck.key}
                        DeckIdKey = {deck.key}
                        handleDeckClick = {this.handleDeckClick}
                        deckName = {deck.deckName}
                        deckDescription = {deck.deckDescription}
                        deckLikes = {deck.likes}
                        deckDelete = {deck.delete}
                        deleteDeck = {this.deleteDeck}
                        //passing on display states
                        display={this.state.display}
                        // functions to change display state
                        changeDisplay={this.props.changeDisplay}
                        />
                    )
                })}
            </ul>
        )
    };
}

export default DecksList;
