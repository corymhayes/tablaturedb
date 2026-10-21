import { and, eq } from "drizzle-orm";
import type { Database } from "../";
import { type SelectTab, type SelectTuning, tablatures, tunings } from "../schema";

export const deleteTab = async (
	db: Database,
	id: SelectTab["id"],
	userId: NonNullable<SelectTab["userId"]>
) => {
	return db
		.delete(tablatures)
		.where(and(eq(tablatures.id, id), eq(tablatures.userId, userId)))
		.returning({ id: tablatures.id });
};

export const deleteTuning = async (
	db: Database,
	id: SelectTuning["id"],
	userId: NonNullable<SelectTuning["userId"]>
) => {
	return db
		.delete(tunings)
		.where(and(eq(tunings.id, id), eq(tunings.userId, userId)))
		.returning({ id: tunings.id });
};
