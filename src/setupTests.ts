import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

declare global {
  interface Window {
    IntersectionObserver: any;
    ResizeObserver: any;
  }
}

type IntersectionObserverEntry = {
  // Add minimum required properties
  boundingClientRect: DOMRectReadOnly;
  intersectionRatio: number;
  intersectionRect: DOMRectReadOnly;
  isIntersecting: boolean;
  rootBounds: DOMRectReadOnly | null;
  target: Element;
  time: number;
};

class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
  takeRecords = () => [] as IntersectionObserverEntry[];
}

class MockResizeObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});
