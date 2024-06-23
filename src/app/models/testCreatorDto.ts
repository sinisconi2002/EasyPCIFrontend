import { SSHConnectionDto } from "./sshConnectionDto";
import { TestCaseDto } from "./testCaseDto";

export interface TestCreatorDto {
    Testcases : TestCaseDto[]
    Connections: SSHConnectionDto[]
}