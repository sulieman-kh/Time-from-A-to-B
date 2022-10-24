import React, { useState } from 'react';
import styled from "styled-components";
import Trips from '../components/Trips';

const Container = styled.div`
  padding: 50px;
`;

const Title = styled.h1`
  margin: 20px;
`;
const FiltreContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Filter = styled.div``;
const Select = styled.select``;
const Option = styled.option``;

const TripList = () => {
  const [filters, setFilters] = useState([]);

  const handlerFilters = (el) => {
    const value = el.target.value;
    setFilters(value);
  };

  return (
    <Container>
      <Title>Расписание теплоходов ⚓</Title>
      <FiltreContainer>
        <Filter >
          <Select name="route" onChange={handlerFilters}>
            <Option >Выберите направление</Option>
            <Option value="0">из A в B</Option>
            <Option value="1">из B в A</Option>
            <Option value="2">из A в B и обратно в А</Option>
          </Select>
        </Filter>
        <Trips filters={filters} />
      </FiltreContainer>
    </Container>
  );
};


export default TripList;