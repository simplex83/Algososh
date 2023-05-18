import { getAllByTestId, waitFor, render, getByTestId } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { StringComponent } from "./string";
import userEvent from "@testing-library/user-event";

describe("String", () => {
    it("sting even-numbered length ", () => {
        const { container } = render(<BrowserRouter>
            <StringComponent />
        </BrowserRouter>);
        const input = getByTestId(container, "input");
        const button = getByTestId(container, "button");
        const testValue = "abcd";
        userEvent.type(input, testValue);
        userEvent.click(button);
        waitFor(() => {
            expect(input).toHaveValue(testString);
            const items = getAllByTestId(container, "circle")
                .map((el) => el.textContent);
            expect(items.join("")).toBe(Array(testValue).reverse().join(""));
        });
    });
    it("sting odd-numbered length ", () => {
        const { container } = render(<BrowserRouter>
            <StringComponent />
        </BrowserRouter>);
        const input = getByTestId(container, "input");
        const button = getByTestId(container, "button");
        const testValue = "abc";
        userEvent.type(input, testValue);
        userEvent.click(button);
        waitFor(() => {
            expect(input).toHaveValue(testString);
            const items = getAllByTestId(container, "circle")
                .map((el) => el.textContent);
            expect(items.join("")).toBe(Array(testValue).reverse().join(""));
        });
    });
    it("sting 1 el ", () => {
        const { container } = render(<BrowserRouter>
            <StringComponent />
        </BrowserRouter>);
        const input = getByTestId(container, "input");
        const button = getByTestId(container, "button");
        const testValue = "a";
        userEvent.type(input, testValue);
        userEvent.click(button);
        waitFor(() => {
            expect(input).toHaveValue(testString);
            const items = getAllByTestId(container, "circle")
                .map((el) => el.textContent);
            expect(items.join("")).toBe(Array(testValue).reverse().join(""));
        });
    });
    it("empty string ", () => {
        const { container } = render(<BrowserRouter>
            <StringComponent />
        </BrowserRouter>);
        const input = getByTestId(container, "input");
        const button = getByTestId(container, "button");
        const testValue = "";
        expect(input).toHaveValue(testValue);
        expect(button).toBeDisabled();
    });
})