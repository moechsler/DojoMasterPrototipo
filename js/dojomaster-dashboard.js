
let tutors = [
    { id: 1, firstName: 'Carlos', lastName: 'Rodríguez', email: 'carlos.rodriguez@example.com', phone: '1234567890', students: [1, 3, 5] },
    { id: 2, firstName: 'Ana', lastName: 'Martínez', email: 'ana.martinez@example.com', phone: '2345678901', students: [2, 4] },
    { id: 3, firstName: 'Luis', lastName: 'González', email: 'luis.gonzalez@example.com', phone: '3456789012', students: [6, 7] },

  ];
  
  let students = [
    { id: 1, firstName: 'Juan', lastName: 'Pérez', email: 'juan.perez@example.com', tutorId: 1 },
    { id: 2, firstName: 'María', lastName: 'García', email: 'maria.garcia@example.com', tutorId: 2 },
    { id: 3, firstName: 'Pedro', lastName: 'López', email: 'pedro.lopez@example.com', tutorId: 1 },
    { id: 4, firstName: 'Sofía', lastName: 'Martín', email: 'sofia.martin@example.com', tutorId: 2 },
    { id: 5, firstName: 'Diego', lastName: 'Hernández', email: 'diego.hernandez@example.com', tutorId: 1 },
    { id: 6, firstName: 'Lucía', lastName: 'Díaz', email: 'lucia.diaz@example.com', tutorId: 3 },
    { id: 7, firstName: 'Pablo', lastName: 'Ruiz', email: 'pablo.ruiz@example.com', tutorId: 3 },


  ];


  // Coloca los arreglos tutors y students aquí, al inicio del archivo

  function loadTutors() {
    console.log("Cargando tutores...");
    const tableBody = document.getElementById('tutorsTableBody');
    if (!tableBody) {
      console.error("No se encontró el elemento con id 'tutorsTableBody'");
      return;
    }
    tableBody.innerHTML = '';
    tutors.forEach(tutor => {
      console.log("Procesando tutor:", tutor);
      const row = `
        <tr>
          <td>${tutor.id}</td>
          <td><a href="#" onclick="openTutorDetails(${tutor.id})">${tutor.firstName} ${tutor.lastName}</a></td>
          <td>${tutor.email}</td>
          <td>${tutor.phone}</td>
          <td>${tutor.students.length}</td>
          <td>
            <button class="btn btn-sm btn-info" onclick="editTutor(${tutor.id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteTutor(${tutor.id})">Eliminar</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
    console.log("Tutores cargados.");
  }
  
  // Asegúrate de llamar a esta función cuando se cargue la página
  document.addEventListener('DOMContentLoaded', loadTutors);


// dojomaster-dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    // Gráfico de Cinturones
    var ctxCinturones = document.getElementById('cinturonesChart').getContext('2d');
    var cinturonesChart = new Chart(ctxCinturones, {
        type: 'pie',
        data: {
            labels: ['Blanco', 'Amarillo', 'Naranja', 'Verde', 'Azul', 'Marrón', 'Negro'],
            datasets: [{
                data: [38, 20, 10, 15, 7, 5, 5],
                backgroundColor: ['#f8f9fa', '#ffc107', '#fd7e14', '#28a745', '#007bff', '#6c4516', '#343a40']
            }]
        }
    });

    // Gráfico de Estado de Pagos
    var ctxPagos = document.getElementById('pagosChart').getContext('2d');
    var pagosChart = new Chart(ctxPagos, {
        type: 'doughnut',
        data: {
            labels: ['Al día', 'Pendiente', 'Moroso'],
            datasets: [{
                data: [40, 8, 12],
                backgroundColor: ['#28a745', '#ffc107', '#dc3545']
            }]
        }
    });
});

$(document).ready(function() {
    $('#pagoModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var alumno = button.data('alumno');
        var estado = button.data('estado');
        var modal = $(this);
        
        modal.find('.modal-title').text('Comprobante de Pago - ' + alumno);
        modal.find('#modalAlumno').text(alumno);
        modal.find('#modalEstado').text(estado);
        
        // Establecer la fecha de hoy como predeterminada
        var today = new Date().toISOString().split('T')[0];
        modal.find('#modalFechaPago').val(today);
        
        if (estado === 'Moroso') {
            modal.find('#modalUltimoPago').text('Pago pendiente');
            modal.find('#modalMonto').val('100.00'); // Monto más alto para morosos
        } else if (estado === 'Pendiente') {
            modal.find('#modalUltimoPago').text('Próximo a vencer');
            modal.find('#modalMonto').val('50.00');
        } else {
            modal.find('#modalUltimoPago').text(today);
            modal.find('#modalMonto').val('50.00');
        }
    });

    $('#btnPagar').on('click', function() {
        var modal = $('#pagoModal');
        var alumno = modal.find('#modalAlumno').text();
        var monto = modal.find('#modalMonto').val();
        var fechaPago = modal.find('#modalFechaPago').val();
        
        // Aquí simularemos el proceso de pago
        alert('Pago registrado para ' + alumno + '\nMonto: $' + monto + '\nFecha: ' + fechaPago);
        
        // Actualizar el estado y el punto de color en la tabla
        var celdaEstadoPago = $('table').find('.alumno-nombre:contains("' + alumno + '")').siblings('.alumno-estado-pago');
        celdaEstadoPago.html('<span class="status-dot status-success"></span> <a href="#" data-toggle="modal" data-target="#pagoModal" data-estado="Al día" data-alumno="' + alumno + '">Al día</a>');

        // Añadir efecto visual
        celdaEstadoPago.addClass('bg-success');
        setTimeout(function() {
            celdaEstadoPago.removeClass('bg-success');
        }, 1000);
        
        // Cerrar el modal
        modal.modal('hide');
    });

    $('#cinturonModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var alumno = button.data('alumno');
        var cinturonActual = button.data('cinturon');
        var modal = $(this);
        
        modal.find('.modal-title').text('Actualizar Cinturón - ' + alumno);
        modal.find('#modalAlumnoCinturon').text(alumno);
        modal.find('#modalCinturonActual').text(cinturonActual);
        modal.find('#modalNuevoCinturon').val(cinturonActual);
        
        // Establecer la fecha de hoy como predeterminada
        var today = new Date().toISOString().split('T')[0];
        modal.find('#modalFechaActualizacion').val(today);
    });

    $('#btnActualizarCinturon').on('click', function() {
        var modal = $('#cinturonModal');
        var alumno = modal.find('#modalAlumnoCinturon').text();
        var nuevoCinturon = modal.find('#modalNuevoCinturon').val();
        var fechaActualizacion = modal.find('#modalFechaActualizacion').val();
        
        // Aquí simularemos el proceso de actualización
        alert('Cinturón actualizado para ' + alumno + '\nNuevo Cinturón: ' + nuevoCinturon + '\nFecha: ' + fechaActualizacion);
        
        // Actualizar el cinturón en la tabla
        var celdaCinturon = $('table').find('.alumno-nombre:contains("' + alumno + '")').siblings('.alumno-cinturon');
        celdaCinturon.html('<a href="#" data-toggle="modal" data-target="#cinturonModal" data-alumno="' + alumno + '" data-cinturon="' + nuevoCinturon + '">' + nuevoCinturon + '</a>');
        
        // Añadir efecto visual
        celdaCinturon.addClass('bg-info');
        setTimeout(function() {
            celdaCinturon.removeClass('bg-info');
        }, 1000);
    
        // Cerrar el modal
        modal.modal('hide');
    });
});

//modal para agregar alumnos

// Datos de ejemplo

  
  // Función para cargar los datos en la tabla
  function loadStudents() {
    const tableBody = document.getElementById('studentsTableBody');
    tableBody.innerHTML = '';
    students.forEach(student => {
      const row = `
        <tr>
          <td>${student.id}</td>
          <td>${student.firstName}</td>
          <td>${student.lastName}</td>
          <td>${student.email}</td>
          <td>${student.phone}</td>
          <td>${student.birthDate}</td>
          <td>${student.tutor}</td>
          <td>${student.selfTutor ? 'Sí' : 'No'}</td>
          <td>
            <button class="btn btn-sm btn-info">Editar</button>
            <button class="btn btn-sm btn-danger">Eliminar</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }
  
  // Función para abrir el modal de agregar alumno
  function openAddStudentModal() {
    $('#addStudentModal').modal('show');
  }
  
  // Función para agregar un nuevo alumno
  function addStudent() {
    const selfTutor = document.getElementById('selfTutor').checked;
    const tutorSelect = document.getElementById('tutor');
    let tutor = selfTutor ? `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}` : tutorSelect.options[tutorSelect.selectedIndex].text;
  
    const newStudent = {
      id: students.length + 1,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      birthDate: document.getElementById('birthDate').value,
      tutor: tutor,
      selfTutor: selfTutor
    };
    students.push(newStudent);
    loadStudents();
    $('#addStudentModal').modal('hide');
    document.getElementById('addStudentForm').reset();
  }
  
  // Manejar el cambio en el checkbox de "El alumno es su propio tutor"
  document.getElementById('selfTutor').addEventListener('change', function() {
    document.getElementById('tutor').disabled = this.checked;
  });
  
  // Cargar los datos al iniciar la página
  document.addEventListener('DOMContentLoaded', loadStudents);


  //modal de tutores

  // Datos de ejemplo

  
  // Función para cargar los datos en la tabla
  function loadTutors() {
    const tableBody = document.getElementById('tutorsTableBody');
    tableBody.innerHTML = '';
    tutors.forEach(tutor => {
      const row = `
        <tr>
          <td>${tutor.id}</td>
          <td><a href="#" onclick="openTutorDetails(${tutor.id})">${tutor.firstName} ${tutor.lastName}</a></td>
          <td>${tutor.email}</td>
          <td>${tutor.phone}</td>
          <td>${tutor.students.length}</td>
          <td>
            <button class="btn btn-sm btn-info" onclick="editTutor(${tutor.id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteTutor(${tutor.id})">Eliminar</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }
  
  // Función para abrir el modal de agregar tutor
  function openAddTutorModal() {
    $('#addTutorModal').modal('show');
  }
  
  // Función para agregar un nuevo tutor
  function addTutor() {
    const newTutor = {
      id: tutors.length + 1,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      students: []
    };
    tutors.push(newTutor);
    loadTutors();
    $('#addTutorModal').modal('hide');
    document.getElementById('addTutorForm').reset();
  }
  
  function openTutorDetails(tutorId) {
    const tutor = tutors.find(t => t.id === tutorId);
    if (tutor) {
      document.getElementById('tutorName').textContent = `${tutor.firstName} ${tutor.lastName}`;
      document.getElementById('tutorEmail').textContent = tutor.email;
      document.getElementById('tutorPhone').textContent = tutor.phone;
  
      const studentsTableBody = document.getElementById('tutorStudentsTableBody');
      studentsTableBody.innerHTML = '';
      
      tutor.students.forEach(studentId => {
        const student = students.find(s => s.id === studentId);
        if (student) {
          const row = `
            <tr>
              <td>${student.id}</td>
              <td>${student.firstName}</td>
              <td>${student.lastName}</td>
              <td>${student.email}</td>
            </tr>
          `;
          studentsTableBody.innerHTML += row;
        }
      });
  
      $('#tutorDetailsModal').modal('show');
    }
  }
  
  function editTutor(tutorId) {
    // Implementación pendiente
    console.log(`Editar tutor con ID: ${tutorId}`);
  }
  
  function deleteTutor(tutorId) {
    // Implementación pendiente
    console.log(`Eliminar tutor con ID: ${tutorId}`);
  }
  
  // Asegúrate de que esta línea esté presente al final del archivo
  document.addEventListener('DOMContentLoaded', loadTutors);

  function editTutor(tutorId) {
    // Implementación pendiente
    console.log(`Editar tutor con ID: ${tutorId}`);
  }
  
  function deleteTutor(tutorId) {
    // Implementación pendiente
    console.log(`Eliminar tutor con ID: ${tutorId}`);
  }
  
  // Cargar los datos al iniciar la página
  document.addEventListener('DOMContentLoaded', loadTutors);


  // Datos de ejemplo
let teachers = [
    { id: 1, firstName: 'Juan', lastName: 'Pérez', email: 'juan.perez@example.com', phone: '1234567890', academy: 'Dojo Central', belt: 'Negro', grade: 5 },
    { id: 2, firstName: 'María', lastName: 'González', email: 'maria.gonzalez@example.com', phone: '2345678901', academy: 'Dojo Norte', belt: 'Marrón', grade: 3 },
    { id: 3, firstName: 'Carlos', lastName: 'Rodríguez', email: 'carlos.rodriguez@example.com', phone: '3456789012', academy: 'Dojo Sur', belt: 'Negro', grade: 4 },
    // Agrega más profesores aquí...
  ];
  
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
  
  function openAddTeacherModal() {
    document.getElementById('teacherModalTitle').textContent = 'Agregar Nuevo Profesor';
    document.getElementById('teacherForm').reset();
    document.getElementById('teacherId').value = '';
    $('#teacherModal').modal('show');
  }
  
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
  
  function deleteTeacher(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este profesor?')) {
      teachers = teachers.filter(t => t.id !== id);
      loadTeachers();
    }
  }
  
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
  
  document.addEventListener('DOMContentLoaded', loadTeachers);



 