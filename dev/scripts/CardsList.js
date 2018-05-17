import React from 'react';
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

// import React from 'react';
// import Card from './Card'

// class CardsList extends React.Component{
//     constructor(){
//         super();

//         this.state = {
//             cardsArray: [
//                 { id: 1, front:'hi', back:'bye' },
//                 { id: 2, front: 'hi', back: 'bye' }
//             ],
//             currentCard: {}
//         }
//         this.getRandomCard = this.getRandomCard.bind(this);
//     }

//     componentWillMount(){
//         const cardsArrayClone = this.state.cardsArray;
//         console.log(cardsArrayClone);
        

//         this.setState({
//             cardsArray: cardsArrayClone,
//             currentCard: this.getRandomCard(cardsArrayClone)
//         })
//         //console.log(this.state.currentCard);
//     }

//     getRandomCard(cardsArrayClone){
//         let card = cardsArrayClone[Math.floor(Math.random() * cardsArrayClone.length)]
//         //console.log(card);
//     }

//     render(){
//         return(
//             <Card 
//                 front={this.state.currentCard.front}
//                 back={this.state.currentCard.back}/>
//         )
//     }
// }


// export default CardsList;