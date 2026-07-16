import { eq } from "drizzle-orm";
import { db } from "../";
import { type SelectTab, type SelectTuning, tablatures, tunings } from "../schema";

export const deleteTab = async (id: SelectTab["id"]) => {
	return db.delete(tablatures).where(eq(tablatures.id, id));
};

export const deleteTuning = async (id: SelectTuning["id"]) => {
	return db.delete(tunings).where(eq(tunings.id, id));
};
