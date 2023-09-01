/// <reference types="node" />
import { Domain } from 'domain';
declare class DomainService {
    domain: any;
    findAllDomain(): Promise<Domain[]>;
}
export default DomainService;
