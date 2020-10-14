import React from 'react'

class ToogleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAscending: true
        }
    }

    handleClick() {
        this.props.action();
        this.setState({
            isAscending: !this.state.isAscending
        })
    }

    render() {
        return (<button
            className='toogleButton'
            onClick={() => this.handleClick()}
        >
            {this.state.isAscending ? "Nước đi mới dưới cùng" : "Nước đi mới trên cùng"}
        </button>);
    }
}

export default ToogleButton