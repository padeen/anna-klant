import { writable, type Writable } from "svelte/store";

const ServiceLineStore: Writable<string[]> = writable([]);

export default ServiceLineStore;
