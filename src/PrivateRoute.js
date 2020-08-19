import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export function PrivateRoute({ exact, component, path }) {
    return (
        sessionStorage.getItem('accessToken') ? (
            <Route path={path} exact={exact} component={component} />
        ) : <Redirect to="/auth" />
    )
}