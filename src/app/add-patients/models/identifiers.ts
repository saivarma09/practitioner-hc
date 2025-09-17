
export interface Identifier {
    type: string;
    description: string;
}

export interface IdentifiersResponse {
    data: Identifier[];
    success: boolean;
    resource: string;
}
