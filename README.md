# #OnTheFly

> The service can be utilized to plan and manage trips, gather information about destinations, and engage with activities related to various trips.
>
> It enables users to create, view, update, and delete data regarding trips, destinations, and activities.

---

## Table of Contents

- [Technologies](#technologies)
- [Usage (Local)](#usage-local)
- [Endpoints (Overview)](#endpoints-overview)
- [API Documentation](#api-documentation)

## Technologies

- **Languages:** JavaScript, Node.js
- **Framework:** Express.js
- **Database:** PostgresSQL _(hosted through Railway)_

## Usage (Local)

1. **Install dependencies:** `npm install`
2. **Update environment variables:** rename `.env.template` to `.env`
   1. Provide the Railway connection details
3. **Run the application/server:** `npm run start`
   1. Server should be up and running on `http://localhost:3001/`

## Endpoints Overview

- **Trips**

  - Manage trip information, including title, description, duration, start date, end date, and cost.

- **Destinations**

  - Handle details about destinations, including name, description, city, country, images, etc.

- **Activities**

  - Manage activities related to trips, allowing users to add and view activities associated with a trip.

- **Trips-Destinations Association**

  - Establish associations between trips and destinations, providing information about which destinations are part of a trip.

## API Documentation

### Table of Contents

- [Data Tables](#data-tables)

- [Trips API](#trips-api)

  - [Get All Trips](#get-all-trips)
  - [Get Trip by ID](#get-trip-by-id)
  - [Create Trip](#create-trip)
  - [Delete Trip by ID](#delete-trip-by-id)
  - [Update Trip by ID](#update-trip-by-id)

- [Destinations API](#destinations-api)

  - [Get All Destinations](#get-all-destinations)
  - [Get Destination by ID](#get-destination-by-id)
  - [Create Destination](#create-destination)
  - [Delete Destination by ID](#delete-destination-by-id)
  - [Update Destination by ID](#update-destination-by-id)

- [TripsDestinations API](#tripsdestinations-api)
  - [Get All Trips and Destinations](#get-all-trips-and-destinations)
  - [Get All Trips by Destination ID](#get-all-trips-by-destination-id)
  - [Get All Destinations by Trip ID](#get-all-destinations-by-trip-id)
  - [Create Trip-Destination Association](#create-trip-destination-association)

---

## Data Tables

### `trips`

| Column      | Data Type    | Constraints      |
| ----------- | ------------ | ---------------- |
| id          | serial       | Primary Key      |
| title       | varchar(100) | Not Null, Unique |
| description | varchar(500) | Not Null         |
| img_url     | text         | Not Null         |
| num_days    | integer      | Not Null         |
| start_date  | date         | Not Null         |
| end_date    | date         | Not Null         |
| total_cost  | money        | Not Null         |

### `destinations`

| Column       | Data Type    | Constraints |
| ------------ | ------------ | ----------- |
| id           | serial       | Primary Key |
| destination  | varchar(100) | Not Null    |
| description  | varchar(500) | Not Null    |
| city         | varchar(100) | Not Null    |
| country      | varchar(100) | Not Null    |
| img_url      | text         | Not Null    |
| flag_img_url | text         | Not Null    |

### `activities`

| Column    | Data Type    | Constraints                      |
| --------- | ------------ | -------------------------------- |
| id        | serial       | Primary Key                      |
| trip_id   | int          | Not Null, Foreign Key (trips.id) |
| activity  | varchar(100) | Not Null                         |
| num_votes | integer      | Default 0                        |

### `trips_destinations`

| Column         | Data Type | Constraints                             |
| -------------- | --------- | --------------------------------------- |
| trip_id        | int       | Not Null, Foreign Key (trips.id)        |
| destination_id | int       | Not Null, Foreign Key (destinations.id) |
|                |           | Primary Key (trip_id, destination_id)   |

### `users`

| Column      | Data Type    | Constraints |
| ----------- | ------------ | ----------- |
| id          | serial       | Primary Key |
| githubid    | integer      | Not Null    |
| username    | varchar(100) | Not Null    |
| avatarurl   | varchar(500) | Not Null    |
| accesstoken | varchar(500) | Not Null    |

### `trips_users`

| Column  | Data Type | Constraints                      |
| ------- | --------- | -------------------------------- |
| trip_id | int       | Not Null, Foreign Key (trips.id) |
| user_id | int       | Not Null, Foreign Key (users.id) |
|         |           | Primary Key (trip_id, user_id)   |

---

## Trips API

### Get All Trips

Retrieve a list of all trips.

- **URL**: `/trips`
- **Method**: `GET`
- **Controller Method**: `TripsController.getTrips`
- **Response**:

  Example response JSON object:

  ```json
  [
    {
      "id": 1,
      "title": "Trip to New York",
      "description": "Exploring NYC",
      "img_url": "https://example.com/trip1.jpg",
      "num_days": 5,
      "start_date": "2023-11-01",
      "end_date": "2023-11-05",
      "total_cost": 2000.0
    },
    {
      "id": 2,
      "title": "Adventure in Paris",
      "description": "Discovering the City of Light",
      "img_url": "https://example.com/trip2.jpg",
      "num_days": 7,
      "start_date": "2024-04-15",
      "end_date": "2024-04-22",
      "total_cost": 2500.0
    }
    // More trips...
  ]
  ```

### Get Trip by ID

Retrieve a specific trip by its ID.

- **URL**: `/trips/:id`
- **Method**: `GET`
- **Request Parameters**:
  - `id` (string, required): ID of the trip to retrieve
- **Response**:

  Example response JSON object:

  ```json
  {
    "id": 1,
    "title": "Trip to New York",
    "description": "Exploring NYC",
    "img_url": "https://example.com/trip1.jpg",
    "num_days": 5,
    "start_date": "2023-11-01",
    "end_date": "2023-11-05",
    "total_cost": 2000.0
  }
  ```

### Create Trip

Create a new trip.

- **URL**: `/trips`
- **Method**: `POST`
- **Request Body**:
  - Trip object
- **Response**:

  Example response JSON object:

  ```json
  {
    "id": 3,
    "title": "City Escape to Barcelona",
    "description": "Discover Barcelona's charms",
    "img_url": "https://example.com/trip3.jpg",
    "num_days": 4,
    "start_date": "2023-12-20",
    "end_date": "2023-12-24",
    "total_cost": 1800.0
  }
  ```

### Delete Trip by ID

Delete a specific trip by its ID.

- **URL**: `/trips/:id`
- **Method**: `DELETE`
- **Request Parameters**:
  - `id` (string, required): ID of the trip to delete
- **Response**:

  Example response JSON object:

  ```json
  {
    "message": "Trip deleted successfully"
  }
  ```

### Update Trip by ID

Update a specific trip by its ID.

- **URL**: `/trips/:id`
- **Method**: `PATCH`
- **Request Parameters**:
  - `id` (string, required): ID of the trip to update
- **Request Body**:
  - Updated trip object
- **Response**:

  Example response JSON object:

  ```json
  {
    "id": 1,
    "title": "Updated Trip Title",
    "description": "Updated Trip Description",
    "img_url": "https://example.com/updated-trip.jpg",
    "num_days": 6,
    "start_date": "2023-11-01",
    "end_date": "2023-11-06",
    "total_cost": 2300.0
  }
  ```

---

## Destinations API

> **Base Route:** `http://localhost:3001/api`

### Get All Destinations

Retrieve a list of all destinations.

- **URL**: `/destinations`
- **Method**: `GET`
- **Response**:

  Example response JSON object:

  ```json
  [
    {
      "id": 1,
      "destination": "New York City",
      "description": "The Big Apple",
      "city": "New York",
      "country": "USA",
      "img_url": "https://example.com/image1.jpg",
      "flag_img_url": "https://example.com/flag1.jpg"
    },
    {
      "id": 2,
      "destination": "Paris",
      "description": "The City of Light",
      "city": "Paris",
      "country": "France",
      "img_url": "https://example.com/image2.jpg",
      "flag_img_url": "https://example.com/flag2.jpg"
    }
    // More destinations...
  ]
  ```

### Get Destination by ID

Retrieve a specific destination by its ID.

- **URL**: `/destinations/:id`
- **Method**: `GET`
- **Request Parameters**:
  - `id` (string, required): ID of the destination to retrieve
- **Response**:

  Example response JSON object:

  ```json
  {
    "id": 1,
    "destination": "New York City",
    "description": "The Big Apple",
    "city": "New York",
    "country": "USA",
    "img_url": "https://example.com/image1.jpg",
    "flag_img_url": "https://example.com/flag1.jpg"
  }
  ```

### Create Destination

Create a new destination.

- **URL**: `/destinations`
- **Method**: `POST`
- **Request Body**:
  - Destination object
- **Response**:

  Example response JSON object:

  ```json
  {
    "id": 3,
    "destination": "London",
    "description": "The British Capital",
    "city": "London",
    "country": "United Kingdom",
    "img_url": "https://example.com/image3.jpg",
    "flag_img_url": "https://example.com/flag3.jpg"
  }
  ```

### Delete Destination by ID

Delete a specific destination by its ID.

- **URL**: `/destinations/:id`
- **Method**: `DELETE`
- **Request Parameters**:
  - `id` (string, required): ID of the destination to delete
- **Response**:

  Example response JSON object:

  ```json
  {
    "message": "Destination deleted successfully"
  }
  ```

### Update Destination by ID

Update a specific destination by its ID.

- **URL**: `/destinations/:id`
- **Method**: `PATCH`
- **Request Parameters**:
  - `id` (string, required): ID of the destination to update
- **Request Body**:
  - Updated destination object
- **Response**:

  Example response JSON object:

  ```json
  {
    "id": 1,
    "destination": "Updated Destination Name",
    "description": "Updated Description",
    "city": "Updated City",
    "country": "Updated Country",
    "img_url": "https://example.com/updated-image.jpg",
    "flag_img_url": "https://example.com/updated-flag.jpg"
  }
  ```

---

## TripsDestinations API

### Get All Trips and Destinations

Retrieve a list of all trips and their associated destinations.

- **URL**: `/trips-destinations`
- **Method**: `GET`
- **Controller Method**: `TripsDestinationsController.getTripsDestinations`
- **Response**:

  Example response JSON object:

  ```json
  [
    {
      "trip_id": 1,
      "destination_id": 1
    },
    {
      "trip_id": 1,
      "destination_id": 2
    }
    // More trip-destination associations...
  ]
  ```

### Get All Trips by Destination ID

Retrieve a list of all trips associated with a specific destination.

- **URL**: `/trips-destinations/trips/:destination_id`
- **Method**: `GET`
- **Controller Method**: `TripsDestinationsController.getAllTrips`
- **Request Parameters**:
  - `destination_id` (string, required): ID of the destination to retrieve trips for
- **Response**:

  Example response JSON object:

  ```json
  [
    {
      "id": 1,
      "title": "Trip to New York",
      "description": "Exploring NYC",
      "img_url": "https://example.com/trip1.jpg",
      "num_days": 5,
      "start_date": "2023-11-01",
      "end_date": "2023-11-05",
      "total_cost": 2000.0
    }
    // More trips associated with the destination...
  ]
  ```

### Get All Destinations by Trip ID

Retrieve a list of all destinations associated with a specific trip.

- **URL**: `/trips-destinations/destinations/:trip_id`
- **Method**: `GET`
- **Controller Method**: `TripsDestinationsController.getAllDestinations`
- **Request Parameters**:
  - `trip_id` (string, required): ID of the trip to retrieve destinations for
- **Response**:

  Example response JSON object:

  ```json
  [
    {
      "id": 1,
      "destination": "New York City",
      "description": "The Big Apple",
      "city": "New York",
      "country": "USA",
      "img_url": "https://example.com/image1.jpg",
      "flag_img_url": "https://example.com/flag1.jpg"
    }
    // More destinations associated with the trip...
  ]
  ```

### Create Trip-Destination Association

Create a new association between a trip and a destination.

- **URL**: `/trips-destinations`
- **Method**: `POST`
- **Controller Method**: `TripsDestinationsController.createTripDestination`
- **Request Body**:
  - Trip-Destination association object
- **Response**:

  Example response JSON object:

  ```json
  {
    "message": "Trip-Destination association created successfully"
  }
  ```

---
