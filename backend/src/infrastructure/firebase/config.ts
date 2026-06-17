import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

const keyFilePath = path.resolve(__dirname, '../../../serviceAccountKey.json');
console.log('[Firebase] Carregando chave de:', keyFilePath);
console.log('[Firebase] Arquivo existe:', fs.existsSync(keyFilePath));

const serviceAccount = JSON.parse(fs.readFileSync(keyFilePath, 'utf-8'));
console.log('[Firebase] client_email:', serviceAccount.client_email);
console.log('[Firebase] key inicio:', serviceAccount.private_key?.substring(27, 57));
console.log('[Firebase] admin.apps.length:', admin.apps.length);
console.log('[Firebase] admin.credential existe:', !!admin.credential);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('[Firebase] App inicializado com sucesso');
} else {
  console.log('[Firebase] App já estava inicializado');
}

export const auth = admin.auth();

const firestore = admin.firestore();
// preferRest avoids gRPC/google-gax connectivity issues on Windows
firestore.settings({ preferRest: true });
export const db = firestore;

export const storage = admin.storage();
