import type { Database } from "../";
import { type InsertTab, type InsertTuning, tablatures, tunings } from "../schema";

export const insertTab = async (db: Database, tab: InsertTab) => {
	await db.insert(tablatures).values(tab);
};

export const insertTuning = async (db: Database, tuning: InsertTuning) => {
	const [result] = await db
		.insert(tunings)
		.values(tuning)
		.returning({ id: tunings.id, name: tunings.name });
	return result;
};
