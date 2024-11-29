import Hotel from "../models/Hotel.js";
import Room from  "../models/Room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save(); //variable refering to current hotel created with a id
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

//Without $set, the entire document would be replaced with req.body,
//instead of just updating the specific fields.

//The new: true option tells Mongoose to return the updated document instead of the old one.
export const updatedHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel =async(req,res,next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.")
    }catch(err){
        next(err);
    }
}

export const getHotel=async(req,res,next)=>{
    try {
     const hotel =await Hotel.findById(req.params.id);
     res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}

export const getHotels = async (req, res, next) => {
  const { min = 0, max = 1000, limit = 10, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min, $lte: max },
    }).limit(limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};






export const countByCity =async(req,res,next)=>{
  const cities=req.query.cities.split(",");
  try {
    const list =await Promise.all(
      cities.map((city)=>{
        return Hotel.countDocuments({city:city});
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}

export const countByType =async(req,res,next)=>{
  try{
    const hotelCount =await Hotel.countDocuments({type:"hotel"});
    const apartment =await Hotel.countDocuments({type:"apartment"});
    const resortCount =await Hotel.countDocuments({type:"resortCount"});
    const villaCount =await Hotel.countDocuments({type:"villaCount"});
    const cabinCount =await Hotel.countDocuments({type:"cabinCount"});
    
    res.status(200).json([
      {type:"hotels",count : hotelCount},
      {type:"apartment",count : hotelCount},
      {type:"resorts",count : resortCount},
      {type:"villas",count : villaCount},
      {type:"cabin",count : cabinCount},
    ])
  }catch(err){
    next(err);
  }
};


// export const getHotelsRooms =async(req,res,next)=>{
//   try {
//     const hotel =await Hotel.findById(req.params.id);
//     const list = await Promise.all(
//       hotel.rooms.map((room)=>{
//         return Room.findById(room);
//       })
//     );
//     console.log(list);
//     res.status(200).json(list);

//   } catch (err) {
//     next(err);
//   }
// }


export const getHotelsRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    
    // Handle the case where the hotel is not found
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};




