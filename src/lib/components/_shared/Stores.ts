import { writable } from 'svelte/store';
import type { IUser } from '$components/_shared/Types';

export const CurrentUser = writable<IUser | undefined>(undefined);

export const ShowLoginModal = writable(false);
export const ShowRegistrationModal = writable(false);
