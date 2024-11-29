import express from "express";
import {
    createRoom,
    deleteRoom,
    updatedRoom,
    getRoom,
    getRooms,
    updatedRoomAvailability,
}from "../controllers/room.js";
import {verifyAdmin} from "../utils/verifyToken.js"

const router=express.Router();

router.get("/:id", getRoom);
router.put("/:id",verifyAdmin,updatedRoom);
router.put("/availability/:id",updatedRoomAvailability);
router.post("/:hotelId",verifyAdmin,createRoom);
router.get("/",getRooms);
router.delete("/:id/:hotelId",verifyAdmin,deleteRoom);

export default router;