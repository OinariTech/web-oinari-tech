import "server-only";
import { Firestore } from "@google-cloud/firestore";

// On Cloud Run this authenticates via the instance's attached service
// account (Application Default Credentials) -- no key file needed, as long
// as Firestore is enabled for the project and that service account has the
// "Cloud Datastore User" role.
let firestore: Firestore | undefined;

export function getFirestore() {
  firestore ??= new Firestore();
  return firestore;
}
