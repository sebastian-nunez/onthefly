import { pool } from "../config/database.js";

const createTripDestination = async (req, res) => {
  const insertQuery = `
    INSERT INTO trips_destinations (trip_id, destination_id)
    VALUES($1, $2)
    RETURNING *;
  `;

  const { trip_id, destination_id } = req.body;

  try {
    const results = await pool.query(insertQuery, [trip_id, destination_id]);

    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getTripsDestinations = async (req, res) => {
  const selectQuery = `SELECT * FROM trips_destinations ORDER BY trip_id ASC;`;

  try {
    const results = await pool.query(selectQuery);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getAllTrips = async (req, res) => {
  const selectQuery = `
      SELECT *
      FROM trips
      INNER JOIN trips_destinations ON trips_destinations.trip_id = trips.id
      WHERE trips_destinations.destination_id = $1;
    `;

  try {
    const destination_id = parseInt(req.params.destination_id);

    const results = await pool.query(selectQuery, [destination_id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getAllDestinations = async (req, res) => {
  const selectQuery = `
      SELECT *
      FROM destinations
      INNER JOIN trips_destinations ON trips_destinations.destination_id = destinations.id
      WHERE trips_destinations.trip_id = $1;
    `;

  try {
    const trip_id = parseInt(req.params.trip_id);
    const results = await pool.query(selectQuery, [trip_id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  createTripDestination,
  getTripsDestinations,
  getAllTrips,
  getAllDestinations
};
