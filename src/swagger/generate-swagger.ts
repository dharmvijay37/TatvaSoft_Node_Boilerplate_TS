import fs from 'fs';

import swaggerJsdoc, { Options } from 'swagger-jsdoc';

(async () => {
  const components = {
    schemas: {
      errorResponseSchema: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          error: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
      },
      successResponseSchema: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
          data: {
            type: 'object',
            properties: {},
          },
        },
      },
    },
    responses: {
      AdminUnauthorizedError: {
        description: 'Access token is missing or invalid',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorResponseSchema',
            },
            examples: {
              ACCESS_TOKEN_INVALID: {
                value: {
                  code: 401,
                  error: 'UNAUTHORIZED',
                  message: 'Invalid authorization token',
                },
              },
              ACCESS_TOKEN_MISSING: {
                value: {
                  code: 401,
                  error: 'UNAUTHORIZED',
                  message: 'Authorization token required',
                },
              },
            },
          },
        },
      },
      AdminValidationError: {
        description: 'Request Validation error (Message will be changed as validation rules)',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorResponseSchema',
            },
            examples: {
              BAD_REQUEST: {
                value: {
                  code: 400,
                  error: 'BAD_REQUEST',
                  message: '"field" is required',
                },
              },
            },
          },
        },
      },
      iseError: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorResponseSchema',
            },
            examples: {
              ISE: {
                value: {
                  code: 500,
                  error: 'ISE',
                  message: 'Something went wrong.',
                },
              },
            },
          },
        },
      },
    },
  };

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'JetDevs APIs',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3001/',
          description: 'JetDevs Test',
        },
      ],
      components: {
        ...components,
        securitySchemes: {
          AdminAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    apis: ['src/**/*.routes.ts'],
  };

  const openapiSpecification = await swaggerJsdoc(options);
  await fs.writeFileSync('./src/swagger/api.json', JSON.stringify(openapiSpecification, null, 2));
})();
