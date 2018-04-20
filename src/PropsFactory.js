const PropsFactory = (setState, options={}) => {
    let { native=false } = options; 

    const getEditProps = ({ editing, values, valuesBeforeEdit }) => {
            return {
                enabled: editing,
                toggle: () => {
                    if (!editing) {
                        setState({
                            editing: true,
                            valuesBeforeEdit: values
                        })
                    } else {
                        setState({
                            editing: false,
                            values: valuesBeforeEdit,
                            valuesBeforeEdit: null,
                            errors: {}
                        })
                    }
                }
            }
        };

    const getSubmitProps = ({ values, submitting, submitError, fnSubmit, fnValidate=defaultValidator }) => {
            const setStateAfterSubmit = ({ values, errors, error, editing = false }) => {
                let nextState = {
                    editing,
                    submitting: false,
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
                submitting,
                submitError,
                submit: () => {
                    setState({ submitting: true });
                    fnSubmit(values)
                        .then(setStateAfterSubmit)
                        .catch(setStateAfterSubmit)
                }
            }
        };

    const getInputProps = ({ values, errors, submitting, fnValidate=defaultValidator }) => {
            const getSingleInputProps = key => {
                const onChange = e => {
                    /// if we're in react-native, the text fill be passed in directly
                    let value = native ? e : e.target.value;
                    let validationError = fnValidate(key, value, values);

                    setState({
                        values: {
                            ...values,
                            [key]: value
                        },
                        errors: {
                            ...errors,
                            [key]: validationError
                        }
                    })
                }

                let props = {
                    value: values[key],
                    name: key,
                };

                if (native) {
                    props.onChangeText = onChange;
                    props.editable = submitting;
                } else {
                    props.onChange = onChange;
                    props.disabled = submitting;
                }

                return props;
            }

            return Object.keys(values)
                .reduce(
                    (acc, key) => {
                        acc[key] = getSingleInputProps(key)
                        return acc;
                    }, {}
                );
        }

    return {
        getEditProps,
        getSubmitProps,
        getInputProps,
    }
}

const defaultValidator = (key, value, values) => {
    if (key === undefined, value === undefined) {
        return true;
    }

    return null;
}

export default PropsFactory;

export {
    defaultValidator
}