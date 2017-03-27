import React from 'react';
import { Divider } from 'semantic-ui-react';
import CategoryFormContainer from '../containers/Category/CategoryFormContainer';

export default class CategoryEditPage extends React.Component {
    render() {
        return (
            <div>
                <h3>Add new category</h3>
                <Divider section />

                <CategoryFormContainer form="Create"/>
            </div>
        );
    }
}
