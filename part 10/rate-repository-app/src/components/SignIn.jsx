import { useFormik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text'
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 10,
    paddingLeft: 10
  }
})

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '', 
      password: '',
    },
    onSubmit,
  })

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput 
        placeholder="Password"
        value={formik.values.password}
        secureTextEntry={true}
        onChangeText={formik.handleChange('password')}
      />
      <Pressable style={{ backgroundColor: theme.colors.blueBackground }} onPress={formik.handleSubmit}>
        <Text style={{ alignSelf: 'center' }} fontWeight="bold" 
              backgroundColor="blue" fontSize="subHeading" >Sign In</Text>
      </Pressable>
    </View>
  )
};

const SignIn = () => {
  const onSubmit = values => {
    console.log(values); 
  }

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;