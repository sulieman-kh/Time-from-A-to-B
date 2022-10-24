import React from 'react'
import styled from 'styled-components';

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right:0;
  top: 0;
  bottom: 0;
  background-color: #99bfc6;
  color: #111;
`;

const ModalContent = styled.div`
  width:520px;
  background-color: #ffff;
`;

const ModalHeader = styled.div`
  padding: 20px
`;

const ModalTitle = styled.div``;

const ModalBody = styled.div`
  padding: 10px
`;

const ButtonModal = styled.button``;


const Modal = ({ quantity, detailsTrip, isShown, departureTime, arrivalTime, setIsShownModal, departureTimeFromB }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <ModalTitle></ModalTitle>
          <ModalBody>Вы выбрали {quantity} {quantity === 1 ? "билет" : "билета"} по маршруту {detailsTrip.slice(21, 29)} {isShown ? "и обратно в А" : ""}  стоимостью {isShown ? quantity * 1200 : quantity * 700}р.
            Это путешествие займет у вас 50 минут.
            Теплоход отправляется в {departureTime}, а прибудет в {arrivalTime} {isShown ? `и обратно в А в ${departureTimeFromB}` : ""}.
          </ModalBody>
          <ButtonModal onClick={() => setIsShownModal(false)}>Закрыть</ButtonModal>
        </ModalHeader>
      </ModalContent>
    </ModalContainer>
  )
}

export default Modal