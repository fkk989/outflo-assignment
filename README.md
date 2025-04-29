# 📌  OutFlo Assignment

A backend API built using **Node.js**, **Express**, **MongoDB**, and **TypeScript**, with schema validation powered by **Zod**. This application let you manage your campaign.

---

## 🧰 Tech Stack

### Backend
- **Node.js** – JavaScript runtime
- **Express** – Web framework
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **TypeScript** – Static typing
- **Zod** – Runtime schema validation
- **Docker** – Running all external service like Db etc.

### Frontend 
- [***React.js***](https://vite.dev/guide/)
- [**Tailwind**](https://tailwindcss.com/docs/installation/using-vite) 

---

### **Clone the repo**

```bash
git https://github.com/fkk989/outflo-assignment.git
cd outflo-assignment
```

## ⚙️ Setup Instructions


### ✅ With Docker ( Recomended )

1. **Install Docker**:
   - [Docker for macOS](https://docs.docker.com/desktop/setup/install/mac-install/)
   - [Docker for Windows](https://docs.docker.com/desktop/setup/install/windows-install/)



3. **Start Docker daemon** and run:

   ```bash
   docker compose up -d
   ```

### ✅ Without Docker
#### db setup 
- You can run a data base locally or get it from a Mondog DB provider but here you will need you change the value of `DATABASE_URL` in .env. you can get it from [**MongoDb**](https://www.mongodb.com/)

### backend setup

#### copy enviroment varialbes from .env.example file

```bash
cp .env.example .env
```

- note: you will need to change your GEMINY_API_KEY in .env file  you can get it from here [Google Gemini key](https://aistudio.google.com/apikey)

#### Install dependencies

```bash
npm install
```

#### To start the server in dev mode

```bash
npm run dev
```

#### To start the server in prod mode

- build the project

```bash
npm run build
```

- start the project

```bash
npm run start
```

## 📘 API Endpoints

- Base Backend Url https://outflo-assignment-hyd1.onrender.com
- Please wait for 50 seconds if response take time
- Health check endpoint https://outflo-assignment-hyd1.onrender.com/health

### 👤 Auth Routes

| Method    | Endpoint           | Description           | Auth Required |
| --------- | ------------------ | --------------------- | ------------- |
| GET       | `/campaigns`       | Get all campaigns     | ❌            |
| GET       | `/campaigns/:id`   | Get Campaigns by id   | ❌            | 
| POST      | `/campaigns`.      | Create Campaigns      | ❌            | 
| PUT       | `/campaigns/:id`   | Update Campaigns      | ❌            |
| DELETE    | `/campaigns/:id`   | Soft Delete Campaign  | ❌            |

#### 📥 Input Body for auth Routes



- Create or Update Campaign input

```json
{
  "name": "Campaign 1",
  "description": "this is a campaign to find leads",
  "status": "active",
  "leads": [”https://linkedin.com/in/profile-1", ”https://linkedin.com/inprofile-2", https://linkedin.com/in/profile-3”]
  "accountIDs": [“123”, “456”]
}
```

---

### frontend

#### go to frontend directory by running this command in root directory

```bash
 cd frontend
```

#### copy enviroment varialbes from .env.example file

```bash
cp .env.example .env
```

#### Install dependencies

```bash
npm install
```

#### To start the frontend in dev mode

```bash
npm run dev
```

#### To start the frontend in prod mode

- build the project

```bash
npm run build
```

- start the project

```bash
npm run preview
```
