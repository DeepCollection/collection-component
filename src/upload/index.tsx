import React, {
  ChangeEvent,
  ChangeEventHandler,
  useRef,
  useState,
} from "react";
import produce from "immer";
import "./index.scss";
interface FileType {
  raw: File;
  name: string;
  base64: string;
}

interface IUploadProps {}

const Upload: React.FunctionComponent<IUploadProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filesList, setFilesList] = useState<FileType[]>([]);
  const [choosedIndex, setChoosedIndex] = useState(-1);
  const onUpload = () => {
    inputRef.current.click();
  };
  const readImgData = (file: File) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        if (e.type === "load") resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleChange = async (file: File | null) => {
    const fileData = await readImgData(file);

    if (choosedIndex < 0) {
      const newFileList = produce(filesList, (draftFilesList) => {
        draftFilesList.push({
          raw: file,
          name: file.name,
          base64: fileData as string,
        });
      });
      setFilesList(newFileList);
    } else {
      const newFileList = produce(filesList, (draftFilesList) => {
        draftFilesList.splice(choosedIndex, 1, {
          raw: file,
          name: file.name,
          base64: fileData as string,
        });
      });
      setFilesList(newFileList);
      setChoosedIndex(-1);
    }
    return;
  };
  const inputChagne = async (e: ChangeEvent<HTMLInputElement>) => {
    const tempFile = e.target.files[0];
    await handleChange(tempFile);
    return;
  };
  const onRemove = (file: FileType, index: number) => {
    const newFileList = produce(filesList, (draftFilesList) => {
      draftFilesList.splice(index, 1);
    });
    setFilesList(newFileList);
  };
  const changeImg = (file: FileType, index: number) => {
    setChoosedIndex(index);
    onUpload();
  };
  return (
    <div data-testid="upload-component">
      <input
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onChange={inputChagne}
      />
      <div onClick={onUpload} className="uploadBtn">
        点击上传
      </div>
      <div>
        {filesList.map((item, index) => {
          return (
            <div key={item.base64}>
              <img
                src={item.base64}
                alt="preview"
                data-testid={`image_${index}`}
              />
              <div
                data-testid={`change_${index}`}
                onClick={() => {
                  changeImg(item, index);
                }}
                className="extraBtn"
              >
                change
              </div>
              <div
                onClick={() => {
                  onRemove(item, index);
                }}
                className="extraBtn"
              >
                remove
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Upload;
