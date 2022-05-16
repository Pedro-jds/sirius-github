import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

test('Render home with button for search page', async () => {
  render(<App />);
  const buttonElement = screen.getByText(/Acessar página de busca/i)
   userEvent.click(buttonElement)

   await waitFor(()=>
    expect(screen.getByText("Buscar"))
    )
});

