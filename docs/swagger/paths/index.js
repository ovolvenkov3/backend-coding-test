module.exports = {
  paths: {
    '/rides': {
      get: {
        tags: ['Rides API endpoints'],
        description: 'GET page of Rides',
        summary: 'GET page of Rides',
        operationId: 'getAllRides',
        parameters: [
          {
            name: 'offset',
            description: 'Number of row to start page with',
            in: 'query',
            schema: {
              type: 'number',
              minValue: 0,
            },
            required: false,
            default: 0,
          },
          {
            name: 'limit',
            description: 'Size of the response page',
            in: 'query',
            schema: {
              type: 'number',
              minValue: 1,
            },
            required: false,
            default: 10,
          },
        ],
        responses: {
          200: {
            description: 'Successful response with data',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/RideResponse',
                  },
                },
              },
            },
          },
          404: {
            description: 'Error response when no data was found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                examples: {
                  missingRides: {
                    $ref: '#/components/examples/missingRides',
                  },
                },
              },
            },
          },
          500: {
            description: 'Error response when something went wrong on the server',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                examples: {
                  serverError: {
                    $ref: '#/components/examples/serverError',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Rides API endpoints'],
        description: 'Save new ride',
        summary: 'Save new ride',
        operationId: 'saveNewRide',
        requestBody: {
          description: 'Data to save as a new Ride',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RideRequest',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Entity that has been saved in the DB',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RideResponse',
                },
              },
            },
          },
          400: {
            description: 'Data has incorrect values',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                examples: {
                  validationMissingStartLat: {
                    $ref: '#/components/examples/validationMissingStartLat',
                  },
                  validationMissingRider: {
                    $ref: '#/components/examples/validationMissingRider',
                  },
                },
              },
            },
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                examples: {
                  serverError: {
                    $ref: '#/components/examples/serverError',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/rides/{id}': {
      get: {
        tags: ['Rides API endpoints'],
        description: 'GET Ride by ID',
        summary: 'GET Ride by ID',
        operationId: 'getRideById',
        parameters: [
          {
            name: 'id',
            description: 'ID of a Ride to fetch',
            in: 'path',
            schema: {
              type: 'number',
              minValue: 1,
            },
            required: true,
            example: 1,
          },
        ],
        responses: {
          200: {
            description: 'Successful response with data',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RideResponse',
                },
              },
            },
          },
          404: {
            description: 'Error response when Ride with provided ID was not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                examples: {
                  missingRides: {
                    $ref: '#/components/examples/missingRides',
                  },
                },
              },
            },
          },
          500: {
            description: 'Error response when something went wrong on the server',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                examples: {
                  serverError: {
                    $ref: '#/components/examples/serverError',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/health': {
      get: {
        tags: ['Status API endpoints'],
        description: 'Provides server status',
        summary: 'Provides server status',
        operationId: 'health',
        responses: {
          200: {
            description: 'Indicates that server is up and running',
            content: {
              'text/html': {
                schema: {
                  type: 'string',
                  example: 'Healthy',
                },
              },
            },
          },
        },
      },
    },
  },
};
