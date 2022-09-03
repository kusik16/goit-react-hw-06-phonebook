import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import ContactForm from '../contactForm/ContactForm';
import Filter from '../filter/Filter';
import ContactList from '../contactList/ContactList';

import {
	setFilter,
	addContact,
	deleteContact,
} from '../contactList/contactsSlice';

const App = () => {
	const { filter, items } = useSelector(state => state.contacts);
	const dispatch = useDispatch();

	const onFilter = e => {
		console.log(e.target.value);
		dispatch(setFilter(e.target.value));
	};

	const onAddContact = (name, number) => {
		if (items.filter(contact => contact.name === name).length >= 1) {
			alert(`${name} is already in contacts`);
			return;
		}

		if (items.filter(contact => contact.number === number).length >= 1) {
			alert(`${number} is already in contacts`);
			return;
		}

		const newUser = {
			name,
			number,
			id: nanoid(),
		};

		dispatch(addContact(newUser));
	};

	const onDeleteContact = id => {
		dispatch(deleteContact(id));
	};

	const filteredContacts = useMemo(() => {
		const filteredContacts = items.slice();

		if (!filter) {
			return filteredContacts;
		} else {
			return filteredContacts.filter(
				contact =>
					contact.name.toLowerCase().includes(filter.toLowerCase()) ||
					(contact.number + '').includes(filter)
			);
		}
	}, [items, filter]);

	return (
		<div>
			<h1 className="title">Phonebook</h1>
			<ContactForm onAddContact={onAddContact} />
			<h2 className="title">Contacts</h2>
			<Filter onFilter={onFilter} />
			<ContactList
				filteredContacts={filteredContacts}
				onDeleteContact={onDeleteContact}
			/>
		</div>
	);
};

export default App;
