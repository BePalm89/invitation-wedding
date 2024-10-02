import express from 'express';
import { generateExcel } from '../controllers/excel.controllers.js';

const router = express.Router();

router.post("/generate-excel", generateExcel);

export default router;