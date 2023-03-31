import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();

const mock = () => {
  return {
    observe,
    unobserve,
    disconnect,
  };
};

window.IntersectionObserver = jest.fn().mockImplementation(mock);

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("check app loading", () => {
  render(<App />);
  expect(screen.getAllByTestId("skeleton").length).toBe(10);
});

test("check if users loaded", async () => {
  const AppComponent = render(<App />);
  await waitFor(() => {
    expect(AppComponent.getAllByTestId("user_component").length).toBe(20);
  });
});
