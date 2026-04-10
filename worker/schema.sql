CREATE TABLE IF NOT EXISTS foods (
  id       TEXT PRIMARY KEY,
  name_zh  TEXT NOT NULL,
  name_en  TEXT NOT NULL,
  category TEXT NOT NULL  -- meat | seafood | vegetable | fruit | drink | grain | dairy | other
);

CREATE TABLE IF NOT EXISTS food_tags (
  food_id   TEXT NOT NULL REFERENCES foods(id),
  condition TEXT NOT NULL,  -- gout | hyperlipidemia | diabetes | hypertension
  tag       TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_food_tags_food_id ON food_tags(food_id);
CREATE INDEX IF NOT EXISTS idx_food_tags_condition ON food_tags(condition);
