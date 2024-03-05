import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  text: {
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold, 
    color: "white",
    backgroundColor: '#24292e',
  }
});

const AppBar = () => {
  return <View style={styles.container}>
        <Pressable onPress={() => {}}>
            <Text style={styles.text}>Repositories</Text>
            <Link to="/login">
              <Text>Sign In</Text>
            </Link>
        </Pressable>
    </View>;
};

export default AppBar;