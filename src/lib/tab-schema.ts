import { z } from "zod/v4";

export const addTabSchema = z.object({
	song: z.string().nonempty("Must have at least a song"),
	artist: z.string(),
	tuning: z.string(),
	instrument: z.string(),
	link: z.url()
});

export const editTabSchema = z.object({
	id: z.string(),
	song: z.string().nonempty(),
	artist: z.string(),
	tuning: z.string(),
	instrument: z.string(),
	link: z.url()
});

export const deleteTabSchema = z.object({
	id: z.string()
});

export const settingsSchema = z.object({
	tuning: z.string(),
	instrument: z.string()
});

export type AddTabSchema = typeof addTabSchema;
export type EditTabSchema = typeof editTabSchema;
export type DeleteTabSchema = typeof deleteTabSchema;
export type SettingsSchema = typeof settingsSchema;
