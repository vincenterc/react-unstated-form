var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropsFactory from './PropsFactory';

var UnstatedForm = function (_Component) {
  _inherits(UnstatedForm, _Component);

  function UnstatedForm(props) {
    _classCallCheck(this, UnstatedForm);

    var _this = _possibleConstructorReturn(this, (UnstatedForm.__proto__ || Object.getPrototypeOf(UnstatedForm)).call(this, props));

    var _this$props$actions$i = _this.props.actions.init(),
        values = _this$props$actions$i.values,
        _this$props$actions$i2 = _this$props$actions$i.editing,
        editing = _this$props$actions$i2 === undefined ? false : _this$props$actions$i2;

    if (!values) {
      throw new Error('you must fill in initial values');
    }

    _this.state = {
      editing: editing,
      values: values,
      valuesBeforeEdit: values,
      errors: {},
      submitting: false,
      submitError: null
    };

    _this.propsFactory = PropsFactory(_this.setState.bind(_this), {
      native: _this.props.native
    });
    return _this;
  }

  _createClass(UnstatedForm, [{
    key: 'render',
    value: function render() {
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

        editProps: this.propsFactory.getEditProps({
          values: values,
          valuesBeforeEdit: valuesBeforeEdit,
          editing: editing
        }),

        inputProps: this.propsFactory.getInputProps({
          values: values,
          errors: errors,
          submitting: submitting,
          fnValidate: actions.validate
        }),

        submitProps: this.propsFactory.getSubmitProps({
          values: values,
          submitting: submitting,
          submitError: submitError,
          fnSubmit: actions.submit,
          fnValidate: actions.validate
        })
      });
    }
  }]);

  return UnstatedForm;
}(Component);

export default UnstatedForm;