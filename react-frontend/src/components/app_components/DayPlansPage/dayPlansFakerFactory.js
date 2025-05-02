
import { faker } from "@faker-js/faker";
export default (user,count,itineraryIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
itineraryID: itineraryIDIds[i % itineraryIDIds.length],
date: faker.lorem.sentence(1),
summary: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
