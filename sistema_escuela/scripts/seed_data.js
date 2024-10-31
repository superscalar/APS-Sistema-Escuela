module.exports = {
    users: [
      { UUID: '34cf47f0-bca9-4e58-a790-b2652d6b3d50', type: 'administrador', name: "Administrador", username: 'admin', password: 'admin' },
      { UUID: '7cbcd0cd-fd05-4f22-b41b-4a6ab52073c9', type: 'padre', name: "Padre", username: 'padre', password: 'padre' },
      { UUID: '4d3468dc-1fe0-43b2-96e6-9487cbafadac', type: 'alumno', name: "Alumno", username: 'alumno', password: 'alumno' },
      { UUID: 'c053e48d-493e-4197-8a22-74a586f7a7eb', type: 'docente', name: "Docente", username: 'docente', password: 'docente' },
	  
	  { UUID: '453268dc-54e2-43b2-9e56-9487cbafadac', type: 'alumno', name: "Maria Gomez", username: 'mariag', password: 'alumno' },
	  { UUID: '453268dc-54e1-43b2-96e6-9487cbafadac', type: 'alumno', name: "Juan Carlos", username: 'juanc', password: 'alumno' },
	  { UUID: '453268dc-54e3-43b2-21e6-9487cbafadac', type: 'alumno', name: "Pedro Sanchez", username: 'sanchez', password: 'alumno' },
	  { UUID: '453268dc-54e4-43b2-93e6-948545454dac', type: 'alumno', name: "Ana Maria", username: 'ana', password: 'alumno' },
    ],

    grades: [
      { student_id: '453268dc-54e2-43b2-9e56-9487cbafadac', subject: 'Matematica II', grade: 8.5, signed: true },
	  { student_id: '453268dc-54e1-43b2-96e6-9487cbafadac', subject: 'Literatura contemporanea', grade: 9.1, signed: false },
	  { student_id: '453268dc-54e3-43b2-21e6-9487cbafadac', subject: 'Matematica II', grade: 8.5, signed: true },
	  { student_id: '453268dc-54e4-43b2-93e6-948545454dac', subject: 'Algebra Relacional', grade: 7.0, signed: true },
	  { student_id: '453268dc-54e4-43b2-93e6-948545454dac', subject: 'Matematica II', grade: 10.0, signed: false },
    ]
  };