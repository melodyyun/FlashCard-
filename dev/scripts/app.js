import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import DecksList from './DecksList';
import {firebaseConfig} from './firebase/firebase-config';

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
    }
    //bind here:
    this.createDeck = this.createDeck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createDeck = this.createDeck.bind(this);
  }

  // componentDidMount(){
  //   const dbRef = firebase.database().ref('user/decksList');
  //   dbRef.on('value', (snapshot) => {
  //     const dbSnapshot = snapshot.val();
  //   });
  // }

  //-----------------
  // Change Display
  //-----------------
  displayEdit(){

  }

  displayStudy(){
     
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
              display={this.state.display}
              // displayEditDeck={this.state.displayEditDeck}
              // displayStudyDeck={this.state.displayStudyDeck}
              />
          </div>
        </section>
        <h2>Create a Deck!</h2>
        <div>
          <form action="" onSubmit={this.createDeck}>
            <input type="text" 
                  name="deckName" 
                  placeholder="Name your deck!"
                  value={this.state.deckName} 
                  onChange={this.handleChange} required/>
            <input type="text"
                  name="deckDescription"
                  placeholder="Field of study :("
                  value={this.state.deckDescription}
                  onChange={this.handleChange} required/>
            <input type="submit"/>
          </form>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
