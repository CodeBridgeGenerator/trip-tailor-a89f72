
    module.exports = function (app) {
        const modelName = 'itineraries';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            userID: { type: Schema.Types.ObjectId, ref: "users" },
title: { type:  String , required: true },
startDate: { type: Date, required: false },
endDate: { type: Date, required: false },
groupSize: { type: Number, required: false, max: 10000000 },
totalBudget: { type: Number, required: false, max: 10000000 },
 },
 },
createdAt: { type: Date, required: false },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };