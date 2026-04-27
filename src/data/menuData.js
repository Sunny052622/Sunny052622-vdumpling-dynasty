// VDumpling Dynasty — Full Menu Data
// Source: Petpooja POS export (newdata.csv)
// Columns: name, description, category, subCategory, price, isVeg (true=veg, false=non-veg, 'egg'=egg)

export const MENU_ITEMS = [
  // ── Soup ──────────────────────────────────────────────────────────────────
  { id: 1,  name: 'Veg Manchow Soup',           description: 'Thick broth, fried noodles and a bunch of different stir fried vegetables.',                                                  category: 'Soup', subCategory: 'Veg Soup',     price: 125, isVeg: true },
  { id: 2,  name: 'Veg Clear Soup',              description: 'Clear soup mixed with veggies.',                                                                                               category: 'Soup', subCategory: 'Veg Soup',     price: 95,  isVeg: true },
  { id: 3,  name: 'Veg Lemon Coriander Soup',    description: 'Clear vegetable soup in a lemon and coriander.',                                                                               category: 'Soup', subCategory: 'Veg Soup',     price: 105, isVeg: true },
  { id: 4,  name: 'Chicken Manchow Soup',         description: 'Thick broth, fried noodles and a bunch of different stir fried vegetables and chicken pieces.',                               category: 'Soup', subCategory: 'Non-Veg Soup', price: 135, isVeg: false },
  { id: 5,  name: 'Chicken Clear Soup',           description: 'Clear soup mixed with chicken cubes.',                                                                                        category: 'Soup', subCategory: 'Non-Veg Soup', price: 105, isVeg: false },
  { id: 6,  name: 'Chicken Lemon Coriander Soup', description: 'Clear vegetable soup in a lemon and coriander with chicken pieces added.',                                                   category: 'Soup', subCategory: 'Non-Veg Soup', price: 125, isVeg: false },

  // ── Momo (Veg) ────────────────────────────────────────────────────────────
  { id: 7,  name: 'Veg Sunaolo Baruka [5 Pcs]',        description: 'Crispy fried momo.',                                                                                                   category: 'Momo', subCategory: 'Momo (Veg)',     price: 115, isVeg: true },
  { id: 8,  name: 'Veg Soupy Momo [5 Pcs]',             description: 'Steam momo dipped in a soup.',                                                                                        category: 'Momo', subCategory: 'Momo (Veg)',     price: 105, isVeg: true },
  { id: 9,  name: 'Veg Sadekho Momo [5 Pcs]',           description: 'Fried momo, hand mixed with spicy, tangy Nepalese masala and raw vegetables.',                                       category: 'Momo', subCategory: 'Momo (Veg)',     price: 105, isVeg: true },
  { id: 10, name: 'Veg Saucy Pan Fried Momo [5 Pcs]',   description: 'Fried momo, wok tossed with in house sauce, green bell pepper and onion.',                                           category: 'Momo', subCategory: 'Momo (Veg)',     price: 115, isVeg: true },
  { id: 11, name: 'Veg Jhol Momo [5 Pcs]',               description: 'Steamed momo immersed in a traditional pahadi thin jhol made of tomato and sesame.',                               category: 'Momo', subCategory: 'Momo (Veg)',     price: 115, isVeg: true },
  { id: 12, name: 'Veg Teekho Momo [5 Pcs]',             description: 'Fiery momo topped with a potent in house chili garlic oil — chili sourced from the hills.',                        category: 'Momo', subCategory: 'Momo (Veg)',     price: 95,  isVeg: true },
  { id: 13, name: 'Veg Kothey Momo [5 Pcs]',             description: 'Steamed momo one side seared in butter.',                                                                          category: 'Momo', subCategory: 'Momo (Veg)',     price: 105, isVeg: true },
  { id: 14, name: 'Veg Pahadi Momo [5 Pcs]',              description: 'Steamed momo paired with authentic chutney.',                                                                      category: 'Momo', subCategory: 'Momo (Veg)',     price: 85,  isVeg: true },
  { id: 15, name: 'Veg Gravy Momo [5 Pcs]',               description: 'Steam momo layered with a white creamy peanut gravy.',                                                            category: 'Momo', subCategory: 'Momo (Veg)',     price: 115, isVeg: true },
  { id: 16, name: 'Veg Fried Momo [5 Pcs]',               description: 'Steam Momo simply fried. No fancy stuff!',                                                                        category: 'Momo', subCategory: 'Momo (Veg)',     price: 105, isVeg: true },

  // ── Momo (Chicken) ────────────────────────────────────────────────────────
  { id: 17, name: 'Chicken Sunaolo Baruka [5 Pcs]',       description: 'Crispy fried momo.',                                                                                               category: 'Momo', subCategory: 'Momo (Chicken)', price: 125, isVeg: false },
  { id: 18, name: 'Chicken Soupy Momo [5 Pcs]',            description: 'Steam momo dipped in a soup.',                                                                                    category: 'Momo', subCategory: 'Momo (Chicken)', price: 115, isVeg: false },
  { id: 19, name: 'Chicken Sadekho Momo [5 Pcs]',          description: 'Fried momo, hand mixed with spicy, tangy Nepalese masala and raw vegetables.',                                   category: 'Momo', subCategory: 'Momo (Chicken)', price: 125, isVeg: false },
  { id: 20, name: 'Chicken Saucy Pan Fried Momo [5 Pcs]',  description: 'Fried momo, wok tossed with in house sauce, green bell pepper and onion.',                                       category: 'Momo', subCategory: 'Momo (Chicken)', price: 125, isVeg: false },
  { id: 21, name: 'Chicken Jhol Momo [5 Pcs]',              description: 'Steamed momo immersed in a traditional pahadi thin jhol made of tomato and sesame.',                            category: 'Momo', subCategory: 'Momo (Chicken)', price: 125, isVeg: false },
  { id: 22, name: 'Chicken Teekho Momo [5 Pcs]',            description: 'Fiery momo topped with a potent in house chili garlic oil — chili sourced from the hills.',                    category: 'Momo', subCategory: 'Momo (Chicken)', price: 105, isVeg: false },
  { id: 23, name: 'Chicken Kothey Momo [5 Pcs]',            description: 'Steamed momo one side seared in butter.',                                                                       category: 'Momo', subCategory: 'Momo (Chicken)', price: 115, isVeg: false },
  { id: 24, name: 'Chicken Pahadi Momo [5 Pcs]',             description: 'Steamed momo paired with authentic chutney.',                                                                  category: 'Momo', subCategory: 'Momo (Chicken)', price: 95,  isVeg: false },
  { id: 25, name: 'Chicken Gravy Momo [5 Pcs]',              description: 'Steam momo layered with a white creamy peanut gravy.',                                                        category: 'Momo', subCategory: 'Momo (Chicken)', price: 125, isVeg: false },
  { id: 26, name: 'Chicken Siti Momo [5 Pcs]',               description: 'Momos dipped in minced chicken Nepali lentil curry, pressure cooked to perfection.',                          category: 'Momo', subCategory: 'Momo (Chicken)', price: 135, isVeg: false },
  { id: 27, name: 'Chicken Fried Momo [5 Pcs]',              description: 'Steam Momo simply fried. No fancy stuff!',                                                                     category: 'Momo', subCategory: 'Momo (Chicken)', price: 115, isVeg: false },

  // ── Momo (Mutton) ─────────────────────────────────────────────────────────
  { id: 28, name: 'Mutton Pahadi Momo [5 Pcs]',              description: 'Steamed momo paired with authentic chutney.',                                                                   category: 'Momo', subCategory: 'Momo (Mutton)',  price: 135, isVeg: false },
  { id: 29, name: 'Mutton Kothey Momo [5 Pcs]',              description: 'Steamed momo one side seared in butter.',                                                                      category: 'Momo', subCategory: 'Momo (Mutton)',  price: 155, isVeg: false },
  { id: 30, name: 'Mutton Gravy Momo [5 Pcs]',               description: 'Steam momo layered with a white creamy peanut gravy.',                                                        category: 'Momo', subCategory: 'Momo (Mutton)',  price: 165, isVeg: false },
  { id: 31, name: 'Mutton Jhol Momo [5 Pcs]',                description: 'Steamed momo immersed in a traditional pahadi thin jhol made of tomato and sesame.',                          category: 'Momo', subCategory: 'Momo (Mutton)',  price: 145, isVeg: false },
  { id: 32, name: 'Mutton Sunaolo Baruka [5 Pcs]',           description: 'Crispy fried momo.',                                                                                           category: 'Momo', subCategory: 'Momo (Mutton)',  price: 155, isVeg: false },
  { id: 33, name: 'Mutton Soupy Momo [5 Pcs]',               description: 'Steam momo dipped in a soup.',                                                                                 category: 'Momo', subCategory: 'Momo (Mutton)',  price: 155, isVeg: false },
  { id: 34, name: 'Mutton Sadekho Momo [5 Pcs]',             description: 'Fried momo, hand mixed with spicy, tangy Nepalese masala and raw vegetables.',                                category: 'Momo', subCategory: 'Momo (Mutton)',  price: 155, isVeg: false },
  { id: 35, name: 'Mutton Saucy Pan Fried Momo [5 Pcs]',     description: 'Fried momo, wok tossed with in house sauce, green bell pepper and onion.',                                    category: 'Momo', subCategory: 'Momo (Mutton)',  price: 155, isVeg: false },
  { id: 36, name: 'Mutton Teekho Momo [5 Pcs]',              description: 'Fiery momo topped with a potent in house chili garlic oil — chili sourced from the hills.',                   category: 'Momo', subCategory: 'Momo (Mutton)',  price: 145, isVeg: false },
  { id: 37, name: 'Mutton Siti Momo [5 Pcs]',                description: 'Momos dipped in minced Nepali lentil curry, pressure cooked to perfection.',                                  category: 'Momo', subCategory: 'Momo (Mutton)',  price: 165, isVeg: false },

  // ── Himalayan MO:MO ───────────────────────────────────────────────────────
  { id: 38, name: 'Himalayan Momo (Aloo) [5 Pcs]',           description: 'Soft, steamed dumplings filled with spiced mashed potatoes, served with peanut chutney.',                     category: 'Himalayan', subCategory: 'Himalayan Aloo MO:MO',   price: 75,  isVeg: true },
  { id: 39, name: 'Fried Himalayan Momo (Aloo) [5 Pcs]',     description: 'Aloo Momo fried.',                                                                                             category: 'Himalayan', subCategory: 'Himalayan Aloo MO:MO',   price: 95,  isVeg: true },
  { id: 40, name: 'Himalayan Kothey Momo (Aloo) [5 Pcs]',    description: 'Pan seared Aloo Momo with perfect Himalayan flavour.',                                                        category: 'Himalayan', subCategory: 'Himalayan Aloo MO:MO',   price: 95,  isVeg: true },
  { id: 41, name: 'Himalayan Momo Cheese (Aloo) [5 Pcs]',    description: 'Soft dumplings filled with mashed potatoes, spices, and cheese.',                                             category: 'Himalayan', subCategory: 'Himalayan Aloo MO:MO',   price: 95,  isVeg: true },
  { id: 42, name: 'Himalayan Momo (Paneer) [5 Pcs]',         description: 'Steamed momos with paneer in a perfect Himalayan flavour.',                                                   category: 'Himalayan', subCategory: 'Himalayan Paneer MO:MO', price: 145, isVeg: true },
  { id: 43, name: 'Fried Himalayan Momo (Paneer) [5 Pcs]',   description: 'Fried momos with paneer in a perfect Himalayan flavour.',                                                     category: 'Himalayan', subCategory: 'Himalayan Paneer MO:MO', price: 165, isVeg: true },
  { id: 44, name: 'Himalayan Kothey Momo (Paneer) [5 Pcs]',  description: 'Pan seared momos with paneer in a perfect Himalayan flavour.',                                                category: 'Himalayan', subCategory: 'Himalayan Paneer MO:MO', price: 165, isVeg: true },
  { id: 45, name: 'Himalayan Momo (Chicken) [5 Pcs]',        description: 'Steamed momos mixed with minced chicken and mutton for a perfect Himalayan flavour.',                         category: 'Himalayan', subCategory: 'Himalayan Chicken MO:MO', price: 115, isVeg: false },
  { id: 46, name: 'Fried Himalayan Momo (Chicken) [5 Pcs]',  description: 'Fried momos mixed with minced chicken and mutton for a perfect Himalayan flavour.',                           category: 'Himalayan', subCategory: 'Himalayan Chicken MO:MO', price: 125, isVeg: false },
  { id: 47, name: 'Himalayan Kothey Momo (Chicken) [5 Pcs]', description: 'Pan seared momos mixed with minced chicken and mutton for a perfect Himalayan flavour.',                      category: 'Himalayan', subCategory: 'Himalayan Chicken MO:MO', price: 125, isVeg: false },

  // ── Dumplings ─────────────────────────────────────────────────────────────
  { id: 48, name: 'Prawns Dumplings [5 Pcs]',                description: 'Delicate fresh prawns harmonised with celery, sesame oil, topped with in-house chilli oil.',                 category: 'Dumpling', subCategory: 'Prawn Dumpling',       price: 185, isVeg: false },
  { id: 49, name: 'Prawn Pan Seared [5 Pcs]',                description: 'Prawn dumpling seared in butter.',                                                                             category: 'Dumpling', subCategory: 'Prawn Dumpling',       price: 205, isVeg: false },
  { id: 50, name: 'Veg Wonton [6 Pcs]',                      description: 'Crispy, golden-fried hand-folded dumplings filled with seasoned veggies, served with a tangy dipping sauce.', category: 'Dumpling', subCategory: 'Wonton',               price: 105, isVeg: true },
  { id: 51, name: 'Chicken Wonton [6 Pcs]',                  description: 'Crispy, golden-fried hand-folded dumplings filled with seasoned chicken, served with a tangy dipping sauce.', category: 'Dumpling', subCategory: 'Wonton',               price: 125, isVeg: false },
  { id: 52, name: 'Prawn Wonton [6 Pcs]',                    description: 'Crispy, golden-fried hand-folded dumplings filled with seasoned prawn, served with a tangy dipping sauce.',  category: 'Dumpling', subCategory: 'Wonton',               price: 155, isVeg: false },
  { id: 53, name: 'Chicken Wonton | Chicken Manchow Combo',  description: 'Crispy golden-fried chicken wontons [6 pc] served with Chicken Manchow Soup.',                               category: 'Dumpling', subCategory: 'Wonton',               price: 175, isVeg: false },
  { id: 54, name: 'Veg Wonton | Veg Manchow Combo',          description: 'Crispy golden-fried veg wontons [6 pc] served with Veg Manchow Soup.',                                       category: 'Dumpling', subCategory: 'Wonton',               price: 155, isVeg: true },
  { id: 55, name: 'Shu Mai',                                  description: 'Open dumpling with minced chicken, prawn and mushroom.',                                                      category: 'Dumpling', subCategory: 'Shumai',               price: 205, isVeg: false },
  { id: 56, name: 'Rice Paper Dumpling (Veg)',                description: 'Crispy, chewy rice paper pockets packed with a savory ginger-infused medley of fresh vegetables and herbs.', category: 'Dumpling', subCategory: 'Rice Paper Dumpling',  price: 205, isVeg: true },
  { id: 57, name: 'Rice Paper Dumpling (Chicken)',            description: 'Juicy savory minced chicken and scallions wrapped in a perfectly pan-fried, chewy rice paper shell.',        category: 'Dumpling', subCategory: 'Rice Paper Dumpling',  price: 215, isVeg: false },

  // ── Starters (Veg) ────────────────────────────────────────────────────────
  { id: 58, name: 'Chilli Baby Corn [8 Pcs]',        description: 'Spicy, crispy baby corn in a tangy chili sauce.',                                                                       category: 'Starters', subCategory: 'Veg Starters',     price: 195, isVeg: true },
  { id: 59, name: 'Paneer Chilli [8 Pcs]',            description: 'Crispy paneer cubes tossed in a tangy, spicy chili sauce with bell peppers and onions.',                              category: 'Starters', subCategory: 'Veg Starters',     price: 235, isVeg: true },
  { id: 60, name: 'Honey Chilli Potato',               description: 'Crispy fried potato pieces coated in a sweet and spicy sauce made with honey and chili peppers.',                   category: 'Starters', subCategory: 'Veg Starters',     price: 155, isVeg: true },
  { id: 61, name: 'Veg Manchurian [8 Pcs]',           description: 'Crispy veg balls tossed in spicy Manchurian sauce.',                                                                  category: 'Starters', subCategory: 'Veg Starters',     price: 185, isVeg: true },
  { id: 62, name: 'Veg Lollipop [4 Pcs]',             description: 'Vegetarian deep fried bite-sized delights made of finely chopped mixed vegetables and paneer.',                      category: 'Starters', subCategory: 'Veg Starters',     price: 115, isVeg: true },
  { id: 63, name: 'Paneer 65 [8 Pcs]',                description: 'Spicy, crispy marinated paneer cubes, deep-fried to perfection and served with a zesty tang.',                      category: 'Starters', subCategory: 'Veg Starters',     price: 275, isVeg: true },
  { id: 64, name: 'Chilli Mushroom [8 Pcs]',          description: 'Mushrooms stir-fried with bell peppers, onions, and garlic.',                                                         category: 'Starters', subCategory: 'Veg Starters',     price: 225, isVeg: true },
  { id: 65, name: '7-Spice Herbed Potato',             description: 'Crispy fried potato pieces coated in a flavorful paste of onion, green chilies, coriander, and mint leaves.',       category: 'Starters', subCategory: 'Veg Starters',     price: 165, isVeg: true },
  { id: 66, name: '7-Spice Herbed Paneer [8 Pcs]',    description: 'Paneer cooked in a fragrant blend of onion, green chilies, coriander, and mint paste.',                              category: 'Starters', subCategory: 'Veg Starters',     price: 275, isVeg: true },

  // ── Starters (Chicken) ────────────────────────────────────────────────────
  { id: 67, name: 'Chicken Lollipop [5 Pcs]',         description: 'Deep-fried chicken lollipops in a spicy garlic sauce.',                                                               category: 'Starters', subCategory: 'Chicken Starters', price: 245, isVeg: false },
  { id: 68, name: 'Chilli Chicken [8 Pcs]',            description: 'Chicken stir-fried with green bell pepper, onions, garlic and in-house sauces.',                                    category: 'Starters', subCategory: 'Chicken Starters', price: 225, isVeg: false },
  { id: 69, name: 'Butter Garlic Chicken [8 Pcs]',    description: 'Juicy chicken in a rich, creamy butter garlic sauce.',                                                                category: 'Starters', subCategory: 'Chicken Starters', price: 235, isVeg: false },
  { id: 70, name: 'Chicken Hot Wings [6 Pcs]',         description: 'Spicy, crispy chicken wings tossed in a bold, tangy sauce.',                                                         category: 'Starters', subCategory: 'Chicken Starters', price: 215, isVeg: false },
  { id: 71, name: 'Lemon Chicken [8 Pcs]',             description: 'Zesty fried chicken tossed in a tangy lemon sauce.',                                                                 category: 'Starters', subCategory: 'Chicken Starters', price: 235, isVeg: false },
  { id: 72, name: 'Honey Chicken [8 Pcs]',             description: 'Fried chicken cubes sauteed in garlic, in-house sauces and drizzles of honey.',                                     category: 'Starters', subCategory: 'Chicken Starters', price: 215, isVeg: false },
  { id: 73, name: 'Pepper Chicken [8 Pcs]',            description: 'Chicken stir-fried with garlic and in-house pepper sauce.',                                                          category: 'Starters', subCategory: 'Chicken Starters', price: 215, isVeg: false },
  { id: 74, name: 'Chicken Dragon [8 Pcs]',            description: 'Crunchy chicken strips, onions, and bell peppers in a spicy sauce.',                                                 category: 'Starters', subCategory: 'Chicken Starters', price: 255, isVeg: false },
  { id: 75, name: 'Chicken 65 [8 Pcs]',                description: 'Deep-fried chicken in a spicy yogurt sauce with mustard seeds and curry leaves.',                                    category: 'Starters', subCategory: 'Chicken Starters', price: 265, isVeg: false },
  { id: 76, name: 'Chicken Manchurian [8 Pcs]',        description: 'Fried chicken cubes tossed with green bell pepper, onions, garlic, and Manchurian sauce.',                          category: 'Starters', subCategory: 'Chicken Starters', price: 255, isVeg: false },
  { id: 77, name: 'Caoben Luse Chicken [8 Pcs]',       description: 'Fried chicken cooked in a flavorful paste of onion, green chilies, coriander, and mint leaves.',                   category: 'Starters', subCategory: 'Chicken Starters', price: 265, isVeg: false },

  // ── Starters (Fish & Prawns) ──────────────────────────────────────────────
  { id: 78, name: 'Fish Chilli [6 Pcs]',               description: '6 pieces of basa cubes in a fiery chili sauce.',                                                                     category: 'Starters', subCategory: 'Fish & Prawns',    price: 235, isVeg: false },
  { id: 79, name: 'Fish in Butter Garlic Sauce [6 Pcs]', description: '6 pieces of basa cubes tossed in butter garlic sauce.',                                                            category: 'Starters', subCategory: 'Fish & Prawns',    price: 245, isVeg: false },
  { id: 80, name: 'Prawn Salt & Pepper [6 Pcs]',        description: '6 flash-fried king prawns, bursting with savory salt and pepper flavor.',                                          category: 'Starters', subCategory: 'Fish & Prawns',    price: 295, isVeg: false },
  { id: 81, name: 'Prawn in Butter Garlic Sauce [6 Pcs]', description: '6 flash-fried king prawns tossed in butter garlic sauce.',                                                       category: 'Starters', subCategory: 'Fish & Prawns',    price: 285, isVeg: false },
  { id: 82, name: 'Prawn Chilli [6 Pcs]',               description: '6 flash-fried king prawns in a fiery chili sauce.',                                                                category: 'Starters', subCategory: 'Fish & Prawns',    price: 275, isVeg: false },

  // ── Mains — Noodles ───────────────────────────────────────────────────────
  { id: 83, name: 'Wok Tossed Noodles [Veg]',           description: 'Wok tossed thin noodles with choice of vegetables.',                                                                category: 'Mains', subCategory: 'Wok Tossed Noodles',  price: 145, isVeg: true },
  { id: 84, name: 'Wok Tossed Noodles [Egg]',           description: 'Wok tossed thin noodles with choice of vegetables and egg.',                                                       category: 'Mains', subCategory: 'Wok Tossed Noodles',  price: 155, isVeg: 'egg' },
  { id: 85, name: 'Wok Tossed Noodles [Chicken]',       description: 'Wok tossed thin noodles with choice of vegetables and chicken.',                                                   category: 'Mains', subCategory: 'Wok Tossed Noodles',  price: 175, isVeg: false },
  { id: 86, name: 'Wok Tossed Noodles [Mixed]',         description: 'Wok tossed thin noodles with choice of vegetables, egg and chicken.',                                              category: 'Mains', subCategory: 'Wok Tossed Noodles',  price: 195, isVeg: false },
  { id: 87, name: 'Garlic Noodles [Veg]',               description: 'Wok tossed noodles with butter, garlic and red chili flakes.',                                                     category: 'Mains', subCategory: 'Garlic Noodles',       price: 155, isVeg: true },
  { id: 88, name: 'Garlic Noodles [Egg]',               description: 'Wok tossed noodles with butter, garlic and red chili flakes. Added with egg.',                                    category: 'Mains', subCategory: 'Garlic Noodles',       price: 165, isVeg: 'egg' },
  { id: 89, name: 'Garlic Noodles [Chicken]',           description: 'Wok tossed noodles with butter, garlic and red chili flakes. Added with chicken.',                                 category: 'Mains', subCategory: 'Garlic Noodles',       price: 185, isVeg: false },
  { id: 90, name: 'Garlic Noodles [Mixed]',             description: 'Wok tossed noodles with butter, garlic and red chili flakes. Added with chicken and egg.',                         category: 'Mains', subCategory: 'Garlic Noodles',       price: 205, isVeg: false },
  { id: 91, name: 'Schezwan Noodles [Veg]',             description: 'Wok tossed noodles with in-house spicy schezwan sauce.',                                                           category: 'Mains', subCategory: 'Schezwan Noodles',    price: 165, isVeg: true },
  { id: 92, name: 'Schezwan Noodles [Egg]',             description: 'Wok tossed noodles with in-house spicy schezwan sauce and egg.',                                                   category: 'Mains', subCategory: 'Schezwan Noodles',    price: 175, isVeg: 'egg' },
  { id: 93, name: 'Schezwan Noodles [Chicken]',         description: 'Wok tossed noodles with in-house spicy schezwan sauce and chicken.',                                               category: 'Mains', subCategory: 'Schezwan Noodles',    price: 195, isVeg: false },
  { id: 94, name: 'Schezwan Noodles [Mixed]',           description: 'Wok tossed noodles with in-house spicy schezwan sauce, egg and chicken.',                                          category: 'Mains', subCategory: 'Schezwan Noodles',    price: 215, isVeg: false },

  // ── Mains — Rice ──────────────────────────────────────────────────────────
  { id: 95,  name: 'Fried Rice [Veg]',                   description: 'Steamed rice wok stirred with light veggies.',                                                                     category: 'Mains', subCategory: 'Rice',              price: 145, isVeg: true },
  { id: 96,  name: 'Fried Rice [Egg]',                   description: 'Steamed rice wok stirred with light veggies and eggs.',                                                            category: 'Mains', subCategory: 'Rice',              price: 165, isVeg: 'egg' },
  { id: 97,  name: 'Fried Rice [Chicken]',               description: 'Steamed rice wok stirred with light veggies and chicken.',                                                         category: 'Mains', subCategory: 'Rice',              price: 175, isVeg: false },
  { id: 98,  name: 'Fried Rice [Mixed]',                 description: 'Steamed rice wok stirred with light veggies, egg, and chicken.',                                                   category: 'Mains', subCategory: 'Rice',              price: 195, isVeg: false },
  { id: 99,  name: 'Schezwan Fried Rice [Veg]',          description: 'Steamed rice wok stirred with light veggies and in-house schezwan sauce.',                                        category: 'Mains', subCategory: 'Schezwan Rice',    price: 175, isVeg: true },
  { id: 100, name: 'Schezwan Fried Rice [Egg]',          description: 'Steamed rice wok stirred with light veggies, eggs and in-house schezwan sauce.',                                  category: 'Mains', subCategory: 'Schezwan Rice',    price: 205, isVeg: 'egg' },
  { id: 101, name: 'Schezwan Fried Rice [Chicken]',      description: 'Steamed rice wok stirred with light veggies and chicken in in-house schezwan sauce.',                             category: 'Mains', subCategory: 'Schezwan Rice',    price: 225, isVeg: false },
  { id: 102, name: 'Schezwan Mixed Fried Rice',           description: 'Steamed rice wok stirred with light veggies, egg, and chicken in in-house schezwan sauce.',                      category: 'Mains', subCategory: 'Schezwan Rice',    price: 245, isVeg: false },

  // ── Tibetan Delights ──────────────────────────────────────────────────────
  { id: 103, name: 'Veg Thukpa',                          description: 'Tibetan noodle soup infused with vegetables. Slightly tangy to indulge.',                                         category: 'Tibetan Delights', subCategory: 'Thupka',       price: 225, isVeg: true },
  { id: 104, name: 'Thukpa (Egg)',                         description: 'Tibetan noodle soup infused with vegetables and poached egg. Slightly tangy to indulge.',                        category: 'Tibetan Delights', subCategory: 'Thupka',       price: 245, isVeg: 'egg' },
  { id: 105, name: 'Chicken Thukpa',                       description: 'Tibetan noodle soup infused with vegetables, chicken pieces and poached egg. Slightly tangy to indulge.',       category: 'Tibetan Delights', subCategory: 'Thupka',       price: 265, isVeg: false },
  { id: 106, name: 'Veg Laphing',                          description: 'Savory cold wrapped dish, seasoned with bold mix of chili oil and dry Wai Wai.',                                 category: 'Tibetan Delights', subCategory: 'Laphing',      price: 85,  isVeg: true },
  { id: 107, name: 'Chicken Laphing',                      description: 'Savory cold wrapped dish, seasoned with bold mix of chili oil and dry Wai Wai.',                                 category: 'Tibetan Delights', subCategory: 'Laphing',      price: 95,  isVeg: false },
  { id: 108, name: 'Mutton Laphing',                       description: 'Savory cold wrapped dish, seasoned with bold mix of chili oil and dry Wai Wai.',                                 category: 'Tibetan Delights', subCategory: 'Laphing',      price: 115, isVeg: false },
  { id: 109, name: 'Veg Jhol Laphing',                     description: 'Spicy, savoury cold-wrapped laphing dipped in hot peanut jhol.',                                                 category: 'Tibetan Delights', subCategory: 'Laphing',      price: 105, isVeg: true },
  { id: 110, name: 'Chicken Jhol Laphing',                 description: 'Spicy, savoury cold-wrapped laphing dipped in hot peanut jhol.',                                                 category: 'Tibetan Delights', subCategory: 'Laphing',      price: 115, isVeg: false },
  { id: 111, name: 'Mutton Jhol Laphing',                  description: 'Spicy, savoury cold-wrapped laphing dipped in hot peanut jhol.',                                                 category: 'Tibetan Delights', subCategory: 'Laphing',      price: 135, isVeg: false },
  { id: 112, name: 'Chicken Sha-Phaley',                   description: 'Deep fried Nepalese styled bread stuffed with chicken with exclusive chutney.',                                  category: 'Tibetan Delights', subCategory: 'Sha-Phaley',  price: 95,  isVeg: false },
  { id: 113, name: 'Mutton Sha-Phaley',                    description: 'Deep fried Nepalese styled bread stuffed with mutton with exclusive chutney.',                                   category: 'Tibetan Delights', subCategory: 'Sha-Phaley',  price: 155, isVeg: false },

  // ── Cigar Rolls ───────────────────────────────────────────────────────────
  { id: 114, name: 'Veg Cigar Rolls [5 Pcs]',             description: 'Cylindrically-shaped deep fried small rolls.',                                                                    category: 'Cigar Rolls', subCategory: 'Cigar Roll',       price: 115, isVeg: true },
  { id: 115, name: 'Chicken Cigar Rolls [5 Pcs]',          description: 'Cylindrically-shaped deep fried small rolls.',                                                                   category: 'Cigar Rolls', subCategory: 'Cigar Roll',       price: 125, isVeg: false },
  { id: 116, name: 'Veg Cheese Cigar Rolls [5 Pcs]',       description: 'Cylindrically-shaped deep fried small rolls with cheese.',                                                      category: 'Cigar Rolls', subCategory: 'Cheese Cigar Roll', price: 135, isVeg: true },
  { id: 117, name: 'Chicken Cheese Cigar Rolls [5 Pcs]',   description: 'Cylindrically-shaped deep fried small rolls with cheese.',                                                      category: 'Cigar Rolls', subCategory: 'Cheese Cigar Roll', price: 145, isVeg: false },

  // ── Combos ────────────────────────────────────────────────────────────────
  { id: 118, name: 'Garlic Noodle Combo (Butter Garlic)',   description: 'Garlic Noodles paired with butter garlic chicken.',                                                              category: 'Combos', subCategory: 'Garlic Noodle Combo', price: 205, isVeg: false },
  { id: 119, name: 'Garlic Noodle Combo (Chilli Chicken)',  description: 'Garlic Noodles paired with chilli chicken.',                                                                    category: 'Combos', subCategory: 'Garlic Noodle Combo', price: 205, isVeg: false },
  { id: 120, name: 'Garlic Noodle Combo (Paneer Chilli)',   description: 'Garlic Noodles paired with chilli paneer.',                                                                     category: 'Combos', subCategory: 'Garlic Noodle Combo', price: 185, isVeg: true },
  { id: 121, name: 'Garlic Noodle Combo (Veg Manchurian)',  description: 'Garlic Noodles paired with veg manchurian.',                                                                    category: 'Combos', subCategory: 'Garlic Noodle Combo', price: 185, isVeg: true },
  { id: 122, name: 'Rice Combo (Butter Garlic)',             description: 'Fried Rice paired with butter garlic chicken.',                                                                 category: 'Combos', subCategory: 'Rice Combo',           price: 235, isVeg: false },
  { id: 123, name: 'Rice Combo (Chilli Chicken)',            description: 'Fried Rice paired with chilli chicken.',                                                                        category: 'Combos', subCategory: 'Rice Combo',           price: 235, isVeg: false },
  { id: 124, name: 'Rice Combo (Paneer Chilli)',             description: 'Fried Rice paired with chilli paneer.',                                                                         category: 'Combos', subCategory: 'Rice Combo',           price: 205, isVeg: true },
  { id: 125, name: 'Rice Combo (Manchurian)',                description: 'Fried Rice paired with veg manchurian.',                                                                        category: 'Combos', subCategory: 'Rice Combo',           price: 205, isVeg: true },

  // ── Frankies ──────────────────────────────────────────────────────────────
  { id: 126, name: 'Veg Frankie',                            description: 'Filled with masala of your choice, all wrapped up in a thin flat bread.',                                      category: 'Frankies', subCategory: 'Frankie', price: 95,  isVeg: true },
  { id: 127, name: 'Chicken Frankie',                        description: 'Filled with chicken masala, all wrapped up in a thin flat bread with egg.',                                    category: 'Frankies', subCategory: 'Frankie', price: 105, isVeg: false },
  { id: 128, name: 'Mutton Frankie',                         description: 'Filled with mutton masala, all wrapped up in a thin flat bread with egg.',                                     category: 'Frankies', subCategory: 'Frankie', price: 165, isVeg: false },

  // ── Beverages ─────────────────────────────────────────────────────────────
  { id: 129, name: 'Mineral Water',           description: 'Chilled mineral water.',                  category: 'Beverages', subCategory: 'Mineral Water', price: 10,  isVeg: true },
  { id: 130, name: 'Kaccha Aam Mocktail',     description: 'Mocktail with raw mango and soda base.',  category: 'Beverages', subCategory: 'Mocktail',      price: 85,  isVeg: true },
  { id: 131, name: 'Orange Crush Mocktail',   description: 'Mocktail with soda base.',               category: 'Beverages', subCategory: 'Mocktail',      price: 85,  isVeg: true },
  { id: 132, name: 'Blue Lagoon Mocktail',    description: 'Mocktail with soda base.',               category: 'Beverages', subCategory: 'Mocktail',      price: 85,  isVeg: true },
  { id: 133, name: 'Pineapple Punch',         description: 'Mocktail with soda base.',               category: 'Beverages', subCategory: 'Mocktail',      price: 85,  isVeg: true },
  { id: 134, name: 'Lime Cordial',            description: 'Mocktail with soda base.',               category: 'Beverages', subCategory: 'Mocktail',      price: 85,  isVeg: true },
];

// Ordered list of categories for display
export const MENU_CATEGORIES = [
  'Momo',
  'Himalayan',
  'Starters',
  'Dumpling',
  'Tibetan Delights',
  'Cigar Rolls',
  'Mains',
  'Combos',
  'Soup',
  'Frankies',
  'Beverages',
];

// Category display labels
export const CATEGORY_LABELS = {
  Momo:             'MO:MO',
  Himalayan:        'Himalayan MO:MO',
  Starters:         'Starters',
  Dumpling:         'Dumplings',
  'Tibetan Delights': 'Tibetan Delights',
  'Cigar Rolls':    'Cigar Rolls',
  Mains:            'Mains',
  Combos:           'Combos',
  Soup:             'Soups',
  Frankies:         'Frankies',
  Beverages:        'Beverages',
};
