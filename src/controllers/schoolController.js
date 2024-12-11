import { db } from "../config/db.js";
import haversine from "haversine-distance";

// Function to add a new school
async function homePage(req, res) {
  return res.json(
    {
      msg: "This is home page",
      doccumentatioin: "https://github.com/abhiydev/school-managment-system"
    }
  );
}

async function addSchool(req, res) {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({
      error: "All fields are required - name, address, latitude, longitude",
    });
  }

  const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Failed to add school" });
    }

    res.status(201).json({
      message: "School added successfully",
      schoolId: result.insertId,
    });
  });
}

async function listSchools(req, res) {
  const { latitude, longitude } = req.query; // Use query parameters for GET requests

  // Validate Input
  if (!latitude || !longitude) {
    return res.status(400).json({
      error: "User's latitude and longitude are required",
    });
  }

  const userLocation = {
    lat: parseFloat(latitude),
    lon: parseFloat(longitude),
  };

  // Fetch Schools from Database
  const query = "SELECT * FROM schools";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Failed to fetch schools" });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ error: "No schools found" });
    }

    // Calculate and Sort by Distance
    const sortedSchools = results
      .map((school) => {
        const schoolLocation = {
          lat: school.latitude,
          lon: school.longitude,
        };
        return {
          ...school,
          distance: haversine(userLocation, schoolLocation),
        };
      })
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  });
}

export { addSchool, listSchools, homePage };
