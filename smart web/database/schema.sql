PRAGMA foreign_keys = ON;
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS malls (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    city TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    image_url TEXT NOT NULL,
    is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1))
);

CREATE TABLE IF NOT EXISTS floors (
    id INTEGER PRIMARY KEY,
    mall_id INTEGER NOT NULL REFERENCES malls(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    display_order INTEGER NOT NULL,
    UNIQUE (mall_id, name),
    UNIQUE (mall_id, display_order)
);

CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY,
    floor_id INTEGER NOT NULL REFERENCES floors(id) ON DELETE CASCADE,
    room_number TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'vacant'
        CHECK (status IN ('vacant', 'occupied', 'maintenance')),
    base_rent_ugx INTEGER NOT NULL CHECK (base_rent_ugx >= 0),
    UNIQUE (floor_id, room_number)
);

CREATE TABLE IF NOT EXISTS tenants (
    id INTEGER PRIMARY KEY,
    room_id INTEGER NOT NULL UNIQUE REFERENCES rooms(id),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY,
    room_id INTEGER NOT NULL REFERENCES rooms(id),
    applicant_name TEXT NOT NULL,
    applicant_phone TEXT NOT NULL,
    business_name TEXT NOT NULL DEFAULT '',
    applicant_photo BLOB,
    id_front BLOB,
    id_back BLOB,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY,
    mall_id INTEGER NOT NULL REFERENCES malls(id),
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_read INTEGER NOT NULL DEFAULT 0 CHECK (is_read IN (0, 1))
);

CREATE TABLE IF NOT EXISTS utility_readings (
    id INTEGER PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES tenants(id),
    electricity_previous_reading REAL NOT NULL CHECK (electricity_previous_reading >= 0),
    electricity_current_reading REAL NOT NULL
        CHECK (electricity_current_reading >= electricity_previous_reading),
    electricity_tariff_ugx_per_unit INTEGER NOT NULL
        CHECK (electricity_tariff_ugx_per_unit >= 0),
    electricity_units_used REAL NOT NULL CHECK (electricity_units_used >= 0),
    electricity_charge_ugx INTEGER NOT NULL CHECK (electricity_charge_ugx >= 0),
    water_previous_reading REAL NOT NULL CHECK (water_previous_reading >= 0),
    water_current_reading REAL NOT NULL CHECK (water_current_reading >= water_previous_reading),
    water_tariff_ugx_per_unit INTEGER NOT NULL CHECK (water_tariff_ugx_per_unit >= 0),
    water_units_used REAL NOT NULL CHECK (water_units_used >= 0),
    water_charge_ugx INTEGER NOT NULL CHECK (water_charge_ugx >= 0),
    base_rent_ugx INTEGER NOT NULL CHECK (base_rent_ugx >= 0),
    total_due_ugx INTEGER NOT NULL CHECK (total_due_ugx >= 0),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_floors_mall ON floors(mall_id);
CREATE INDEX IF NOT EXISTS idx_rooms_floor_status ON rooms(floor_id, status);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_mall ON notifications(mall_id);
CREATE INDEX IF NOT EXISTS idx_utility_readings_tenant ON utility_readings(tenant_id);

CREATE VIEW IF NOT EXISTS mall_room_availability AS
SELECT
    malls.id AS mall_id,
    malls.name AS mall_name,
    COUNT(CASE WHEN rooms.status = 'vacant' THEN 1 END) AS vacant_rooms,
    COUNT(CASE WHEN rooms.status = 'occupied' THEN 1 END) AS occupied_rooms,
    COUNT(rooms.id) AS total_rooms
FROM malls
LEFT JOIN floors ON floors.mall_id = malls.id
LEFT JOIN rooms ON rooms.floor_id = floors.id
GROUP BY malls.id, malls.name;

INSERT OR IGNORE INTO malls (id, name, city, contact_phone, image_url) VALUES
    (1, 'Akamwesi Mall', 'Kampala', '+256700000001', 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80'),
    (2, 'Arena Mall', 'Mbarara', '+256700000002', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'),
    (3, 'Kookie Towers', 'Entebbe', '+256700000003', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80'),
    (4, 'Majestic Plaza', 'Jinja', '+256700000004', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80');

INSERT OR IGNORE INTO floors (id, mall_id, name, display_order) VALUES
    (1, 1, 'Ground Floor', 1), (2, 1, 'First Floor', 2),
    (3, 2, 'Ground Floor', 1), (4, 2, 'First Floor', 2),
    (5, 3, 'Ground Floor', 1), (6, 3, 'First Floor', 2),
    (7, 4, 'Ground Floor', 1), (8, 4, 'First Floor', 2);

INSERT OR IGNORE INTO rooms (id, floor_id, room_number, status, base_rent_ugx) VALUES
    (1, 1, 'G1', 'vacant', 500000), (2, 1, 'G2', 'occupied', 650000), (3, 1, 'G3', 'vacant', 520000),
    (4, 2, 'F1', 'occupied', 780000), (5, 2, 'F2', 'vacant', 820000), (6, 2, 'F3', 'occupied', 710000),
    (7, 3, 'A1', 'vacant', 560000), (8, 3, 'A2', 'occupied', 680000), (9, 3, 'A3', 'vacant', 580000),
    (10, 4, 'A4', 'occupied', 760000), (11, 4, 'A5', 'vacant', 790000), (12, 4, 'A6', 'occupied', 740000),
    (13, 5, 'K1', 'occupied', 700000), (14, 5, 'K2', 'vacant', 730000), (15, 5, 'K3', 'vacant', 690000),
    (16, 6, 'K4', 'occupied', 820000), (17, 6, 'K5', 'vacant', 860000), (18, 6, 'K6', 'occupied', 790000),
    (19, 7, 'M1', 'vacant', 610000), (20, 7, 'M2', 'occupied', 780000), (21, 7, 'M3', 'vacant', 640000),
    (22, 8, 'M4', 'occupied', 890000), (23, 8, 'M5', 'vacant', 930000), (24, 8, 'M6', 'occupied', 840000);

INSERT OR IGNORE INTO tenants (id, room_id, full_name, phone) VALUES
    (1, 2, 'Amina Nakato', '+256701234567'),
    (2, 4, 'Tenant F1', '+256700000010'),
    (3, 6, 'Tenant F3', '+256700000011'),
    (4, 8, 'Tenant A2', '+256700000012'),
    (5, 10, 'Tenant A4', '+256700000013'),
    (6, 12, 'Tenant A6', '+256700000014'),
    (7, 13, 'Tenant K1', '+256700000015'),
    (8, 16, 'Tenant K4', '+256700000016'),
    (9, 18, 'Tenant K6', '+256700000017'),
    (10, 20, 'Tenant M2', '+256700000018'),
    (11, 22, 'Tenant M4', '+256700000019'),
    (12, 24, 'Tenant M6', '+256700000020');

INSERT OR IGNORE INTO applications
    (id, room_id, applicant_name, applicant_phone, business_name, status)
VALUES
    (1, 2, 'Moses Luyima', '+256777112233', 'Luyima Traders', 'pending'),
    (2, 19, 'Patricia Kansiime', '+256789003344', 'Patricia Styles', 'pending');

INSERT OR IGNORE INTO notifications (id, mall_id, message) VALUES
    (1, 1, 'New room application received for G2.'),
    (2, 3, 'Utility bill approved and sent to tenant.');

INSERT OR IGNORE INTO utility_readings
    (id, tenant_id,
     electricity_previous_reading, electricity_current_reading, electricity_tariff_ugx_per_unit,
     electricity_units_used, electricity_charge_ugx,
     water_previous_reading, water_current_reading, water_tariff_ugx_per_unit,
     water_units_used, water_charge_ugx, base_rent_ugx, total_due_ugx)
VALUES (1, 1, 1200, 1375, 6000, 175, 1050000, 400, 425, 2000, 25, 50000, 650000, 1750000);

COMMIT;
