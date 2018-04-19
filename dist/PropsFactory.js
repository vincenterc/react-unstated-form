"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PropsFactory = function PropsFactory(setState) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$native = options.native,
        native = _options$native === undefined ? false : _options$native;


    var getEditProps = function getEditProps(_ref) {
        var editing = _ref.editing,
            values = _ref.values,
            valuesBeforeEdit = _ref.valuesBeforeEdit;

        return {
            enabled: editing,
            toggle: function toggle() {
                if (!editing) {
                    setState({
                        editing: true,
                        valuesBeforeEdit: values
                    });
                } else {
                    setState({
                        editing: false,
                        values: valuesBeforeEdit,
                        valuesBeforeEdit: null,
                        errors: {}
                    });
                }
            }
        };
    };

    var getSubmitProps = function getSubmitProps(_ref2) {
        var values = _ref2.values,
            submitting = _ref2.submitting,
            submitError = _ref2.submitError,
            fnSubmit = _ref2.fnSubmit,
            _ref2$fnValidate = _ref2.fnValidate,
            fnValidate = _ref2$fnValidate === undefined ? defaultValidator : _ref2$fnValidate;

        var setStateAfterSubmit = function setStateAfterSubmit(_ref3) {
            var values = _ref3.values,
                errors = _ref3.errors,
                error = _ref3.error,
                _ref3$editing = _ref3.editing,
                editing = _ref3$editing === undefined ? false : _ref3$editing;

            var nextState = {
                editing: editing,
                submitting: false
            };

            if (values !== undefined) {
                nextState.values = values;
            }
            if (errors !== undefined) {
                nextState.errors = errors;
            }
            if (error !== undefined) {
                nextState.submitError = error;
            }

            setState(nextState);
        };

        return {
            enabled: fnValidate(undefined, undefined, values),
            submitting: submitting,
            submitError: submitError,
            submit: function submit() {
                setState({ submitting: true });
                fnSubmit(values).then(setStateAfterSubmit).catch(setStateAfterSubmit);
            }
        };
    };

    var getInputProps = function getInputProps(_ref4) {
        var values = _ref4.values,
            errors = _ref4.errors,
            submitting = _ref4.submitting,
            _ref4$fnValidate = _ref4.fnValidate,
            fnValidate = _ref4$fnValidate === undefined ? defaultValidator : _ref4$fnValidate;

        var getSingleInputProps = function getSingleInputProps(key) {
            var onChange = function onChange(e) {
                /// if we're in react-native, the text fill be passed in directly
                var value = native ? e : e.target.value;
                var validationError = fnValidate(key, value, values);

                setState({
                    values: _extends({}, values, _defineProperty({}, key, value)),
                    errors: _extends({}, errors, _defineProperty({}, key, validationError))
                });
            };

            var props = {
                value: values[key],
                disabled: submitting,
                name: key
            };

            if (native) {
                props.onChangeText = onChange;
            } else {
                props.onChange = onChange;
            }

            return props;
        };

        return Object.keys(values).reduce(function (acc, key) {
            acc[key] = getSingleInputProps(key);
            return acc;
        }, {});
    };

    return {
        getEditProps: getEditProps,
        getSubmitProps: getSubmitProps,
        getInputProps: getInputProps
    };
};

var defaultValidator = function defaultValidator(key, value, values) {
    if (key === undefined, value === undefined) {
        return true;
    }

    return null;
};

exports.default = PropsFactory;
exports.defaultValidator = defaultValidator;