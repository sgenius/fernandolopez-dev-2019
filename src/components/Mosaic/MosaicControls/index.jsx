import React from 'react';
import styled from 'styled-components';
import { AVAILABLE_FILTER_CONFIGURATIONS } from '../constants';

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
    zoom,
    selectedFilters,
    handleSelectedFiltersChange,
}) => {

    const renderFilterOptions = AVAILABLE_FILTER_CONFIGURATIONS.map((optionConfig, optionConfigIndex) => {
        return (
            <option value={optionConfigIndex} selected={optionConfigIndex === selectedFilters}>{optionConfig.name}</option>
        )
    })

    return (
        <Wrapper>
            <Row>
                <Section>
                    <Text>
                        Mouse at: {mouseCoords.x}, {mouseCoords.y}
                    </Text>
                </Section>
                <Section>
                    <Text>
                        Zoom: {zoom}
                    </Text>
                </Section>
                <Section>
                    <Text>
                        Filters:
                    </Text>
                    <select onChange={handleSelectedFiltersChange}>
                        {renderFilterOptions}
                    </select>
                </Section>
            </Row>
        </Wrapper>
    );
};;

export default MosaicControls;