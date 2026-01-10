import { Client } from "src/modules/client/entity/client/client.entity";

export type PaginatedClientType = {
  data: Client[];
  current_page:number;
  total_pages:number;
};