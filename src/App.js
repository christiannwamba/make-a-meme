import React, { Component } from 'react';
// CL SDK
import cloudinary from 'cloudinary-core';

// Child stateless
// presentation components
import Preview from './components/Preview';
import MemeForm from './components/MemeForm';
import Hero from './components/Hero';
import Footer from './components/Footer';

// App's CSS
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // App's initial state
    this.state = {
      topText: '',
      bottomText: '',
      stage: 'UPD',
      preview: '',
      memeReady: false,
      pending: false
    };

    // Cloudinary instance
    this.cl = cloudinary.Cloudinary.new({ cloud_name: 'christekh' });

    this.uploadWidget = window.cloudinary.createUploadWidget(
      { cloud_name: 'christekh', upload_preset: 'idcidr0h' },
      (error, [data]) => {
        // Transform returned image
        const previewUrl = this.cl.url(data.secure_url, {
          transformation: [this.defaultTransformation().general]
        });
        this.setState({ preview: previewUrl, stage: 'PVR' });
      }
    );

    // Rebind contexts
    this.initiateUpload = this.initiateUpload.bind(this);
    this.transformToMeme = this.transformToMeme.bind(this);
    this.handleTopTextChange = this.handleTopTextChange.bind(this);
    this.handleBottomTextChange = this.handleBottomTextChange.bind(this);
    this.makeMeme = this.makeMeme.bind(this);
    this.reset = this.reset.bind(this);
  }

  // Set all state values
  // to defaults
  reset() {
    this.setState({
      topText: '',
      bottomText: '',
      stage: 'DND',
      preview: '',
      memeReady: false,
      pending: false
    });
  }

  // Returns re-usable transformation
  // properties
  defaultTransformation() {
    return {
      general: { width: 500, height: 500, crop: 'pad', background: 'black' },
      textTop: { gravity: 'north' },
      textBottom: { gravity: 'south' },
      textGeneral: {
        color: 'white',
        border: { width: 5, color: 'black' },
        gravity: 'south',
        y: 10,
        width: 480,
        crop: 'fit'
      }
    };
  }

  // 1. Meme's top text
  handleTopTextChange(event) {
    const { value } = event.target;
    this.setState({ topText: value });
  }

  // 2. Mem's bottom text
  handleBottomTextChange(event) {
    const { value } = event.target;
    this.setState({ bottomText: value });
  }

  initiateUpload() {
    this.uploadWidget.open();
  }

  // Convert image in preview to Meme
  transformToMeme(id, isFetch) {
    const trans = this.defaultTransformation();
    const imageURL = this.cl.url(id, {
      type: 'fetch',
      transformation: [
        trans.general,
        {
          overlay: `text:impact.ttf_55_stroke_center_line_spacing_-10:${encodeURIComponent(
            this.state.topText
          )}`,
          ...trans.textGeneral,
          ...trans.textTop
        },
        {
          overlay: `text:impact.ttf_55_stroke_center_line_spacing_-10:${encodeURIComponent(
            this.state.bottomText
          )}`,
          ...trans.textGeneral,
          ...trans.textBottom
        }
      ]
    });
    this.setState({ stage: 'PVR', preview: imageURL, memeReady: true });
  }

  // [Event handler]
  // Call the transformer to generate
  // a meme
  makeMeme() {
    this.transformToMeme(this.state.preview);
  }

  render() {
    const { stage } = this.state;
    return (
      <div className="App">
        <Hero />
        <div className="container">
          <div className="meme-app columns">
            <MemeForm
              topText={this.state.topText}
              bottomText={this.state.bottomText}
              handleTopTextChange={this.handleTopTextChange}
              handleBottomTextChange={this.handleBottomTextChange}
              makeMeme={this.makeMeme}
              stage={this.state.stage}
              memeReady={this.state.memeReady}
              preview={this.state.preview}
              reset={this.reset}
            />
            <div className="meme-box column">
              {stage !== 'PVR' ? (
                <button
                  onClick={this.initiateUpload}
                  className="button is-info is-margin-top"
                >
                  Upload
                </button>
              ) : (
                <Preview preview={this.state.preview} />
              )}
            </div>
          </div>
        </div>
        <Footer />
        <div
          className="mainImageLoading"
          style={{ display: this.state.pending ? 'block' : 'none' }}
        />
      </div>
    );
  }
}

export default App;
