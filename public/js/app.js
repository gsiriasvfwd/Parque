/**
 * Lógica principal del Frontend para interactuar con el DOM y los servicios
 */

import {getAttractions,postAttractions,updateAttractions,deleteAttractions} from "../services/services.js";


document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const attractionForm = document.getElementById('attraction-form');
    const attractionsTbody = document.getElementById('attractions-tbody');
    const totalBadge = document.getElementById('total-attractions');
    const cancelBtn = document.getElementById('cancel-btn');
    const submitBtn = document.getElementById('submit-btn');
    const formTitle = document.getElementById('form-title');

    // Estado local para saber si estamos editando o creando
    let isEditing = false;

    // Carga inicial de datos al abrir la página
    loadAttractions();

    // Eventos de usuario
    attractionForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', resetForm);


    //Función para cargar y mostrar las atracciones desde la API
    async function loadAttractions() {
        try {
            const attractions = await getAttractions();
            renderAttractions(attractions);
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar las atracciones', 'error');
        }
    }

    /**
     * Renderiza las filas de la tabla dinámicamente
     * @param {Array} attractions - Lista de objetos de atracción
     */
    function renderAttractions(attractions) {
        attractionsTbody.innerHTML = '';
        totalBadge.textContent = `${attractions.length} atracciones`;

        attractions.forEach(attr => {
            const tr = document.createElement('tr');

            // Determinar color del badge según el estado
            const statusClass = attr.estado === 'activa' ? 'status-activa' :
                (attr.estado === 'en mantenimiento' ? 'status-mantenimiento' : 'status-fuera');

            // Asegurar que tengan unidades si el usuario las olvidó
            const altura = attr.alturaMinima.toString().includes('m') ? attr.alturaMinima : `${attr.alturaMinima}m`;
            const espera = attr.tiempoEspera.toString().includes('min') ? attr.tiempoEspera : `${attr.tiempoEspera} min`;

            tr.innerHTML = `
                <td><strong>${attr.nombre}</strong></td>
                <td>${attr.categoria}</td>
                <td><span class="status-badge ${statusClass}">${attr.estado}</span></td>
                <td>${altura}</td>
                <td>${espera}</td>
                <td class="actions-cell">
                    <button class="btn btn-outline-primary btn-sm" title="Editar" onclick="editAttraction('${attr.id}')">✏️</button>
                    <button class="btn btn-outline-danger btn-sm" title="Eliminar" onclick="deleteAttraction('${attr.id}')">🗑️</button>
                </td>
            `;
            attractionsTbody.appendChild(tr);
        });
    }

    /**
     * Maneja el envío del formulario para crear o actualizar
     */
    async function handleFormSubmit(e) {
        e.preventDefault();

        // Recolectar datos del formulario
        const attractionData = {
            nombre: document.getElementById('nombre').value,
            categoria: document.getElementById('categoria').value,
            estado: document.getElementById('estado').value,
            alturaMinima: document.getElementById('alturaMinima').value,
            tiempoEspera: document.getElementById('tiempoEspera').value
        };

        const id = document.getElementById('attraction-id').value;

        try {
            if (isEditing) {
                // Si estamos en modo edición, llamar a PUT
                await updateAttractions(id, attractionData);
                Swal.fire('¡Actualizado!', 'Atracción modificada correctamente', 'success');
            } else {
                // Si no, llamar a POST para crear
                await postAttractions(attractionData);
                Swal.fire('¡Registrado!', 'Nueva atracción agregada', 'success');
            }
            // Limpiar y refrescar
            resetForm();
            loadAttractions();
        } catch (error) {
            Swal.fire('Error', 'No se pudo procesar la solicitud', 'error');
        }
    }

    /**
     * Carga los datos de una atracción en el formulario para su edición
     */
    window.editAttraction = async (id) => {
        try {
            const attr = await attractionService.getById(id);

            // Llenar los campos del formulario
            document.getElementById('attraction-id').value = attr.id;
            document.getElementById('nombre').value = attr.nombre;
            document.getElementById('categoria').value = attr.categoria;
            document.getElementById('estado').value = attr.estado;
            document.getElementById('alturaMinima').value = attr.alturaMinima;
            document.getElementById('tiempoEspera').value = attr.tiempoEspera;

            // Cambiar la interfaz al modo edición
            isEditing = true;
            formTitle.textContent = 'Editar Atracción';
            submitBtn.textContent = 'Actualizar Cambios';
            cancelBtn.classList.remove('hidden');

            // Subir al formulario suavemente
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            Swal.fire('Error', 'No se pudo cargar la información', 'error');
        }
    };

    /**
     * Solicita confirmación y elimina una atracción
     */
    window.deleteAttraction = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar atracción?',
            text: "Esta acción borrará el registro de forma permanente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6366f1',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteAttractions(id);
                Swal.fire('¡Eliminado!', 'El registro ha sido borrado', 'success');
                loadAttractions();
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar la atracción', 'error');
            }
        }
    };

    /**
     * Limpia el formulario y vuelve al estado de creación
     */
    function resetForm() {
        attractionForm.reset();
        document.getElementById('attraction-id').value = '';
        isEditing = false;
        formTitle.textContent = 'Registrar Nueva Atracción';
        submitBtn.textContent = 'Guardar Atracción';
        cancelBtn.classList.add('hidden');
    }
});
