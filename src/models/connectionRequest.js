const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromuserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    touserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} cannot the valid Type`,
      },
    },
  },
  { timestamps: true },
);

connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;
  

  if (connectionRequest.fromuserId.equals(connectionRequest.touserId)) {
    throw new Error("Cannot send the connection request to  yourself!");
  }
});

const ConnectionRequestModel =  mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

module.exports = ConnectionRequestModel;
