import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background: #111;
    color: #ffa;
    font-size: 10px;
    font-family: monospace;
`;

const Row = styled.div`
    display: block;
`;

const Section = styled.div`
    display: inline-block;
    border: 1px solid #ffa; 
`;

const Text = styled.span`
    display: inline-block;
    padding: 8px;
`;

export const MosaicControls = ({
    mouseCoords,
}) => {
    return (
        <Wrapper>
            <Row>
                <Section>
                    <Text>
                        Mouse at: {mouseCoords.x}, {mouseCoords.y}
                    </Text>
                </Section>
            </Row>
        </Wrapper>
    );
};;

export default MosaicControls;