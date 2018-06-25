import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import DecksList from './components/DecksList';
import firebaseConfig from './config/Firebase';
// import ui from 'firebaseui'
import StudyCardsPage from './components/StudyCardsPage';
import EditCardsPage from './components/EditCardsPage';
import Deck from './components/Deck';
import NavBar from './components/NavBar';

import './App.css';

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
      selectedDeckId:'',
      selectedDeckName: '',
      selectedDeckDescription: '',
      // user info
      loggedIn:'',
      userId: '',
      userName: '',
      userImg: '',
    }
    this.createDeck = this.createDeck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createDeck = this.createDeck.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
  }

  //-----------------
  // Authentication
  //-----------------
  componentDidMount() {
    this.dbRef = firebase.database().ref('users/');

    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.dbRef.on('value', (snapshot) => {
          // console.log(snapshot.val());
        })
        this.setState({
          loggedIn: true,
          userName: user.displayName,
          userImg: user.photoURL,
          userId: user.uid,
        })
      } else {
        this.setState({
          loggedIn: false
        })
      }
    })
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        // console.log(user.user);

        const firebaseUid = user.user.uid;
        const firebaseName = user.user.displayName;
        const firebaseImg = user.user.photoURL;
        this.setState({
          userId: firebaseUid,
          userName: firebaseName,
          userImg: firebaseImg,
        }, () => {
          // console.log('pushing', this.state.userId);
          const userInfo = {
            userName: this.state.userName,
            userImg: this.state.userImg,
          }
          firebase.database().ref(`users/accountInfo/${this.state.userId}`).set(userInfo);
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  logout() {
    firebase.auth().signOut();
    //this.dbRef.off('value');
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
      delete: true,
      cards:[],
    }

    const dbRef = firebase.database().ref(`user/${this.state.userId}/decksList`);
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
        <NavBar 
          loggedIn = {this.state.loggedIn}
          loginWithGoogle = {this.loginWithGoogle}
          logout = {this.logout}
          userName = {this.state.userName}
          userImg = {this.state.userImg}/>
        {this.state.display === 'home' ? 
        <section>
          <div className="relative">
            <div className="hero hero1">
            </div>
            <div className="hero hero2">
              <div className="wrapper">
                <h1>Study Buddy</h1>
              </div>
            </div>
          </div>
          <div className="createDeckFormParent wrapper">
            <div className="createDeckForm formBg marginTop">
              <h3>Create a Deck!</h3>
              {this.state.loggedIn ? 
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
                  <input className="btn primary" type="submit" />
                </form> : 
                <button onClick={this.loginWithGoogle}>Login!</button> 
              }
            </div>
          </div>
          <div className="deckListContainer">
            <div className="wrapper">
                <div>
                  <DecksList
                    uid = {this.state.userId}
                    display={this.state.display}
                    // functions to change display state
                    changeDisplay={this.changeDisplay}
                  />
                </div>
            </div>
          </div>
        </section>
        : null}

        {this.state.display === 'study'? 
          <StudyCardsPage 
            uid = {this.state.userId}
            changeDisplay = {this.changeDisplay}
            selectedDeckId ={this.state.selectedDeckId}
            /> : null}
      
        {this.state.display === 'edit' ?
          <EditCardsPage 
            uid={this.state.userId}
            changeDisplay = {this.changeDisplay}
            selectedDeckId ={this.state.selectedDeckId}
            /> : null}
      </div>
    )
  }
};

export default App;
