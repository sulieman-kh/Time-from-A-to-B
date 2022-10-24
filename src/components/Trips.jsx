import React, { useEffect, useState } from 'react';
import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import { trips } from '../data';
import Modal from './Modal';


const Select = styled.select``;
const Option = styled.option``;
const Container = styled.div``;
const Filter = styled.div`
  display:flex;
  align-items: center;
`;
const Title = styled.div`
margin-left: 10px;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;

`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  margin-left: 10px;
`;





const Trips = ({ filters }) => {
  const [trip, setTrip] = useState([]);
  const [tripBack, setTripBack] = useState([]);
  const [detailsTrip, setDetailsTrip] = useState("")
  const [quantity, setQuantity] = useState(1);
  const [departureTime, setDepartureTime] = useState([]);
  const [arrivalTime, setArrivalTime] = useState([]);
  const [departureTimeFromB, setDepartureTimeFromB] = useState([]);
  const [backTime, setBackTime] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [isShownModal, setIsShownModal] = useState(false);


  useEffect(() => {
    if (filters === "2") {
      const roundWay = trips[0].Traveltimes;
      setTrip(roundWay);
      setIsShown(current => !current);
    }
    else {
      const getTrips = trips[filters]?.Traveltimes;
      setTrip(getTrips)
      setIsShown(false);
    };
  }, [filters]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    };
  };
  useEffect(() => {
    // Calc time of the trip from A to B or from B to A
    const dateTrip = detailsTrip.slice(0, 16);
    const hour = `${new Date(dateTrip).getHours()}`
    const min = `${new Date(dateTrip).getMinutes()}`.padStart(2, 0);
    const timeTrip = `${hour}-${min}`;
    setDepartureTime(timeTrip);

    // Calc the arrival time in one direction, the takes 50 minuts
    const d1 = new Date(new Date(dateTrip)),
      arrivalTime = new Date(d1);
    arrivalTime
      .setMinutes(d1.getMinutes() + 50);
    const hourArrival = `${new Date(arrivalTime).getHours()}`
    const minArrival = `${new Date(arrivalTime).getMinutes()}`.padStart(2, 0);
    const TimeArrival = `${hourArrival}-${minArrival}`;
    setArrivalTime(TimeArrival);

    // Calc time of the return when ticket from A to B and return to A     
    const timeTripReturn = backTime.slice(0, 16);
    if (filters === "2") {
      const timesReturn = trips[1].Traveltimes.filter(timeBack => new Date(timeBack.slice(0, 16)) > new Date(arrivalTime));
      setTripBack(timesReturn);
      const hourDepartureFromB = `${new Date(timeTripReturn).getHours()}`
      const minDepartureFromB = `${new Date(timeTripReturn).getMinutes()}`.padStart(2, 0);
      const TimeDepartureFromB = `${hourDepartureFromB}-${minDepartureFromB}`;
      setDepartureTimeFromB(TimeDepartureFromB);
    };
  }, [filters, detailsTrip, backTime]);

  return (
    <Container>
      {!trip ? "" : (
        <Filter>
          <Title style={{ marginRight: "10px" }} >Выберите время</Title>
          <Select name="time" onClick={(e) => setDetailsTrip(e.target.value)} >
            {trip?.map((trip) => (
              <Option key={trip}> {trip}</Option>
            ))}
          </Select>
          <Select style={{ display: isShown ? 'block' : 'none' }} name="time" onClick={(e) => setBackTime(e.target.value)} Value="text">
            {tripBack.map((trip) => (
              <Option key={trip}>{trip}</Option>
            ))}
          </Select>
          <AmountContainer>
            <Title>Количество билетов</Title>
            <Remove onClick={() => handleQuantity("dec")} />
            <Amount >{quantity}</Amount>
            <Add onClick={() => handleQuantity("inc")} />
          </AmountContainer>
          <Button onClick={() => { setIsShownModal(true) }}>
            Посчитать
          </Button>
          <div style={{ display: isShownModal ? 'block' : 'none' }} >
            <Modal departureTime={departureTime} isShown={isShown} arrivalTime={arrivalTime} quantity={quantity} detailsTrip={detailsTrip} setIsShownModal={setIsShownModal} departureTimeFromB={departureTimeFromB} />
          </div>
        </Filter>
      )}
    </Container>
  );
};

export default Trips;