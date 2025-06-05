import ResponseDto from "../shared/dtos/Response.dto";

interface IService<T> {
    main(): Promise<ResponseDto<T[]>>; // Main method to execute the service logic
}

export default IService;