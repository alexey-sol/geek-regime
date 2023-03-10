export type ApiExceptionData = {
    details: Record<string, string>[];
    message: string;
    path: string;
    resource: string | null;
    status: number;
    timestamp: string;
    trace: string | null;
};
