import * as React from "react";
import {Component, ReactNode} from "react";
import {Container, Row, Col, Form} from "react-bootstrap";
import { FaPencilAlt, FaSave, FaUndoAlt } from "react-icons/fa";
import Select from 'react-select';
import {ActionMeta, ValueType} from "react-select/lib/types";
import {OptionType} from "../components/types";
import "./Profile.css";

interface Disabled {
    displayName: boolean;
    major: boolean;
}

interface Props {
    selectedOptions: ValueType<OptionType>;
    handleInterestChange: (value: ValueType<OptionType>, action: ActionMeta) => void;
}

interface State {
    displayName: string;
    major: string;
    commuter: string;
    interests: [];
    optInEmail: string;
    picture: string;
    description: string;
    disabled: { [key: string]: boolean };
}




/**
 * 
 */
export class Profile extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            displayName: "",
            major: "",
            commuter: "",
            interests: [],
            optInEmail: "",
            picture: "",
            description: "",
            disabled: {
                'displayName': true,
                'major': true,
                'commuter': true,
                'interests': true,
                'optInEmail': true,
                'picture': true,
                'description': true,
            }
        };
    }

    private readonly enable = (e: any) => {
        let updatedDisabled = this.state.disabled;
        updatedDisabled[e]= !updatedDisabled[e];

        this.setState({
           disabled: updatedDisabled
        });
    };

    private readonly handleChange = (e: any) => {
        this.setState({
            [e.target.id]: e.target.value
        } as any);
    };

    private readonly update = (e: any) => {
        console.log('TODO: user wants to update profile setting: ', e);
        //console.log(this.state.e);
        //console.log(this.state);

        //this.setState({
            //e: 
        //} as any)
    };

    /**
     * @override
     */
    public render(): ReactNode {

        const currentDisplayName = "matilda";
        const currentMajor = "english";
        const currentBio = "New to Oregon and PSU. Looking to connect with foodies, art lovers, and other anthro majors.";
        const currentOptIn = "mat@gmail.com";
        const currentPicture = "matilda.png";

        const {selectedOptions, handleInterestChange} = this.props;

        const commuterOptions = [
            { value: 'on campus', label: 'campus' },
            { value: 'remote', label: 'remote' }
          ]

        const interests = [
            { value: 'free food', label: 'free food' },
            { value: 'biking', label: 'biking' },
            { value: 'art', label: 'art'},
            { value: 'computer science', label: 'computer science'}
        ]

        
        return (
                <Container fluid className="profile">
                   <Row>
                       <Col sm={4} className="label">display name</Col>

                       <Col sm={4}>
                            <Form.Group className="formBasic">
                                <Form.Control
                                    type="text"
                                    placeholder={currentDisplayName}
                                    onChange={this.handleChange}
                                    id="displayName"
                                    className="generic"
                                    value={this.state.displayName}
                                    disabled={this.state.disabled['displayName']}
                                />
                            </Form.Group>
                       </Col>

                       <Col sm={4} className="edit">
                            {this.state.disabled['displayName']?
                            <div>
                                <FaPencilAlt className="editField" size="2vw" onClick={() => this.enable('displayName')}/>
                            </div>
                                :
                            <div>
                                    <FaSave className="saveChanges" size="2vw" onClick={() => this.update('displayName')}></FaSave>
                                    <FaUndoAlt className="undoEdit" size="2vw" onClick={() => this.enable('displayName')}></FaUndoAlt>
                            </div>
                            }
                       </Col>
                   </Row>

                   <Row>
                       <Col sm={4} className="label">major</Col>

                       <Col sm={4}>
                            <Form.Group className="formBasic">
                                <Form.Control
                                    type="text"
                                    placeholder={currentMajor}
                                    onChange={this.handleChange}
                                    id="major"
                                    className="generic"
                                    value={this.state.major}
                                    disabled={this.state.disabled['major']}
                                />
                            </Form.Group>
                       </Col>
                       
                       <Col sm={4} className="edit">
                            {this.state.disabled['major']?
                            <div>
                                <FaPencilAlt className="editField" size="2vw" onClick={() => this.enable('major')}/>
                            </div>
                                :
                            <div>
                                    <FaSave className="saveChanges" size="2vw" onClick={() => this.update('major')}></FaSave>
                                    <FaUndoAlt className="undoEdit" size="2vw" onClick={() => this.enable('major')}></FaUndoAlt>
                            </div>
                            }
                       </Col>
                   </Row>

                   <Row className="bottomMargin">
                       <Col sm={4} className="label">commuter</Col>

                       <Col sm={4}>
                            <Select options={commuterOptions} />
                       </Col>
                       
                       <Col sm={4} className="edit"></Col>
                   </Row>


                   <Row>
                       <Col sm={4} className="label">interests</Col>
                       <Col sm={4}>
                            <Select
                                options={interests}
                                value={selectedOptions}
                                onChange={handleInterestChange}
                                isMulti={true}
                            />
                       </Col>
                       <Col sm={4} className="edit"></Col>
                   </Row>

                    {/* Opt-in email */}
                   <Row >
                       <Col sm={4} className="label">opt-in email</Col>

                       <Col sm={4}>
                            <Form.Group className="formBasic">
                                <Form.Control
                                    type="text"
                                    placeholder={currentOptIn}
                                    onChange={this.handleChange}
                                    id="optInEmail"
                                    className="generic"
                                    value={this.state.optInEmail}
                                    disabled={this.state.disabled['optInEmail']}
                                />
                            </Form.Group>
                       </Col>
                       
                       <Col sm={4} className="edit">
                            {this.state.disabled['optInEmail']?
                            <div>
                                <FaPencilAlt className="editField" size="2vw" onClick={() => this.enable('optInEmail')}/>
                            </div>
                                :
                            <div>
                                    <FaSave className="saveChanges" size="2vw" onClick={() => this.update('optInEmail')}></FaSave>
                                    <FaUndoAlt className="undoEdit" size="2vw" onClick={() => this.enable('optInEmail')}></FaUndoAlt>
                            </div>
                            }
                       </Col>
                   </Row>

                {/* Picture */}
                   <Row>
                       <Col sm={4} className="label">picture</Col>

                       <Col sm={4}>
                            <Form.Group className="formBasic">
                                <Form.Control
                                    type="text"
                                    placeholder={currentPicture}
                                    onChange={this.handleChange}
                                    id="picture"
                                    className="generic"
                                    value={this.state.picture}
                                    disabled={this.state.disabled['picture']}
                                />
                            </Form.Group>
                       </Col>
                       
                       <Col sm={4} className="edit">
                            {this.state.disabled['picture']?
                            <div>
                                <FaPencilAlt className="editField" size="2vw" onClick={() => this.enable('picture')}/>
                            </div>
                                :
                            <div>
                                    <FaSave className="saveChanges" size="2vw" onClick={() => this.update('picture')}></FaSave>
                                    <FaUndoAlt className="undoEdit" size="2vw" onClick={() => this.enable('picture')}></FaUndoAlt>
                            </div>
                            }
                       </Col>
                   </Row>

                    {/* Biography */}
                   <Row>
                       <Col sm={4} className="label">description</Col>

                       <Col sm={4}>
                            <Form.Group className="formBasic">
                                <Form.Control
                                    as="textarea"
                                    placeholder={currentBio}
                                    onChange={this.handleChange}
                                    id="description"
                                    className="generic"
                                    value={this.state.description}
                                    disabled={this.state.disabled['description']}
                                />
                            </Form.Group>
                       </Col>
                       
                       <Col sm={4} className="edit">
                            {this.state.disabled['description']?
                            <div>
                                <FaPencilAlt className="editField" size="2vw" onClick={() => this.enable('description')}/>
                            </div>
                                :
                            <div>
                                    <FaSave className="saveChanges" size="2vw" onClick={() => this.update('description')}></FaSave>
                                    <FaUndoAlt className="undoEdit" size="2vw" onClick={() => this.enable('description')}></FaUndoAlt>
                            </div>
                            }
                       </Col>
                   </Row>


                </Container>

        );
    }

}