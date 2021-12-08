var Text = function Text(props) {
  return /*#__PURE__*/React.createElement("span", props);
};

var Button = function Button(props) {
  return /*#__PURE__*/React.createElement("button", props, /*#__PURE__*/React.createElement(Text, null));
};

Button.defaultProps = {
  theme: 'light'
};

export { Button as default };
