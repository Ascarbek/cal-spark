import { writable } from 'svelte/store';

export const CurrentUser = writable<IUser | undefined>(undefined);

export const ShowLoginModal = writable(false);
export const ShowRegistrationModal = writable(false);
