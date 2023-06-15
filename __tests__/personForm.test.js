import { render, screen, fireEvent, act } from '@testing-library/react';
import AddUpdatePersonForm from '../components/person/personForm/AddUpdatePersonForm';
import "@testing-library/jest-dom";

describe('AddUpdatePersonForm', () => {
  test('displays validation errors for invalid form fields', async() => {
    const initialValues = {
        firstName: '',
        lastName: '',
        schoolID: '',
        userType: '',
        dateOfBirth: '',
        yearGroup: '',
        personClasses: [],
      };

      const schools = [
        { schoolID: 1, schoolName: 'School 1' },
        { schoolID: 2, schoolName: 'School 2' },
      ];
  
      const classes = [
        { classID: 1, className: 'Class 1' },
        { classID: 2, className: 'Class 2' },
      ];

    render(<AddUpdatePersonForm buttonTitle="Add" initialValues={initialValues} schools={schools}
        classes={classes}/>);

    const firstNameInput = screen.getByLabelText('First name');
    const submitButton = screen.getByRole('button');

    await act(async () => {
        fireEvent.click(submitButton);
    });

    expect(screen.getByText('First name is required')).toBeInTheDocument();
  });

});
