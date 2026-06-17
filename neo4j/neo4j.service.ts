import { driver } from "./driver";

export class Neo4jService {
  async run(query: string, params: Record<string, any> = {}) {
    const session = driver.session();

    try {
      const result = await session.run(query, params);
      return result.records;
    } finally {
      await session.close();
    }
  }
}