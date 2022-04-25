import React from "react";
import { fireEvent } from '@testing-library/react'

import { CartWidget } from './CartWidget'

describe("CartWidget", () => {
  it("renders correctly", () => {
    const { container } = renderWithRouter(() => <CartWidget />, "/");

    expect(container).toBeInTheDocument();
  });

  it("shows the amount of products in the cart", () => {
    const mockUseCart = jest.fn().mockImplementation(() => ({
      products: [
        {
          name: "Product foo",
          price: 0,
          image: "foo.png",
        },
      ],
    }));

    const { container } = renderWithRouter(() => <CartWidget useCartHook={mockUseCart} />, "/");

    expect(container.innerHTML).toMatch("1");
    expect(mockUseCart).toBeCalledTimes(1);
  });

  it("navigates to cart summary page on click", () => {
    const { getByRole, history } = renderWithRouter(() => <CartWidget />, "/");

    fireEvent.click(getByRole("link"));

    expect(history.location.pathname).toBe("/cart");
  });
});
