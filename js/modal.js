<script>
$('#pagoModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Botón que activó el modal
  var estado = button.data('estado') // Extrae la información de los atributos data-*
  var alumno = button.data('alumno')
  var modal = $(this)
  modal.find('.modal-title').text('Comprobante de Pago - ' + alumno)
  modal.find('#modalAlumno').text(alumno)
  modal.find('#modalEstado').text(estado)
  // Aquí podrías agregar lógica para mostrar información diferente según el estado
  if (estado === 'Moroso') {
    modal.find('#modalUltimoPago').text('01/06/2024')
    modal.find('#modalMonto').text('$0.00')
    modal.find('#modalProximoVencimiento').text('Pago vencido')
  }
})
</script>

