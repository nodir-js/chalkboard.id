-- Initial database setup for Kiy24.id
-- This script will run when the PostgreSQL container is first created

-- Create additional databases if needed
-- CREATE DATABASE kiy24_dev;
-- CREATE DATABASE kiy24_test;

-- Set timezone
SET timezone = 'UTC';

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON DATABASE kiy24 TO postgres;

-- Create a dedicated user for the application (optional, for production)
-- CREATE USER kiy24_app WITH ENCRYPTED PASSWORD 'secure_password';
-- GRANT CONNECT ON DATABASE kiy24 TO kiy24_app;
-- GRANT USAGE ON SCHEMA public TO kiy24_app;
-- GRANT CREATE ON SCHEMA public TO kiy24_app;