import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {GridList, GridTile} from 'material-ui/GridList';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const dataSource = window.WORDLISTS['english'];

AutoComplete.startsWith = (searchText, key) => {
  return searchText !== '' && key.indexOf(searchText) === 0;
}

class Seed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordCount: window.DEFAULT_WORD_COUNT,
      open: false,
    };
  }

  handleOpen(index) {
    this.setState({open: true, newWord: undefined, wordIndex: index});
  };

  handleClose() {
    this.setState({open: false, newWord: undefined, wordIndex: undefined});
  };

  handleWordCountChange(value) {
    this.setState({ wordCount: value });
    var words = this.props.bip39.generate(value);
    this.props.changeWords(words);
  }

  handlePassphraseChange(value) {
    this.props.changePassphrase(value);
  }

  updateSeed() {
    var words = this.props.words;
    var wordArray = words.split(' ');
    wordArray[this.state.wordIndex] = this.state.newWord;
    this.setState({open: false, newWord: undefined, wordIndex: undefined});
    this.props.changeWords(wordArray.join(' '));
  }

  selectWord(word) {
    this.setState({
      newWord: word,
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => { this.handleClose() }}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => { this.updateSeed() }}
      />,
    ];

    return (
      <div style={{paddingTop: 6, paddingLeft: 12, paddingRight: 12}}>
        <Dialog
          title="New word"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={() => { this.handleClose() }}>

          <div>
            Editing word #{this.state.wordIndex + 1}
            <AutoComplete
              hintText="word"
              filter={AutoComplete.startsWith}
              maxSearchResults={4}
              dataSource={dataSource}
              onNewRequest={(newWord) => { this.selectWord(newWord) }}
              fullWidth={true} />
          </div>
        </Dialog>


        <SelectField
          floatingLabelText="Word Count"
          value={this.state.wordCount}
          fullWidth={true}
          onChange={(event, index, value) => { this.handleWordCountChange(value) }}>
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={6} primaryText="6" />
          <MenuItem value={9} primaryText="9" />
          <MenuItem value={12} primaryText="12" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={18} primaryText="18" />
          <MenuItem value={21} primaryText="21" />
          <MenuItem value={24} primaryText="24" />
        </SelectField>

        <TextField hintText="Passphrase" fullWidth={true} onChange={(event, value) => { this.handlePassphraseChange(value) }}/>

        <GridList cellHeight={48} cols={3}>
          {this.props.words.split(' ').map((word, index) =>
            <GridTile key={index} title={word} onClick={() => { this.handleOpen(index) }}>
            </GridTile>
          )}
        </GridList>
      </div>
    );
  }
}

export default Seed;
