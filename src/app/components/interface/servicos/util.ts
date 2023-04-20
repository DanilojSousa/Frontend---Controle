import * as CryptoJS from 'crypto-js';
import jwt_decode from 'jwt-decode';
import { LoginService } from '../../service/login.service';
import { Observable, of } from 'rxjs';

export class Util{
    
    private static CHAVE: string = "BR_COM_CONTROLES"

    // Método para codificar uma string em Angular usando uma chave e base64

    static encode(text: string, tempo: number): string {
      const currentTime = new Date().getTime()
      const expireTime = currentTime + tempo;
      const formattedTime = new Date(expireTime).toISOString().replace(/[-:.]/g, '').replace('T', '').substr(0, 14);
      const token = text +"/"+formattedTime;
      const chaveBytes = CryptoJS.enc.Utf8.parse(this.CHAVE); // Convertendo a chave para bytes
      const encrypted = CryptoJS.AES.encrypt(token, chaveBytes, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
      return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    }

    static decode(base64: string): string {
      const chaveBytes = CryptoJS.enc.Utf8.parse(this.CHAVE); // Convertendo a chave para bytes
      const decrypted = CryptoJS.AES.decrypt(base64, chaveBytes, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      const parts = decryptedText.split('/');
      const time = parts[1];
      const text = parts[0];
      const formattedTime = time;
      const year = formattedTime.substr(0, 4);
      const month = formattedTime.substr(4, 2);
      const day = formattedTime.substr(6, 2);
      const hour = formattedTime.substr(8, 2);
      const minute = formattedTime.substr(10, 2);
      const second = formattedTime.substr(12, 2);
      const expireTime = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`).getTime();

      const currentTime = new Date().getTime();
      if (currentTime > expireTime) { // Verifica se expirou (300000 milissegundos = 5 minutos)
        console.log('Token expirado');
        return "";
      }
      return text;
    }

    static getRole(): string {
      const token = localStorage.getItem('XAuthorization');
      const decodedToken: any = jwt_decode(token!);
      return decodedToken.role.authority;
    }

}


