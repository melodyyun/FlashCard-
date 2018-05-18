import React from 'react';
import Card from './Card';

class StudyCardsPage extends React.Component {
    constructor(){
        super()
        this.state = {
            selectedDeckId:'',
            display: '',
        }
    }

    componentWillMount(){
        this.setState ({
            display: this.props.selectedDeckId,
        })
    }

    render() {
        return (
            <div>
                <p>this is the study page</p>
                <button name="home" value={this.props.selectedDeckId} onClick={(e) => this.props.changeDisplay(e)}>Home</button>
                <button name="edit" value={this.props.selectedDeckId} onClick={(e) => this.props.changeDisplay(e)}>Edit</button>
                <Card 
                    selectedDeckId ={this.state.selectedDeckId}/>
            </div>
        )
    }
}

export default StudyCardsPage;