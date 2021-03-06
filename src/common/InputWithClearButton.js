/* @flow */
import React, { PureComponent } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import type { LocalizableText } from '../types';
import Input from './Input';
import { BRAND_COLOR } from '../styles';
import Icon from '../common/Icons';
import Touchable from '../common/Touchable';

const componentStyles = StyleSheet.create({
  clearButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
    marginRight: 12,
  },
  clearButtonIcon: {
    color: BRAND_COLOR,
    transform: [{ rotate: '45deg' }],
  },
});

type Props = {
  placeholder: LocalizableText,
  onChangeText: (text: string) => void,
};

type State = {
  canBeCleared: boolean,
};

export default class InputWithClearButton extends PureComponent<Props, State> {
  static contextTypes = {
    styles: () => null,
  };

  textInput: TextInput;

  props: Props;

  state: State;

  state = {
    canBeCleared: false,
  };

  handleChangeText = (text: string) => {
    this.setState({
      canBeCleared: text.length > 0,
    });
    this.props.onChangeText(text);
  };

  handleClear = () => {
    this.handleChangeText('');
    this.textInput.clear();
  };

  render() {
    const { styles } = this.context;
    const { canBeCleared } = this.state;

    return (
      <View style={styles.row}>
        <Input
          {...this.props}
          textInputRef={textInput => {
            this.textInput = textInput;
          }}
          onChangeText={this.handleChangeText}
        />
        {canBeCleared && (
          <Touchable style={componentStyles.clearButtonContainer} onPress={this.handleClear}>
            <Icon name="md-add" size={30} style={componentStyles.clearButtonIcon} />
          </Touchable>
        )}
      </View>
    );
  }
}
