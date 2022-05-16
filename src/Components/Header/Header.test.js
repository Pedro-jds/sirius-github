import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

test("render header with link route", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  const logoLink = screen.getByText(/Sirius Hub/i);
  const homeLink = screen.getByText(/Home/i);
  const searchLink = screen.getByText(/Busca/i);

  expect(logoLink).toBeTruthy();
  expect(homeLink).toBeTruthy();
  expect(searchLink).toBeTruthy();
});
