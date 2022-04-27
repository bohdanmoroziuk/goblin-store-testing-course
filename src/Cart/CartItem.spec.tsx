import { fireEvent } from '@testing-library/react';
import React from 'react'
import { Product } from 'shared/types'
import { CartItem } from './CartItem';

describe("CartItem", () => {
  const product: Product = {
    name: "Foo",
    price: 55,
    image: "/images/basic_spear.png"
  };

  const mockRemoveFromCart = jest.fn();

  it("renders correctly", () => {
    const { container, getByAltText } = renderWithRouter(
      () => <CartItem product={product} removeFromCart={mockRemoveFromCart} />
    );

    expect(container.innerHTML).toMatch(product.name);
    expect(container.innerHTML).toMatch(product.price.toString());
    expect(getByAltText(product.name)).toHaveAttribute("src", product.image);
    expect(container).toMatchSnapshot();
  })

  describe("on 'Remove item' click", () => {
    it("removes the item from the cart", () => {
      const { getByText } = renderWithRouter(
        () => <CartItem product={product} removeFromCart={mockRemoveFromCart} />
      );

      fireEvent.click(getByText("Remove"));

      expect(mockRemoveFromCart).toBeCalledWith(product);
    })
  })
})