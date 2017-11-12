import React from 'react';
import './Upload.css';

export default ({ handleImageUrlChange, imageUrl, getImageWithURL }) => (
  <div className="fetch-input">
    <input
      type="text"
      className="input no-radius-right"
      placeholder="Image URL"
      value={imageUrl}
      name="url"
      onChange={handleImageUrlChange}
    />
    <button className="button is-dark no-radius-left" onClick={getImageWithURL}>Get Image</button>
  </div>
);
