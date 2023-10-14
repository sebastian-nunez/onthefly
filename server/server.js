import express from "express";
import cors from "cors";
import tripRoutes from "./routes/trips.js";
import activityRoutes from "./routes/activities.js";
import destinationRoutes from "./routes/destinations.js";
import tripDestinationRoutes from "./routes/trips_destinations.js";

const PORT = process.env.PORT || 3001;

// create express app
const app = express();

// middleware
app.use(express.json()); // use JSON
app.use(cors());

app.use("/api/trips", tripRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/trips-destinations", tripDestinationRoutes);

app.get("/", (req, res) => {
  res.status(200).send(
    `<!DOCTYPE html>
      <html>
      <head>
        <title>#OnTheFly API Service Overview</title>
      </head>
      <body>

      <h1 style="text-align: center; margin-top: 50px;">#OnTheFly API Service Overview</h1>

      <p>The API service provides endpoints to manage trips, destinations, activities, and associations between trips and destinations. It also handles user-related functionalities.</p>

      <h2>Endpoints</h2>

      <ul>
        <li><strong>Trips</strong>
          <ul>
            <li>Manage trip information, including title, description, duration, start date, end date, and cost.</li>
          </ul>
        </li>
        <li><strong>Destinations</strong>
          <ul>
            <li>Handle details about destinations, including name, description, city, country, images, etc.</li>
          </ul>
        </li>
        <li><strong>Activities</strong>
          <ul>
            <li>Manage activities related to trips, allowing users to add and view activities associated with a trip.</li>
          </ul>
        </li>
        <li><strong>Trips-Destinations Association</strong>
          <ul>
            <li>Establish associations between trips and destinations, providing information about which destinations are part of a trip.</li>
          </ul>
        </li>
      </ul>

      <h2>Features</h2>

      <ul>
        <li><strong>Create, Read, Update, and Delete (CRUD) Operations</strong>
          <ul>
            <li>Allows users to perform CRUD operations on trips, destinations, activities, and users.</li>
          </ul>
        </li>
        <li><strong>Association Management</strong>
          <ul>
            <li>Supports associating destinations with trips and managing these associations.</li>
          </ul>
        </li>
      </ul>

      </body>
      </html>
      `
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
