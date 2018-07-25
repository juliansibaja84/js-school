import React, { Component } from 'react';
import { connect } from 'react-redux'
import ControlsBar from './controls/controls-bar';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.mediaVideoRef = React.createRef();
  }
  componentDidMount() {
    this.mediaVideoRef.current.load();
  }
  componentWillUpdate(nextProps) {
    if(!nextProps.videoPlayer.status.paused) {
      this.mediaVideoRef.current.play();
    }
    if(nextProps.videoPlayer.status.paused) {
      this.mediaVideoRef.current.pause();
    }
  }
  render() {
    return (
      <div>
        <video ref={this.mediaVideoRef} preload="metadata" width="100%" onTimeUpdate={console.log(1)}>
          <source src="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4"
                  type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'
                  data-original="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4"
                  onTimeUpdate={console.log(2)}/>
        </video>
        <ControlsBar />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    videoPlayer: state.videoPlayer,
  }
}

export default connect(mapStateToProps)(VideoPlayer);