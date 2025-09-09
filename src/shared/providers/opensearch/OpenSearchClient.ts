import { Client } from '@opensearch-project/opensearch';

export const openSearchClient = new Client({
  node: process.env.OPENSEARCH_URL || 'http://localhost:9200',
  auth: {
    username: process.env.OPENSEARCH_USER || 'admin',
    password: process.env.OPENSEARCH_PASS || 'admin',
  },
  //   ssl: {
  //     rejectUnauthorized: false, // ❗ para dev/local
  //   },
});
