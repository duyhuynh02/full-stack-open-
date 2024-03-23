import Text from './Text'
import { View } from 'react-native';
import { useApolloClient } from "@apollo/client";
import useAuthStorage from '../hooks/useAuthStorage';

const SignOutForm = () => {
  return (
    <View>
      <Text>You are being logged out... </Text>
    </View>
  )
};

const SignOut = () => {
  const authStorage = useAuthStorage(); 
  const client = useApolloClient(); 

  const handleSignOut = async () => {
    try {
        authStorage.removeAccessToken();
        client.resetStore();
    } catch (e) {
        console.error('Error during sign-out:', e);
    }
  }

  handleSignOut(); 

  return <SignOutForm />;
};

export default SignOut;