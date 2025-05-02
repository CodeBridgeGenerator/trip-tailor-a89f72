
import { faker } from "@faker-js/faker";
export default (user,count,userIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
userID: userIDIds[i % userIDIds.length],
title: faker.date.past(""),
startDate: faker.date.past(""),
endDate: faker.date.past(""),
groupSize: faker.date.past(""),
totalBudget: faker.date.past(""),
pacing: faker.date.past(""),
interest: faker.date.past(""),
createdAt: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
