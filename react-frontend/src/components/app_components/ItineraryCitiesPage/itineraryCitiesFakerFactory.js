
import { faker } from "@faker-js/faker";
export default (user,count,itineraryIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
itineraryID: itineraryIDIds[i % itineraryIDIds.length],
cityName: faker.datatype.number("8"),
country: faker.datatype.number(""),
longitude: faker.datatype.number(""),
latitude: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
