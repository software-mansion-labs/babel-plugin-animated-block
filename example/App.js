import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';

export default class animations extends Component {
  constructor(props) {
    super(props);
    this.sampleValue = new Animated.Value(0.3);
  }

  animate() {
    this.sampleValue.setValue(0.3);
    { // Animated
      sequence([
        timing(
          this.sampleValue,
          {
            toValue: 0.7,
          }
        ),
        spring(
          this.sampleValue,
          {
            toValue: 1.3,
            friction: 1,
            tension: 1
          }
        )
      ]).start();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 100 }} onPress={this.animate.bind(this)}>press me, press me, say that you press
          me</Text>
        <Animated.Image
          style={{ width: 227, height: 200, transform: [{ scale: this.sampleValue }] }}
          source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});