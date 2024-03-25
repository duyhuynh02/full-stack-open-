import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer, SignInForm } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const mockSignIn = jest.fn(); 
      const mockNavigate = jest.fn();
      const mockOnSubmit = jest.fn();
      render(<SignInContainer signIn={mockSignIn} navigate={mockNavigate}/>);
    //   screen.debug();

      await waitFor(() => {
        render(<SignInForm onSubmit={mockOnSubmit} />); 
        // screen.debug();
        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'matti');
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
        fireEvent.press(screen.getByText('Sign In'));

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);

        expect(mockOnSubmit.mock.calls[0][0]).toEqual({
          username: 'matti',
          password: 'password',
        })

      });
    });
  });
});