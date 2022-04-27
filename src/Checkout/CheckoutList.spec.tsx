import React from 'react';
import { render } from '@testing-library/react';

import { Product } from "../shared/types";
import { CheckoutList } from "./CheckoutList";

describe("CheckoutList", () => {
  const products: Product[] = [
    {
      name: "Foo",
      price: 55,
      image: "/images/basic_spear.png",
    },
    {
      name: "Bar",
      price: 10,
      image: "/images/broad_sword.png",
    },
  ];

  it("renders list of products", () => {
    const { container } = render(<CheckoutList products={products} />)

    expect(container).toMatchSnapshot();
    expect(container.innerHTML).toMatch(products[0].name);
    expect(container.innerHTML).toMatch(products[1].name);
  })
})