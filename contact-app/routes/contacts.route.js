import express from "express";

import {
  getAllContacts,
  getContactById,
  getAddContactForm,
  addContact,
  getUpdateContactForm,
  updateContact,
  deleteContact,
} from "../controllers/contacts.controller.js";

const router = express.Router();

router.get("/", getAllContacts);
router.get("/show-contact/:id", getContactById);
router.get("/add-contact", getAddContactForm);
router.post("/add-contact", addContact);
router.get("/update-contact/:id", getUpdateContactForm);
router.post("/update-contact/:id", updateContact);
router.get("/delete-contact/:id", deleteContact);

export default router;
