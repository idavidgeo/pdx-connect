import * as React from "react";
import {ReactNode} from "react";
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import {Page} from "../Page";
import {RouteComponentProps, withRouter} from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";

import "./Login.css";
import { classNames } from "react-select/lib/utils";


interface Props extends RouteComponentProps {
    
}

interface State {
    email?: string;
    password?: string;
    notAuthorized: boolean;
    emptyFields: boolean
}

/**
 * 
 */
export class Login extends Page<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            notAuthorized: false,
            emptyFields: false
        };
    }

    private readonly setEmail = (e: any) => {
        this.setState({email: e.target.value});
    };

    private readonly setPassword = (e: any) => {
        this.setState({password: e.target.value});
    };


    // Similar to enterKeyPressed - Authenticate user and move to the home page
    // But this is for when the arrow is used instead of the enter key
    private readonly nextArrowPressed = (e: any) => {
        if( !this.checkNull() )     // Make sure fields entered before going to authenticate
            this.processCredentials();
    };
    
    private readonly enterKeyPressed = (e: any) => {
        if (e.keyCode === 13) {
            if( !this.checkNull() )     // Make sure fields entered before going to authenticate
                this.processCredentials();
        }
    };

    private readonly authenticate = async (email: string, password: string) => {
        const response: Response = await fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        if ('success' in data) {
            localStorage.clear();
            this.props.history.push("/");
        }
        else
        {
            this.setState({notAuthorized: true});
        }
    };

    // Check if email and password are entered
    private readonly checkNull = () => {
        if (this.state.email === "" || this.state.password === "") {
            this.setState({
                emptyFields: true,
                notAuthorized: false
            })
            return true;
        }
        return false;
    };


    private readonly processCredentials = () => {
       if (this.state.email != null && this.state.password != null) {
            this.setState({
                emptyFields: false
            })
            this.authenticate(this.state.email, this.state.password).then();
        }
    };

    public clearLocalStorage()
    {
        localStorage.removeItem('displayName');
        localStorage.removeItem('email');
        localStorage.removeItem('disabled');
        localStorage.removeItem('userID');
        localStorage.removeItem('tos');
    }
    
    /**
     * @override
     */
    public componentDidMount() {
        document.addEventListener('keydown', this.enterKeyPressed);
    }
    
    /**
     * @override
     */
    public componentWillUnmount() {
        document.removeEventListener('keydown', this.enterKeyPressed);
    }
    
    /**
     * @override
     */
    public render(): ReactNode {

        const register =
            <Button size="sm" variant="light" onClick={() => {this.props.history.push('/register')} } className="register">register</Button>;

        const password =
            <Button size="sm" variant="light" onClick={() => {this.clearLocalStorage(); this.props.history.push('/reset')} } className="password-forgot">password?</Button>;

        const loginButton =
            <Button size="sm" variant="light" onClick={this.nextArrowPressed} className="login-button">Login</Button>;


        return (
            <Container fluid className="login">
                <Row className="title">
                    <Col sm={2}></Col>
                    <Col sm={8}><h1>pdx connect</h1></Col>
                    <Col sm={2}></Col>
                </Row>

                <Row>
                    <Col sm={4}></Col>
                    <Col sm={4} className="notAuthorized">
                        {this.state.notAuthorized? <span>Credentials Incorrect</span> : null}
                        {this.state.emptyFields? <span> Please enter in your credentials </span> : null}
                    </Col>
                    <Col sm={4}></Col>
                </Row>
                <Row>
                    <Col sm={4}></Col>
                    <Col sm={4}>
                        <Form>
                            <Form.Group className="formBasic">
                                <Form.Control type="email" placeholder="email" className="generic" onChange={this.setEmail}/>
                            </Form.Group>

                            <Form.Group className="formBasic">
                                <Form.Control type="password" placeholder="password" className="generic" onChange={this.setPassword}/>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={4}></Col>
                </Row>

                <Row>
                    <Col sm={4}></Col>
                    <Col sm={4}>
                        { register }
                        { password }
                    </Col>
                    <Col sm={4}></Col>
                </Row>

                <Row>
                    <Col sm={5}></Col>
                    <Col sm={2}>
                        { loginButton }
                    </Col>
                    <Col sm={5}></Col>
                </Row>
            </Container>
        );
    }

}
