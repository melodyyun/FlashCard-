import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import DecksList from './DecksList';
import {firebaseConfig} from './firebase/firebase-config';
import StudyCardsPage from './StudyCardsPage';
import EditCardsPage from './EditCardsPage';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      deckName: '',
      deckDescription: '',
      likes: 0,
      //display states
      display: 'home',
      //deckKeyArray: [],
      selectedDeckId:''
    }
    //bind here:
    this.createDeck = this.createDeck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createDeck = this.createDeck.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  // componentDidMount() {
  //   const dbRef = firebase.database().ref('user/decksList');
  //   let tempDeckKeyArray = []
  //   dbRef.on('value', (snapshot) => {
  //     const decksListSnap = snapshot.val();
  //     for (let deckKey in decksListSnap) {
  //       //decksListSnap[deckKey].key = deckKey;
  //       tempDeckKeyArray.push(deckKey)
  //     }
  //     this.setState({
  //       deckKeyArray: tempDeckKeyArray
  //     })
  //     //prevent repeated keys if a new deck is created
  //     tempDeckKeyArray = [];
  //   });
  // }

  //-----------------
  // Change Display
  //-----------------

  changeDisplay(e){
    this.setState({
      selectedDeckId: e.target.value,
      display: e.target.name
    },() => {
      // console.log(this.state.display);
      // console.log(this.state.selectedDeckId);
    });
  }

  //----------
  // Events
  //----------
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createDeck(e) {
    e.preventDefault();
    //info that will be set for each Deck
    const deck = {
      deckName: this.state.deckName,
      deckDescription: this.state.deckDescription,
      likes: 0,
      public: true,
      cards:[],
    }

    const dbRef = firebase.database().ref('user/decksList');
    dbRef.push(deck);

    this.setState({
      deckName: '',
      deckDescription: ''
    })
  }

  render() {
    return (
      <div>
        {this.state.display === 'home' ? 
        <section>
          <h1>Welcome to Card Hat</h1>
          <h2>Create and share flash cards!</h2>
          <section>
            <h3>Current Decks</h3>
            <p>Select a deck to study or edit!</p>
            <p>Don't see a topic you'd like to study?</p>
            {/* smooth scroll down on click */}
            <button>Create your own deck!</button>
            <div>
              <DecksList 
                display = {this.state.display}
                // functions to change display state
                changeDisplay = {this.changeDisplay}
                />
            </div>
          </section>
          <h2>Create a Deck!</h2>
          <div>
            <form action = "" onSubmit={this.createDeck}>
              <input type = "text" 
                    name ="deckName" 
                    placeholder = "Name your deck!"
                    value = {this.state.deckName} 
                    onChange = {this.handleChange} required/>
              <input type = "text"
                    name = "deckDescription"
                    placeholder="Field of study :("
                    value = {this.state.deckDescription}
                    onChange={this.handleChange} required/>
              <input type = "submit"/>
            </form>
          </div>
        </section>
        : null}

        {this.state.display === 'study'? 
          <StudyCardsPage 
            changeDisplay = {this.changeDisplay}
            selectedDeckId ={this.state.selectedDeckId}
            /> : null}
      
        {this.state.display === 'edit' ?
          <EditCardsPage 
            changeDisplay = {this.changeDisplay}
            selectedDeckId ={this.state.selectedDeckId}
            /> : null}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
