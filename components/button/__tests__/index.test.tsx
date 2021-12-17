import { createRef, useState } from 'react';
import { mount } from 'enzyme';
import Button from '..';

describe('Button', () => {
  it('show render correctly', () => {
    const wrappper = mount(<Button>Button</Button>);

    expect(() => wrappper.unmount()).not.toThrow();
  });

  it('show support all types', () => {
    const wrapper = mount(
      <div>
        <Button type="primary" />
        <Button type="default" />
        <Button type="dashed" />
        <Button type="text" />
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render different text', () => {
    const wrapper = mount(<Button>button</Button>);

    expect(wrapper.text()).toContain('button');

    wrapper.setProps({
      children: <span>按钮</span>,
    });

    expect(wrapper.text()).toContain('按钮');
  });

  it('should render empty correctly', () => {
    expect(<Button></Button>).toMatchSnapshot();
  });

  it('should triiger callback function', () => {
    const WrapperButton = () => {
      const [text, setText] = useState('text1');

      return <Button onClick={() => setText('text2')}>{text}</Button>;
    };

    const wrapper = mount(<WrapperButton />);

    expect(wrapper.text()).toContain('text1');
    wrapper.find('button').simulate('click');

    expect(wrapper.text()).toContain('text2');
  });

  it('should render special styles', () => {
    const wrapper = mount(
      <div>
        <Button effect={false}></Button>
      </div>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('shoul be forwarded', () => {
    const ref = createRef<HTMLButtonElement>();
    const wrapper = mount(<Button ref={ref}> action</Button>);

    expect(wrapper.find('button').getDOMNode()).toEqual(ref.current);
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
