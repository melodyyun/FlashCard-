import React from 'react';

const DeleteCardButton = (props) => {
    return (
        <div>
            <button onClick={() => props.deleteCard(props.cardIdKey)}>X</button>
        </div>
    )
}

export default DeleteCardButton;
