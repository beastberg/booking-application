import express from "express";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import{
    createHotel,
    deleteHotel,
    getHotel,
    getHotels,
    getHotelsRooms,
    updatedHotel,
    countByCity,
    countByType
}from "../controllers/hotel.js";



const router =express.Router();

//create
router.get("/createHotel",verifyAdmin,createHotel);


//update
router.put("/:id/",verifyAdmin,updatedHotel);


//delete
router.delete("/:id",verifyAdmin,deleteHotel);


//get
router.get("/find/:id",getHotel);


//get all
router.get("/",getHotels);
router.get("/countByCity",countByCity);
router.get("/countByType",countByType);
router.get("/room/:id",getHotelsRooms)

export default router;