# Documentation
Information about this project and description of available endpoints

1. Requirements:
    - `node (>8.6 and <= 10)` and `npm` are installed
2. Installation:
    - Run `npm install`
3. Launching the project:
    - Run `npm start`
4. open app http://localhost:8010 in browser
5. open swagger documentation http://localhost:8010/swagger-docs in browser

## Purpose
Application that allows checking and managing information about rides of passengers

## API Endpoints

### GET /health
Provides server status

#### Response
```
headers:
  content-type: text/html
    
body: "Healthy"
```


### GET /rides
This endpoint returns information about all rides  
Data can be retrieved in chunks for pagination

#### Request
```
query:
  page: Number                  – pagination page
  limit: Number                 – number of rides per page
```

#### Response
```
headers:
  content-type: application/json

body: {
  count: Number                 – total number of rides
  rows: [                       – matched rides
    {
      rideID: Number            – id
      startLat: Number          – start lattitude
      startLong: Number         – start longitude
      endLat: Number            – end lattitude
      endLong: Number           – end longitude
      riderName: String         – rider name
      driverName: String        – driver name
      driverVehicle: String     – driver vehicle name
      created: String           – creation timestamp ("YYYY-MM-DD HH:MM:SS" format)
    }
    ...
  ]
}
```

### GET /rides/:id
This endpoint returns information about a particular ride

#### Request
```
params:
  id: String                    – ride id
```

#### Response
```
headers:
  content-type: application/json

body: {
  rideID: Number                – id
  startLat: Number              – start lattitude
  startLong: Number             – start longitude
  endLat: Number                – end lattitude
  endLong: Number               – end longitude
  riderName: String             – rider name
  driverName: String            – driver name
  driverVehicle: String         – driver vehicle name
  created: String               – creation timestamp ("YYYY-MM-DD HH:MM:SS" format)
}
```

### POST /rides
This endpoint saves information about new ride

#### Request
```
headers:
  content-type: application/json

body: {
  start_lat: Number             – start lattitude
  start_long: Number            – start longitude
  end_lat: Number               – end lattitude
  end_long: Number              – end longitude
  rider_name: String            – rider name
  driver_name: String           – driver name
  driver_vehicle: String        – driver vehicle name
}
```

#### Response
```
headers:
  content-type: application/json

body: {
  rideID: Number                – id
  startLat: Number              – start lattitude
  startLong: Number             – start longitude
  endLat: Number                – end lattitude
  endLong: Number               – end longitude
  riderName: String             – rider name
  driverName: String            – driver name
  driverVehicle: String         – driver vehicle name
  created: String               – creation timestamp ("YYYY-MM-DD HH:MM:SS" format)
}
```
