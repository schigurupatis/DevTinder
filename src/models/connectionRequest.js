const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: {
                values: ["ignored", "interested", "accepted", "rejected"],
                message: `{VALUE} is incorrect status type`,
            },
        },
    },
    {
        timestamps: true, // Fixed typo: use `timestamps` to track creation and update times
    }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// Validate before saving
connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;

    // Check if the `fromUserId` is the same as `toUserId`
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        return next(new Error("You cannot send a connection request to yourself"));
    }

    // Pass control to the next middleware or save the document
    next();
});

const ConnectionRequestModel = mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;
