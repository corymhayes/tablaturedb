import { and, asc, eq, isNull, or } from "drizzle-orm";
import { db } from "../";
import { type SelectTab, type SelectTuning, tablatures, tunings } from "../schema";

export const selectTab = async (userId: SelectTab["userId"]) => {
	return db
		.select({
			id: tablatures.id,
			song: tablatures.song,
			artist: tablatures.artist,
			tuning: tunings.name,
			link: tablatures.link,
			createdAt: tablatures.createdAt,
			userId: tablatures.userId
		})
		.from(tablatures)
		.leftJoin(tunings, eq(tablatures.tuningId, tunings.id))
		.where(eq(tablatures.userId, userId))
		.orderBy(asc(tablatures.artist), asc(tablatures.song));
};

export const selectTabById = async (id: SelectTab["id"], userId: SelectTab["userId"]) => {
    return db
        .select()
        .from(tablatures)
        .where(and(eq(tablatures.id, id), eq(tablatures.userId, userId)));
};

export const selectTuning = async (userId: SelectTuning["userId"]) => {
	return db
		.select()
		.from(tunings)
		.where(or(isNull(tunings.userId), eq(tunings.userId, userId!)))
		.orderBy(asc(tunings.name));
};

export const selectUniqueTuning = async (
	userId: SelectTuning["userId"],
	name: SelectTuning["name"]
) => {
	return db
		.select()
		.from(tunings)
		.where(and(eq(tunings.name, name), or(isNull(tunings.userId), eq(tunings.userId, userId!))))
		.orderBy(asc(tunings.name));
};
