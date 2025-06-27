## Project "SmartHub"

Smarthub is a web application that serves as an interactive single page dashboard.
The goal is to provide the user with quick access to essential everyday tools like: Google search, AI chat, news feed, cryptocurrency/stock prices, favorite links, quick notes, and a simple to-do list.
And more to come...

Tech Stack
* Frontend: Next.js
* Design Library: Material-UI
* Backend: Java Spring Boot
* Database: PostgreSQL

-------------------------------------
It's Recommended to use Vscode and IntelliJ

Requierments:
Docker-desktop, running

#### Getting Started

1. Clone repository
2. In IntelliJ, Open smarthub/backend folder and Run SmartHubApplication.
Now the webserver and the docker container with the database should be running.

3. In Vscode, Open smarthub/frontend folder and Install all modules:
```bash
cd frontend
npm install

```
3. Create or move .env.local file to smarthub/frontend


4. Run local dev server:
```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the website.
