import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { GiTacos } from 'react-icons/gi';

import Link from 'components/Link';

const StyledTacoSection = styled.section`
    padding-bottom: 1rem;
`;

const StyledTacoWrapper = styled.span`
    display: inline-block;
    padding-left: 0.5rem;
    font-size: 0.8rem;
`;

export class RandomTaco extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tacoStruct: {},
        };
    }

    componentDidMount = () => {
        this.getTaco();
    }

    getTaco = () => {
        axios.get('https://taco-randomizer.herokuapp.com/random/')
            .then((response) => {
                this.setState({
                    tacoStruct: response.data,
                });
            });
    }

    getTacoIngredientOutput = (ingredient) => (
        <Link
            as="a"
            to="#"
            target="_blank"
            href={ingredient.url}
        >
            {ingredient.name}
        </Link>
    );

    getTacoOutput = () => {
        const {
            base_layer,
            condiment,
            seasoning,
        } = this.state.tacoStruct;
        const tacoOutput = !base_layer
            ? (<span>Building you a taco...</span>)
            : (<>
                <strong>Your taco: </strong>
                {this.getTacoIngredientOutput(base_layer)}
                &nbsp;with&nbsp;
                {this.getTacoIngredientOutput(condiment)}
                &nbsp;and&nbsp;
                {this.getTacoIngredientOutput(seasoning)}
            </>);
        return (<StyledTacoWrapper>{tacoOutput}</StyledTacoWrapper>);
    }

    clickHandler = (evt) => {
        this.getTaco();
    }

    render = () => (
        <StyledTacoSection>            
            <div onClick={this.clickHandler}>
                <GiTacos />{this.getTacoOutput()}
            </div>
        </StyledTacoSection>
    );
}

export default RandomTaco;