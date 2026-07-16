import { db } from "../";
import { type InsertTab, type InsertTuning, tablatures, tunings } from "../schema";

export const insertTab = async (tab: InsertTab) => {
	await db.insert(tablatures).values(tab);
};

export const insertTuning = async (tuning: InsertTuning) => {
	const [result] = await db
		.insert(tunings)
		.values(tuning)
		.returning({ id: tunings.id, name: tunings.name });
	return result;
};
