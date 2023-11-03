import cassandra from 'cassandra-driver';

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'car_rental'
});

client.connect()
  .then(() => console.log('Connected to Cassandra'))
  .catch(error => console.error('Connection to Cassandra failed', error));

  export default client;