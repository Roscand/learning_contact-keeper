// dependencies //
import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

// components //
import ContactItem from './ContactItem';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered } = contactContext;

    if (contacts.length === 0) {
        return <p>There'll be your contacts</p>
    };

    return (
        <Fragment>
            {filtered !== null 
                ? filtered.map(contact => (
                    <ContactItem key={contact.id} contact={contact} />
                )) 
                : contacts.map(contact => (
                    <ContactItem key={contact.id} contact={contact} />
                ))}
        </Fragment>
    )
}

export default Contacts
