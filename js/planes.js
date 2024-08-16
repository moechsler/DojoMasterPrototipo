// Datos de ejemplo de los planes
let planes = [
    { id: 1, name: "Plan Básico", description: "Acceso a clases básicas", duration: 1, price: 50.00, classesPerWeek: 2, status: "Activo" },
    { id: 2, name: "Plan Intermedio", description: "Acceso a clases intermedias y básicas", duration: 3, price: 120.00, classesPerWeek: 3, status: "Activo" },
    { id: 3, name: "Plan Avanzado", description: "Acceso a todas las clases", duration: 6, price: 200.00, classesPerWeek: 5, status: "Activo" }
];

// Función para cargar los planes en la tabla
function loadPlanes() {
    const tableBody = document.getElementById('planesTableBody');
    tableBody.innerHTML = '';
    planes.forEach(plan => {
        const row = `
            <tr>
                <td>${plan.id}</td>
                <td>${plan.name}</td>
                <td>${plan.description}</td>
                <td>${plan.duration}</td>
                <td>$${plan.price.toFixed(2)}</td>
                <td>${plan.classesPerWeek}</td>
                <td>${plan.status}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="editPlan(${plan.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deletePlan(${plan.id})">Eliminar</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Función para abrir el modal de agregar plan
function openAddPlanModal() {
    document.getElementById('planModalTitle').textContent = 'Agregar Nuevo Plan';
    document.getElementById('planForm').reset();
    document.getElementById('planId').value = '';
    $('#planModal').modal('show');
}

// Función para editar un plan
function editPlan(id) {
    const plan = planes.find(p => p.id === id);
    if (plan) {
        document.getElementById('planModalTitle').textContent = 'Editar Plan';
        document.getElementById('planId').value = plan.id;
        document.getElementById('planName').value = plan.name;
        document.getElementById('planDescription').value = plan.description;
        document.getElementById('planDuration').value = plan.duration;
        document.getElementById('planPrice').value = plan.price;
        document.getElementById('planClasses').value = plan.classesPerWeek;
        document.getElementById('planStatus').value = plan.status;
        $('#planModal').modal('show');
    }
}

// Función para guardar un plan (nuevo o editado)
function savePlan() {
    const id = document.getElementById('planId').value;
    const plan = {
        id: id ? parseInt(id) : planes.length + 1,
        name: document.getElementById('planName').value,
        description: document.getElementById('planDescription').value,
        duration: parseInt(document.getElementById('planDuration').value),
        price: parseFloat(document.getElementById('planPrice').value),
        classesPerWeek: parseInt(document.getElementById('planClasses').value),
        status: document.getElementById('planStatus').value
    };

    if (id) {
        const index = planes.findIndex(p => p.id === parseInt(id));
        planes[index] = plan;
    } else {
        planes.push(plan);
    }

    loadPlanes();
    $('#planModal').modal('hide');
}

// Función para eliminar un plan
function deletePlan(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este plan?')) {
        planes = planes.filter(p => p.id !== id);
        loadPlanes();
    }
}

// Cargar los planes cuando el documento esté listo
document.addEventListener('DOMContentLoaded', loadPlanes);