import React, { Component } from 'react';
import { connect } from 'react-redux'
import ControlsBar from './controls/controls-bar';
import updateCurrentTime from '../../actions/update-current-time-action';
import updateDuration from '../../actions/update-duration-action';

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
  handleOnCanPlay() {
    this.props.dispatch(updateDuration(this.mediaVideoRef.current.duration));
  }
  handleOnTimeUpdate() {
    this.props.dispatch(updateCurrentTime(this.mediaVideoRef.current.currentTime));
  }
  render() {
    return (
      <div>
        <video 
          ref={this.mediaVideoRef}
          preload="metadata"
          width="100%"
          onCanPlay={ () => this.handleOnCanPlay() }
          onTimeUpdate={ () => this.handleOnTimeUpdate() }>
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