import React from 'react';

const DeleteCardButton = (props) => {
    return (
        <div>
            <button onClick={() => props.deleteCard(props.cardIdKey)}><i className="fas fa-times"></i></button>
        </div>
    )
}

export default DeleteCardButton;
