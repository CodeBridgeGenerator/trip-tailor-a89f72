
    module.exports = function (app) {
        const modelName = 'activities';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            dayPlanID: { type: Schema.Types.ObjectId, ref: "day_plans" },
name: { type:  String , required: true },
 },
location: { type:  String , required: true },
estimatedCost: { type: Number, required: false, max: 10000000 },
startTime: { type: Date, required: false },
endTime: { type: Date, required: false },

            
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