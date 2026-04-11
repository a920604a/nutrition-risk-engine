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

-- ==========================================
-- 新增食物 (45 種台灣 / 亞洲常見食物)
-- ==========================================

-- 肉類
INSERT OR IGNORE INTO foods VALUES ('pork_kidney',       '豬腎',       'Pork Kidney',           'meat');
INSERT OR IGNORE INTO foods VALUES ('duck',              '鴨肉',       'Duck',                  'meat');
INSERT OR IGNORE INTO foods VALUES ('lamb',              '羊肉',       'Lamb',                  'meat');
INSERT OR IGNORE INTO foods VALUES ('pork_sausage',      '香腸',       'Taiwanese Pork Sausage','meat');
INSERT OR IGNORE INTO foods VALUES ('bacon',             '培根',       'Bacon',                 'meat');
INSERT OR IGNORE INTO foods VALUES ('pork_blood_cake',   '豬血糕',     'Pig Blood Cake',        'meat');

-- 海鮮
INSERT OR IGNORE INTO foods VALUES ('anchovy',           '鯷魚',       'Anchovy',               'seafood');
INSERT OR IGNORE INTO foods VALUES ('oyster',            '牡蠣',       'Oyster',                'seafood');
INSERT OR IGNORE INTO foods VALUES ('mackerel',          '鯖魚',       'Mackerel',              'seafood');
INSERT OR IGNORE INTO foods VALUES ('squid',             '魷魚',       'Squid',                 'seafood');
INSERT OR IGNORE INTO foods VALUES ('dried_shrimp',      '蝦米',       'Dried Shrimp',          'seafood');
INSERT OR IGNORE INTO foods VALUES ('milkfish',          '虱目魚',     'Milkfish',              'seafood');
INSERT OR IGNORE INTO foods VALUES ('sea_bass',          '鱸魚',       'Sea Bass',              'seafood');

-- 蔬菜
INSERT OR IGNORE INTO foods VALUES ('asparagus',         '蘆筍',       'Asparagus',             'vegetable');
INSERT OR IGNORE INTO foods VALUES ('enoki_mushroom',    '金針菇',     'Enoki Mushroom',        'vegetable');
INSERT OR IGNORE INTO foods VALUES ('eggplant',          '茄子',       'Eggplant',              'vegetable');
INSERT OR IGNORE INTO foods VALUES ('bitter_gourd',      '苦瓜',       'Bitter Gourd',          'vegetable');
INSERT OR IGNORE INTO foods VALUES ('green_onion',       '蔥',         'Green Onion',           'vegetable');
INSERT OR IGNORE INTO foods VALUES ('garlic',            '大蒜',       'Garlic',                'vegetable');
INSERT OR IGNORE INTO foods VALUES ('bean_sprout',       '豆芽菜',     'Mung Bean Sprout',      'vegetable');
INSERT OR IGNORE INTO foods VALUES ('lotus_root',        '蓮藕',       'Lotus Root',            'vegetable');
INSERT OR IGNORE INTO foods VALUES ('sweet_potato_leaf', '地瓜葉',     'Sweet Potato Leaf',     'vegetable');
INSERT OR IGNORE INTO foods VALUES ('cauliflower',       '白花椰菜',   'Cauliflower',           'vegetable');
INSERT OR IGNORE INTO foods VALUES ('seaweed',           '海帶',       'Kelp/Seaweed',          'vegetable');

-- 水果
INSERT OR IGNORE INTO foods VALUES ('mango',             '芒果',       'Mango',                 'fruit');
INSERT OR IGNORE INTO foods VALUES ('pineapple',         '鳳梨',       'Pineapple',             'fruit');
INSERT OR IGNORE INTO foods VALUES ('papaya',            '木瓜',       'Papaya',                'fruit');
INSERT OR IGNORE INTO foods VALUES ('grape',             '葡萄',       'Grape',                 'fruit');
INSERT OR IGNORE INTO foods VALUES ('pear',              '水梨',       'Asian Pear',            'fruit');
INSERT OR IGNORE INTO foods VALUES ('starfruit',         '楊桃',       'Starfruit',             'fruit');
INSERT OR IGNORE INTO foods VALUES ('dragon_fruit',      '火龍果',     'Dragon Fruit',          'fruit');

-- 飲料
INSERT OR IGNORE INTO foods VALUES ('fruit_juice',       '果汁',       'Packaged Fruit Juice',  'drink');
INSERT OR IGNORE INTO foods VALUES ('sports_drink',      '運動飲料',   'Sports Drink',          'drink');
INSERT OR IGNORE INTO foods VALUES ('soy_milk',          '豆漿',       'Soy Milk',              'drink');
INSERT OR IGNORE INTO foods VALUES ('rice_milk',         '米漿',       'Rice Milk',             'drink');
INSERT OR IGNORE INTO foods VALUES ('wine',              '紅酒',       'Red Wine',              'drink');

-- 主食/穀物
INSERT OR IGNORE INTO foods VALUES ('rice_porridge',     '白粥',       'Rice Porridge (Congee)','grain');
INSERT OR IGNORE INTO foods VALUES ('rice_noodle',       '米粉',       'Rice Vermicelli',       'grain');
INSERT OR IGNORE INTO foods VALUES ('sweet_potato',      '地瓜',       'Sweet Potato',          'grain');
INSERT OR IGNORE INTO foods VALUES ('taro',              '芋頭',       'Taro',                  'grain');
INSERT OR IGNORE INTO foods VALUES ('mung_bean_noodle',  '冬粉',       'Mung Bean Glass Noodle','grain');
INSERT OR IGNORE INTO foods VALUES ('whole_wheat_bread', '全麥吐司',   'Whole Wheat Bread',     'grain');
INSERT OR IGNORE INTO foods VALUES ('udon',              '烏龍麵',     'Udon Noodle',           'grain');

-- 乳製品 / 其他
INSERT OR IGNORE INTO foods VALUES ('yogurt',            '優格',       'Yogurt',                'dairy');
INSERT OR IGNORE INTO foods VALUES ('cheese',            '起司',       'Cheese',                'dairy');
INSERT OR IGNORE INTO foods VALUES ('lu_rou_fan',        '滷肉飯',     'Braised Pork Rice',     'other');
INSERT OR IGNORE INTO foods VALUES ('oyster_vermicelli', '蚵仔麵線',   'Oyster Vermicelli',     'other');
INSERT OR IGNORE INTO foods VALUES ('scallion_pancake',  '蔥油餅',     'Scallion Pancake',      'other');
INSERT OR IGNORE INTO foods VALUES ('preserved_egg',     '皮蛋',       'Century Egg',           'other');
INSERT OR IGNORE INTO foods VALUES ('salted_egg',        '鹹蛋',       'Salted Egg',            'other');
INSERT OR IGNORE INTO foods VALUES ('fried_tofu',        '炸豆腐',     'Fried Tofu',            'other');
INSERT OR IGNORE INTO foods VALUES ('mochi',             '麻糬',       'Mochi',                 'other');
INSERT OR IGNORE INTO foods VALUES ('fried_rice',        '炒飯',       'Fried Rice',            'other');

-- ==========================================
-- 新增食物標籤
-- ==========================================

-- 豬腎 (pork_kidney) — 器官肉，嘌呤極高 ~335 mg/100g
INSERT OR IGNORE INTO food_tags VALUES ('pork_kidney', 'gout', 'high_purine');
INSERT OR IGNORE INTO food_tags VALUES ('pork_kidney', 'gout', 'organ_meat');
INSERT OR IGNORE INTO food_tags VALUES ('pork_kidney', 'hyperlipidemia', 'high_cholesterol');

-- 鴨肉 (duck) — 嘌呤中等；飽和脂肪偏高
INSERT OR IGNORE INTO food_tags VALUES ('duck', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('duck', 'hyperlipidemia', 'high_saturated_fat');
INSERT OR IGNORE INTO food_tags VALUES ('duck', 'hyperlipidemia', 'high_cholesterol');

-- 羊肉 (lamb) — 嘌呤中等偏高；飽和脂肪高
INSERT OR IGNORE INTO food_tags VALUES ('lamb', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('lamb', 'hyperlipidemia', 'high_saturated_fat');
INSERT OR IGNORE INTO food_tags VALUES ('lamb', 'hyperlipidemia', 'high_cholesterol');

-- 香腸 (pork_sausage) — 加工肉品，高鈉、高飽和脂肪、高糖
INSERT OR IGNORE INTO food_tags VALUES ('pork_sausage', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('pork_sausage', 'hypertension', 'processed_food');
INSERT OR IGNORE INTO food_tags VALUES ('pork_sausage', 'hyperlipidemia', 'high_saturated_fat');
INSERT OR IGNORE INTO food_tags VALUES ('pork_sausage', 'diabetes', 'high_sugar');

-- 培根 (bacon) — 加工肉品，高鈉、高飽和脂肪
INSERT OR IGNORE INTO food_tags VALUES ('bacon', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('bacon', 'hypertension', 'processed_food');
INSERT OR IGNORE INTO food_tags VALUES ('bacon', 'hyperlipidemia', 'high_saturated_fat');
INSERT OR IGNORE INTO food_tags VALUES ('bacon', 'hyperlipidemia', 'high_calorie');

-- 豬血糕 (pork_blood_cake) — 高鈉；嘌呤中等
INSERT OR IGNORE INTO food_tags VALUES ('pork_blood_cake', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('pork_blood_cake', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('pork_blood_cake', 'hyperlipidemia', 'high_cholesterol');

-- 鯷魚 (anchovy) — 嘌呤極高 ~410 mg/100g
INSERT OR IGNORE INTO food_tags VALUES ('anchovy', 'gout', 'high_purine');
INSERT OR IGNORE INTO food_tags VALUES ('anchovy', 'gout', 'seafood_high_risk');
INSERT OR IGNORE INTO food_tags VALUES ('anchovy', 'hypertension', 'high_sodium');

-- 牡蠣 (oyster) — 嘌呤中等 ~90 mg/100g；高膽固醇
INSERT OR IGNORE INTO food_tags VALUES ('oyster', 'gout', 'seafood_high_risk');
INSERT OR IGNORE INTO food_tags VALUES ('oyster', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('oyster', 'hyperlipidemia', 'high_cholesterol');

-- 鯖魚 (mackerel) — 嘌呤中等偏高 ~145 mg/100g；飽和脂肪偏高
INSERT OR IGNORE INTO food_tags VALUES ('mackerel', 'gout', 'high_purine');
INSERT OR IGNORE INTO food_tags VALUES ('mackerel', 'gout', 'seafood_high_risk');
INSERT OR IGNORE INTO food_tags VALUES ('mackerel', 'hyperlipidemia', 'high_saturated_fat');

-- 魷魚 (squid) — 嘌呤中等偏高 ~140 mg/100g；高膽固醇
INSERT OR IGNORE INTO food_tags VALUES ('squid', 'gout', 'seafood_high_risk');
INSERT OR IGNORE INTO food_tags VALUES ('squid', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('squid', 'hyperlipidemia', 'high_cholesterol');

-- 蝦米 (dried_shrimp) — 乾燥高度濃縮，嘌呤極高；高鈉
INSERT OR IGNORE INTO food_tags VALUES ('dried_shrimp', 'gout', 'high_purine');
INSERT OR IGNORE INTO food_tags VALUES ('dried_shrimp', 'gout', 'seafood_high_risk');
INSERT OR IGNORE INTO food_tags VALUES ('dried_shrimp', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('dried_shrimp', 'hypertension', 'processed_food');

-- 虱目魚 (milkfish) — 嘌呤中等；台灣常見魚類
INSERT OR IGNORE INTO food_tags VALUES ('milkfish', 'gout', 'moderate_purine');

-- 鱸魚 (sea_bass) — 嘌呤低至中等；適合痛風患者
INSERT OR IGNORE INTO food_tags VALUES ('sea_bass', 'gout', 'low_purine');

-- 蘆筍 (asparagus) — 嘌呤中等 ~25 mg/100g（植物嘌呤影響較小）
INSERT OR IGNORE INTO food_tags VALUES ('asparagus', 'gout', 'moderate_purine');

-- 金針菇 (enoki_mushroom) — 嘌呤低 <100 mg/100g
INSERT OR IGNORE INTO food_tags VALUES ('enoki_mushroom', 'gout', 'low_purine');

-- 茄子 (eggplant) — 低嘌呤；對各疾病無顯著風險
-- (no significant risk tags needed — clean food)

-- 苦瓜 (bitter_gourd) — 低嘌呤；有助血糖控制（低GI）
INSERT OR IGNORE INTO food_tags VALUES ('bitter_gourd', 'diabetes', 'low_glycemic_index');

-- 豆芽菜 (bean_sprout) — 嘌呤極低 ~14.6 mg/100g；低GI
INSERT OR IGNORE INTO food_tags VALUES ('bean_sprout', 'gout', 'low_purine');
INSERT OR IGNORE INTO food_tags VALUES ('bean_sprout', 'diabetes', 'low_glycemic_index');

-- 蓮藕 (lotus_root) — 低嘌呤；澱粉含量高，GI中等
INSERT OR IGNORE INTO food_tags VALUES ('lotus_root', 'gout', 'low_purine');
INSERT OR IGNORE INTO food_tags VALUES ('lotus_root', 'diabetes', 'high_glycemic_index');

-- 地瓜葉 (sweet_potato_leaf) — 低嘌呤；低GI；高纖
INSERT OR IGNORE INTO food_tags VALUES ('sweet_potato_leaf', 'gout', 'low_purine');
INSERT OR IGNORE INTO food_tags VALUES ('sweet_potato_leaf', 'diabetes', 'low_glycemic_index');

-- 白花椰菜 (cauliflower) — 嘌呤中等 ~51 mg/100g（植物嘌呤）
INSERT OR IGNORE INTO food_tags VALUES ('cauliflower', 'gout', 'moderate_purine');

-- 海帶 (seaweed) — 高鈉（加工調味品）；嘌呤低；血壓注意
INSERT OR IGNORE INTO food_tags VALUES ('seaweed', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('seaweed', 'gout', 'low_purine');

-- 芒果 (mango) — GI 約60；含糖量高
INSERT OR IGNORE INTO food_tags VALUES ('mango', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('mango', 'diabetes', 'high_glycemic_index');

-- 鳳梨 (pineapple) — GI 約73；高糖
INSERT OR IGNORE INTO food_tags VALUES ('pineapple', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('pineapple', 'diabetes', 'high_glycemic_index');

-- 木瓜 (papaya) — GI 約86；高糖
INSERT OR IGNORE INTO food_tags VALUES ('papaya', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('papaya', 'diabetes', 'high_glycemic_index');

-- 葡萄 (grape) — GI 約50；糖分中等
INSERT OR IGNORE INTO food_tags VALUES ('grape', 'diabetes', 'high_sugar');

-- 水梨 (pear) — GI 低約24-38；適合糖尿病患者
INSERT OR IGNORE INTO food_tags VALUES ('pear', 'diabetes', 'low_glycemic_index');

-- 楊桃 (starfruit) — 低糖低GI；對痛風腎臟功能差患者需注意草酸
INSERT OR IGNORE INTO food_tags VALUES ('starfruit', 'diabetes', 'low_glycemic_index');

-- 火龍果 (dragon_fruit) — GI 中低；含糖量中等
-- (moderate profile — no extreme risk tags)

-- 果汁 (fruit_juice) — 含糖量高、升糖快
INSERT OR IGNORE INTO food_tags VALUES ('fruit_juice', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('fruit_juice', 'diabetes', 'sweetened_drink');
INSERT OR IGNORE INTO food_tags VALUES ('fruit_juice', 'diabetes', 'high_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('fruit_juice', 'hyperlipidemia', 'high_calorie');

-- 運動飲料 (sports_drink) — 高糖、高鈉
INSERT OR IGNORE INTO food_tags VALUES ('sports_drink', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('sports_drink', 'diabetes', 'sweetened_drink');
INSERT OR IGNORE INTO food_tags VALUES ('sports_drink', 'hypertension', 'high_sodium');

-- 豆漿 (soy_milk) — 含嘌呤中等（大豆製品影響較小）；若加糖注意糖尿病
INSERT OR IGNORE INTO food_tags VALUES ('soy_milk', 'gout', 'moderate_purine');

-- 米漿 (rice_milk) — 高GI；高糖（台式米漿常加糖）
INSERT OR IGNORE INTO food_tags VALUES ('rice_milk', 'diabetes', 'high_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('rice_milk', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('rice_milk', 'diabetes', 'sweetened_drink');

-- 紅酒 (wine) — 含酒精；痛風風險；高熱量
INSERT OR IGNORE INTO food_tags VALUES ('wine', 'gout', 'alcohol');
INSERT OR IGNORE INTO food_tags VALUES ('wine', 'hyperlipidemia', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('wine', 'diabetes', 'high_sugar');

-- 白粥 (rice_porridge) — GI 高 ~76；精製碳水
INSERT OR IGNORE INTO food_tags VALUES ('rice_porridge', 'diabetes', 'high_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('rice_porridge', 'diabetes', 'refined_carbs');

-- 米粉 (rice_noodle) — GI 中等 ~58-65；精製碳水
INSERT OR IGNORE INTO food_tags VALUES ('rice_noodle', 'diabetes', 'refined_carbs');

-- 地瓜 (sweet_potato) — GI 中等約54-63（蒸煮）；升糖低於白飯
INSERT OR IGNORE INTO food_tags VALUES ('sweet_potato', 'diabetes', 'low_glycemic_index');

-- 芋頭 (taro) — GI 中等 ~69；升糖需注意
INSERT OR IGNORE INTO food_tags VALUES ('taro', 'diabetes', 'high_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('taro', 'diabetes', 'refined_carbs');

-- 冬粉 (mung_bean_noodle) — GI 低 ~28-39；適合糖尿病
INSERT OR IGNORE INTO food_tags VALUES ('mung_bean_noodle', 'diabetes', 'low_glycemic_index');

-- 全麥吐司 (whole_wheat_bread) — GI 低於白土司；高纖
INSERT OR IGNORE INTO food_tags VALUES ('whole_wheat_bread', 'diabetes', 'low_glycemic_index');

-- 烏龍麵 (udon) — GI 中等 ~62；精製碳水
INSERT OR IGNORE INTO food_tags VALUES ('udon', 'diabetes', 'refined_carbs');

-- 優格 (yogurt) — 低GI；有助血糖；含飽和脂肪（全脂）
INSERT OR IGNORE INTO food_tags VALUES ('yogurt', 'diabetes', 'low_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('yogurt', 'hyperlipidemia', 'high_saturated_fat');

-- 起司 (cheese) — 高飽和脂肪；高鈉；高膽固醇
INSERT OR IGNORE INTO food_tags VALUES ('cheese', 'hyperlipidemia', 'high_saturated_fat');
INSERT OR IGNORE INTO food_tags VALUES ('cheese', 'hyperlipidemia', 'high_cholesterol');
INSERT OR IGNORE INTO food_tags VALUES ('cheese', 'hypertension', 'high_sodium');

-- 滷肉飯 (lu_rou_fan) — 高鈉（醬油滷汁）；高飽和脂肪；高嘌呤（豬肉）
INSERT OR IGNORE INTO food_tags VALUES ('lu_rou_fan', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('lu_rou_fan', 'hypertension', 'processed_food');
INSERT OR IGNORE INTO food_tags VALUES ('lu_rou_fan', 'hyperlipidemia', 'high_saturated_fat');
INSERT OR IGNORE INTO food_tags VALUES ('lu_rou_fan', 'hyperlipidemia', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('lu_rou_fan', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('lu_rou_fan', 'diabetes', 'high_glycemic_index');

-- 蚵仔麵線 (oyster_vermicelli) — 高鈉；含牡蠣嘌呤
INSERT OR IGNORE INTO food_tags VALUES ('oyster_vermicelli', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('oyster_vermicelli', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('oyster_vermicelli', 'diabetes', 'refined_carbs');

-- 蔥油餅 (scallion_pancake) — 高熱量；含反式脂肪；高鈉
INSERT OR IGNORE INTO food_tags VALUES ('scallion_pancake', 'hyperlipidemia', 'fried_food');
INSERT OR IGNORE INTO food_tags VALUES ('scallion_pancake', 'hyperlipidemia', 'trans_fat');
INSERT OR IGNORE INTO food_tags VALUES ('scallion_pancake', 'hyperlipidemia', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('scallion_pancake', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('scallion_pancake', 'diabetes', 'refined_carbs');

-- 皮蛋 (preserved_egg) — 高鈉；高膽固醇；加工食品
INSERT OR IGNORE INTO food_tags VALUES ('preserved_egg', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('preserved_egg', 'hypertension', 'processed_food');
INSERT OR IGNORE INTO food_tags VALUES ('preserved_egg', 'hyperlipidemia', 'high_cholesterol');

-- 鹹蛋 (salted_egg) — 高鈉；高膽固醇；醃製食品
INSERT OR IGNORE INTO food_tags VALUES ('salted_egg', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('salted_egg', 'hypertension', 'pickled_food');
INSERT OR IGNORE INTO food_tags VALUES ('salted_egg', 'hyperlipidemia', 'high_cholesterol');

-- 炸豆腐 (fried_tofu) — 油炸；高熱量
INSERT OR IGNORE INTO food_tags VALUES ('fried_tofu', 'hyperlipidemia', 'fried_food');
INSERT OR IGNORE INTO food_tags VALUES ('fried_tofu', 'hyperlipidemia', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('fried_tofu', 'gout', 'moderate_purine');

-- 麻糬 (mochi) — 精製澱粉；高GI；高糖
INSERT OR IGNORE INTO food_tags VALUES ('mochi', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('mochi', 'diabetes', 'refined_carbs');
INSERT OR IGNORE INTO food_tags VALUES ('mochi', 'diabetes', 'high_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('mochi', 'hyperlipidemia', 'high_calorie');

-- 炒飯 (fried_rice) — 高油高鈉；精製碳水
INSERT OR IGNORE INTO food_tags VALUES ('fried_rice', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('fried_rice', 'hyperlipidemia', 'fried_food');
INSERT OR IGNORE INTO food_tags VALUES ('fried_rice', 'hyperlipidemia', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('fried_rice', 'diabetes', 'refined_carbs');
INSERT OR IGNORE INTO food_tags VALUES ('fried_rice', 'diabetes', 'high_glycemic_index');

-- ==========================================
-- 新增食物（第三批）
-- ==========================================

-- 肉類
INSERT OR IGNORE INTO foods VALUES ('pork_intestine',  '豬大腸',   'Pork Large Intestine', 'meat');
INSERT OR IGNORE INTO foods VALUES ('chicken_wing',    '雞翅',     'Chicken Wing',         'meat');
INSERT OR IGNORE INTO foods VALUES ('ham',             '火腿',     'Ham',                  'meat');
INSERT OR IGNORE INTO foods VALUES ('pork_chop',       '豬排',     'Pork Chop',            'meat');

-- 海鮮
INSERT OR IGNORE INTO foods VALUES ('scallop',         '干貝',     'Scallop',              'seafood');
INSERT OR IGNORE INTO foods VALUES ('cuttlefish',      '花枝',     'Cuttlefish',           'seafood');
INSERT OR IGNORE INTO foods VALUES ('eel',             '鰻魚',     'Eel',                  'seafood');
INSERT OR IGNORE INTO foods VALUES ('flying_fish_roe', '飛魚卵',   'Flying Fish Roe',      'seafood');
INSERT OR IGNORE INTO foods VALUES ('sea_cucumber',    '海參',     'Sea Cucumber',         'seafood');
INSERT OR IGNORE INTO foods VALUES ('abalone',         '鮑魚',     'Abalone',              'seafood');

-- 蔬菜
INSERT OR IGNORE INTO foods VALUES ('bamboo_shoot',    '竹筍',     'Bamboo Shoot',         'vegetable');
INSERT OR IGNORE INTO foods VALUES ('edamame',         '毛豆',     'Edamame',              'vegetable');
INSERT OR IGNORE INTO foods VALUES ('pumpkin',         '南瓜',     'Pumpkin',              'vegetable');
INSERT OR IGNORE INTO foods VALUES ('corn',            '玉米',     'Corn',                 'vegetable');
INSERT OR IGNORE INTO foods VALUES ('burdock',         '牛蒡',     'Burdock Root',         'vegetable');
INSERT OR IGNORE INTO foods VALUES ('leek',            '韭菜',     'Chinese Chive',        'vegetable');
INSERT OR IGNORE INTO foods VALUES ('napa_cabbage',    '大白菜',   'Napa Cabbage',         'vegetable');
INSERT OR IGNORE INTO foods VALUES ('okra',            '秋葵',     'Okra',                 'vegetable');
INSERT OR IGNORE INTO foods VALUES ('potato',          '馬鈴薯',   'Potato',               'vegetable');

-- 水果
INSERT OR IGNORE INTO foods VALUES ('kiwi',            '奇異果',   'Kiwi',                 'fruit');
INSERT OR IGNORE INTO foods VALUES ('strawberry',      '草莓',     'Strawberry',           'fruit');
INSERT OR IGNORE INTO foods VALUES ('peach',           '水蜜桃',   'Peach',                'fruit');
INSERT OR IGNORE INTO foods VALUES ('durian',          '榴槤',     'Durian',               'fruit');
INSERT OR IGNORE INTO foods VALUES ('persimmon',       '柿子',     'Persimmon',            'fruit');
INSERT OR IGNORE INTO foods VALUES ('wax_apple',       '蓮霧',     'Wax Apple',            'fruit');

-- 飲料
INSERT OR IGNORE INTO foods VALUES ('black_tea',       '紅茶',     'Black Tea',            'drink');
INSERT OR IGNORE INTO foods VALUES ('energy_drink',    '能量飲料', 'Energy Drink',         'drink');
INSERT OR IGNORE INTO foods VALUES ('liquor',          '烈酒',     'Spirits / Liquor',     'drink');
INSERT OR IGNORE INTO foods VALUES ('sweet_tea',       '手搖甜茶', 'Sweetened Tea',        'drink');

-- 主食/穀物
INSERT OR IGNORE INTO foods VALUES ('glutinous_rice',  '糯米',     'Glutinous Rice',       'grain');
INSERT OR IGNORE INTO foods VALUES ('mantou',          '饅頭',     'Steamed Bun (Mantou)', 'grain');
INSERT OR IGNORE INTO foods VALUES ('barley',          '薏仁',     'Job\'s Tears (Coix)',  'grain');
INSERT OR IGNORE INTO foods VALUES ('spaghetti',       '義大利麵', 'Spaghetti',            'grain');
INSERT OR IGNORE INTO foods VALUES ('dumpling',        '水餃',     'Dumpling',             'grain');

-- 乳製品
INSERT OR IGNORE INTO foods VALUES ('butter',          '奶油',     'Butter',               'dairy');
INSERT OR IGNORE INTO foods VALUES ('ice_cream',       '冰淇淋',   'Ice Cream',            'dairy');
INSERT OR IGNORE INTO foods VALUES ('condensed_milk',  '煉乳',     'Condensed Milk',       'dairy');

-- 其他
INSERT OR IGNORE INTO foods VALUES ('pork_ball',       '貢丸',     'Pork Ball',            'other');
INSERT OR IGNORE INTO foods VALUES ('fish_ball',       '魚丸',     'Fish Ball',            'other');
INSERT OR IGNORE INTO foods VALUES ('kimchi',          '泡菜',     'Kimchi',               'other');
INSERT OR IGNORE INTO foods VALUES ('spring_roll',     '春捲',     'Spring Roll',          'other');
INSERT OR IGNORE INTO foods VALUES ('stinky_tofu',     '臭豆腐',   'Stinky Tofu',          'other');
INSERT OR IGNORE INTO foods VALUES ('dried_tofu',      '豆乾',     'Dried Tofu',           'other');
INSERT OR IGNORE INTO foods VALUES ('peanut',          '花生',     'Peanut',               'other');
INSERT OR IGNORE INTO foods VALUES ('tempura',         '天婦羅',   'Tempura',              'other');

-- ==========================================
-- 新增食物標籤（第三批）
-- ==========================================

-- 豬大腸 (pork_intestine) — 器官肉，嘌呤高 ~262 mg/100g；高膽固醇；高飽和脂肪
INSERT OR IGNORE INTO food_tags VALUES ('pork_intestine', 'gout', 'high_purine');
INSERT OR IGNORE INTO food_tags VALUES ('pork_intestine', 'gout', 'organ_meat');
INSERT OR IGNORE INTO food_tags VALUES ('pork_intestine', 'hyperlipidemia', 'high_cholesterol');
INSERT OR IGNORE INTO food_tags VALUES ('pork_intestine', 'hyperlipidemia', 'high_saturated_fat');
INSERT OR IGNORE INTO food_tags VALUES ('pork_intestine', 'hypertension', 'high_sodium');

-- 雞翅 (chicken_wing) — 嘌呤中等；皮含高飽和脂肪；常油炸
INSERT OR IGNORE INTO food_tags VALUES ('chicken_wing', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('chicken_wing', 'hyperlipidemia', 'high_saturated_fat');
INSERT OR IGNORE INTO food_tags VALUES ('chicken_wing', 'hyperlipidemia', 'high_calorie');

-- 火腿 (ham) — 加工肉品；高鈉；高飽和脂肪
INSERT OR IGNORE INTO food_tags VALUES ('ham', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('ham', 'hypertension', 'processed_food');
INSERT OR IGNORE INTO food_tags VALUES ('ham', 'hyperlipidemia', 'high_saturated_fat');
INSERT OR IGNORE INTO food_tags VALUES ('ham', 'gout', 'moderate_purine');

-- 豬排 (pork_chop) — 嘌呤中等；飽和脂肪偏高（視部位）
INSERT OR IGNORE INTO food_tags VALUES ('pork_chop', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('pork_chop', 'hyperlipidemia', 'high_saturated_fat');

-- 干貝 (scallop) — 嘌呤中等偏高 ~90 mg/100g；新鮮干貝膽固醇中等
INSERT OR IGNORE INTO food_tags VALUES ('scallop', 'gout', 'seafood_high_risk');
INSERT OR IGNORE INTO food_tags VALUES ('scallop', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('scallop', 'hyperlipidemia', 'high_cholesterol');

-- 花枝 (cuttlefish) — 嘌呤中等 ~100 mg/100g；高膽固醇
INSERT OR IGNORE INTO food_tags VALUES ('cuttlefish', 'gout', 'seafood_high_risk');
INSERT OR IGNORE INTO food_tags VALUES ('cuttlefish', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('cuttlefish', 'hyperlipidemia', 'high_cholesterol');

-- 鰻魚 (eel) — 嘌呤中等 ~92 mg/100g；脂肪含量高
INSERT OR IGNORE INTO food_tags VALUES ('eel', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('eel', 'hyperlipidemia', 'high_saturated_fat');
INSERT OR IGNORE INTO food_tags VALUES ('eel', 'hyperlipidemia', 'high_calorie');

-- 飛魚卵 (flying_fish_roe) — 嘌呤極高 ~300 mg/100g；高膽固醇；高鈉（加工）
INSERT OR IGNORE INTO food_tags VALUES ('flying_fish_roe', 'gout', 'high_purine');
INSERT OR IGNORE INTO food_tags VALUES ('flying_fish_roe', 'gout', 'seafood_high_risk');
INSERT OR IGNORE INTO food_tags VALUES ('flying_fish_roe', 'hyperlipidemia', 'high_cholesterol');
INSERT OR IGNORE INTO food_tags VALUES ('flying_fish_roe', 'hypertension', 'high_sodium');

-- 海參 (sea_cucumber) — 嘌呤極低 ~4 mg/100g；適合痛風；低脂高蛋白
INSERT OR IGNORE INTO food_tags VALUES ('sea_cucumber', 'gout', 'low_purine');

-- 鮑魚 (abalone) — 嘌呤中等 ~80 mg/100g；若罐頭則高鈉
INSERT OR IGNORE INTO food_tags VALUES ('abalone', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('abalone', 'hyperlipidemia', 'high_cholesterol');

-- 竹筍 (bamboo_shoot) — 嘌呤中等 ~29 mg/100g（植物嘌呤）；低GI；高鉀
INSERT OR IGNORE INTO food_tags VALUES ('bamboo_shoot', 'gout', 'moderate_purine');

-- 毛豆 (edamame) — 嘌呤中等 ~80 mg/100g（大豆製品）；低GI；高蛋白
INSERT OR IGNORE INTO food_tags VALUES ('edamame', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('edamame', 'diabetes', 'low_glycemic_index');

-- 南瓜 (pumpkin) — GI 偏高 ~75；精製碳水化合物
INSERT OR IGNORE INTO food_tags VALUES ('pumpkin', 'diabetes', 'high_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('pumpkin', 'diabetes', 'refined_carbs');

-- 玉米 (corn) — GI 中等 ~52；含澱粉
INSERT OR IGNORE INTO food_tags VALUES ('corn', 'diabetes', 'refined_carbs');

-- 牛蒡 (burdock) — 低GI；高纖維；無顯著風險
INSERT OR IGNORE INTO food_tags VALUES ('burdock', 'diabetes', 'low_glycemic_index');

-- 秋葵 (okra) — 低GI；有助血糖控制；高纖維
INSERT OR IGNORE INTO food_tags VALUES ('okra', 'diabetes', 'low_glycemic_index');

-- 馬鈴薯 (potato) — GI 偏高 ~78（水煮）；精製澱粉
INSERT OR IGNORE INTO food_tags VALUES ('potato', 'diabetes', 'high_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('potato', 'diabetes', 'refined_carbs');

-- 奇異果 (kiwi) — GI 中低 ~53；低糖；適合糖尿病
INSERT OR IGNORE INTO food_tags VALUES ('kiwi', 'diabetes', 'low_glycemic_index');

-- 草莓 (strawberry) — GI 低 ~40；含糖量低；適合糖尿病
INSERT OR IGNORE INTO food_tags VALUES ('strawberry', 'diabetes', 'low_glycemic_index');

-- 水蜜桃 (peach) — GI 中等 ~42；含糖量中等
INSERT OR IGNORE INTO food_tags VALUES ('peach', 'diabetes', 'low_glycemic_index');

-- 榴槤 (durian) — GI 中等約58；高糖；熱量極高
INSERT OR IGNORE INTO food_tags VALUES ('durian', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('durian', 'diabetes', 'high_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('durian', 'hyperlipidemia', 'high_calorie');

-- 柿子 (persimmon) — 含糖量高；GI 中等 ~50；慢性腎病注意鉀
INSERT OR IGNORE INTO food_tags VALUES ('persimmon', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('persimmon', 'diabetes', 'high_glycemic_index');

-- 蓮霧 (wax_apple) — GI 低 ~33；低糖；適合糖尿病
INSERT OR IGNORE INTO food_tags VALUES ('wax_apple', 'diabetes', 'low_glycemic_index');

-- 紅茶 (black_tea) — 不加糖無顯著風險（加糖請選手搖甜茶）

-- 能量飲料 (energy_drink) — 高糖；高鈉；高咖啡因
INSERT OR IGNORE INTO food_tags VALUES ('energy_drink', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('energy_drink', 'diabetes', 'sweetened_drink');
INSERT OR IGNORE INTO food_tags VALUES ('energy_drink', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('energy_drink', 'hyperlipidemia', 'high_calorie');

-- 烈酒 (liquor) — 酒精；高熱量；痛風風險高
INSERT OR IGNORE INTO food_tags VALUES ('liquor', 'gout', 'alcohol');
INSERT OR IGNORE INTO food_tags VALUES ('liquor', 'hyperlipidemia', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('liquor', 'diabetes', 'high_sugar');

-- 手搖甜茶 (sweet_tea) — 高糖；含糖飲料
INSERT OR IGNORE INTO food_tags VALUES ('sweet_tea', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('sweet_tea', 'diabetes', 'sweetened_drink');
INSERT OR IGNORE INTO food_tags VALUES ('sweet_tea', 'hyperlipidemia', 'high_calorie');

-- 糯米 (glutinous_rice) — GI 極高 ~98；精製碳水
INSERT OR IGNORE INTO food_tags VALUES ('glutinous_rice', 'diabetes', 'high_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('glutinous_rice', 'diabetes', 'refined_carbs');

-- 饅頭 (mantou) — GI 高 ~88；精製碳水
INSERT OR IGNORE INTO food_tags VALUES ('mantou', 'diabetes', 'high_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('mantou', 'diabetes', 'refined_carbs');

-- 薏仁 (barley) — GI 低 ~25；有助血糖控制；適合糖尿病
INSERT OR IGNORE INTO food_tags VALUES ('barley', 'diabetes', 'low_glycemic_index');

-- 義大利麵 (spaghetti) — GI 中低 ~49；精製碳水但較低GI
INSERT OR IGNORE INTO food_tags VALUES ('spaghetti', 'diabetes', 'refined_carbs');

-- 水餃 (dumpling) — 高鈉（醬料）；精製碳水；嘌呤中等（豬肉餡）
INSERT OR IGNORE INTO food_tags VALUES ('dumpling', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('dumpling', 'diabetes', 'refined_carbs');
INSERT OR IGNORE INTO food_tags VALUES ('dumpling', 'gout', 'moderate_purine');

-- 奶油 (butter) — 高飽和脂肪；反式脂肪（部分氫化）；高熱量
INSERT OR IGNORE INTO food_tags VALUES ('butter', 'hyperlipidemia', 'high_saturated_fat');
INSERT OR IGNORE INTO food_tags VALUES ('butter', 'hyperlipidemia', 'trans_fat');
INSERT OR IGNORE INTO food_tags VALUES ('butter', 'hyperlipidemia', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('butter', 'hypertension', 'high_sodium');

-- 冰淇淋 (ice_cream) — 高糖；高飽和脂肪；高熱量
INSERT OR IGNORE INTO food_tags VALUES ('ice_cream', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('ice_cream', 'diabetes', 'high_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('ice_cream', 'hyperlipidemia', 'high_saturated_fat');
INSERT OR IGNORE INTO food_tags VALUES ('ice_cream', 'hyperlipidemia', 'high_calorie');

-- 煉乳 (condensed_milk) — 高糖；高熱量
INSERT OR IGNORE INTO food_tags VALUES ('condensed_milk', 'diabetes', 'high_sugar');
INSERT OR IGNORE INTO food_tags VALUES ('condensed_milk', 'diabetes', 'sweetened_drink');
INSERT OR IGNORE INTO food_tags VALUES ('condensed_milk', 'hyperlipidemia', 'high_calorie');

-- 貢丸 (pork_ball) — 加工食品；高鈉 ~700mg/100g；嘌呤中等
INSERT OR IGNORE INTO food_tags VALUES ('pork_ball', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('pork_ball', 'hypertension', 'processed_food');
INSERT OR IGNORE INTO food_tags VALUES ('pork_ball', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('pork_ball', 'hyperlipidemia', 'high_saturated_fat');

-- 魚丸 (fish_ball) — 加工食品；高鈉 ~650mg/100g；嘌呤中等
INSERT OR IGNORE INTO food_tags VALUES ('fish_ball', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('fish_ball', 'hypertension', 'processed_food');
INSERT OR IGNORE INTO food_tags VALUES ('fish_ball', 'gout', 'moderate_purine');

-- 泡菜 (kimchi) — 醃製食品；高鈉 ~600-800mg/100g
INSERT OR IGNORE INTO food_tags VALUES ('kimchi', 'hypertension', 'high_sodium');
INSERT OR IGNORE INTO food_tags VALUES ('kimchi', 'hypertension', 'pickled_food');

-- 春捲 (spring_roll) — 油炸；高熱量；精製碳水；高鈉
INSERT OR IGNORE INTO food_tags VALUES ('spring_roll', 'hyperlipidemia', 'fried_food');
INSERT OR IGNORE INTO food_tags VALUES ('spring_roll', 'hyperlipidemia', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('spring_roll', 'diabetes', 'refined_carbs');
INSERT OR IGNORE INTO food_tags VALUES ('spring_roll', 'hypertension', 'high_sodium');

-- 臭豆腐 (stinky_tofu, fried) — 油炸；嘌呤中等；高熱量
INSERT OR IGNORE INTO food_tags VALUES ('stinky_tofu', 'hyperlipidemia', 'fried_food');
INSERT OR IGNORE INTO food_tags VALUES ('stinky_tofu', 'hyperlipidemia', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('stinky_tofu', 'gout', 'moderate_purine');
INSERT OR IGNORE INTO food_tags VALUES ('stinky_tofu', 'hypertension', 'high_sodium');

-- 豆乾 (dried_tofu) — 嘌呤中等（大豆製品）；鈉中等；高蛋白
INSERT OR IGNORE INTO food_tags VALUES ('dried_tofu', 'gout', 'moderate_purine');

-- 花生 (peanut) — 高熱量；高脂肪；嘌呤中等
INSERT OR IGNORE INTO food_tags VALUES ('peanut', 'hyperlipidemia', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('peanut', 'hyperlipidemia', 'high_saturated_fat');
INSERT OR IGNORE INTO food_tags VALUES ('peanut', 'gout', 'moderate_purine');

-- 天婦羅 (tempura) — 油炸；高熱量；反式脂肪風險
INSERT OR IGNORE INTO food_tags VALUES ('tempura', 'hyperlipidemia', 'fried_food');
INSERT OR IGNORE INTO food_tags VALUES ('tempura', 'hyperlipidemia', 'high_calorie');
INSERT OR IGNORE INTO food_tags VALUES ('tempura', 'hyperlipidemia', 'trans_fat');
INSERT OR IGNORE INTO food_tags VALUES ('tempura', 'diabetes', 'high_glycemic_index');
INSERT OR IGNORE INTO food_tags VALUES ('tempura', 'hypertension', 'high_sodium');
