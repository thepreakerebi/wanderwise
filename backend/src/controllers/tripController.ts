import { Request, Response, NextFunction } from 'express';
import { Trip, ITrip } from '../models/tripModel';
import { AppError } from '../middlewares/errorHandler';

export const createTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tripData = {
      ...req.body,
      user: req.user?._id,
    };

    const trip = await Trip.create(tripData);

    res.status(201).json({
      status: 'success',
      message: 'New trip created',
      data: {
        trip,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTrips = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trips = await Trip.find({ user: req.user?._id });

    res.status(200).json({
      status: 'success',
      results: trips.length,
      data: {
        trips,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user?._id,
    });

    if (!trip) {
      return next(new AppError('Trip not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        trip,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user?._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!trip) {
      return next(new AppError('Trip not found', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Changes to trip updated',
      data: {
        trip,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user?._id,
    });

    if (!trip) {
      return next(new AppError('Trip not found', 404));
    }

    res.status(204).json({
      status: 'success',
      message: 'Trip deleted',
      data: null,
    });
  } catch (error) {
    next(error);
  }
}; 