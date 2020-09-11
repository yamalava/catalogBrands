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
                    <Button variant="contained" onClick={removeToken}>Выйти</Button>
                ) : (
                        <>
                            <Button variant="contained" onClick={() => props.history.push('/auth')}>Войти</Button>
                            <Button variant="contained" onClick={() => props.history.push('/registration')}>Регистрация</Button>
                        </>
                    )
                }
            </div>
        </header>
    )
}

export default withRouter(Header);