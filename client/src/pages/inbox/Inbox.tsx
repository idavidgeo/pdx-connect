import * as React from "react";
import {Container, Row, Col, Form, FormControl, Button} from "react-bootstrap";
import {Component, ReactNode} from "react";
import {ConversationEntry} from "../Home";

//import {ConversationEntry} from "./Home";

import "./Inbox.css";


interface Props {
    sendMessage: (conversationID: number, msg: string) => void;
    getMoreMessages: (conversationID: number) => void;
    seenRecent: (conversationID: number, time: number) => void;
<<<<<<< HEAD:client/src/pages/Inbox.tsx
    //conversations: ConversationEntry[];
=======
    conversations: ConversationEntry[];
>>>>>>> persson/messaging-client-and-server:client/src/pages/inbox/Inbox.tsx
    newMessageCount: number;
}

interface State {
    currentConversation: number;
    textField: string;
}

const conversations = [
    {   
        conversationID: 100,
        lastSeen: 1555011969, // epoch
        messages: [
            {
                userID: 6,
                timeSent: 1555011169,
                text: "I am David!",
                seen: false
            },
            {
                userID: 4,
                timeSent: 1555011175,
                text: "I am Daniel!",
                seen: false
            },
            {
                userID: 6,
                timeSent: 1555011179,
                text: "Whats up?",
                seen: false
            },
            {
                userID: 4,
                timeSent: 1555011186,
                text: "Nothing much",
                seen: false
            },
            {
                userID: 6,
                timeSent: 1555011197,
                text: "Are you actually Daniel?",
                seen: false
            },
            {
                userID: 4,
                timeSent: 1555011201,
                text: "Nah I'm David lol",
                seen: false
            },
            {
                userID: 6,
                timeSent: 1555011210,
                text: "Ah, you got me for a sec",
                seen: false
            },
            {
                userID: 6,
                timeSent: 1555011220,
                text: "Ayyyyyyyyyyyyyyyy",
                seen: false
            },
            {
                userID: 6,
                timeSent: 1555011225,
                text: "Ayyyyyy",
                seen: false
            },
            {
                userID: 6,
                timeSent: 1555011225,
                text: "Ayyyyyy",
                seen: false
            },
            {
                userID: 6,
                timeSent: 1555011225,
                text: "Ayyyyyy",
                seen: false
            },
            {
                userID: 6,
                timeSent: 1555011225,
                text: "Ayyyyyy",
                seen: false
            },
            {
                userID: 6,
                timeSent: 1555011225,
                text: "Ayyyyyy",
                seen: false
            },
            {
                userID: 6,
                timeSent: 1555011225,
                text: "Ayyyyyy",
                seen: false
            },            {
                userID: 6,
                timeSent: 1555011225,
                text: "Ayyyyyy",
                seen: false
            },            {
                userID: 6,
                timeSent: 1555011225,
                text: "Ayyyyyy",
                seen: false
            },            {
                userID: 6,
                timeSent: 1555011225,
                text: "Ayyyyyy",
                seen: false
            }
        ]
    },
    {   
        conversationID: 101,
        lastSeen: 1555011959, // epoch
        messages: [
            {
                userID: 4,
                timeSent: 1555011169,
                text: "I am user 1",
                seen: false
            },
            {
                userID: 6,
                timeSent: 1555011175,
                text: "I am user 2",
                seen: false
            }
        ]
    },
    {   
        conversationID: 102,
        lastSeen: 1555011969, // epoch
        messages: [
            {
                userID: 4,
                timeSent: 1555011169,
                text: "Hello world",
                seen: false
            },
            {
                userID: 6,
                timeSent: 1555011175,
                text: "ayee",
                seen: false
            }
        ]
    }
];

/**
 * 
 */
export class Inbox extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            currentConversation: 0,
            textField: "",
        }
    }

    private readonly onChange = (e: any) => {
        this.setState({textField: e.target.value});
    }

    private readonly onSubmit = (e: any) => {
        e.preventDefault();



        //
        // Message sending code goes here
        //



        console.log(this.state.textField);
        this.setState({textField: ""});
        //this.props.onSendMessage(this.state.textField)
    }
    
    private readonly getInbox = () => {
        let rows = [];
        for (let i=0; i<conversations.length; i++) {
            if (i == this.state.currentConversation) {
                rows.push(
                    <Row key={i} onClick={()=> this.setState({currentConversation: i})} className="open-conversation">
                        <Col key={i} sm={12}>
                            Message from: user {conversations[i].messages[0].userID}
                            Preview: {conversations[i].messages[conversations[i].messages.length-1].text}
                        </Col>
                    </Row>
                );
            }
            else {
                rows.push(
                    <Row key={i} onClick={()=> this.setState({currentConversation: i})} className="conversation">
                        <Col key={i} sm={12}>
                            Message from: user {conversations[i].messages[0].userID}
                            Preview: {conversations[i].messages[conversations[i].messages.length-1].text}
                        </Col>
                    </Row>
                );
            }
        }
        return rows;
    }

    private readonly getMessages = () => {
        let rows = [];
        for (let i=0; i<conversations[this.state.currentConversation].messages.length; i++) {
            if (conversations[0].messages[i].userID == 6) {
                 rows.push(
                    <Row key={i} className="my-message">
                        <Col key={i} sm={12}> {conversations[this.state.currentConversation].messages[i].text}</Col>
                    </Row>
                );
            }
            else {
                rows.push(
                    <Row key={i} className="other-message">
                        <Col key={i} sm={12}> {conversations[this.state.currentConversation].messages[i].text}</Col>
                    </Row>
              );
            }
        }
        return rows;
    }

    /**
     * @override
     */
    public render(): ReactNode {

            /* 
            
            == Default view of inbox page ==
            for each convo where user is a participant of
                list last message and icon indication # of unseen messages

            == On press of any listed conversation == 
            for last 20 messages in convo
                sort messages by time stamp
                if user is me
                    print message right side
                else 
                    print message left side
            */

            let conversations = this.getInbox();
            let messages = this.getMessages();

        return (

            <Container fluid className="inbox">
                <div className="conversations">
                    {conversations}
                </div>

                <div className="chat-box">
                    {messages}
                </div>

                <div className="text-box">
                    <Form onSubmit={(e: any) => this.onSubmit(e)}>
                        <Row>
                            <Col><Form.Control onChange={(e: any) => this.onChange(e)} type="text" value={this.state.textField} placeholder="Enter message..."/></Col>
                            <Col><Button variant="primary" type="submit">Send</Button></Col>
                        </Row>
                    </Form>
                </div>
            </Container>
        );
    }
}