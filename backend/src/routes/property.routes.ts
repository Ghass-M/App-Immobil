import { FastifyInstance } from 'fastify';
import { PropertyService } from '../services/property.service';
import {
  createPropertySchema,
  updatePropertySchema,
  propertyIdSchema,
  propertyFiltersSchema,
} from '../schemas/property.schema';

export async function propertyRoutes(fastify: FastifyInstance) {
  const propertyService = new PropertyService();
  
  // GET /api/properties - Liste toutes les propriétés (avec filtres et pagination)
  fastify.get('/', async (request, reply) => {
    try {
      const filters = propertyFiltersSchema.parse(request.query);
      
      const { page = 1, limit = 10, ...filterParams } = filters;
      
      const result = await propertyService.getAllProperties(
        filterParams,
        page,
        limit
      );
      
      return reply.code(200).send({
        success: true,
        ...result,
      });
    } catch (error: any) {
      return reply.code(400).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  // GET /api/properties/:id - Récupère une propriété par ID
  fastify.get('/:id', async (request, reply) => {
    try {
      const { id } = propertyIdSchema.parse(request.params);
      
      const property = await propertyService.getPropertyById(id);
      
      return reply.code(200).send({
        success: true,
        data: property,
      });
    } catch (error: any) {
      const statusCode = error.message === 'Propriété non trouvée' ? 404 : 400;
      return reply.code(statusCode).send({
        success: false,
        error: error.message,
      });
    }
  });
  
  // POST /api/properties - Crée une nouvelle propriété
  fastify.post('/', async (request, reply) => {
    try {
      const data = createPropertySchema.parse(request.body);
      
      const property = await propertyService.createProperty(data);
      
      return reply.code(201).send({
        success: true,
        data: property,
        message: 'Propriété créée avec succès',
      });
    } catch (error: any) {
      return reply.code(400).send({
        success: false,
        error: error.message,
        details: error.issues || null,
      });
    }
  });
  
  // PUT /api/properties/:id - Met à jour une propriété
  fastify.put('/:id', async (request, reply) => {
    try {
      const { id } = propertyIdSchema.parse(request.params);
      const data = updatePropertySchema.parse(request.body);
      
      const property = await propertyService.updateProperty(id, data);
      
      return reply.code(200).send({
        success: true,
        data: property,
        message: 'Propriété mise à jour avec succès',
      });
    } catch (error: any) {
      const statusCode = error.message === 'Propriété non trouvée' ? 404 : 400;
      return reply.code(statusCode).send({
        success: false,
        error: error.message,
        details: error.issues || null,
      });
    }
  });
  
  // DELETE /api/properties/:id - Supprime une propriété
  fastify.delete('/:id', async (request, reply) => {
    try {
      const { id } = propertyIdSchema.parse(request.params);
      
      await propertyService.deleteProperty(id);
      
      return reply.code(200).send({
        success: true,
        message: 'Propriété supprimée avec succès',
      });
    } catch (error: any) {
      const statusCode = error.message === 'Propriété non trouvée' ? 404 : 400;
      return reply.code(statusCode).send({
        success: false,
        error: error.message,
      });
    }
  });
}