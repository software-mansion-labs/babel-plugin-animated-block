# babel-plugin-animated-block
Babel 6 plugin that simplify animated expressions in React Native. In usage it could compared to deprecated `with` keyword

Before:
```js
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
```
After:
```js
  animate() {
    this.sampleValue.setValue(0.3);
    Animated.sequence([
      Animated.timing(
        this.sampleValue,
        {
          toValue: 0.7,
        }
      ),
      Animated.spring(
        this.sampleValue,
        {
          toValue: 1.3,
          friction: 1,
          tension: 1
        }
      )
    ]).start();
  }
```

I'll happily accept PRs for any further improvements to the project!


## Usage

Add to your babelrc:
```json
{
  "env": {
    "test": {
      "plugins": ["babel-plugin-animated-block"]
    }
  }
}
```

## Example

```bash
cd example
yarn
react-native run-android / react-native run-ios
```

## Build production
In order to test you need to build your changes
```bash
yarn prepublish
```