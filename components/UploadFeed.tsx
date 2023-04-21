import React, { useState } from "react";
import styled from "@emotion/styled";
import { DragDropFiles } from "./DragDropFiles";
import { Modal } from "./Modal";
import { IoClose } from "react-icons/io5";
import { useCookies } from "react-cookie";

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

  overflow-y: scroll;
`;

const TextInput = styled.input`
  margin-top: 36px;

  width: 80%;

  border: none;
  outline: none;

  font-size: 14px;
`;

const FileList = styled.ul`
  margin: 10px;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 20px;

  list-style: none;
`;

const FilePreviewWrapper = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  transition: filter 0.2s ease-out;

  & > img {
    display: block;
    width: 100%;
    height: auto;
  }

  &:hover {
    filter: blur(4px);

    & > button {
      opacity: 1;
    }
  }
`;

const RemoveButtonWrapper = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px;
  border-radius: 50%;
  border: none;
  color: white;
  background-color: #e74c3c;
  font-size: 24px;
  cursor: pointer;
  transition: opacity 0.2s ease-out;
  opacity: 0;
`;

const FilePreview = styled.img`
  width: 100%;
  height: auto;
`;

export function UploadFeed() {
  const [cookies] = useCookies(["session"]);

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
      headers: {
        Authentication: cookies.session,
      },
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
              <FilePreviewWrapper>
                <FilePreview src={URL.createObjectURL(file)} />
                <RemoveButtonWrapper onClick={() => handleRemoveFile(file)}>
                  <IoClose />
                </RemoveButtonWrapper>
              </FilePreviewWrapper>
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
