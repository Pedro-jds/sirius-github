import { render, screen } from '@testing-library/react';
import Button from './Button'

test('render button with props text correct',  () => {
  render(<Button 
    text={'teste'}/>);
  const buttonElement = screen.getByText(/teste/i)
  expect(buttonElement).toBeTruthy()
   
});