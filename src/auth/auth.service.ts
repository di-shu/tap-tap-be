import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateTelegramAuth(initData: string, botToken: string): boolean {
    // Parse the initData string into key-value pairs
    const urlSearchParams = new URLSearchParams(initData);
    const params = Object.fromEntries(urlSearchParams.entries());

    // Extract the hash received from Telegram
    const receivedHash = params.hash;

    delete params.hash; // Remove hash from the object for validation

    // Sort the keys of the remaining parameters and create a check string
    const checkString = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join('\n');

    // Compute a secret key using the bot token and WebAppData as hmac256 key
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    // Generate the hash for comparison
    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(checkString)
      .digest('hex');

    // Compare the received hash with the computed hash
    return computedHash === receivedHash;
  }

  extractUserInfoFromInitData(initData: string): { [k: string]: string } {
    const initDataParams = new URLSearchParams(initData);
    const params = Object.fromEntries(initDataParams.entries());
    // const userInfoParams = new URLSearchParams(params.user);
    const userInfo = JSON.parse(params.user);

    return userInfo;
  }
}
