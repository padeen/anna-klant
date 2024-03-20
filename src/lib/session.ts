import { writable, type Writable } from 'svelte/store';

type User = {
  email?: string | null;
  uid?: string | null;
};

export type SessionState = {
  user: User | null;
};

export default <Writable<SessionState>>writable();