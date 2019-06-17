import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-awesome-styled-grid';

const StyledContainer = styled(Container)`
    position: relative;
`;

export const DefaultOneCol = (props) => (
    <StyledContainer>
        <Row>
            <Col xs={4} sm={6} lg={8} offset={{ sm: 1, lg: 2 }}>
                {props.children}
            </Col>
        </Row>
    </StyledContainer>
);

export default DefaultOneCol;