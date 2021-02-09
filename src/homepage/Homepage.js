import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userAction } from '../action';

class Homepage extends React.Component {

    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstname}!!</h1>
                <p>You are logged In</p>
                <h4>All Registered Users:</h4>
                {users.loading && <em>Loading...</em>}
                {users.error && <span className="text-danger">Error: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstname + '' + user.lastname}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <link to="/login">Logout</link>
                </p>
            </div>
        )
    }
}

function mapState(state){
    const { users, authentication }= state;
    const { user}= authentication;
    return {user, users};
}

const actionCreators ={
    getUsers: userAction.getAll,
    deleteUser: userAction.delete
}

const connectedHomePage=connect(mapState, actionCreators)(Homepage);
export {connectedHomePage as Homepage};