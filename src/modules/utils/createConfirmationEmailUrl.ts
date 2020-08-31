import {v4} from 'uuid';
import { redis } from '../../redis';


export const createConfirmationUrl = (userId: number) =>{
    const token = v4();
    redis.set(token,userId, 'ex', 60 * 60 *24)

    return `http://localhost:3000/confirmed/${token}`;
}