import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SignIn } from "./SignIn";
import { useAppDispatch } from "../../store/store";
import { useRouter } from "next/navigation";

jest.mock("../../store/store");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockUseAppDispatch = useAppDispatch as jest.Mock;
const mockRouterPush = jest.fn();

describe("SignIn", () => {
  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(jest.fn());
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  it("should render email and password fields", () => {
    render(<SignIn />);

    expect(screen.getByPlaceholderText("Почта")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Пароль")).toBeInTheDocument();
  });

  it("should display error when fields are empty on submit", () => {
    render(<SignIn />);

    fireEvent.click(screen.getByText("Войти"));

    expect(screen.getByText("Заполните все поля")).toBeInTheDocument();
  });

  it("should display error when password is less than 6 characters", () => {
    render(<SignIn />);

    fireEvent.change(screen.getByPlaceholderText("Почта"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Пароль"), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByText("Войти"));

    expect(
      screen.getByText("Пароль должен быть больше 6 символов")
    ).toBeInTheDocument();
  });
});
