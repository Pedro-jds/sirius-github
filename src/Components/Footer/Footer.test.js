import { render, screen } from '@testing-library/react';
import Footer from './Footer'

test('render footer correct', () => {
  render(<Footer />);
  const FooterElement = screen.getByText(/Todos os direitos reservados/i)
  expect(FooterElement).toBeTruthy()  
});