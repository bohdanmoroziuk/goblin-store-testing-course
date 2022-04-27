import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { FormField } from "./FormField";

describe("FormField", () => {
  it("renders correctly", () => {
    const { getByTestId, container } = render(
      <FormField label="Foo label" name="foo" />
    );

    const input = getByTestId("input");

    expect(container).toMatchSnapshot();
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveClass("is-error");
    expect(input).toHaveAttribute("name", "foo");
  });
  
  describe("with error", () => {
    it("renders error message", () => {
      const { getByText } = render(
        <FormField
          label="Foo label"
          name="foo"
          errors={{ message: "Example error" }}
        />
      );

      expect(getByText("Example error")).toBeInTheDocument();
    });
  });

  describe("on change", () => {
    it("normalizes the input", () => {
      const { getByTestId } = render(
        <FormField
          label="Foo label"
          name="foo"
          normalize={(value: string) => value.toUpperCase()}
        />
      );

      const input = getByTestId("input") as HTMLInputElement;

      fireEvent.change(input, { target: { value: "test" }});

      expect(input.value).toBe("TEST");
    });
  });
});