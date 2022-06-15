import React, { useState, useEffect, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowUp,
  faFileCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import "./ImageUpload.css";

export default function ImageUploader({ image, setImage }) {
  const [errors, setErrors] = useState([]);
  const [previewImg, setPreviewImg] = useState(null);
  const [icon, setIcon] = useState(faFileArrowUp);

  const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

  const typeArea = (
    <span className="fileTypes">Accepted Types: {fileTypes.join(", ")}</span>
  );

  const dropArea = useRef(
    <div className="dropArea">
      {previewImg ? (
        <img src={previewImg} alt={"img preview"} />
      ) : (
        <div className={"dropAreaIcon iEmpty"}>
          <FontAwesomeIcon icon={icon} />
        </div>
      )}
      <span>Drag & Drop or Click to Select an Image</span>
      <span>(Image is required)</span>
      {typeArea}
    </div>
  );

  const [dropChild, setDropChild] = useState(dropArea.current);

  const dropAreaErrored = (
    <div className="dropArea withError">
      <div className={"dropAreaIcon iError"}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <span className="fileError">
        Sorry, but that's not a valid image file.
      </span>
      {typeArea}
    </div>
  );

  useEffect(() => {
    if (previewImg) {
      const dropAreaFilled = (
        <div className="dropArea drop-filled">
          <span>Upload this Image?</span>
          <img
            src={previewImg}
            className={"uploadImg"}
            alt={"this is an alt tag for eslint"}
          />
          <span>Drag & Drop or Click to Change the Image</span>
        </div>
      );
      setDropChild(dropAreaFilled);
      setErrors([]);
    } else {
      setDropChild(dropArea.current);
    }
  }, [previewImg, dropArea]);

  useEffect(() => {
    if (!image) {
      setPreviewImg(null);
    }
  }, [image]);

  useEffect(() => {
    if (image && errors.length === 0) {
      setIcon(faFileArrowUp);
    } else {
      setIcon(faFileCircleXmark);
    }
  }, [errors, image]);

  const updateImage = (file) => {
    const imgURL = URL.createObjectURL(file);
    setPreviewImg(imgURL);
    setImage(file);
  };

  const handleError = () => {
    setDropChild(dropAreaErrored);
    setErrors([...errors, "Incorrect file type"]);
  };

  return (
    <FileUploader
      className="image-uploader"
      children={[dropChild]}
      onTypeError={handleError}
      handleChange={updateImage}
      name="image"
      types={fileTypes}
    />
  );
}
