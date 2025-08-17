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
4. Open the page ``
## Backend
Setup **uuid-ossp** in postgres.

   ```bash
    docker exec -it TMS.DB psql -U $POSTGRES_USER -d $POSTGRES_DB
   ```

   ```bash
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
