import React, { useState } from "react";
import styled from "@emotion/styled";
import { DragDropFiles } from "./DragDropFiles";
import { Modal } from "./Modal";
import { IoClose } from "react-icons/io5";

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
  width: 40vw;
  height: 60vh;

  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextInput = styled.input`
  margin-top: 36px;

  width: 80%;

  border: none;
  outline: none;

  font-size: 14px;
`;

const FileList = styled.ul`
  list-style: none;
  margin: 10px;
  padding: 0;
`;

const FilePreview = styled.img`
  max-width: 400px;
`;

const RemoveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 10px;
  padding: 8px;

  border-radius: 50%;
  border: none;

  color: white;
  background-color: #e74c3c;

  font-size: 24px;
  cursor: pointer;
`;

export function UploadFeed() {
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
    formData.append("caption", caption);
    selectedFiles.forEach((file, i) => {
      formData.append(`files[${i}]`, file);
    });

    fetch("http://localhost:8000/feeds", {
      method: "POST",
      body: formData,
    }).then(() => window.location.reload());
  };

  return (
    <Modal button={<PostButton>새로운 게시물 만들기</PostButton>}>
      <ModalWrapper>
        <DragDropFiles onFilesAdded={(files) => setSelectedFiles([...selectedFiles, ...files])} />
        <FileList>
          {selectedFiles.map((file, i) => (
            <li key={i}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FilePreview src={URL.createObjectURL(file)} />
                <RemoveButton onClick={() => handleRemoveFile(file)}>
                  <IoClose />
                </RemoveButton>
              </div>
            </li>
          ))}
        </FileList>
        <TextInput type="text" value={caption} onChange={handleCaptionInput} placeholder="문구 입력..." />
        <button onClick={onSubmit} disabled={!selectedFiles.length}>
          게시하기
        </button>
      </ModalWrapper>
    </Modal>
  );
}
