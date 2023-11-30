const asyncHandler = require("express-async-handler");
const Contact = require("../models/ContactModel");
const getContacts = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const contact = await Contact.find({ user_id: id });
  res.status(200).json(contact);
});

const createContact = asyncHandler(async (req, res) => {
  const id = req.user.id;
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All Fields are Mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: id,
  });
  res.status(201).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("No such Document to Update");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to change someones contact Info");
  }
  const updateDoc = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateDoc);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("No such Document to Delete");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to change someones contact Info");
  }
  const deleteDoc = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(deleteDoc);
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("No such Document");
  }
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContacts,
};
