import * as crypto from 'crypto';

const generateApiKey = (length: number = 32): string =>  {
    return crypto.randomBytes(length).toString('hex')
}

export const Helper = {
    generateApiKey
}