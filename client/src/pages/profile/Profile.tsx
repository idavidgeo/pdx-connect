import * as React from "react";
import {Component, ReactNode} from "react";
import {Container, Row, Col, Form} from "react-bootstrap";
import {FaPencilAlt, FaSave, FaUndoAlt} from "react-icons/fa";
import Select from 'react-select';
import {ValueType} from "react-select/lib/types";
import {OptionType} from "../../components/types";
import {postJSON} from "../../util/json";

import "./Profile.css";

interface Disabled {
    displayName: boolean;
    major: boolean;
}

interface Props {
    updateDisplayName: (s: string) => void,
}

interface SubState {
    displayName: string;
    major: string;
    commuter: string;
    interests: [];
    optInEmail: string;
    picture: string;
    description: string;
}

interface State extends SubState {
    error: { [key in keyof SubState]: boolean };
    disabled: { [key in keyof SubState]: boolean };
    selectedOptions: OptionType[];
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
            error: {
                'displayName': false,
                'major': false,
                'commuter': false,
                'interests': false,
                'optInEmail': false,
                'picture': false,
                'description': false
            },
            disabled: {
                'displayName': true,
                'major': true,
                'commuter': true,
                'interests': true,
                'optInEmail': true,
                'picture': true,
                'description': true
            },
            selectedOptions: [],
        };
    }

    private readonly handleInterestChange = (value: ValueType<OptionType>) => {
        this.setState({
            selectedOptions: OptionType.resolve(value)
        });
    };

    private readonly toggle = (e: keyof SubState, state?: boolean) => {
        let updatedDisabled = this.state.disabled;
        updatedDisabled[e] = state != null ? state : !updatedDisabled[e];

        this.setState({
           disabled: updatedDisabled
        });
    };

    private readonly error = (e: keyof SubState, state?: boolean) => {
        let updatedError = this.state.error;
        updatedError[e] = state != null ? state : !updatedError[e];

        this.setState({
           error: updatedError
        });
    };

    private readonly handleChange = (e: any) => {
        this.setState({
            [e.target.id]: e.target.value
        } as any);
    };

    private readonly update = async (e: keyof SubState) => {
        console.log('TODO: user wants to update profile setting: ', e);
        // Update specific profile information and send changes to the
        // DB
        switch (e) {
            case "displayName": {
                const data = await postJSON("/api/user/name", this.state.displayName);
                if (!('success' in data)) {
                    this.error(e, true);
                    return;
                } else {
                    this.props.updateDisplayName(this.state.displayName);
                }
                break;
            }
            case "major":
                break;
            case "description": {
                const data = await postJSON("/api/user/description", this.state.description);
                if (!('success' in data)) {
                    this.error(e, true);
                    return;
                }
                break;
            }
            default:
                console.error("Unsupported update field");
                break;
        }
        this.toggle(e, true);
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
                                    className={this.state.error.displayName ? "error" : "generic"}
                                    value={this.state.displayName}
                                    disabled={this.state.disabled.displayName}
                                />
                            </Form.Group>
                       </Col>

                       <Col sm={4} className="edit">
                            {this.state.disabled['displayName']?
                            <div>
                                <FaPencilAlt className="editField" size="2vw" onClick={() => this.toggle('displayName')}/>
                            </div>
                                :
                            <div>
                                    <FaSave className="saveChanges" size="2vw" onClick={() => this.update('displayName')}></FaSave>
                                    <FaUndoAlt className="undoEdit" size="2vw" onClick={() => this.toggle('displayName')}></FaUndoAlt>
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
                                <FaPencilAlt className="editField" size="2vw" onClick={() => this.toggle('major')}/>
                            </div>
                                :
                            <div>
                                    <FaSave className="saveChanges" size="2vw" onClick={() => this.update('major')}></FaSave>
                                    <FaUndoAlt className="undoEdit" size="2vw" onClick={() => this.toggle('major')}></FaUndoAlt>
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
                                value={this.state.selectedOptions}
                                onChange={this.handleInterestChange}
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
                                <FaPencilAlt className="editField" size="2vw" onClick={() => this.toggle('optInEmail')}/>
                            </div>
                                :
                            <div>
                                    <FaSave className="saveChanges" size="2vw" onClick={() => this.update('optInEmail')}></FaSave>
                                    <FaUndoAlt className="undoEdit" size="2vw" onClick={() => this.toggle('optInEmail')}></FaUndoAlt>
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
                                <FaPencilAlt className="editField" size="2vw" onClick={() => this.toggle('picture')}/>
                            </div>
                                :
                            <div>
                                    <FaSave className="saveChanges" size="2vw" onClick={() => this.update('picture')}></FaSave>
                                    <FaUndoAlt className="undoEdit" size="2vw" onClick={() => this.toggle('picture')}></FaUndoAlt>
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
                                <FaPencilAlt className="editField" size="2vw" onClick={() => this.toggle('description')}/>
                            </div>
                                :
                            <div>
                                    <FaSave className="saveChanges" size="2vw" onClick={() => this.update('description')}></FaSave>
                                    <FaUndoAlt className="undoEdit" size="2vw" onClick={() => this.toggle('description')}></FaUndoAlt>
                            </div>
                            }
                       </Col>
                   </Row>


                </Container>

        );
    }

}