import mongoose, { Document } from 'mongoose';

interface Location {
  city: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface Activity {
  title: string;
  description?: string;
  date: Date;
  time?: string;
  location?: Location;
  cost?: number;
  duration?: number; // in minutes
  category?: string;
  bookingUrl?: string;
}

export interface ITrip extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  destinations: Location[];
  budget: {
    currency: string;
    amount: number;
    spent?: number;
  };
  activities: Activity[];
  travelStyle: string[];
  numberOfTravelers: number;
  status: 'planning' | 'ongoing' | 'completed' | 'cancelled';
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(this: ITrip, value: Date) {
        return value >= this.startDate;
      },
      message: 'End date must be after or equal to start date',
    },
  },
  destinations: [{
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  }],
  budget: {
    currency: {
      type: String,
      required: true,
      default: 'USD',
    },
    amount: {
      type: Number,
      required: true,
    },
    spent: {
      type: Number,
      default: 0,
    },
  },
  activities: [{
    title: {
      type: String,
      required: true,
    },
    description: String,
    date: {
      type: Date,
      required: true,
    },
    time: String,
    location: {
      city: String,
      country: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    cost: Number,
    duration: Number,
    category: String,
    bookingUrl: String,
  }],
  travelStyle: [{
    type: String,
    enum: ['adventure', 'relaxation', 'culture', 'food', 'shopping', 'nature', 'luxury', 'budget'],
  }],
  numberOfTravelers: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ['planning', 'ongoing', 'completed', 'cancelled'],
    default: 'planning',
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const Trip = mongoose.model<ITrip>('Trip', tripSchema); 