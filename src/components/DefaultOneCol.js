import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-awesome-styled-grid';

const Wrapper = styled.section`
    width: 100%;
    position: relative;
`;

const StyledContainer = styled(Container)`
    margin: 0 auto; 
`;

export const DefaultOneCol = (props) => (
    <Wrapper>
        <StyledContainer>
            <Row>
                <Col xs={4} sm={6} lg={8} offset={{ sm: 1, lg: 2 }}>
                    {props.children}
                </Col>
            </Row>
        </StyledContainer>
    </Wrapper>
);

export default DefaultOneCol;