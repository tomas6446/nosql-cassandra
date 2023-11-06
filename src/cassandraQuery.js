import cassandraClient from "./cassandraClient.js";

export const executeCqlQuery = (query, params, res, errorMessage) => {
  cassandraClient
    .execute(query, params, { prepare: true })
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error("Cassandra Query Execution Error:", error);
      res.status(500).json({
        error:
          errorMessage || "An error occurred while processing your request.",
      });
    });
};

export const asyncExecuteCqlQuery = async (query, params) => {
  try {
    const result = await cassandraClient.execute(query, params, {
      prepare: true,
    });
    return result;
  } catch (error) {
    console.error("Cassandra Query Execution Error:", error);
    throw error;
  }
};
