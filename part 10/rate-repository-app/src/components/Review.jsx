import { useFormik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text'
import theme from '../theme';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 10,
    paddingLeft: 10
  }
});

const validationSchema = yup.object().shape({
  ownerName: yup.string()
    .min(2, 'Too short!')
    .max(50, 'Too long!')
    .required('Repository ower name is required'),
  repositoryName: yup.string()
    .min(2, 'Too short!')
    .max(50, 'Too long!')
    .required('Repository name is required'),
  rating: yup.number()
     .min(1)
     .max(100)
     .required('Rating is required'),
  review: yup.string().optional()
});

export const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      ownerName: '', 
      repositoryName: '',
      rating: 1, 
      review: ''
    },
    validationSchema,
    onSubmit,
  })

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Owner Name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        style={
          formik.touched.ownerName && formik.errors.ownerName && {borderColor: theme.colors.error, borderWidth: 1 }
        }
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.ownerName}</Text>
      )}

      <TextInput 
        placeholder="Repository Name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        style={
          formik.touched.repositoryName && formik.errors.repositoryName && {borderColor: theme.colors.error, borderWidth: 1 }
        }
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput 
        placeholder="Rating"
        value={formik.values.rating ? formik.values.rating.toString() : String(1)} //I found a workound solution in here: https://github.com/jaredpalmer/formik/issues/284 
        onChangeText={(value) => formik.setFieldValue('rating', parseInt(value, 10))}
        style={
          formik.touched.rating && formik.errors.rating && {borderColor: theme.colors.error, borderWidth: 1 }
        }
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.rating}</Text>
      )}

      <TextInput 
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        style={
          formik.touched.review && formik.errors.review && {borderColor: theme.colors.error, borderWidth: 1 }
        }
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.review}</Text>
      )}
      <Pressable style={{ backgroundColor: theme.colors.blueBackground }} onPress={formik.handleSubmit}>
        <Text style={{ alignSelf: 'center' }} fontWeight="bold" 
              backgroundColor="blue" fontSize="subHeading" >Create a review </Text>
      </Pressable>
    </View>
  )
};

const Review = () => {
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values; 
    try {
        const { data } = await createReview({ ownerName, repositoryName, rating, review }); 
        // console.log(data);
    } catch (e) {
        console.log(e); 
    }
  };

  return <ReviewForm onSubmit={onSubmit} />; 

};

export default Review;