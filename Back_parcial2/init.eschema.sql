BEGIN;

-- USUARIOS
INSERT INTO usuarios (username, password, nombre, rol, activo) VALUES
('admin',      'admin123',    'Administrador Piedra Azul', 'ADMIN',    true),
('1061000001', 'laura123',    'Laura Gómez Muñoz',         'PACIENTE', true),
('1061000002', 'carlos123',   'Carlos Ruiz Torres',        'PACIENTE', true),
('1061000003', 'maria123',    'María Fernanda López',      'PACIENTE', true),
('1061000004', 'diego123',    'Diego Alejandro Cerón',     'PACIENTE', true),
('1061000005', 'valentina123','Valentina Hoyos Ríos',      'PACIENTE', true);

-- PACIENTES
INSERT INTO pacientes (cedula, nombres, apellidos, email, telefono, fecha_nacimiento, direccion, usuario_id) VALUES
('1061000001', 'Laura',           'Gómez Muñoz', 'laura.gomez@correo.com',     '3104567890', '1998-04-15', 'Calle 5 # 10-20, Popayán',  (SELECT id FROM usuarios WHERE username = '1061000001')),
('1061000002', 'Carlos',          'Ruiz Torres', 'carlos.ruiz@correo.com',     '3001234567', '1995-08-20', 'Cra 9 # 4-15, Popayán',     (SELECT id FROM usuarios WHERE username = '1061000002')),
('1061000003', 'María Fernanda',  'López',       'maria.lopez@correo.com',     '3157654321', '2001-01-10', 'Calle 18N # 7-30, Popayán', (SELECT id FROM usuarios WHERE username = '1061000003')),
('1061000004', 'Diego Alejandro', 'Cerón',       'diego.ceron@correo.com',     '3186549870', '1989-11-03', 'Av. Panamericana # 12-40',  (SELECT id FROM usuarios WHERE username = '1061000004')),
('1061000005', 'Valentina',       'Hoyos Ríos',  'valentina.hoyos@correo.com', '3209871234', '2003-06-27', 'Barrio Bolívar, Popayán',   (SELECT id FROM usuarios WHERE username = '1061000005'));

-- MÉDICOS
INSERT INTO medicos (cedula, nombres, apellidos, especialidad, email, telefono, consultorio, activo) VALUES
('76300100', 'Andrés',  'Muñoz Vela',    'Medicina General', 'andres.munoz@piedraazul.com',    '3201112233', '101', true),
('34500200', 'Camila',  'Rojas Paz',     'Pediatría',        'camila.rojas@piedraazul.com',    '3112223344', '204', true),
('10600300', 'Julián',  'Ortega Díaz',   'Cardiología',      'julian.ortega@piedraazul.com',   '3153334455', '305', true),
('25400400', 'Natalia', 'Chávez Mera',   'Dermatología',     'natalia.chavez@piedraazul.com',  '3174445566', '206', true),
('94500500', 'Ricardo', 'Paredes Solís', 'Ginecología',      'ricardo.paredes@piedraazul.com', '3015556677', '310', true);

-- CITAS (Laura tiene 2)
INSERT INTO citas (fecha_hora, motivo, estado, paciente_id, medico_id, fecha_creacion) VALUES
('2026-11-18 08:00:00', 'Control general anual',           'PROGRAMADA', (SELECT id FROM pacientes WHERE cedula = '1061000001'), (SELECT id FROM medicos WHERE cedula = '76300100'), NOW()),
('2026-11-21 10:00:00', 'Revisión de presión arterial',    'PROGRAMADA', (SELECT id FROM pacientes WHERE cedula = '1061000001'), (SELECT id FROM medicos WHERE cedula = '10600300'), NOW()),
('2026-11-19 14:30:00', 'Consulta por alergia en la piel', 'PROGRAMADA', (SELECT id FROM pacientes WHERE cedula = '1061000002'), (SELECT id FROM medicos WHERE cedula = '25400400'), NOW()),
('2026-11-24 09:00:00', 'Control ginecológico',            'PROGRAMADA', (SELECT id FROM pacientes WHERE cedula = '1061000003'), (SELECT id FROM medicos WHERE cedula = '94500500'), NOW()),
('2026-11-26 15:00:00', 'Dolor de cabeza frecuente',       'PROGRAMADA', (SELECT id FROM pacientes WHERE cedula = '1061000004'), (SELECT id FROM medicos WHERE cedula = '76300100'), NOW());

COMMIT;