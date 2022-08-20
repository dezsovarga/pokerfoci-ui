import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Home.module.css';

const Home = (props) => {

    return (
        <section className={classes.starting}>
            <h1>Welcome on Board!</h1>
        </section>
    )
}

export default Home