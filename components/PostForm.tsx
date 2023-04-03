import React, { useState } from "react";
import styled from "@emotion/styled";
import { DragDropFiles } from "./DragDropFiles";
import { Modal } from "./Modal";

const PostButton = styled.button`
  padding: 14px 28px;

  border: none;
  border-radius: 50px;

  color: white;
  font-size: 16px;
  font-weight: bolder;
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);

  cursor: pointer;

  &:hover {
    filter: brightness(90%);
  }
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextInput = styled.input`
  margin: 10px 0;
  padding: 5px;

  border: 1px solid gray;
  border-radius: 5px;
  outline: none;

  font-size: 16px;
`;

const FileList = styled.ul`
  list-style: none;
  margin: 10px;
  padding: 0;
`;

const FileItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid lightgray;
  font-size: 16px;
`;

const RemoveButton = styled.button`
  margin-left: 10px;
  padding: 5px;
  border-radius: 5px;
  border: none;
  background-color: #e74c3c;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

export function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState<string>("");

  const handleCaptionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles(selectedFiles.filter((file) => file !== fileToRemove));
  };

  const onSubmit = () => {
    if (selectedFiles.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append("username", "pringles");
    formData.append("caption", caption);
    selectedFiles.forEach((file, i) => {
      formData.append(`files[${i}]`, file);
    });

    fetch("http://localhost:8000/posts", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <Modal button={<PostButton>새로운 게시물 만들기</PostButton>}>
      <ModalWrapper>
        <TextInput type="text" value={caption} onChange={handleCaptionInput} placeholder="Enter caption" />
        <DragDropFiles onFilesAdded={(files) => setSelectedFiles([...selectedFiles, ...files])} />
        <FileList>
          {selectedFiles.map((file) => (
            <FileItem key={file.name}>
              {file.name}
              <RemoveButton onClick={() => handleRemoveFile(file)}>삭제하기</RemoveButton>
            </FileItem>
          ))}
        </FileList>
        <button onClick={onSubmit} disabled={selectedFiles.length === 0}>
          게시하기
        </button>
      </ModalWrapper>
    </Modal>
  );
}
