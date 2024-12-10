import express from "express";
import { addSchool, listSchools} from '../controllers/schoolController.js'

const schoolRouter = express.Router();

schoolRouter.post("/addSchool", addSchool);
schoolRouter.get("/listSchools", listSchools);

export { schoolRouter };
