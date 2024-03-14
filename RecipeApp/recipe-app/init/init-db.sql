-- Drop tables if they exist for schema update
DROP TABLE IF EXISTS ingredients CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;

-- Create the recipes table with an ingredients TEXT column
CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    ingredients TEXT NOT NULL,
    recipe_instructions TEXT NOT NULL,
    time_last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Function and trigger remain the same for updating the timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.time_last_modified = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_recipes_modtime
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
