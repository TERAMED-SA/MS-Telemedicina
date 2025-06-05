export default interface ResponseDto<T> {
    timestamp?: Date;
    requestId?: string;
    clientIp?:  string;
    error: boolean;
    status: number;
    description?: string;
    message: string;
    data?: T;
}