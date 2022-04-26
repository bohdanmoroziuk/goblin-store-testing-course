import { render } from '@testing-library/react';
import React from 'react'
import { Category } from 'shared/types';

import { Home } from "./Home";
import { ProductProps } from "./ProductCard";

jest.mock("./ProductCard.tsx", () => ({
  ProductCard: ({ datum }: ProductProps) => (
    <div>
      {datum.name} {datum.price} {datum.image}
    </div>
  ) 
}))

describe("Home", () => {
  describe("while loading", () => {
    it("renders loader", () => {
      const mockUseProducts = jest.fn().mockImplementation(() => ({
        categories: [],
        isLoading: true,
        error: false,
      }));

      const { container } = render(<Home useProductsHook={mockUseProducts} />);

      expect(container.innerHTML).toMatch("Loading")
    })
  })

  describe("with data", () => {
    const category: Category = {
      name: "Category Foo",
      items: [
        {
          name: "Product foo",
          price: 55,
          image: "foo.png"
        },
      ],
    };

    it("renders categories with products", () => {
      const mockUseProducts = jest.fn().mockImplementation(() => ({
        categories: [category],
        isLoading: false,
        error: false,
      }));

      const { container } = render(<Home useProductsHook={mockUseProducts} />);

      expect(container.innerHTML).toMatch(category.name)
      expect(container.innerHTML).toMatch("Product foo 55 foo.png")
    })
  })

  describe("with error", () => {
    it("renders error message", () => {
      const mockUseProducts = jest.fn().mockImplementation(() => ({
        categories: [],
        isLoading: false,
        error: true,
      }));

      const { container } = render(<Home useProductsHook={mockUseProducts} />);

      expect(container.innerHTML).toMatch("Error")
    })
  })

  it.todo("render list of available products") 
})