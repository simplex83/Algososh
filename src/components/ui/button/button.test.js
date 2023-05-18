import { Button } from "./button";
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

describe("Button", () => {
    it("button is empty", () => {
        const button = renderer.create(<Button />).toJSON();
        expect(button).toMatchSnapshot();
    });
    it("button with text", () => {
        const button = renderer.create(<Button text='text' />).toJSON();
        expect(button).toMatchSnapshot();
    });
    it("button is disabled", () => {
        const button = renderer.create(< Button disabled />).toJSON();
        expect(button).toMatchSnapshot();
    });
    it("button is loader", () => {
        const button = renderer.create(< Button isLoader />).toJSON();
        expect(button).toMatchSnapshot();
    });
    it("button click", () => {
        window.alert = jest.fn();
        render(<Button text="text" onClick={() => alert("callback")} />);
        const button = screen.getByText("text");
        fireEvent.click(button);
        expect(window.alert).toHaveBeenCalledWith("callback");
    });
})