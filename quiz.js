import React from 'react';
import { Button, Checkbox } from 'material-ui';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import PlayCircleOutline from 'material-ui-icons/PlayCircleOutline';

const A = require('./assets/A.mp3');
const B = require('./assets/B.mp3');
const C = require('./assets/C.mp3');
const D = require('./assets/D.mp3');
const E = require('./assets/E.mp3');

const styleSheet = createStyleSheet('Quiz', theme => ({
  button: {
    margin: '12px'
  }
}));

let playing = false;

let sounds = {
    'A': {path: A},
    'B': {path: B},
    'C': {path: C},
    'D': {path: D},
    'E': {path: E}
};

const registry = {};

function register(name, sound) {
    sound.instance = create(sound.path);
    registry[name] = sound;
}

function create(path) {
    var audio = new Audio();
    audio.preload = 'auto';
    audio.src = path;
    audio.addEventListener('ended', onAudioEnd);
    return audio;
}

function onAudioEnd() {
    playing = false;
}

export function play(name) {
    var item = registry[name];
    if (item && !playing) {
        item.instance.currentTime = 0;
        item.instance.play();
        playing = item;
    }
}

export function stop() {
    if (playing) {
        playing.instance.pause();
        playing = false;
    }
}

for (let name in sounds) {
    register(name, sounds[name]);
}

var showAnswers = false;

class Quiz extends React.Component {
  state = {show: false}
  onShowChange = (evt, checked) => {
      this.setState({show: checked});
  }
  render() {
  var {show} = this.state;
  var { classes } = this.props;
  return (<div>
      <Button
      raised className={classes.button}
      onClick={() => play('A')}
      color="primary"><PlayCircleOutline /> A
      </Button>
      <Button
      label="B" raised className={classes.button}
      onClick={() => play('B')}
      color="primary"><PlayCircleOutline /> B
      </Button>
      <Button
      label="C" raised className={classes.button}
      onClick={() => play('C')}
      color="primary"><PlayCircleOutline /> C
      </Button>
      <Button
      label="D" raised className={classes.button}
      onClick={() => play('D')}
      color="primary"><PlayCircleOutline /> D
      </Button>
      <Button
      label="E" raised className={classes.button}
      onClick={() => play('E')}
      color="primary"><PlayCircleOutline /> E
      </Button>
      <div>
        <Checkbox
          checked={!!show}
          onChange={this.onShowChange}
        />
        Show Answers
      
      {show && <div>
        <ol type="A">
            <li>beethoven 6th - bernstein</li>
            <li>debussy, clair du lune, lang lang</li>
            <li>shostakovich concerto violin and orchestra no 1 in am, hahn</li>
            <li>handel - messiah</li>
            <li>sibelius violin concerto, hahn</li>
        </ol>
      </div>}
      </div>
    
  </div>);
}
}

export default withStyles(styleSheet)(Quiz);
