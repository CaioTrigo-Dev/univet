import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Read service account key file directly — avoids env var \n parsing issues
const keyFilePath = path.resolve(__dirname, '../../../serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(keyFilePath, 'utf-8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const auth = admin.auth();

const firestore = admin.firestore();
// preferRest avoids gRPC/google-gax connectivity issues on Windows
firestore.settings({ preferRest: true });
export const db = firestore;

export const storage = admin.storage();
