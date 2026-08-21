import express from 'express';
import multer from "multer";
import {login}  from '../controllers/login.js';
import { submitComplain } from '../controllers/submitComplain.js';
import { generateComplain } from "../controllers/generateComplain.js";
import { complainDetail } from '../controllers/complainDetail.js';
import { showComplain } from '../controllers/showComplain.js';
import { trackComplain } from '../controllers/trackComplain.js';
import { complaintStatistics } from '../controllers/complainStatistic.js';
import { categoryStatistics } from '../controllers/categoryStatistic.js';
import { showAllComplain } from '../controllers/showAllComplain.js';
import { updateComplainStatus } from '../controllers/updateStatus.js';
import { complainReport } from '../controllers/complainReport.js';
import { downloadAttachment } from '../controllers/downloadAttachment.js';

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/login', login);
router.post('/generateComplain', generateComplain);
router.post("/:id/submitComplain", upload.array("attachments", 10), submitComplain);
router.post("/:id/complainDetail", complainDetail);
router.post("/showComplain", showComplain);
router.post("/trackComplain", trackComplain);
router.post("/complainStatistic", complaintStatistics);
router.post("/categoryStatistic", categoryStatistics);
router.post("/showAllComplain", showAllComplain);
router.patch("/complain/:id/status", updateComplainStatus);
router.post("/complainReport", complainReport);
router.get("/attachment/download/:id_complain", downloadAttachment);

export default router;