var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

var UnstatedForm = function (_Component) {
  _inherits(UnstatedForm, _Component);

  function UnstatedForm(props) {
    _classCallCheck(this, UnstatedForm);

    var _this = _possibleConstructorReturn(this, (UnstatedForm.__proto__ || Object.getPrototypeOf(UnstatedForm)).call(this, props));

    _this.getInputProp = function (key) {
      var _this$state = _this.state,
          values = _this$state.values,
          submitting = _this$state.submitting;

      return {
        onChange: _this.onChange(key),
        value: values[key],
        disabled: submitting
      };
    };

    _this.getInputProps = function (values) {
      return Object.keys(values).map(function (key) {
        return {
          key: key,
          value: _this.getInputProp(key)
        };
      }).reduce(function (acc, input) {
        acc[input.key] = input.value;
        return acc;
      }, {});
    };

    _this.onChange = function (key) {
      return function (e) {
        var actions = _this.props.actions;
        var _this$state2 = _this.state,
            values = _this$state2.values,
            errors = _this$state2.errors;

        var validationError = actions.validate(key, e.target.value, values);

        _this.setState({
          values: Object.assign({}, values, _defineProperty({}, key, e.target.value)),
          errors: Object.assign({}, errors, _defineProperty({}, key, validationError))
        });
      };
    };

    _this.state = {
      values: _this.props.actions.init(),
      valuesBeforeEdit: null,
      errors: {},
      editing: false,
      submitting: false,
      submitError: null
    };
    return _this;
  }

  _createClass(UnstatedForm, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var actions = this.props.actions;
      var _state = this.state,
          values = _state.values,
          valuesBeforeEdit = _state.valuesBeforeEdit,
          errors = _state.errors,
          editing = _state.editing,
          submitting = _state.submitting,
          submitError = _state.submitError;


      return actions.render({
        values: values,
        errors: errors,

        inputProps: this.getInputProps(values),

        editProps: {
          enabled: editing,
          toggle: function toggle() {
            if (!editing) {
              _this2.setState({
                editing: true,
                valuesBeforeEdit: values
              });
            } else {
              _this2.setState({
                editing: false,
                values: valuesBeforeEdit,
                valuesBeforeEdit: null,
                errors: {}
              });
            }
          }
        },

        submitProps: {
          enabled: actions.validate(undefined, undefined, values),
          submitting: submitting,
          submitError: submitError,
          submit: function submit() {
            _this2.setState({ submitting: true });
            actions.submit(values).then(function (_ref) {
              var values = _ref.values,
                  errors = _ref.errors,
                  error = _ref.error,
                  _ref$editing = _ref.editing,
                  editing = _ref$editing === undefined ? false : _ref$editing;

              _this2.setState({
                editing: editing,
                submitting: false,
                submitError: error,
                errors: errors,
                values: values
              });
            });
          }
        }
      });
    }
  }]);

  return UnstatedForm;
}(Component);

export default UnstatedForm;
