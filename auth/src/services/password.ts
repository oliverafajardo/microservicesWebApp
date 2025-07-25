import { scrypt as _scrypt, randomBytes, } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);


export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buf = (await scrypt(password, salt, 64)) as Buffer;

        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = (await scrypt(suppliedPassword, salt, 64)) as Buffer;

        return buf.toString('hex') === hashedPassword;
    }

    static randomBytes(length: number) {

    }
}

