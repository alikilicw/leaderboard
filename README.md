# NestJS Application

This project is a backend application developed using NestJS. The main packages used in the project are:

- **Mongoose**: ODM (Object Data Modeling) library for interacting with MongoDB.
- **Joi**: Data validation and schema definition.
- **JWT**: User authentication and authorization.
- **ioredis**: Efficient and fast communication with Redis.

## Installation

### Requirements

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

### Step 1: Clone the Project Repository

```bash
git clone <project-repo-url>
cd <project-directory>
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Variables

Create a `.env` file in the project directory and configure it as follows:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/nestjs-db
JWT_SECRET=your_jwt_secret
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

### Step 4: Start the Application

To run in development mode:

```bash
npm run start:dev
```

To run in production mode:

```bash
npm run build
npm run start:prod
```

## Packages Used

### 1. Mongoose

Mongoose is an ODM library used to simplify interactions with MongoDB. It is used to connect to MongoDB and define data models.

**Installation:**

```bash
npm install @nestjs/mongoose mongoose
```

**Usage:**

```typescript
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
    @Prop({ required: true })
    name: string

    @Prop({ unique: true, required: true })
    email: string

    @Prop({ required: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
```

### 2. Joi

Joi is a library used for data validation and schema definition. It is used to validate user inputs.

**Installation:**

```bash
npm install @hapi/joi
```

**Usage:**

```typescript
import * as Joi from '@hapi/joi'

export const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})
```

### 3. JWT (JSON Web Token)

JWT is used for user authentication and authorization.

**Installation:**

```bash
npm install @nestjs/jwt jsonwebtoken
```

**Usage:**

```typescript
import { JwtModule } from '@nestjs/jwt'

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' }
        })
    ]
})
export class AuthModule {}
```

### 4. ioredis

ioredis is a library used for fast and efficient communication with Redis.

**Installation:**

```bash
npm install ioredis
```

**Usage:**

```typescript
import Redis from 'ioredis'

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10)
})

redis.set('key', 'value')
redis.get('key', (err, result) => {
    console.log(result)
})
```

## Project Commands

- **`npm run start`**: Starts the application.
- **`npm run start:dev`**: Runs the application in development mode.
- **`npm run build`**: Compiles the project.
- **`npm run start:prod`**: Runs the application in production mode.

## Contributing

To contribute, please submit a pull request or open an issue.

## License

This project is licensed under the [MIT License](LICENSE).
