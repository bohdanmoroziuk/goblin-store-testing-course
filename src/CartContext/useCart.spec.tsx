import { renderHook } from "@testing-library/react-hooks"
import TestRenderer from "react-test-renderer"

import { Product } from "../shared/types"
import { useCart } from "./useCart"

const { act } = TestRenderer

interface Store {
  [key: string]: string;
}

const localStorageMock = (() => {
  let store: Store = {};

  return {
    clear: jest.fn(() => { store = {}; }),
    getItem: jest.fn((key: string) => store[key]),
    removeItem: jest.fn((key: string) => { delete store[key]; }),
    setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

describe("useCart", () => {
  afterEach(() => {
    localStorageMock.clear();
  })

  const product: Product = {
    name: "Foo",
    price: 55,
    image: "image.png"
  };

  describe("on mount", () => {
    it("loads data from localStorage", () => {
      const products: Product[] = [product];

      localStorageMock.setItem("products", JSON.stringify(products));

      const { result } = renderHook(useCart);

      expect(result.current.products).toEqual(products);
    })
  })

  describe("#addToCart", () => {
    it("adds item to the cart", () => {
      const { result } = renderHook(useCart);

      act(() => {
        result.current.addToCart(product);
      });

      expect(result.current.products).toEqual([product]);
      expect(localStorageMock.setItem).toHaveBeenCalledWith("products", JSON.stringify([product]));
    })
  })

  describe("#removeFromCart", () => {
    it("removes item from the cart", () => {
      localStorageMock.setItem("products", JSON.stringify([product]));

      const { result } = renderHook(useCart);

      act(() => {
        result.current.removeFromCart(product);
      });

      expect(result.current.products).toEqual([]);
      expect(localStorageMock.setItem).toHaveBeenCalledWith("products", "[]");
    })
  })

  describe("#totalPrice", () => {
    it("returns total products price", () => {
      localStorageMock.setItem("products", JSON.stringify([product, product]));

      const { result } = renderHook(useCart);

      expect(result.current.totalPrice()).toBe(110);
    });
  })

  describe("#clearCart", () => {
    it("removes all the products from the cart", () => {
      localStorageMock.setItem("products", JSON.stringify([product, product]));

      const { result } = renderHook(useCart);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.products).toEqual([]);
      expect(localStorageMock.setItem).toHaveBeenCalledWith("products", "[]");
    })
  })
})