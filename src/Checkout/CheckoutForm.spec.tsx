import React from "react"
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { CheckoutForm } from "./CheckoutForm";

describe("CheckoutForm", () => {
  it("renders correctly", () => {
    const { container } = render(<CheckoutForm />);

    expect(container.innerHTML).toMatch("Cardholder's Name");
    expect(container.innerHTML).toMatch("Card Number");
    expect(container.innerHTML).toMatch("Expiration Date");
    expect(container.innerHTML).toMatch("CVV");
    expect(container.innerHTML).toMatch("Place order");
  })

  describe("with validation errors", () => {
    it("renders error messages", async () => {
      const { container, getByText } = render(<CheckoutForm />);

      await act(async () => {
        fireEvent.click(getByText("Place order"));
      });

      expect(container.innerHTML).toMatch("name is a required field");
      expect(container.innerHTML).toMatch("cardNumber is a required field");
      expect(container.innerHTML).toMatch("expDate must be a `date` type, but the final value was: `Invalid Date` (cast from the value `\"\"`).");
      expect(container.innerHTML).toMatch("cvv is a required field");
    })
    it.todo("disables submit button")
  })

  describe("without validation errors", () => {
    describe("on place order button click", () => {
      it.skip("calls submit function with form data", async () => {
        const mockSubmit = jest.fn();
        
        const { getByText, getByPlaceholderText, getByLabelText } = render(<CheckoutForm submit={mockSubmit} />);

        await act(async () => {
          fireEvent.change(
            getByPlaceholderText("John Smith"),
            { target: { value: "Bibo Bobbins" } },
          );
          fireEvent.change(
            getByPlaceholderText("0000 0000 0000 0000"),
            { target: { value: "0000 0000 0000 0000" } },
          );
          fireEvent.change(
            getByLabelText("Expiration Date"),
            { target: { value: "3020-05" } },
          );
          fireEvent.change(
            getByPlaceholderText("000"),
            { target: { value: "123" } },
          );
        });

        await act(async () => {
          fireEvent.click(getByText("Place order"));
        });

        expect(mockSubmit).toHaveBeenCalled();
      })
      it.todo("clears cart")
      it.todo("redirects to order summary page")
    })
  })
})
