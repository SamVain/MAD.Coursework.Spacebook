import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-elements';

type TextComponentProps = {};
const Title: React.FunctionComponent<TextComponentProps> = () => {
  const { theme } = useTheme();

  return (
    <>
      <View style={styles.view}>
        <Text
          style={styles.text}
          h1
          h1Style={{ color: "#4267B2", fontWeight: "bold", fontSize: 25 }}
        >
          Spacebook
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
  text: {
    textAlign: 'center',
    padding: 5,
  },
  more: {
    marginVertical: 20,
  },
  button: {
    width: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default Title;