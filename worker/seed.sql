-- ==========================================
-- 食物基本資料
-- ==========================================

-- 肉類
INSERT OR IGNORE INTO foods VALUES ('pork_liver',      '豬肝',     'Pork Liver',          'meat');
INSERT OR IGNORE INTO foods VALUES ('chicken_liver',   '雞肝',     'Chicken Liver',       'meat');
INSERT OR IGNORE INTO foods VALUES ('pork_belly',      '五花肉',   'Pork Belly',          'meat');
INSERT OR IGNORE INTO foods VALUES ('chicken_breast',  '雞胸肉',   'Chicken Breast',      'meat');
INSERT OR IGNORE INTO foods VALUES ('beef',            '牛肉',     'Beef',                'meat');
INSERT OR IGNORE INTO foods VALUES ('pork_ribs',       '排骨',     'Pork Ribs',           'meat');

-- 海鮮
INSERT OR IGNORE INTO foods VALUES ('shrimp',          '蝦',       'Shrimp',              'seafood');
INSERT OR IGNORE INTO foods VALUES ('crab',            '螃蟹',     'Crab',                'seafood');
INSERT OR IGNORE INTO foods VALUES ('clam',            '蛤蜊',     'Clam',                'seafood');
INSERT OR IGNORE INTO foods VALUES ('salmon',          '鮭魚',     'Salmon',              'seafood');
INSERT OR IGNORE INTO foods VALUES ('sardine',         '沙丁魚',   'Sardine',             'seafood');
INSERT OR IGNORE INTO foods VALUES ('tuna',            '鮪魚',     'Tuna',                'seafood');
INSERT OR IGNORE INTO foods VALUES ('tilapia',         '吳郭魚',   'Tilapia',             'seafood');

-- 蔬菜
INSERT OR IGNORE INTO foods VALUES ('spinach',         '菠菜',     'Spinach',             'vegetable');
INSERT OR IGNORE INTO foods VALUES ('broccoli',        '花椰菜',   'Broccoli',            'vegetable');
INSERT OR IGNORE INTO foods VALUES ('tomato',          '番茄',     'Tomato',              'vegetable');
INSERT OR IGNORE INTO foods VALUES ('cabbage',         '高麗菜',   'Cabbage',             'vegetable');
INSERT OR IGNORE INTO foods VALUES ('cucumber',        '小黃瓜',   'Cucumber',            'vegetable');
INSERT OR IGNORE INTO foods VALUES ('carrot',          '紅蘿蔔',   'Carrot',              'vegetable');
INSERT OR IGNORE INTO foods VALUES ('mushroom',        '香菇',     'Shiitake Mushroom',   'vegetable');

-- 水果
INSERT OR IGNORE INTO foods VALUES ('apple',           '蘋果',     'Apple',               'fruit');
INSERT OR IGNORE INTO foods VALUES ('banana',          '香蕉',     'Banana',              'fruit');
INSERT OR IGNORE INTO foods VALUES ('guava',           '芭樂',     'Guava',               'fruit');
INSERT OR IGNORE INTO foods VALUES ('watermelon',      '西瓜',     'Watermelon',          'fruit');
INSERT OR IGNORE INTO foods VALUES ('lychee',          '荔枝',     'Lychee',              'fruit');
INSERT OR IGNORE INTO foods VALUES ('orange',          '柳橙',     'Orange',              'fruit');

-- 飲料
INSERT OR IGNORE INTO foods VALUES ('beer',            '啤酒',     'Beer',                'drink');
INSERT OR IGNORE INTO foods VALUES ('green_tea',       '綠茶',     'Green Tea',           'drink');
INSERT OR IGNORE INTO foods VALUES ('soda',            '汽水',     'Soda',                'drink');
INSERT OR IGNORE INTO foods VALUES ('milk',            '牛奶',     'Milk',                'drink');
INSERT OR IGNORE INTO foods VALUES ('bubble_tea',      '珍珠奶茶', 'Bubble Tea',          'drink');
INSERT OR IGNORE INTO foods VALUES ('coffee',          '黑咖啡',   'Black Coffee',        'drink');

-- 主食
INSERT OR IGNORE INTO foods VALUES ('white_rice',      '白飯',     'White Rice',          'grain');
INSERT OR IGNORE INTO foods VALUES ('brown_rice',      '糙米飯',   'Brown Rice',          'grain');
INSERT OR IGNORE INTO foods VALUES ('white_bread',     '白吐司',   'White Bread',         'grain');
INSERT OR IGNORE INTO foods VALUES ('instant_noodle',  '泡麵',     'Instant Noodle',      'grain');
INSERT OR IGNORE INTO foods VALUES ('oatmeal',         '燕麥片',   'Oatmeal',             'grain');

-- 其他
INSERT OR IGNORE INTO foods VALUES ('fried_chicken',   '炸雞',     'Fried Chicken',       'other');
INSERT OR IGNORE INTO foods VALUES ('hot_dog',         '熱狗',     'Hot Dog',             'other');
INSERT OR IGNORE INTO foods VALUES ('potato_chips',    '洋芋片',   'Potato Chips',        'other');
INSERT OR IGNORE INTO foods VALUES ('tofu',            '豆腐',     'Tofu',                'other');
INSERT OR IGNORE INTO foods VALUES ('egg',             '雞蛋',     'Egg',                 'other');

-- ==========================================
-- 食物標籤
-- ==========================================

-- 豬肝 (pork_liver)
INSERT OR IGNORE INTO food_tags VALUES ('pork_liver', 'gout', 'high_purine');
INSERT OR IGNORE INTO food_tags VALUES ('pork_liver', 'gout', 'organ_meat');
INSERT OR IGNORE INTO food_tags VALUES ('pork_liver', 'hyperlipidemia', 'high_cholesterol');
INSERT OR IGNORE INTO food_tags VALUES ('pork_liver', 'hypertension', 'high_sodium');

-- 雞肝 (chicken_liver)
INSERT OR IGNORE INTO food_tags VALUES ('chicken_liver', 'gout', 'high_purine');
INSERT OR IGNORE INTO food_tags VALUES ('chicken_liver', 'gout', 'organ_meat');
INSERT OR IGNORE INTO food_tags VALUES ('chicken_liver', 'hyperlipidemia', 'high_cholesterol');

-- 五花肉 (pork_belly)
INSERT OR IGNORE INTO food_tags VALUES ('pork_belly', 'hyperlipidemia', 'high_saturated_fat');
INSERT OR IGNORE INTO food_tags VALUES ('pork_belly', 'hyperlipidemia', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('pork_belly', 'diabetes', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('pork_belly', 'gout', 'moderate_purine');

-- 雞胸肉 (chicken_breast)
INSERT OR IGNORE INTO food_tags VALUES ('chicken_breast', 'gout', 'moderate_purine');

-- 蝦 (shrimp)
INSERT OR IGNORE INTO food_tags VALUES ('shrimp', 'gout', 'seafood_high_risk');
INSERT OR IGNORE INTO food_tags VALUES ('shrimp', 'gout', 'high_purine');
INSERT OR IGNORE INTO food_tags VALUES ('shrimp', 'hyperlipidemia', 'high_cholesterol');

-- 螃蟹 (crab)
INSERT OR IGNORE INTO food_tags VALUES ('crab', 'gout', 'seafood_high_risk');
INSERT OR IGNORE INTO food_tags VALUES ('crab', 'gout', 'high_purine');
INSERT OR IGNORE INTO food_tags VALUES ('crab', 'hyperlipidemia', 'high_cholesterol');
INSERT OR IGNORE INTO food_tags VALUES ('crab', 'hypertension', 'high_sodium');

-- 蛤蜊 (clam)
INSERT OR IGNORE INTO food_tags VALUES ('clam', 'gout', 'seafood_high_risk');
INSERT OR IGNORE INTO food_tags VALUES ('clam', 'gout', 'moderate_purine');

-- 沙丁魚 (sardine)
INSERT OR IGNORE INTO food_tags VALUES ('sardine', 'gout', 'high_purine');
INSERT OR IGNORE INTO food_tags VALUES ('sardine', 'hyperlipidemia', 'high_calorie');

-- 鮪魚 (tuna)
INSERT OR IGNORE INTO food_tags VALUES ('tuna', 'gout', 'high_purine');

-- 鮭魚 (salmon)
INSERT OR IGNORE INTO food_tags VALUES ('salmon', 'gout', 'moderate_purine');

-- 菠菜 (spinach)
INSERT OR IGNORE INTO food_tags VALUES ('spinach', 'gout', 'moderate_purine');

-- 香菇 (mushroom)
INSERT OR IGNORE INTO food_tags VALUES ('mushroom', 'gout', 'moderate_purine');

-- 啤酒 (beer)
INSERT OR IGNORE INTO food_tags VALUES ('beer', 'gout', 'alcohol');
INSERT OR IGNORE INTO food_tags VALUES ('beer', 'gout', 'high_purine');
INSERT OR IGNORE INTO food_tags VALUES ('beer', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('beer', 'hyperlipidemia', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('beer', 'hypertension', 'high_sodium');

-- 汽水 (soda)
INSERT OR IGNORE INTO food_tags VALUES ('soda', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('soda', 'diabetes', 'sweetened_drink');
INSERT OR IGNORE INTO food_tags VALUES ('soda', 'diabetes', 'high_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('soda', 'hyperlipidemia', 'high_calorie');

-- 珍珠奶茶 (bubble_tea)
INSERT OR IGNORE INTO food_tags VALUES ('bubble_tea', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('bubble_tea', 'diabetes', 'sweetened_drink');
INSERT OR IGNORE INTO food_tags VALUES ('bubble_tea', 'diabetes', 'refined_carbs');
INSERT OR IGNORE INTO food_tags VALUES ('bubble_tea', 'hyperlipidemia', 'high_calorie');

-- 白飯 (white_rice)
INSERT OR IGNORE INTO food_tags VALUES ('white_rice', 'diabetes', 'high_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('white_rice', 'diabetes', 'refined_carbs');

-- 白吐司 (white_bread)
INSERT OR IGNORE INTO food_tags VALUES ('white_bread', 'diabetes', 'refined_carbs');
INSERT OR IGNORE INTO food_tags VALUES ('white_bread', 'diabetes', 'high_glycemic_index');

-- 泡麵 (instant_noodle)
INSERT OR IGNORE INTO food_tags VALUES ('instant_noodle', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('instant_noodle', 'hypertension', 'processed_food');
INSERT OR IGNORE INTO food_tags VALUES ('instant_noodle', 'diabetes', 'refined_carbs');
INSERT OR IGNORE INTO food_tags VALUES ('instant_noodle', 'hyperlipidemia', 'trans_fat');

-- 炸雞 (fried_chicken)
INSERT OR IGNORE INTO food_tags VALUES ('fried_chicken', 'hyperlipidemia', 'fried_food');
INSERT OR IGNORE INTO food_tags VALUES ('fried_chicken', 'hyperlipidemia', 'high_saturated_fat');
INSERT OR IGNORE INTO food_tags VALUES ('fried_chicken', 'hyperlipidemia', 'trans_fat');
INSERT OR IGNORE INTO food_tags VALUES ('fried_chicken', 'diabetes', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('fried_chicken', 'hypertension', 'high_sodium');

-- 熱狗 (hot_dog)
INSERT OR IGNORE INTO food_tags VALUES ('hot_dog', 'hypertension', 'processed_food');
INSERT OR IGNORE INTO food_tags VALUES ('hot_dog', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('hot_dog', 'hyperlipidemia', 'high_saturated_fat');

-- 洋芋片 (potato_chips)
INSERT OR IGNORE INTO food_tags VALUES ('potato_chips', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('potato_chips', 'hyperlipidemia', 'fried_food');
INSERT OR IGNORE INTO food_tags VALUES ('potato_chips', 'hyperlipidemia', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('potato_chips', 'diabetes', 'high_glycemic_index');

-- 荔枝 (lychee)
INSERT OR IGNORE INTO food_tags VALUES ('lychee', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('lychee', 'diabetes', 'high_glycemic_index');

-- 西瓜 (watermelon)
INSERT OR IGNORE INTO food_tags VALUES ('watermelon', 'diabetes', 'high_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('watermelon', 'diabetes', 'high_sugar');

-- 雞蛋 (egg)
INSERT OR IGNORE INTO food_tags VALUES ('egg', 'hyperlipidemia', 'high_cholesterol');
