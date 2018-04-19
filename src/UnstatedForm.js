import React from 'react';
import PropsFactory from './PropsFactory';

class UnstatedForm extends React.Component {
  constructor(props) {
    super(props);
    let {values, editing=false} = this.props.actions.init();

    if (!values) {
      throw new Error('you must fill in initial values');
    }

    this.state = {
      editing,
      values,
      valuesBeforeEdit: values,
      errors: {},
      submitting: false,
      submitError: null,
    }

    this.propsFactory = PropsFactory(
      this.setState.bind(this), 
      {
        native: this.props.native 
      }
    );
  }

  render() {
    let {actions} = this.props;
    let {values, valuesBeforeEdit, errors, editing, submitting, submitError} = this.state;

    return actions.render({ 
      values, 
      errors, 

      editProps: this.propsFactory.getEditProps({
        values, 
        valuesBeforeEdit,
        editing, 
      }),

      inputProps: this.propsFactory.getInputProps({
        values, 
        errors, 
        submitting, 
        fnValidate: actions.validate
      }), 

      submitProps: this.propsFactory.getSubmitProps({
        values, 
        submitting, 
        submitError, 
        fnSubmit: actions.submit,
        fnValidate: actions.validate,
      }),
    }); 
  }
}

export default UnstatedForm; 
