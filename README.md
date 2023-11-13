# nosql-cassandradb

nodejs example Cassandradb

![diagram](https://github.com/tomas6446/nosql-cassandradb/assets/77100735/9cf32421-ce10-49b7-879a-715655b31e7a)

```bash
# Clone repository
git clone https://github.com/tomas6446/nosql-cassandradb

# Enter the directory
cd nosql-cassandradb

# Run Postgres container
sudo docker-compose up -d

# Copy and run the script inside container
sudo docker cp init.cql nosql-cassandra:/init.cql
sudo docker exec -i nosql-cassandra cqlsh -f /init.cql

# Run project
node index.js
```
