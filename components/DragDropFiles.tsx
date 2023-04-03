import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  padding: 24px 36px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border: 2px dashed gray;
`;

export function DragDropFiles(props: { onFilesAdded: (files: File[]) => void }) {
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    props.onFilesAdded([...e.dataTransfer.files]);
  };

  return (
    <Container onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
      <p>드래그 앤 드롭으로 파일 추가하기</p>
    </Container>
  );
}
