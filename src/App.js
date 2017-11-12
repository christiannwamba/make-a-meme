import React, { Component } from 'react';
// Axios for Ajax
import axios from 'axios';
// CL SDK
import cloudinary from 'cloudinary-core';

// Child stateless
// presentation components
import DndUpload from './components/DndUpload';
import UrlUpload from './components/UrlUpload';
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
      file: null,
      imageUrl: '',
      stage: 'DND',
      preview: '',
      memeReady: false,
      pending: false
    };

    // Webtask server to handle image upload
    this.requestURL =
      'https://wt-nwambachristian-gmail_com-0.run.webtask.io/meme-generator/upload';
    // Cloudinary instance
    this.cl = cloudinary.Cloudinary.new({ cloud_name: 'christekh' });

    // Rebind contexts
    this.onDrop = this.onDrop.bind(this);
    this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
    this.getImageWithURL = this.getImageWithURL.bind(this);
    this.getImageWithDND = this.getImageWithDND.bind(this);
    this.transformToMeme = this.transformToMeme.bind(this);
    this.toggleStage = this.toggleStage.bind(this);
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
      file: null,
      imageUrl: '',
      stage: 'DND',
      preview: '',
      memeReady: false,
      pending: false
    });
  }

  // [Event handler]
  // Shows a different arena based
  // on the stage state. There are 3 arenas:
  // - Drag n' Drop
  // - URL Fetch
  // - Preview
  toggleStage() {
    if (this.state.stage === 'DND') {
      this.setState({ stage: 'URL' });
    } else {
      this.setState({ stage: 'DND' });
    }
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

  // [Event handlers]
  // There are 3 React controlled input
  // ..
  // 1. Image URL
  handleImageUrlChange(event) {
    const { value } = event.target;
    this.setState({ imageUrl: value });
  }

  // 2. Meme's top text
  handleTopTextChange(event) {
    const { value } = event.target;
    this.setState({ topText: value });
  }

  // 3. Mem's bottom text
  handleBottomTextChange(event) {
    const { value } = event.target;
    this.setState({ bottomText: value });
  }

  // Called when an image
  // is dropped in the drop zone
  onDrop(files) {
    if (files.length > 0) {
      // Update the file state and
      // call `getImageWithDND` after 
      // setState (which is async) completes
      this.setState({ file: files[0] }, this.getImageWithDND);
    }
  }

  // Upload image to server using axios
  getImageWithDND() {
    // Assemble file
    const formData = new FormData();
    formData.append('image', this.state.file);
    // Show loading indicator
    this.setState({ pending: true });
    // Post to server
    axios.post(this.requestURL, formData).then(({ data: { data } }) => {
      // Transform returned image
      const previewUrl = this.cl.url(data.secure_url, {
        transformation: [
          this.defaultTransformation().general
        ]
      });
      // Set preview state with manipulated image
      this.setState({ preview: previewUrl, stage: 'PVR', pending: false });
    });
  }

  // [Event handler]
  // Alternatively, get image via URL
  getImageWithURL() {
    const { imageUrl, stage } = this.state;
    if (stage === 'URL' && imageUrl.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      // Manipulate retrieved image
      const previewUrl = this.cl.url(imageUrl, {
        // Tell Cloudinary it's a URL
        type: 'fetch',
        transformation: [
          this.defaultTransformation().general
        ]
      });
      // Set preview state with manipulated image
      this.setState({ preview: previewUrl, stage: 'PVR' });
    }
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
              toggleStage={this.toggleStage}
              memeReady={this.state.memeReady}
              preview={this.state.preview}
              reset={this.reset}
            />
            <div className="meme-box column">
              {stage === 'DND' ? (
                <DndUpload onDrop={this.onDrop} />
              ) : stage === 'URL' ? (
                <UrlUpload
                  imageUrl={this.state.imageUrl}
                  handleImageUrlChange={this.handleImageUrlChange}
                  getImageWithURL={this.getImageWithURL}
                />
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
