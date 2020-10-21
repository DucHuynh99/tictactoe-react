import React, { useState } from 'react'

const ToogleButton = ({ action }) => {
    const [isAscending, SetIsAscending] = useState();

    const handleClick = () => {
        action();
        SetIsAscending(!isAscending);
    }

    return (<button
        className='toogleButton'
        onClick={() => handleClick()}
    >
        {isAscending ? "Nước đi mới dưới cùng" : "Nước đi mới trên cùng"}
    </button>);
}

export default ToogleButton