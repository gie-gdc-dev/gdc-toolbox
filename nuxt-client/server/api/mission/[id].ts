import { Db, ObjectId } from 'mongodb'
import finalizeMissionType from './helper';

const { MONGO_COLLECTION } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
	
	const missionId: string = event.context.params.id;
	
	const dbClient: Db = event.context.db;
	const collection = dbClient.collection<Mission>(MONGO_COLLECTION);
	const datas = await collection.findOne({ "_id": new ObjectId(missionId) });

	if (!datas) {
		throw createError("PBO not found");
	}
	
	return finalizeMissionType([datas])[0];
})