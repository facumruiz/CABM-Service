import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentación de la API',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Servidor de desarrollo (Local)',
            },
            {
                url: `https://full-api-n6zo.onrender.com/`,
                description: 'Servidor de desarrollo (Producción)',
            },
        ],
        tags: [
            {
                name: 'User',
                description: 'Operaciones relacionadas con usuarios',
            },
            {
                name: 'Record',
                description: 'Operaciones relacionadas con registros',
            },
            {
                name: 'Bebidas',
                description: 'Operaciones relacionadas con bebidas',
            },
            {
                name: 'MenuItems',
                description: 'Operaciones relacionadas con ítems del menú',
            },
            {
                name: 'Planificaciones',
                description: 'Operaciones relacionadas con la planificación de menús',
            },
        ],
        components: {
            schemas: {
                Record: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Nombre del registro',
                        },
                        position: {
                            type: 'string',
                            description: 'Posición del registro',
                        },
                        level: {
                            type: 'string',
                            enum: ['Junior', 'Mid', 'Senior'],
                            description: 'Nivel del registro',
                        },
                    },
                    required: ['name', 'position', 'level'],
                },
                User: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Nombre del usuario',
                        },
                        email: {
                            type: 'string',
                            description: 'Correo electrónico del usuario',
                        },
                        password: {
                            type: 'string',
                            description: 'Contraseña del usuario',
                        },
                    },
                    required: ['name', 'email', 'password'],
                },
                Bebida: {
                    type: 'object',
                    properties: {
                        nombre: {
                            type: 'string',
                            description: 'Nombre de la bebida',
                        },
                        foto: {
                            type: 'string',
                            description: 'URL de la foto de la bebida',
                        },
                        variedad: {
                            type: 'string',
                            description: 'Variedad de la bebida',
                        },
                        cosecha: {
                            type: 'string',
                            description: 'Cosecha de la bebida',
                        },
                        region: {
                            type: 'string',
                            description: 'Región de origen de la bebida',
                        },
                        elaboracion: {
                            type: 'string',
                            description: 'Método de elaboración de la bebida',
                        },
                        publicaPrecio: {
                            type: 'boolean',
                            description: 'Indica si el precio es público',
                            default: false,
                        },
                        precio: {
                            type: 'number',
                            description: 'Precio de la bebida',
                        },
                        otrasPropiedades: {
                            type: 'string',
                            description: 'Otras propiedades de la bebida',
                        },
                        disponibilidad: {
                            type: 'boolean',
                            description: 'Indica si la bebida está disponible',
                            default: true,
                        },
                        orden: {
                            type: 'number',
                            description: 'Orden de presentación de la bebida',
                        },
                    },
                    required: ['nombre'],
                    example: {
                        nombre: 'Vino Tinto',
                        foto: 'http://example.com/vino_tinto.jpg',
                        variedad: 'Cabernet Sauvignon',
                        cosecha: '2020',
                        region: 'Mendoza',
                        elaboracion: 'Fermentación en barrica',
                        publicaPrecio: true,
                        precio: 1500,
                        otrasPropiedades: 'Apto para celiacos',
                        disponibilidad: true,
                        orden: 1,
                    },
                },
                MenuItem: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID único del ítem del menú',
                        },
                        nombre: {
                            type: 'string',
                            description: 'Nombre del ítem del menú',
                        },
                        descripcion: {
                            type: 'string',
                            description: 'Descripción del ítem del menú',
                        },
                        precio: {
                            type: 'number',
                            description: 'Precio del ítem del menú',
                        },
                    },
                    required: ['nombre', 'descripcion', 'precio'],
                },
                PlanificacionMenu: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID único de la planificación',
                        },
                        fecha: {
                            type: 'string',
                            format: 'date',
                            description: 'Fecha de la planificación',
                        },
                        items: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/MenuItem',
                            },
                            description: 'Lista de ítems del menú planificados',
                        },
                    },
                    required: ['fecha', 'items'],
                },
            },
        },
    },
    apis: [
        './routes/recordRoutes.js',
        './routes/userRoutes.js',
        './routes/cabm/bebidaRoutes.js',
        './routes/cabm/menuItemRoutes.js',
        './routes/cabm/planificacionMenuRoutes.js'
    ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
