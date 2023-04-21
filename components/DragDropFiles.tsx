import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 80%;
  min-height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid gray;
  border-radius: 14px;

  font-size: 18px;
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
      <p>파일을 드래그 해서 업로드하기</p>
    </Container>
  );
}
