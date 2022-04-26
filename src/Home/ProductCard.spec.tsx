import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { ProductCard } from "./ProductCard"
import { Product } from "../shared/types"
import { json } from "express"

describe("ProductCard", () => {
  const product: Product = {
    name: "Product foo",
    price: 55,
    image: "/images/basic_spear.png"
  }

  it("renders correctly", () => {
    const { container, getByRole } = render(
      <ProductCard datum={product} />
    )

    expect(container.innerHTML).toMatch(product.name);
    expect(container.innerHTML).toMatch(product.price.toString());
    expect(getByRole("img")).toHaveAttribute("src", product.image);
  })

  describe("when product is in the cart", () => {
    it("the 'Add to cart' button is disabled", () => {
      const mockUseCart = jest.fn().mockImplementation(() => ({
        addToCart: jest.fn(),
        products: [product],
      }));

      const { getByRole } = render(<ProductCard datum={product} useCartHook={mockUseCart} />)

      expect(getByRole("button")).toBeDisabled();
      expect(getByRole("button")).toHaveTextContent("Added to cart");
    })
  })

  describe("when product is not in the cart", () => {
    describe("on 'Add to cart' click", () => {
      it("calls 'addToCart' function", () => {
        const mockAddToCart = jest.fn();

        const mockUseCart = jest.fn().mockImplementation(() => ({
          addToCart: mockAddToCart,
          products: [],
        }));

        const { getByText } = render(<ProductCard datum={product} useCartHook={mockUseCart} />)

        fireEvent.click(getByText("Add to cart"))

        expect(mockAddToCart).toHaveBeenCalledWith(product);
      })
    })
  })
})
