const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  username: {
    type: String,
    required: true,
    max: 40
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  age: {
    type: Number
  },
  gender: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String
  },
  streetAddress: {
    type: String
  },
  postcode: {
    type: String
  },
  city: {
    type: String
  },
  GDPR: {
    type: String
  },
  injuries: [
    {
      injuryLocation: {
        type: String,
        required: true
      },
      injuryDescription: {
        type: String,
        required: true
      },
      returnIn: {
        type: Number
      },
      current: {
        type: Number,
        default: false
      },
      injuryDate: {
        type: Date,
        default: Date.now
      }
    }
  ],
  bloodPressure: [
    {
      bloodPressureReading: {
        type: String,
        required: true
      },
      bloodPressureDate: {
        type: Date,
        default: Date.now
      },
      current: {
        type: Number,
        default: false
      }
    }
  ],
  BPM: [
    {
      BPMReading: {
        type: Number,
        required: true
      },
      BPMDate: {
        type: Date,
        default: Date.now()
      },
      current: {
        type: Number,
        default: false
      }
    }
  ],
  fiftyMetre: [
    {
      eventType: {
        type: String
      },
      eventDate: {
        type: Date,
        default: Date.now(),
        required: true
      },
      lapTime: {
        type: Number
      },
      firstSplit: {
        type: Number,
        required: true
      },
      firstVelocity: {
        type: Number,
        required: true
      },
      firstSR: {
        type: Number,
        required: true
      },
      firstDPS: {
        type: Number,
        required: true
      },
      firstCount: {
        type: Number,
        required: true
      },
      secondSplit: {
        type: Number,
        required: true
      },
      secondVelocity: {
        type: Number,
        required: true
      },
      secondSR: {
        type: Number,
        required: true
      },
      secondDPS: {
        type: Number,
        required: true
      },
      secondCount: {
        type: Number,
        required: true
      },
      avgVelocity: {
        type: Number
      },
      avgSR: {
        type: Number
      },
      avgDPS: {
        type: String
      }
    }
  ],
  hundredMetre: [
    {
      eventType: {
        type: String
      },
      eventDate: {
        type: Date
      },
      lapTime: {
        type: Number
      },
      firstSplit: {
        type: Number,
        required: true
      },
      firstVelocity: {
        type: Number,
        required: true
      },
      firstSR: {
        type: Number,
        required: true
      },
      firstDPS: {
        type: Number,
        required: true
      },
      firstCount: {
        type: Number,
        required: true
      },
      secondSplit: {
        type: Number,
        required: true
      },
      secondVelocity: {
        type: Number,
        required: true
      },
      secondSR: {
        type: Number,
        required: true
      },
      secondDPS: {
        type: Number,
        required: true
      },
      secondCount: {
        type: Number,
        required: true
      },
      thirdSplit: {
        type: Number,
        required: true
      },
      thirdVelocity: {
        type: Number,
        required: true
      },
      thirdSR: {
        type: Number,
        required: true
      },
      thirdDPS: {
        type: Number,
        required: true
      },
      thirdCount: {
        type: Number,
        required: true
      },
      fourthSplit: {
        type: Number,
        required: true
      },
      fourthVelocity: {
        type: Number,
        required: true
      },
      fourthSR: {
        type: Number,
        required: true
      },
      fourthDPS: {
        type: Number,
        required: true
      },
      fourthCount: {
        type: Number,
        required: true
      },
      avgVelocity: {
        type: Number
      },
      avgSR: {
        type: Number
      },
      avgDPS: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
