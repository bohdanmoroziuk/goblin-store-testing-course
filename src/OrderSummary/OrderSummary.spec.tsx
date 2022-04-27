import React from 'react'
import { fireEvent, render } from "@testing-library/react";

import { Loader } from 'shared/Loader';
import { OrderSummary } from "./OrderSummary";

jest.mock("../shared/Loader.tsx", () => ({
  Loader: jest.fn(() => null),
}))

describe("OrderSummary", () => {
  afterEach(jest.clearAllMocks);

  describe("while order data being loaded", () => {
    it("renders loader", () => {
      const mockUseOrder = jest.fn(() => ({
        isLoading: true,
        order: undefined,
      }))

      render(<OrderSummary useOrderHook={mockUseOrder} />)

      expect(Loader).toHaveBeenCalled();
    })
  }) 

  describe("when order is loaded", () => {
    const mockUseOrder = jest.fn(() => ({
      isLoading: false,
      order: {
        products: [
          {
            name: "Foo",
            price: 55,
            image: "image.png"
          }
        ]
      }
    }))

    it("renders order info", () => {

      const { container } = renderWithRouter(() => <OrderSummary useOrderHook={mockUseOrder} />) 

      expect(container.innerHTML).toMatch("Foo")
    })

    it("navigates to main page on button click", () => {
      const { getByText, history } = renderWithRouter(() => <OrderSummary useOrderHook={mockUseOrder} />)

      fireEvent.click(getByText("Back to the store"))
      
      expect(history.location.pathname).toBe("/")
    })
  }) 

  describe("with error", () => {
    const mockUseOrder = jest.fn(() => ({
      isLoading: false,
      order: undefined,
    }))

    it("renders error message", () => {
      const { container } = render(<OrderSummary useOrderHook={mockUseOrder} />)

      expect(container.innerHTML).toMatch("Couldn't load order info.")
    })
  }) 
})