import { PropertyModel } from '../models/property.model';
import { Property, CreatePropertyDTO, UpdatePropertyDTO, PropertyFilters } from '../types/property.types';

export class PropertyService {
  private propertyModel: PropertyModel;
  
  constructor() {
    this.propertyModel = new PropertyModel();
  }
  
  async getAllProperties(filters?: PropertyFilters, page = 1, limit = 10) {
    const { properties, total } = await this.propertyModel.findAll(filters, page, limit);
    
    return {
      data: properties,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  
  async getPropertyById(id: number): Promise<Property> {
    const property = await this.propertyModel.findById(id);
    
    if (!property) {
      throw new Error('Propriété non trouvée');
    }
    
    return property;
  }
  
  async createProperty(data: CreatePropertyDTO): Promise<Property> {
    // Validation métier supplémentaire si nécessaire
    if (data.bedrooms > data.rooms) {
      throw new Error('Le nombre de chambres ne peut pas dépasser le nombre de pièces');
    }
    
    return await this.propertyModel.create(data);
  }
  
  async updateProperty(id: number, data: UpdatePropertyDTO): Promise<Property> {
    // Vérifier que la propriété existe
    await this.getPropertyById(id);
    
    // Validation métier
    if (data.bedrooms && data.rooms && data.bedrooms > data.rooms) {
      throw new Error('Le nombre de chambres ne peut pas dépasser le nombre de pièces');
    }
    
    const updatedProperty = await this.propertyModel.update(id, data);
    
    if (!updatedProperty) {
      throw new Error('Erreur lors de la mise à jour');
    }
    
    return updatedProperty;
  }
  
  async deleteProperty(id: number): Promise<void> {
    // Vérifier que la propriété existe
    await this.getPropertyById(id);
    
    const deleted = await this.propertyModel.delete(id);
    
    if (!deleted) {
      throw new Error('Erreur lors de la suppression');
    }
  }
}