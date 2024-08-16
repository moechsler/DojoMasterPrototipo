// Datos dummy para prospectos
let prospects = [
    { id: 1, name: "Juan Pérez", phone: "1234567890", email: "juan@example.com", contactDate: "2023-05-01", status: "Nuevo" },
    { id: 2, name: "María García", phone: "0987654321", email: "maria@example.com", contactDate: "2023-05-02", status: "Contactado" },
    { id: 3, name: "Carlos Rodríguez", phone: "5555555555", email: "carlos@example.com", contactDate: "2023-05-03", status: "En seguimiento" }
  ];
  
  // Función para cargar los prospectos en la tabla
  function loadProspects() {
    const tableBody = document.querySelector('#prospectsTable tbody');
    tableBody.innerHTML = '';
    prospects.forEach(prospect => {
      const row = `
        <tr>
          <td>${prospect.name}</td>
          <td>${prospect.phone}</td>
          <td>${prospect.email}</td>
          <td>${prospect.contactDate}</td>
          <td>${prospect.status}</td>
          <td>
            <button class="btn btn-info btn-sm" onclick="viewProspectDetails(${prospect.id})">Ver</button>
            <button class="btn btn-primary btn-sm" onclick="editProspect(${prospect.id})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deleteProspect(${prospect.id})">Eliminar</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }
  
  // Función para abrir el modal de agregar prospecto
  function openAddProspectModal() {
    document.getElementById('prospectModalTitle').textContent = 'Agregar Nuevo Prospecto';
    document.getElementById('prospectForm').reset();
    document.getElementById('prospectId').value = '';
    $('#prospectModal').modal('show');
  }
  
  // Función para guardar un prospecto (nuevo o editado)
  function saveProspect() {
    const id = document.getElementById('prospectId').value;
    const prospect = {
      id: id ? parseInt(id) : prospects.length + 1,
      name: document.getElementById('prospectName').value,
      phone: document.getElementById('prospectPhone').value,
      email: document.getElementById('prospectEmail').value,
      contactDate: document.getElementById('prospectContactDate').value,
      status: document.getElementById('prospectStatus').value
    };
  
    if (id) {
      const index = prospects.findIndex(p => p.id === parseInt(id));
      prospects[index] = prospect;
    } else {
      prospects.push(prospect);
    }
  
    loadProspects();
    $('#prospectModal').modal('hide');
  }
  
  // Función para editar un prospecto
  function editProspect(id) {
    const prospect = prospects.find(p => p.id === id);
    if (prospect) {
      document.getElementById('prospectModalTitle').textContent = 'Editar Prospecto';
      document.getElementById('prospectId').value = prospect.id;
      document.getElementById('prospectName').value = prospect.name;
      document.getElementById('prospectPhone').value = prospect.phone;
      document.getElementById('prospectEmail').value = prospect.email;
      document.getElementById('prospectContactDate').value = prospect.contactDate;
      document.getElementById('prospectStatus').value = prospect.status;
      $('#prospectModal').modal('show');
    }
  }
  
  // Función para eliminar un prospecto
  function deleteProspect(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este prospecto?')) {
      prospects = prospects.filter(p => p.id !== id);
      loadProspects();
    }
  }
  
  // Función para ver los detalles de un prospecto
  function viewProspectDetails(id) {
    const prospect = prospects.find(p => p.id === id);
    if (prospect) {
      document.getElementById('detailProspectName').textContent = prospect.name;
      document.getElementById('detailProspectPhone').textContent = prospect.phone;
      document.getElementById('detailProspectEmail').textContent = prospect.email;
      document.getElementById('detailProspectContactDate').textContent = prospect.contactDate;
      document.getElementById('detailProspectStatus').textContent = prospect.status;
      
      // Aquí podrías cargar las notas del prospecto si las tuvieras
      document.getElementById('prospectNotes').innerHTML = '<p>No hay notas disponibles.</p>';
      
      $('#prospectDetailsModal').modal('show');
    }
  }
  
  // Función para agregar una nota (simulada)
  function addNote() {
    const noteText = document.getElementById('newNote').value;
    if (noteText.trim() !== '') {
      const noteElement = document.createElement('p');
      noteElement.textContent = noteText;
      document.getElementById('prospectNotes').appendChild(noteElement);
      document.getElementById('newNote').value = '';
    }
  }
  
  // Cargar los prospectos cuando el documento esté listo
  document.addEventListener('DOMContentLoaded', loadProspects);