import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Determine the correct file extension and path based on environment
const isProduction = process.env.NODE_ENV === 'production';
const fileExtension = isProduction ? 'js' : 'ts';
const basePath = isProduction ? './dist' : './src';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'City School Management API',
            version: '1.0.0',
            description: 'Enterprise-grade RESTful API for multi-tenant school management system',
            contact: {
                name: 'City School Development Team',
                email: 'dev@cityschool.com'
            },
            license: {
                name: 'Private',
                url: '#'
            }
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production'
                    ? 'https://city-school-backend.onrender.com'
                    : 'http://localhost:5000',
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'token',
                    description: 'JWT token stored in httpOnly cookie'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'User ID'
                        },
                        name: {
                            type: 'string',
                            description: 'User full name'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address'
                        },
                        role: {
                            type: 'string',
                            enum: ['super-admin', 'school-admin', 'teacher', 'student', 'parent'],
                            description: 'User role'
                        },
                        tenantId: {
                            type: 'string',
                            description: 'School/Tenant ID'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        error: {
                            type: 'string',
                            description: 'Error message'
                        }
                    }
                },
                Success: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        data: {
                            type: 'object',
                            description: 'Response data'
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Health',
                description: 'Health check endpoints'
            },
            {
                name: 'Authentication',
                description: 'User authentication and authorization'
            }
        ]
    },
    apis: [
        `${basePath}/routes/**/*.${fileExtension}`,
        `${basePath}/controllers/**/*.${fileExtension}`
    ]
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
