import React, {Component} from 'react';

class UnstatedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: this.props.actions.init(),
      valuesBeforeEdit: null,
      errors: {},
      editing: false,
      submitting: false,
      submitError: null,
    }
  }

  getInputProp = key => {
    let {values, submitting} = this.state;
    return {
      onChange: this.onChange(key),
      value: values[key],
      disabled: submitting 
    }
  }

  getInputProps = values => {
    return Object.keys(values)
      .map(key => ({
        key, 
        value: this.getInputProp(key)
      }))
      .reduce(
        (acc, input) => {
          acc[input.key] = input.value;
          return acc;
        },
        {}
      )
  }

  onChange = key => e => {
    let {actions} = this.props;
    let {values, errors} = this.state;
    let validationError = actions.validate(key, e.target.value, values);

    this.setState({
      values: {
        ...values,
        [key]: e.target.value
      },
      errors: {
        ...errors,
        [key]: validationError 
      }
    })
  }

  render() {
    let {actions} = this.props;
    let {values, valuesBeforeEdit, errors, editing, submitting, submitError} = this.state;

    return actions.render({ 
      values, 
      errors, 

      inputProps: this.getInputProps(values), 

      editProps: {
        enabled: editing,
        toggle: () => {
          if (!editing) {
            this.setState({
              editing: true,
              valuesBeforeEdit: values
            })
          } else {
            this.setState({
              editing: false,
              values: valuesBeforeEdit,
              valuesBeforeEdit: null,
              errors: {}
            })
          }
        } 
      },

      submitProps: {
        enabled: actions.validate(undefined, undefined, values),
        submitting,
        submitError,
        submit: () => {
            this.setState({submitting: true});
            actions.submit(values)
              .then(
                ({values, errors, error, editing=false}) => {
                  this.setState({
                    editing,
                    submitting: false,
                    submitError: error,
                    errors,
                    values 
                  })
                }
              )
        }
      },
    }); 
  }
}

export default UnstatedForm; 
