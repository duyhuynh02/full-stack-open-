import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    // flexDirection: 'row',
    // alignItems: 'center',
    // paddingHorizontal: 16,
  },
  text: {
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold, 
    color: "white",
    backgroundColor: '#24292e',
  }, 
  scrollView: {
    marginHorizontal: 20, 
  }
});

const AppBar = () => {
  return <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <Pressable onPress={() => {}}>
            <Text style={styles.text}>Repositories</Text>
            <Link to="/login">
              <Text>Sign In</Text>
            </Link>
        </Pressable>
      </ScrollView>
    </View>;
};

export default AppBar;