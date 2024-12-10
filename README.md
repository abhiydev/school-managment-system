Here is the updated documentation with the new URL:

---

# School Management System API

The **School Management System API** allows users to manage schools by adding new schools and retrieving a list of schools sorted by their distance from a specified location.

---

## Features

- Add a new school with name, address, latitude, and longitude.
- List all schools sorted by proximity to a given latitude and longitude.

---

## Endpoints

### 1. Add School

**Endpoint:**  
`POST /schools`

**Headers:**  
| Key            | Value            |  
|-----------------|------------------|  
| Content-Type    | application/json |  

**Request Body (JSON):**  
```json
{
  "name": "Abhishek High School",
  "address": "123 Main Street, Indore",
  "latitude": 22.7196,
  "longitude": 75.8577
}
```

**Response:**  
On success, the API returns a JSON object with a success message and the `schoolId`.

---

### 2. List Schools

**Endpoint:**  
`GET /listSchools`

**Query Parameters:**  
| Key        | Value     | Description                          |  
|------------|-----------|--------------------------------------|  
| `latitude` | 22.7196   | Latitude of the user's location.     |  
| `longitude`| 75.8577   | Longitude of the user's location.    |  

**URL Example:**  
```
https://school-managment-system-production-9bc9.up.railway.app/listSchools?latitude=22.7196&longitude=75.8577
```

**Response:**  
The API returns a list of schools, each including the distance from the specified coordinates, sorted in ascending order of distance.

---

## Usage Guide

### Install and Run

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following configuration:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=<your_password>
   DB_PORT=3306
   DB_NAME=school_management
   ```

4. Start the server:
   ```bash
   npm start
   ```

   The server will run on `https://school-managment-system-production-9bc9.up.railway.app`.

---

## Testing with Postman

Import the following Postman collection to test the API:

```json
{
  "info": {
    "name": "School Management System",
    "description": "Collection to test the School Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Add School",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Abhishek High School\",\n  \"address\": \"123 Main Street, Indore\",\n  \"latitude\": 22.7196,\n  \"longitude\": 75.8577\n}"
        },
        "url": {
          "raw": "https://school-managment-system-production-9bc9.up.railway.app/schools",
          "protocol": "https",
          "host": ["school-managment-system-production-9bc9", "up", "railway", "app"],
          "path": ["schools"]
        }
      },
      "response": []
    },
    {
      "name": "List Schools",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "https://school-managment-system-production-9bc9.up.railway.app/listSchools?latitude=22.7196&longitude=75.8577",
          "protocol": "https",
          "host": ["school-managment-system-production-9bc9", "up", "railway", "app"],
          "path": ["listSchools"],
          "query": [
            {
              "key": "latitude",
              "value": "22.7196"
            },
            {
              "key": "longitude",
              "value": "75.8577"
            }
          ]
        }
      },
      "response": []
    }
  ]
}
```

1. Open Postman.
2. Click **Import** and paste the collection JSON above.
3. Use the endpoints to test the API.

---

## Notes

- The distance calculation uses the Haversine formula.
- Ensure the database is set up before running the application. The application creates the database and tables if they do not exist.

For any issues or contributions, please open a GitHub issue or pull request.

---

This should now use the updated production URL on Railway for testing and deployment!