import { TestCaseDto } from './testCaseDto'
import { SSHConnectionDto } from './sshConnectionDto';

export interface TestResultDto {
    id: string;
    name: string;
    testCase: TestCaseDto;
    remote: SSHConnectionDto;
    result: string[];
    tester: string;
    linkToCore: string;
}
