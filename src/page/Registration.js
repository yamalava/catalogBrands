import React from 'react'
import { AuthForm } from '../component/AuthForm/index';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTRATION_USER } from '../queries';

function Registration() {
    const [createUserQuery] = useMutation(REGISTRATION_USER);
    const registrationUser = (dataForm) => {
        createUserQuery({
            variables: {
                ...dataForm
            }
        })
    }
    return <AuthForm title="Registration" btnTitle="Registration" getDataForm={registrationUser} />
}

export default withRouter(Registration);