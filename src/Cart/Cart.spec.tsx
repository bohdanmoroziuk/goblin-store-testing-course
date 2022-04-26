import { fireEvent } from "@testing-library/react";
import React from "react"

import { Cart } from './Cart';
import { CartItemProps } from './CartItem';

jest.mock('./CartItem.tsx', () => ({
  CartItem: ({ product }: CartItemProps) => (
    <div>
      {product.name} {product.price} {product.image}
    </div>
  )
}))

describe("Cart", () => {
  describe("without products", () => {
    const mockUseCart = jest.fn().mockImplementation(() => ({
      products: [],
      removeFromCart: () => {},
      totalPrice: () => 0,
    }));

    it("renders empty cart message", () => {
      const { container } = renderWithRouter(() => <Cart useCartHook={mockUseCart} />)

      expect(container.innerHTML).toMatch("Your cart is empty")
    })

    describe("on 'Back to main page' click", () => {
      it("redirects to '/'", () => {
        const { getByText, history } = renderWithRouter(() => <Cart useCartHook={mockUseCart} />)

        fireEvent.click(getByText("Back to main page."))

        expect(history.location.pathname).toBe("/")
      })
    })
  })

  describe("with products", () => {
    const products = [
      {
        name: "Foo",
        price: 100,
        image: "/images/basic_spear.png"
      },
      {
        name: "bar",
        price: 100,
        image: "/images/broad_sword.png"
      },
    ]

    const mockTotalPrice = jest.fn().mockImplementation(() => 200);

    const mockUseCart = jest.fn().mockImplementation(() => ({
      products,
      removeFromCart: () => {},
      totalPrice: mockTotalPrice,
    }));

    it("renders cart products list with total price", () => {
      const { container } = renderWithRouter(() => <Cart useCartHook={mockUseCart} />)

      expect(container.innerHTML).toMatch(/foo 100 \/images\/basic_spear.png/i)
      expect(container.innerHTML).toMatch(/bar 100 \/images\/broad_sword.png/i)
      expect(container.innerHTML).toMatch(/total: 200/i)

      expect(mockTotalPrice).toHaveBeenCalledTimes(1);
    })

    describe("on 'Go to checkout' click", () => {
      it("redirects to '/checkout'", () => {
        const { getByText, history } = renderWithRouter(() => <Cart useCartHook={mockUseCart} />)

        fireEvent.click(getByText("Go to checkout"))

        expect(history.location.pathname).toBe("/checkout")
      })
    })
  })
})
