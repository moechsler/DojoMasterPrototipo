// Datos de ejemplo para profesores
let teachers = [
    { id: 1, firstName: 'Juan', lastName: 'Pérez', email: 'juan.perez@example.com', phone: '1234567890', academy: 'Dojo Central', belt: 'Negro', grade: 5 },
    { id: 2, firstName: 'María', lastName: 'González', email: 'maria.gonzalez@example.com', phone: '2345678901', academy: 'Dojo Norte', belt: 'Marrón', grade: 3 },
    { id: 3, firstName: 'Carlos', lastName: 'Rodríguez', email: 'carlos.rodriguez@example.com', phone: '3456789012', academy: 'Dojo Sur', belt: 'Negro', grade: 4 },
  ];
  
  // Función para cargar los profesores en la tabla
  function loadTeachers() {
    const tableBody = document.getElementById('teachersTableBody');
    tableBody.innerHTML = '';
    teachers.forEach(teacher => {
      const row = `
        <tr>
          <td>${teacher.id}</td>
          <td><a href="#" onclick="openTeacherDetails(${teacher.id})">${teacher.firstName} ${teacher.lastName}</a></td>
          <td>${teacher.email}</td>
          <td>${teacher.phone}</td>
          <td>${teacher.academy}</td>
          <td>${teacher.belt}</td>
          <td>${teacher.grade}</td>
          <td>
            <button class="btn btn-sm btn-info" onclick="editTeacher(${teacher.id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteTeacher(${teacher.id})">Eliminar</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }
  
  // Función para abrir el modal de agregar profesor
  function openAddTeacherModal() {
    document.getElementById('teacherModalTitle').textContent = 'Agregar Nuevo Profesor';
    document.getElementById('teacherForm').reset();
    document.getElementById('teacherId').value = '';
    $('#teacherModal').modal('show');
  }
  
  // Función para editar un profesor
  function editTeacher(id) {
    const teacher = teachers.find(t => t.id === id);
    if (teacher) {
      document.getElementById('teacherModalTitle').textContent = 'Editar Profesor';
      document.getElementById('teacherId').value = teacher.id;
      document.getElementById('firstName').value = teacher.firstName;
      document.getElementById('lastName').value = teacher.lastName;
      document.getElementById('email').value = teacher.email;
      document.getElementById('phone').value = teacher.phone;
      document.getElementById('academy').value = teacher.academy;
      document.getElementById('belt').value = teacher.belt;
      document.getElementById('grade').value = teacher.grade;
      $('#teacherModal').modal('show');
    }
  }
  
  // Función para guardar un profesor
  function saveTeacher() {
    const id = document.getElementById('teacherId').value;
    const teacher = {
      id: id ? parseInt(id) : teachers.length + 1,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      academy: document.getElementById('academy').value,
      belt: document.getElementById('belt').value,
      grade: parseInt(document.getElementById('grade').value)
    };
  
    if (id) {
      const index = teachers.findIndex(t => t.id === parseInt(id));
      teachers[index] = teacher;
    } else {
      teachers.push(teacher);
    }
  
    loadTeachers();
    $('#teacherModal').modal('hide');
  }
  
  // Función para eliminar un profesor
  function deleteTeacher(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este profesor?')) {
      teachers = teachers.filter(t => t.id !== id);
      loadTeachers();
    }
  }
  
  // Función para abrir los detalles de un profesor
  function openTeacherDetails(id) {
    const teacher = teachers.find(t => t.id === id);
    if (teacher) {
      document.getElementById('teacherName').textContent = `${teacher.firstName} ${teacher.lastName}`;
      document.getElementById('teacherEmail').textContent = teacher.email;
      document.getElementById('teacherPhone').textContent = teacher.phone;
      document.getElementById('teacherAcademy').textContent = teacher.academy;
      document.getElementById('teacherBelt').textContent = teacher.belt;
      document.getElementById('teacherGrade').textContent = teacher.grade;
      $('#teacherDetailsModal').modal('show');
    }
  }
  
  // Cargar los profesores cuando el documento esté listo
  document.addEventListener('DOMContentLoaded', loadTeachers);