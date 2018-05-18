import React from 'react';
import CardsList from './CardsList';

class EditCardsPage extends React.Component {
    constructor(){
        super()
        this.state = {
            selectedDeckId:'',
            display: '',
        }
    }

    componentWillMount() {
        this.setState({
            display: this.props.selectedDeckId,
        })
    }

    render(){
        return(
            <div>
                <button name="home" value={this.props.selectedDeckId} onClick={(e) => this.props.changeDisplay(e)}>Home</button>
                <button name="study" value={this.props.selectedDeckId} onClick={(e) => this.props.changeDisplay(e)}>Study</button>
                <CardsList 
                selectedDeckId ={this.state.selectedDeckId}/>
            </div>
        )
    }
}

export default EditCardsPage;