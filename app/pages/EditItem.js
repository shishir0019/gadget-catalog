import React from 'react';

import AddItemFormContainer from '../containers/AddItemFormContainer';

export default class EditItem extends React.Component {
    render() {
        return (
            <div>
                <h3>Edit item</h3>
                <hr/>

                <AddItemFormContainer id={this.props.params.id}/>
            </div>
        );
    }
}
