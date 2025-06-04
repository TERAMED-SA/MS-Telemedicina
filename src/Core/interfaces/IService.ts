import { ResponseDto } from "../shared/dtos/ResponseDto";

interface IService<T> {
    main(): Promise<ResponseDto<T[]>>; // Main method to execute the service logic
}

export default IService;
// This interface defines a generic service structure with a main method that returns a promise of ResponseDto containing an array of type T.