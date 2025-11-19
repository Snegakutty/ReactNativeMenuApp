#Menu API

A robust RESTful API backend for managing restaurant menu items, categories, and addons. Built with TypeScript, Express.js, and Sequelize ORM.

## 🚀 Features

- **Category Management**: Create, read, update, and delete menu categories
- **Item Management**: Manage menu items with attributes like name, price, veg type, size, and prep time
- **Addon Management**: Global addon management with item-specific linking
- **RESTful API**: Clean and intuitive API endpoints
- **Data Validation**: Request validation using Zod schemas
- **Error Handling**: Centralized error handling with custom error classes
- **Logging**: Comprehensive logging using Winston
- **Database**: MySQL database with Sequelize ORM
- **Testing**: Unit tests with Jest and Supertest
- **TypeScript**: Full TypeScript support for type safety

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MySQL** (v8.0 or higher)
- **TypeScript** (installed as dev dependency)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd foodhubMenu
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
DB_NAME=foodhub_v3
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
NODE_ENV=development
```

4. Create the database:
```sql
CREATE DATABASE foodhub_v3;
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
This will start the server with hot-reload using `ts-node-dev`.

### Production Mode
```bash
npm run build
npm start
```

The server will start at `http://localhost:3000` (or the port specified in your `.env` file).

## 📚 API Endpoints

### Categories

- `POST /categories` - Create a new category
  - Body: `{ "name": "string" }`

- `GET /categories` - Get all categories

- `PUT /categories/:id` - Update a category
  - Body: `{ "name": "string" }`

- `DELETE /categories/:id` - Delete a category

### Items

- `POST /items/:categoryId` - Create a new item under a category
  - Body: `{ "name": "string", "veg_type": "VEG" | "NON-VEG", "price": number, "is_bestseller": boolean, "size": "string" (optional), "prep_time_mins": number (optional) }`

- `GET /items/:categoryId` - Get all items under a category

- `PUT /items/:itemId` - Update an item
  - Body: `{ "name": "string", "veg_type": "VEG" | "NON-VEG", "price": number, "is_bestseller": boolean, "size": "string", "prep_time_mins": number }`

- `DELETE /items/:itemId` - Delete an item

### Addons

#### Global Addon Management

- `GET /addons` - Get all global addons

- `POST /addons/create` - Create a new global addon
  - Body: `{ "name": "string", "price": number }`

- `PUT /addons/update/:addonId` - Update a global addon
  - Body: `{ "name": "string", "price": number }`

- `DELETE /addons/:addonId` - Delete a global addon

#### Item-Specific Addon Management

- `POST /addons/:itemId` - Link an addon to an item
  - Body: `{ "name": "string", "price": number }`

- `GET /addons/:itemId` - Get all addons for an item

- `DELETE /addons/:itemId/:addonId` - Unlink an addon from an item

## 🗄️ Database Schema

### Category
- `id` (Primary Key, Auto Increment)
- `name` (Unique, Not Null)
- `createdAt`, `updatedAt` (Timestamps)

### Item
- `id` (Primary Key, Auto Increment)
- `name` (Not Null)
- `veg_type` (ENUM: 'VEG' | 'NON-VEG', Default: 'VEG')
- `price` (Decimal, Not Null, Default: 0)
- `is_bestseller` (Boolean, Default: false)
- `size` (String, Optional)
- `prep_time_mins` (Integer, Optional)
- `category_id` (Foreign Key -> Category.id)
- `createdAt`, `updatedAt` (Timestamps)

### Addon
- `id` (Primary Key, Auto Increment)
- `name` (Unique, Not Null)
- `price` (Decimal, Not Null, Default: 0)
- `createdAt`, `updatedAt` (Timestamps)

### ItemAddon (Join Table)
- `item_id` (Foreign Key -> Item.id)
- `addon_id` (Foreign Key -> Addon.id)

## 🧪 Testing

Run tests using:
```bash
npm test
```

The test suite uses Jest and Supertest for API testing. Tests are configured to use an in-memory SQLite database.

## 📁 Project Structure

```
foodhubMenu/
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── config/
│   │   ├── db.ts             # Database configuration
│   │   └── logger.ts         # Winston logger configuration
│   ├── constants/
│   │   └── errorMessages.ts  # Error message constants
│   ├── controllers/
│   │   ├── AddonController.ts
│   │   ├── CategoryController.ts
│   │   └── ItemController.ts
│   ├── middleware/
│   │   ├── errorHandler.ts   # Global error handler
│   │   └── validate.ts       # Request validation middleware
│   ├── models/
│   │   ├── Addon.ts
│   │   ├── Category.ts
│   │   ├── Item.ts
│   │   ├── ItemAddon.ts
│   │   └── Index.ts          # Model associations
│   ├── routes/
│   │   ├── addons.ts
│   │   ├── categories.ts
│   │   └── items.ts
│   ├── tests/
│   │   ├── addons.test.ts
│   │   ├── categories.test.ts
│   │   └── items.test.ts
│   ├── utils/
│   │   └── AppError.ts       # Custom error class
│   └── validation/
│       └── schemas.ts        # Zod validation schemas
├── dist/                     # Compiled JavaScript files
├── public/                   # Static files
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

- `PORT` - Server port (default: 3000)
- `DB_NAME` - Database name (default: foodhub_v3)
- `DB_USER` - Database user (default: root)
- `DB_PASSWORD` - Database password (required)
- `DB_HOST` - Database host (default: localhost)
- `NODE_ENV` - Environment (development, production, test)

### TypeScript Configuration

The project uses TypeScript with strict mode enabled. Configuration is in `tsconfig.json`.

## 📝 Key Features Explained

### Transaction Support
The API uses Sequelize transactions for operations that require multiple database queries (e.g., deleting addons with their associations).

### Error Handling
Custom error handling with `AppError` class and centralized error handler middleware.

### Validation
Request validation using Zod schemas ensures data integrity before processing.

### Logging
Winston logger provides comprehensive logging for debugging and monitoring.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



---



