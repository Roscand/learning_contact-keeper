// dependencies //
import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

// components //
import ContactItem from './ContactItem';

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts } = contactContext;

    return (
        <Fragment>
            {contacts.map(contact => (
                <ContactItem key={contact.id} contact={contact} />
            ))}
        </Fragment>
    )
}

export default Contacts
