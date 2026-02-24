/**
 * URL base de nuestra API simulada por JSON Server
 */
const API_URL = 'http://localhost:3000/attractions';

/**
 * Servicio encargado de las peticiones HTTP (CRUD) para las atracciones
 */
const attractionService = {
    /**
     * Obtiene la lista completa de todas las atracciones (GET)
     */
    async getAll() {
        try {
            const response = await fetch(API_URL);
            return await response.json();
        } catch (error) {
            console.error('Error fetching attractions:', error);
            throw error;
        }
    },

    /**
     * Obtiene los detalles de una atracción específica por su ID (GET)
     */
    async getById(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            return await response.json();
        } catch (error) {
            console.error(`Error fetching attraction ${id}:`, error);
            throw error;
        }
    },

    /**
     * Registra una nueva atracción en el sistema (POST)
     */
    async create(attraction) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(attraction)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating attraction:', error);
            throw error;
        }
    },

    /**
     * Actualiza la información de una atracción existente (PUT)
     */
    async update(id, attraction) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(attraction)
            });
            return await response.json();
        } catch (error) {
            console.error(`Error updating attraction ${id}:`, error);
            throw error;
        }
    },

    /**
     * Elimina una atracción del sistema (DELETE)
     */
    async delete(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.error(`Error deleting attraction ${id}:`, error);
            throw error;
        }
    }
};
