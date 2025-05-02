
    module.exports = function (app) {
        const modelName = 'itinerary_cities';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            itineraryID: { type: Schema.Types.ObjectId, ref: "itineraries" },
cityName: { type:  String , maxLength: 150, index: true, trim: true },
country: { type:  String , required: true },
longitude: { type: Number, required: false, max: 10000000 },
latitude: { type: Number, required: false, max: 10000000 },

            
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