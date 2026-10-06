# MERN Stack To-Do Application

A full-stack, modular, and responsive To-Do application built using the **MERN** stack (**M**ongoDB, **E**xpress.js, **R**eact, **N**ode.js). This project follows best practices in software architecture, featuring a centralized controller backend and a modular service-driven React frontend styled with modern UI design patterns.

---

## 🚀 Features

- **Full CRUD Operations**: Create, read, update (inline editing), and delete tasks.
- **Task Status Toggle**: Check/uncheck tasks with real-time visual feedback (strike-through and status badges).
- **Modular Architecture**:
  - Backend controllers separated from route definitions.
  - Frontend network requests isolated into a centralized `todoService.js`.
- **Modern UI & UX**: Styled components with clean layouts, row-hover transitions, and interactive Material Design icons (`@mui/icons-material`).
- **Loading States**: Smooth CSS spinner animation for asynchronous data fetching.
- **Robust Error Handling**: Graceful fallback states for network failures and API errors.

---

## 🛠️️ Tech Stack

### **Frontend**

- **React** (with Hooks: `useState`, `useEffect`)
- **Vite** (Fast build tool & development server)
- **Material UI Icons** (`@mui/icons-material`)
- **Vanilla CSS** (Custom scoped styling)

### **Backend**

- **Node.js** & **Express.js**
- **MongoDB Atlas** & **Mongoose** (ODM)
- **CORS** & **Dotenv** for secure environment configuration

---

## 📁 Project Structure

```text
MERNTodoApp/
├── server/
│   ├── controllers/      # Business logic handlers
│   ├── models/           # Mongoose schemas (Todo model)
│   ├── routes/           # Express API endpoints
│   ├── server.js         # Entry point for Node.js
│   └── package.json
│
└── client/               # (or frontend directory)
    ├── src/
    │   ├── components/   # UI components (TodoForm, TodoTable, LoadingSpinner)
    │   ├── services/     # Centralized fetch service (todoService.js)
    │   ├── App.jsx       # Main application layout & state orchestration
    │   └── main.jsx
    └── package.json


⚙️ Getting Started & Installation
Follow these instructions to run the project locally on your machine.

Prerequisites
Node.js (v18+ recommended)

MongoDB Atlas account (or a local MongoDB instance)

1. Clone the Repository
git clone [https://github.com/{your-username}/mern-todo-app.git](https://github.com/{your-username}/mern-todo-app.git)
cd MERNTodoApp

2. Setup the Backend
Navigate to the server directory, install dependencies, and configure environment variables.

Bash
cd server
npm install

Create a .env file inside the server directory:

Code snippet
PORT=5001
MONGODB_URI=your_mongodb_connection_string_here
Start the backend server using Nodemon:

Bash
npm run dev

3. Setup the Frontend
Open a new terminal window, navigate to your client/frontend directory, and install dependencies:

Bash
cd client
npm install
Create an environment variables file (.env) if needed, or ensure your todoService.js points to your backend URL (http://localhost:5001/api/todos).

Start the frontend development server:

Bash
npm run dev

 API Endpoints ReferenceMethodEndpointDescriptionGET/api/todosFetch all to-do tasksPOST/api/todosCreate a new to-do taskPATCH/api/todos/:id/doneToggle the completion status of a taskPUT/api/todos/:idUpdate task title or descriptionDELETE/api/todos/:idDelete a specific task💡 Future Enhancements[ ] User authentication (JWT-based Login/Register)[ ] Filter tasks by tabs (All, Active, Completed)[ ] Drag-and-drop task reordering LicenseThis project is open-source and available under the MIT License.
```
