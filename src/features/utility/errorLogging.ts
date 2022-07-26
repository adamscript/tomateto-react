import { format } from "date-fns";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const errorLogCollectionRef = collection(db, 'error-logs');

export default function insertErrorLog(action: string, err?: Error) {
    addDoc(errorLogCollectionRef, {
        action: action,
        timestamp: new Date(),
        errorName: err ? err.name.toString() : null,
        errorCause: err ? err.cause ? err.cause.toString() : null : null,
        errorMessage: err ? err.message.toString() : null,
    })
    .then(() => {
        console.log('error log inserted');
        console.log(err);
    })
    .catch((err) => {
        console.log('error while logging');
        console.log(err);
    })
}