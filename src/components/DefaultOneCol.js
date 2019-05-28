import React from 'react';
import { Container, Row, Col } from 'react-awesome-styled-grid';

export const DefaultOneCol = (props) => (
    <Container>
        <Row>
            <Col xs={4} sm={6} lg={8} offset={{ sm: 1, lg: 2 }}>
                {props.children}
            </Col>
        </Row>
    </Container>
);

export default DefaultOneCol;