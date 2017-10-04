import React, { Component } from 'react';
import client from '../../Feathers';
import {
    Form,
    Input
} from 'formsy-react-components';
import {
    Grid,
    Button
} from 'react-bootstrap';
import './login.css';

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
            <div id="login-page">
                <Grid>
                    <Form id="signin" onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={this.login}>
                        <h3 className="text-center signin-header">This page is protected. <br/>Please sign in to continue.</h3>
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
                        <Button type="submit" disabled={!this.state.canSubmit} className="col-xs-12 col-md-6 col-md-offset-3 btn-donate" type="submit" bsSize="large">
                            Submit
                        </Button>
                    </Form>
                </Grid>
            </div>
        );
    }
}

export default Login;