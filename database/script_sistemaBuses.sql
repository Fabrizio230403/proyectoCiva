
INSERT INTO marca (nombre) VALUES
('Volvo'),
('Scania'),
('Mercedes-Benz'),
('Marcopolo'),
('Volare')

select * from marca;

INSERT INTO bus (numero_bus, placa, fecha_creacion, caracteristicas, marca_id, estado)
VALUES
('BUS-001', 'ABC-123', NOW(), 'Bus de dos pisos con aire acondicionado', 1, 'Activo'),
('BUS-002', 'SCN-450', now(), 'Bus con un solo piso asientos de 140°', 2, 'Activo'),
('BUS-003', 'MB-789', NOW(), 'Bus de un piso con WiFi y asientos reclinables', 3, 'Activo'),
('BUS-004', 'MRC-321', NOW(), 'Bus de dos pisos con TV y baño', 4, 'Activo'),
('BUS-005', 'VOL-567', NOW(), 'Bus ejecutivo con aire acondicionado', 1, 'Activo'),
('BUS-006', 'SCN-890', NOW(), 'Bus de un piso con asientos premium', 2, 'Activo'),
('BUS-007', 'MB-234', NOW(), 'Bus de turismo con baño y WiFi', 3, 'Activo'),
('BUS-008', 'VOL-678', NOW(), 'Bus de dos pisos con comedor y TV', 1, 'Activo'),
('BUS-009', 'VLR-123', NOW(), 'Bus de un piso económico', 5, 'Activo'),
('BUS-010', 'MRC-456', NOW(), 'Bus interprovincial con aire acondicionado', 4, 'Activo'),
('BUS-011', 'SCN-678', NOW(), 'Bus ejecutivo con asientos reclinables y WiFi', 2, 'Activo'),
('BUS-012', 'VLR-789', NOW(), 'Bus de turismo básico', 5, 'Activo');

select * from bus;