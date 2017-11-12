import React from 'react';
import Dropzone from 'react-dropzone';
import './Upload.css';

export default ({ onDrop }) => {
  const props = {
    onDrop,
    accept: 'image/jpeg, image/png, image/gif',
    multiple: false,
    className: 'dropzone'
  };
  return (
    <div className="dropzone-wrapper">
      <Dropzone {...props}>
        <p>Try dropping some files here, or click to select files to upload.</p>
      </Dropzone>
    </div>
  );
};
