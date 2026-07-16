import { eq } from "drizzle-orm";
import { db } from "../";
import {
	type InsertTab,
	type InsertTuning,
	type SelectTab,
	type SelectTuning,
	tablatures,
	tunings
} from "../schema";

export const updateTab = async (id: SelectTab["id"], tab: InsertTab) => {
	await db.update(tablatures).set(tab).where(eq(tablatures.id, id));
};

export const updateTuning = async (id: SelectTuning["id"], tuning: InsertTuning) => {
	await db.update(tunings).set({ name: tuning.name }).where(eq(tunings.id, id));
};
