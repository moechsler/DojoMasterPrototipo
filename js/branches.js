// Datos de ejemplo de las sedes
let branches = [
    { id: 1, name: "Sede Central", address: "Calle Principal 123, Ciudad Ejemplo", phone: "+1 234 567 890", capacity: 100, mainInstructor: "Juan Pérez" },
    { id: 2, name: "Sede Norte", address: "Avenida Norte 456, Ciudad Ejemplo", phone: "+1 234 567 891", capacity: 75, mainInstructor: "María García" },
    { id: 3, name: "Sede Sur", address: "Boulevard Sur 789, Ciudad Ejemplo", phone: "+1 234 567 892", capacity: 50, mainInstructor: "Carlos Rodríguez" }
];

// Función para cargar las sedes en la tabla
function loadBranches() {
    const tableBody = document.getElementById('branchesTableBody');
    tableBody.innerHTML = '';
    branches.forEach(branch => {
        const row = `
            <tr>
                <td>${branch.id}</td>
                <td>${branch.name}</td>
                <td>${branch.address}</td>
                <td>${branch.phone}</td>
                <td>${branch.capacity}</td>
                <td>${branch.mainInstructor}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="editBranch(${branch.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteBranch(${branch.id})">Eliminar</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Función para abrir el modal de agregar sede
function openAddBranchModal() {
    document.getElementById('branchModalTitle').textContent = 'Agregar Nueva Sede';
    document.getElementById('branchForm').reset();
    document.getElementById('branchId').value = '';
    $('#branchModal').modal('show');
}

// Función para editar una sede
function editBranch(id) {
    const branch = branches.find(b => b.id === id);
    if (branch) {
        document.getElementById('branchModalTitle').textContent = 'Editar Sede';
        document.getElementById('branchId').value = branch.id;
        document.getElementById('branchName').value = branch.name;
        document.getElementById('branchAddress').value = branch.address;
        document.getElementById('branchPhone').value = branch.phone;
        document.getElementById('branchCapacity').value = branch.capacity;
        document.getElementById('branchInstructor').value = branch.mainInstructor;
        $('#branchModal').modal('show');
    }
}

// Función para guardar una sede (nueva o editada)
function saveBranch() {
    const id = document.getElementById('branchId').value;
    const branch = {
        id: id ? parseInt(id) : branches.length + 1,
        name: document.getElementById('branchName').value,
        address: document.getElementById('branchAddress').value,
        phone: document.getElementById('branchPhone').value,
        capacity: parseInt(document.getElementById('branchCapacity').value),
        mainInstructor: document.getElementById('branchInstructor').value
    };

    if (id) {
        const index = branches.findIndex(b => b.id === parseInt(id));
        branches[index] = branch;
    } else {
        branches.push(branch);
    }

    loadBranches();
    $('#branchModal').modal('hide');
}

// Función para eliminar una sede
function deleteBranch(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta sede?')) {
        branches = branches.filter(b => b.id !== id);
        loadBranches();
    }
}

// Cargar las sedes cuando el documento esté listo
document.addEventListener('DOMContentLoaded', loadBranches);