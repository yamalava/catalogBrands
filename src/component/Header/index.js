import React from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import styles from './header.module.scss'

function Header(props) {

    const removeToken = () => {
        sessionStorage.removeItem('accessToken')
        props.history.push('/auth')
    }

    return (
        <header className={styles.header}>
            <div className={styles.header__menu}>
                {sessionStorage.getItem('accessToken') ? (
                    <Button variant="contained" onClick={removeToken}>Logout</Button>
                ) : (
                        <>
                            <Button variant="contained" onClick={() => props.history.push('/auth')}>LogIn</Button>
                            <Button variant="contained" onClick={() => props.history.push('/registration')}>Registration</Button>
                        </>
                    )
                }
            </div>
        </header>
    )
}

export default withRouter(Header);