import express from "express";
import { db } from "../config/firebaseAdmin.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();
const propertiesCol = db.collection("properties");

// GET /api/properties - Get all properties
router.get("/", async (req, res) => {
  try {
    const snapshot = await propertiesCol.orderBy("createdAt", "desc").get();
    const properties = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/properties/:id - Get single property
router.get("/:id", async (req, res) => {
  try {
    const doc = await propertiesCol.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ message: "Property not found" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/properties - Create property (admin only)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const docRef = await propertiesCol.add(propertyData);
    res.status(201).json({ id: docRef.id, ...propertyData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/properties/:id - Update property (admin only)
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    await propertiesCol.doc(req.params.id).update(updateData);
    res.status(200).json({ id: req.params.id, ...updateData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/properties/:id - Delete property (admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await propertiesCol.doc(req.params.id).delete();
    res.status(200).json({ message: "Property deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;