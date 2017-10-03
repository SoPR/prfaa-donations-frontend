import React, { Component } from 'react';
import client from '../../Feathers';
import {
    Form,
    Input
} from 'formsy-react-components';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:  '',
            password:  '',
            canSubmit: false
        };
    }

    handleInputChange = (target, value) => {

        this.setState({
            [target]: value
        });
    }

    enableButton = () => {
        this.setState({
            canSubmit: true
        });
    }

    disableButton = () => {
        this.setState({
            canSubmit: false
        });
    }

    login = () => {
        return client.authenticate({
            strategy: 'local',
            username: this.state.username,
            password: this.state.password
        }).catch((err) => {
            // TODO: handle err
        });
    }

    render() {
        return (
            <Form id="signin" onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={this.login}>
                <p>This page is protected. Please sign in to continue.</p>
                <Input
                    name="username"
                    label="Username"
                    help="Enter your Username"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    required
                    rowClassName="addMargin"
                    labelClassName={[{'col-sm-3': false}, 'col-md-2 col-md-offset-2']}
                    elementWrapperClassName={[{'col-sm-9': false}, 'col-md-6 col-xs-12']}
                />
                <Input
                    type="password"
                    name="password"
                    label="Password"
                    help="Enter your Password"
                    placeholder="••••••••"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    required
                    rowClassName="addMargin"
                    labelClassName={[{'col-sm-3': false}, 'col-md-2 col-md-offset-2']}
                    elementWrapperClassName={[{'col-sm-9': false}, 'col-md-6 col-xs-12']}
                />
                <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
            </Form>
        );
    }
}

export default Login;