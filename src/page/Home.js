import React from 'react'
import Header from '../component/Header'
import BrandsCatalog from '../component/BrandsCatalog'

class Home extends React.Component {
    render() {
        return (
            <>
                <Header />
                <BrandsCatalog />
            </>
        )
    }
}

export default Home;