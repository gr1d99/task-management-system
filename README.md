# Setup

1. Setup **uuid-ossp** in postgres.

   ```bash
    docker exec -it TMS.DB psql -U $POSTGRES_USER -d $POSTGRES_DB
   ```

   ```bash
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
