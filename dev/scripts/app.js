import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import DecksList from './DecksList';
import {firebaseConfig} from './firebase/firebase-config';
import StudyCardsPage from './StudyCardsPage';
import EditCardsPage from './EditCardsPage';
import styled from 'styled-components';

// const CList = styled.ul`
//     display: flex;
//     flex-flow: row wrap;
// `

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      deckName: '',
      deckDescription: '',
      likes: 0,
      display: 'home',
      selectedDeckId:''
    }
    this.createDeck = this.createDeck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createDeck = this.createDeck.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  //-----------------
  // Change Display
  //-----------------

  changeDisplay(e){
    this.setState({
      selectedDeckId: e.target.value,
      display: e.target.name
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

  //----------
  // Render
  //----------

  render() {
    return (
      <div>
        {this.state.display === 'home' ? 
        <section>
          <div className="hero">
            <div className="wrapper">
              <h1>Welcome to Slide by Slide</h1>
              <h2>Create | Share  | Study</h2>
            </div>
          </div>
          <div className="wrapper">
            <div className="grid">
                <div className="formBg movedUp">
                  <h3>Create a Deck!</h3>
                  <form action="" onSubmit={this.createDeck}>
                    <input type="text"
                      name="deckName"
                      placeholder="Name your deck!"
                      value={this.state.deckName}
                      onChange={this.handleChange} required />
                    <input type="text"
                      name="deckDescription"
                      placeholder="Field of study"
                      value={this.state.deckDescription}
                      onChange={this.handleChange} required />
                    <input className="btn" type="submit" />
                  </form>
                </div>
                <section>
                  <h3>Current Decks</h3>
                  <div>
                    <DecksList
                      display={this.state.display}
                      // functions to change display state
                      changeDisplay={this.changeDisplay}
                    />
                  </div>
                </section>
            </div>
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
