import React from 'react';
import classes from './Home.module.css';

const Home = (props) => {

    return (
        <section className={classes.starting} data-testid='home-page'>
            <h1>Welcome on Board!</h1>
        </section>
    )
}

export default Home