import { Circle } from './circle';
import { ElementStates } from "../../../types/element-states";
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

describe("Circle", () => {
  it("circle is empty", () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("circle with letter", () => {
    const circle = renderer.create(<Circle letter={'letter'} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("circle with head", () => {
    const circle = renderer.create(<Circle head={'head'} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("circle with React.Element in head", () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("circle with tail", () => {
    const circle = renderer.create(<Circle tail={'tail'} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("circle with React.Element in tail", () => {
    const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("circle with index", () => {
    const circle = renderer.create(<Circle index={0} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("circle with isSmall", () => {
    const circle = renderer.create(<Circle isSmall />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("circle with defaultState", () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("circle with changingState", () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("circle with modifiedState", () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

})