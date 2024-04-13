import { HttpException } from '../Constants/Exceptions';
import { HTTP_RESPONSE_CODE } from '../Constants/Constants';

export const errorHandler = (err: unknown) => {
    console.log(err);
    const error = err as HttpException;
    switch (error.status) {
        case HTTP_RESPONSE_CODE.BAD_REQUEST:
            alert('Bad Request');
            break;
        case HTTP_RESPONSE_CODE.UNAUTHORIZED:
            alert('Unauthorized');
            break;
        case HTTP_RESPONSE_CODE.NO_PERMISSION:
            alert('No Permission');
            break;
        case HTTP_RESPONSE_CODE.NOT_FOUND:
            alert('Not Found');
            break;
        case HTTP_RESPONSE_CODE.SERVER_ERROR:
            alert('Server Error');
            break;
        default:
            alert('Unexpected Error');
            break;
    }
};
