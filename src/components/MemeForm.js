import React from 'react';
import 'react-toggle/style.css';
import './MemeForm.css';

export default ({
  topText,
  bottomText,
  handleTopTextChange,
  handleBottomTextChange,
  makeMeme,
  stage,
  toggleStage,
  preview,
  memeReady,
  reset
}) => {
  return (
    <div className="meme-form column is-two-fifths">
      <div style={{ display: !!preview || !memeReady ? 'block' : 'none' }}>
        <div className="field">
          <label className="label">Top Text:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Meme's Top Text"
              value={topText}
              disabled={memeReady}
              onChange={handleTopTextChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Bottom Text:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={bottomText}
              disabled={memeReady}
              onChange={handleBottomTextChange}
              placeholder="Meme's Bottom Text"
            />
          </div>
        </div>
      </div>
      {!memeReady ? (
        <div>
          <br/>
        <button
          style={{ display: !!topText && !!bottomText ? 'block' : 'none' }}
          className="button is-dark"
          onClick={makeMeme}
        >
          Make a MEME
        </button>
        </div>
      ) : (
        <div>
          <div class="button-group">
            <button
              onClick={reset}
              className="button is-dark"
              style={{ display: 'inline-block' }}
            >
              RESET
            </button>
            <a
              href={preview}
              target="_blank"
              className="button is-link"
              style={{ display: 'inline-block', marginLeft: '10px' }}
            >
              Download
            </a>
          </div>
          <br/>
          <div>
            <h5 className="subtitle is-6">Share your meme
              <a href={"https://www.facebook.com/sharer/sharer.php?u="+preview}class="button is-small is-link">
                <span>Facebook</span>
              </a>
              <a href={"https://twitter.com/intent/tweet?text=I%20made%20this%20meme%20"+preview} class="button is-small is-info ">
                <span>Twitter</span>
              </a>
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};
