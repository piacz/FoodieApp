import React from 'react';
import App from './App';
import Post, {validate}  from './components/Post';
import LandingPage from "./components/LandingPage";
import Buscador from "./components/Buscador";
import Recipe from "./components/Recipe";
import { render, screen } from '@testing-library/react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from './store/index'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
const { Provider, Consumer } = React.createContext("defaultValue");
Enzyme.configure({ adapter: new Adapter() })
chai.use(chaiEnzyme());

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
describe('<App /> component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App store={store}/>);
  });

  it('has four <Route /> with components', () => {
    expect(wrapper.find(Route)).to.have.lengthOf(4);
    expect(wrapper.find(Route).first()).to.have.prop('component');
    expect(wrapper.find(Route).first()).to.not.have.prop('render');
  });
});


//SIMULATE
// describe('<Post />', () => {
//   let wrapper;
//   // const setState = jest.fn();
//   // const useStateSpy = jest.spyOn(React, 'useState')
//   // useStateSpy.mockImplementation((init) => [init, setState]);

//   beforeEach(() => {
//     wrapper = shallow(<Post store={store}/>);
//   });

//   describe('States: ', () => {
//     it('El form deberia cambiar de estado cuando escriban en el input de username', () => {
//       wrapper.find('unico').first().simulate('change', {target: {name: 'title', value: 'My new value'}});
//       expect(setState).toHaveBeenCalledWith({"title": "My new value", "summary": "", spoonacularScore:0,healthScore:0,instructions:'', diets: [],});
//     });
//   });

// });
// describe('<Buscador />', () => {
//   const ricardo = shallow(<Buscador store={store}/>) 
//   describe('Buscador: ', () => {
//     expect(ricardo).to.have.exactly(10).descendants('.dietButton')
//   });
// });
