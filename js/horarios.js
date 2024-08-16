// Datos de ejemplo para clases predefinidas
let predefinedClasses = [
    { id: 1, name: "Karate Básico", instructor: "Juan Pérez", duration: 60, level: "Principiante", description: "Introducción a las técnicas básicas de karate" },
    { id: 2, name: "Judo Intermedio", instructor: "María García", duration: 90, level: "Intermedio", description: "Práctica de técnicas avanzadas de judo" },
    { id: 3, name: "Taekwondo Avanzado", instructor: "Carlos Rodríguez", duration: 120, level: "Avanzado", description: "Entrenamiento intensivo de taekwondo para competición" }
  ];
  
  // Función para cargar las clases predefinidas
  function loadPredefinedClasses() {
    const tableBody = document.getElementById('predefinedClassesBody');
    tableBody.innerHTML = '';
    predefinedClasses.forEach(cls => {
      const row = `
        <tr>
          <td>${cls.name}</td>
          <td>${cls.instructor}</td>
          <td>${cls.duration} min</td>
          <td>${cls.level}</td>
          <td>
            <button class="btn btn-sm btn-info" onclick="editClass(${cls.id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteClass(${cls.id})">Eliminar</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
    
    // También actualizamos el select de clases
    const classSelect = document.getElementById('classSelect');
    classSelect.innerHTML = '';
    predefinedClasses.forEach(cls => {
      classSelect.innerHTML += `<option value="${cls.id}">${cls.name}</option>`;
    });
  }
  
  // Función para abrir el modal de agregar clase
  function openAddClassModal() {
    document.getElementById('classModalTitle').textContent = 'Agregar Nueva Clase';
    document.getElementById('classForm').reset();
    document.getElementById('classId').value = '';
    $('#classModal').modal('show');
  }
  
  // Función para guardar una clase (nueva o editada)
  function saveClass() {
    // Implementar la lógica para guardar la clase
    // ...
    loadPredefinedClasses();
    $('#classModal').modal('hide');
  }
  
  // Función para editar una clase
  function editClass(id) {
    // Implementar la lógica para editar la clase
    // ...
  }
  
  // Función para eliminar una clase
  function deleteClass(id) {
    // Implementar la lógica para eliminar la clase
    // ...
  }
  
  // Inicialización del calendario
  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [
        // Aquí se cargarían las clases programadas
      ]
    });
    calendar.render();
    
    // Cargar las clases predefinidas
    loadPredefinedClasses();
    
    // Manejar la programación de clases
    document.getElementById('scheduleClassForm').addEventListener('submit', function(e) {
      e.preventDefault();
      // Implementar la lógica para programar la clase
      // ...
      // Agregar el evento al calendario
      calendar.addEvent({
        title: 'Clase programada',
        start: '2023-05-11T10:00:00',
        end: '2023-05-11T11:00:00'
      });
    });
  });