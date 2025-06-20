export type Tab = {
	id?: string | unknown;
	song: FormDataEntryValue | string;
	artist: FormDataEntryValue | string;
	tuning: FormDataEntryValue | string;
	capo?: FormDataEntryValue | number;
	instrument: FormDataEntryValue | string;
	link: FormDataEntryValue | string;
	user?: FormDataEntryValue | string;
};
