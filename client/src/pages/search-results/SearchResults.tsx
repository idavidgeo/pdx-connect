import * as React from "react";
import {Component, ReactNode, useState} from "react";
import "./SearchResults.css"
import { Container, Row, Col } from "react-bootstrap";
import "./ReactGrid"
import { ReactGrid } from "./ReactGrid";

interface Props {
    finalSearchField: string;
}

interface State {
   
}


/**
 * 
 */
export class SearchResults extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
    }


    /**
     * @override
     */

    /**
     * @override
     */
    public render(): ReactNode {
        return (
            <Container fluid className="searchResults">
                <Row className="toprow">
                    <Col sm={8} md={8} className="resultsFor">Search results by username for: {this.props.finalSearchField}</Col>
                </Row>
                <ReactGrid searchBy={1} searchField={this.props.finalSearchField}></ReactGrid>
            </Container>
        );
    }

}