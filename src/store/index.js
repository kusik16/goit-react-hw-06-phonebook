import { configureStore } from '@reduxjs/toolkit';
import contacts from '../components/contactList/contactsSlice';

const localStorageMiddleware = ({ getState }) => {
	return next => action => {
		const result = next(action);
		localStorage.setItem('applicationState', JSON.stringify(getState()));
		return result;
	};
};

const reHydrateStore = () => {
	if (localStorage.getItem('applicationState') !== null) {
		return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the store
	}
};

const store = configureStore({
	reducer: { contacts },
	preloadedState: reHydrateStore(),
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(localStorageMiddleware),
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;
