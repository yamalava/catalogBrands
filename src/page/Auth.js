import React from 'react'
import { AuthForm } from '../component/AuthForm/index';
import { useMutation } from '@apollo/client';
import { AUTH_USER } from '../queries';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

function Auth(props) {
    const [authUserRequest, { loading }] = useMutation(AUTH_USER);
    const authUser = (dataForm) => {
        authUserRequest({
            variables: {
                ...dataForm
            }
        }).then(res => {
            sessionStorage.setItem('accessToken', res.data.authUser.token)
            props.history.push("/")
        }).catch(err => {
            console.log(err)
            console.log(1)
        })
    }

    return (
        loading ? (
            <CircularProgress className="loader" color="inherit" />
        ) : (
                <AuthForm title="Авторизация" btnTitle="Войти" getDataForm={authUser} />
            )
    )
}

export default withRouter(Auth)