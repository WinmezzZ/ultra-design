import { shallow } from 'enzyme';
import Button from '..';

describe('Button', () => {
  it('show render correctly', () => {
    const wrappper = shallow(<Button />);

    console.log(wrappper);

    expect(wrappper).toBeTruthy();
  });
});
