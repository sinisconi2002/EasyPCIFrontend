import { CardDto } from "./cardDto";

export interface TestCaseDto {
    id: string;
    name: string;
    description: string;
    card: CardDto;
    process: string;
  }