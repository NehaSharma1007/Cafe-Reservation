import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next)=> {
  console.log();
    const { firstName, lastName, email, phone, date, time } = req.body;
    if (!firstName || !lastName || !email ||  !phone || !date || !time) {
        return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
    }
    try {
      const user = new Reservation({ firstName, lastName, email,  phone, date, time });
        await user.save()
        res.status(201).json({
          success: true,
          message: "Reservation Sent Successfully!",
        });

    } catch (error) {
        
        if (error.name === 'ValidationError') {
          const validationErrors = Object.values(error.errors).map(
            (err) => err.message
            );
          return next(new ErrorHandler(validationErrors.join(" , "), 400));
        }
    
        return next(error);
      }
};


