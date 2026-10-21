import { and, eq } from "drizzle-orm";
import { db } from "../";
import {
	type InsertTab,
	type InsertTuning,
	type SelectTab,
	type SelectTuning,
	tablatures,
	tunings
} from "../schema";

export const updateTab = async (
	id: SelectTab["id"],
	userId: SelectTab["userId"],
	tab: InsertTab
) => {
	return db
		.update(tablatures)
		.set(tab)
		.where(and(eq(tablatures.id, id), eq(tablatures.userId, userId)))
		.returning({ id: tablatures.id });
};

export const updateTuning = async (
	id: SelectTuning["id"],
	userId: NonNullable<SelectTuning["userId"]>,
	tuning: InsertTuning
) => {
	return db
		.update(tunings)
		.set({ name: tuning.name })
		.where(and(eq(tunings.id, id), eq(tunings.userId, userId)))
		.returning({ id: tunings.id });
};
