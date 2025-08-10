import { Contact } from "../models/contacts.models.js";
import mongoose from "mongoose";

// GET all contacts
export const getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    const result = await Contact.paginate({}, options);
    // res.send(result);
    res.render("home", {
      totalDocs: result.totalDocs,
      limit: result.limit,
      totalPages: result.totalPages,
      currentPage: result.page,
      counter: result.pagingCounter,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      contacts: result.docs,
    });
  } catch (error) {
    res.render("500", { message: error.message });
  }
};

// GET single contact
export const getContactById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render("404", { message: "Invalid ID" });
  }

  try {
    const user = await Contact.findById(req.params.id);
    if (!user) {
      return res.render("404", { message: "User Not Found" });
    }
    res.render("show-contact", { user });
  } catch (error) {
    res.render("500", { message: error.message });
  }
};

// GET add contact form
export const getAddContactForm = (req, res) => {
  res.render("add-contact");
};

// POST add contact
export const addContact = async (req, res) => {
  try {
    let { first_name, last_name, email, phone, address } = req.body;

    if (phone.startsWith("0")) {
      phone = phone.substring(1);
    }

    await Contact.create({
      first_name,
      last_name,
      email,
      phone: `+91 ${phone}`,
      address: address.replace(/ /g, ","),
    });

    res.redirect("/");
  } catch (error) {
    res.render("500", { message: error.message });
  }
};

// GET update form
export const getUpdateContactForm = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render("404", { message: "Invalid ID" });
  }

  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.render("404", { message: "User Not Found" });
    }
    res.render("update-contact", { contact });
  } catch (error) {
    res.render("500", { message: error.message });
  }
};

// POST update contact
export const updateContact = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.render("404", { message: "Invalid ID" });
    }

    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  } catch (error) {
    res.render("500", { message: error.message });
  }
};

// DELETE contact
export const deleteContact = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.render("404", { message: "Invalid ID" });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.render("500", { message: error.message });
  }
};
