import React, {Component} from 'react'
import {Route, IndexRoute, Link} from 'react-router'
import ImageFileSelector from "react-image-select-component";

//Main component
class App extends Component {
  componentDidMount() {
    document.body.className= ''
  }
  render() {
    return (
      <div>
        <h1>React Image Crop tool</h1>
        <p>This example displays how to use the react-image-select-component module
        </p>
        <br/>
        <p>This module returns a base64 file and image object for further use, like uploading to s3 bucket</p>
        {this.props.children}
      </div>
    )
  }
}

//pages
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
    <div>
      <div>Select an image</div>
      <ImageFileSelector
        ref="imageFileSelector"
        onSelect={this.selectImage.bind(this)}
        onRemoveImage={this.onRemoveImage}
        onInvalidImage={this.onInvalidImage}
        maxImageFileSize={1024120}
        minSize={this.props.size}/>
        {this.state.image &&
          <img className="croppedImage" src={this.state.image} width="350" height="350"/>
        }
      </div>
    )
  }
  async selectImage(imageBase64, imageFile) {
    const image = new Image();
    try {
      this.setState({
        cropping: true,
        loading: true,
        urlsReceived: true,
        image: imageBase64
      });
    } catch (error) {
      console.log(error)
    }
    image.src = imageBase64;
  }

  onInvalidImage(error) {
    console.log(error);
  }
}


class NoMatch extends Component {
  render() {
    return (
    <div>
      <h2>No Match</h2>
      <div> 404 Error</div>
    </div>)
  }
}

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="*" component={NoMatch} />
  </Route>
)
