// dependencies //
import React, { useContext, useEffect } from 'react';

// context //
import AuthContext from '../../context/auth/authContext';

// components //
import ContactForm from '../contacts/ContactForm';
import Contacts from '../contacts/Contacts';
import ContactFilter from '../contacts/ContactFilter';

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default Home
