import React from "react";
import { Navbar, Nav, NavItem, Grid, Col, Form, FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import { Search } from "./Search.jsx"

export class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: null,
            login: null,
            password: null,
            logSuccess: false,
            someInputError: false
        }
        this.handleLogButtonClick = this.handleLogButtonClick.bind(this);
        this.handleLoginInputChange = this.handleLoginInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
    }

    handleLoginInputChange(event){
        this.setState({
            login: event.target.value
        });
        console.log(this.state.logSuccess);
    }

    handlePasswordInputChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleLogButtonClick(){
        const {login} = this.state;
        const {password} = this.state;
        if((login == null)||(password == null) || (login == "") || (password == "")) {
            alert("Заполните все поля!")
        } else {
            axios
            .get("http://localhost:8282/webapp/user/login?login=" + login + "&pass=" + password)
            .then((response) => {
                if(response.data.logSuccess == true){
                    console.log(this.state.logSuccess);
                    this.setState({
                        logSuccess: false,
                        user: login,
                        login: null,
                        password: null,
                        someInputError: false
                    });
                } else {
                    this.setState({
                        someInputError: true
                    })
                }
                console.log(this.state.logSuccess);
            })
            .catch((error) => {
                alert("Ошибка! Не волнуйтесь шибко! " + error.message);
            });
        }
    }

    render() {
        var dataArea = this.state.logSuccess && <Search />
        var username;
        if(this.state.logSuccess){
            username = this.state.user;
        } else {
            username = null;
        }
        var error = this.state.someInputError && (
            <Col sm={11} style={{color: "red"}}>
                Все очень плохо.
            </Col>
        )
        var logArea = !this.state.logSuccess && (
        <Form horizontal className="antable">
            <FormGroup>
                <Col componentClass={ControlLabel} sm={5}>
                    Input Login
                </Col>
                <Col sm={2}>
                    <FormControl type="text" placeholder="Login" onChange={this.handleLoginInputChange} />
                </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={5}>
                    Input Password
                </Col>
                <Col sm={2}>
                    <FormControl type="password" placeholder="Password" onChange={this.handlePasswordInputChange} />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col smOffset={1} sm={9}>
                    <Button onClick={this.handleLogButtonClick}>Войти</Button>
                </Col>
                {error}
            </FormGroup>
        </Form>
        );
        return (
            <div>
                <Navbar className="nav">
                    <Nav >
                        <NavItem eventKey={1} href="#">
                            Search
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            My Movies
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            {username}
                        </NavItem>
                    </Nav>
                </Navbar>
                <Grid>
                {logArea}
                {dataArea}
                </Grid>
            </div>
        )
    }
}