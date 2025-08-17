# Setup
--------
## Database.
------------
1. Install [docker](https://www.docker.com/products/docker-desktop/)
2. Clone the project.
3. Change directory to **task-management-system** directory.
4. Run `docker-compose up --build`

## Frontend
1. Open up your terminal and navigate to `/frontend` directory.
2. Install packages `npm i`
3. Start server `npm start`
4. Open the page [http://localhost:5173](http://localhost:5173)

## Backend
**NB** `settings.Development.json` contains all the values required.
1. Open up your terminal and navigate to `/backend/backend` directory.
2. Run `dotnet restore`
3. Run `dotnet build`
4. Run `dotnet ef database update` - _This will throw an error, step 5 will fix it._
5. Setup **uuid-ossp** extension in postgres.

   ```bash
    docker exec -it TMS.DB psql -U pstgres -d TMSDev
   ```

   ```bash
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
6. Run `dotnet ef database update`
7. Refresh the frontend and start managing tasks
