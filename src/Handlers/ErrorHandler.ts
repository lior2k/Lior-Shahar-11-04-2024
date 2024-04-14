import { HttpException } from '../Constants/Exceptions';
import { HTTP_RESPONSE_CODE } from '../Constants/Constants';
import { toast } from 'react-toastify';

export const errorHandler = (err: unknown) => {
    console.error(err);
    const error = err as HttpException;
    switch (error.status) {
        case HTTP_RESPONSE_CODE.BAD_REQUEST:
            toast.error('Bad Request');
            break;
        case HTTP_RESPONSE_CODE.UNAUTHORIZED:
            toast.error('Unauthorized');
            break;
        case HTTP_RESPONSE_CODE.NO_PERMISSION:
            toast.error('No Permission');
            break;
        case HTTP_RESPONSE_CODE.NOT_FOUND:
            toast.error('Not Found');
            break;
        case HTTP_RESPONSE_CODE.SERVER_ERROR:
            toast.error('Server Error');
            break;
        default:
            toast.error('Unexpected Error');
            break;
    }
};
