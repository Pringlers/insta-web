import React, { useState } from "react";
import styled from "@emotion/styled";

const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

export function Modal({ button, children }: { button: React.ReactElement; children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <div>
      {React.cloneElement(button, { onClick: toggleModal })}
      {showModal && (
        <ModalOverlay onClick={toggleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>{children}</ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
}
