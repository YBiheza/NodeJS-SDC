import { TPizza } from "@pizza/api-contract/shared types/TPizza";
import { Neo4jService } from "../../../neo4j/neo4j.service";

export class ProductionRepository {
    constructor(
      private readonly neo4j: Neo4jService
    ) {}

    async getRecipe(pizzaName: TPizza) {
      const result = await this.neo4j.run(
        `
        MATCH (p:Pizza {type: $pizzaName})
          -[r:REQUIRES]->
          (i:Ingredient)

        RETURN
          i.type AS ingredient,
          i.amount AS stock,
          r.amount AS required
        `,
        {
          pizzaName
        }
      );

      return result.map(record => ({
        ingredient: record.get("ingredient"),
        stock: Number(record.get("stock")),
        required: Number(record.get("required")),
      }));
    }
}