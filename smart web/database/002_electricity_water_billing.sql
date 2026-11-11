PRAGMA foreign_keys = ON;
BEGIN TRANSACTION;

ALTER TABLE utility_readings RENAME COLUMN previous_reading TO electricity_previous_reading;
ALTER TABLE utility_readings RENAME COLUMN current_reading TO electricity_current_reading;
ALTER TABLE utility_readings RENAME COLUMN tariff_ugx_per_unit TO electricity_tariff_ugx_per_unit;
ALTER TABLE utility_readings RENAME COLUMN units_used TO electricity_units_used;
ALTER TABLE utility_readings RENAME COLUMN utility_charge_ugx TO electricity_charge_ugx;

ALTER TABLE utility_readings ADD COLUMN water_previous_reading REAL NOT NULL DEFAULT 0
    CHECK (water_previous_reading >= 0);
ALTER TABLE utility_readings ADD COLUMN water_current_reading REAL NOT NULL DEFAULT 0
    CHECK (water_current_reading >= water_previous_reading);
ALTER TABLE utility_readings ADD COLUMN water_tariff_ugx_per_unit INTEGER NOT NULL DEFAULT 0
    CHECK (water_tariff_ugx_per_unit >= 0);
ALTER TABLE utility_readings ADD COLUMN water_units_used REAL NOT NULL DEFAULT 0
    CHECK (water_units_used >= 0);
ALTER TABLE utility_readings ADD COLUMN water_charge_ugx INTEGER NOT NULL DEFAULT 0
    CHECK (water_charge_ugx >= 0);
ALTER TABLE utility_readings ADD COLUMN base_rent_ugx INTEGER NOT NULL DEFAULT 0
    CHECK (base_rent_ugx >= 0);
ALTER TABLE utility_readings ADD COLUMN total_due_ugx INTEGER NOT NULL DEFAULT 0
    CHECK (total_due_ugx >= 0);

UPDATE utility_readings
SET base_rent_ugx = COALESCE(
        (SELECT rooms.base_rent_ugx
         FROM tenants
         JOIN rooms ON rooms.id = tenants.room_id
         WHERE tenants.id = utility_readings.tenant_id),
        0
    ),
    total_due_ugx = electricity_charge_ugx + COALESCE(
        (SELECT rooms.base_rent_ugx
         FROM tenants
         JOIN rooms ON rooms.id = tenants.room_id
         WHERE tenants.id = utility_readings.tenant_id),
        0
    );

UPDATE utility_readings
SET water_previous_reading = 400,
    water_current_reading = 425,
    water_tariff_ugx_per_unit = 2000,
    water_units_used = 25,
    water_charge_ugx = 50000,
    total_due_ugx = base_rent_ugx + electricity_charge_ugx + 50000
WHERE id = 1;

COMMIT;
