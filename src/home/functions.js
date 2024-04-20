import { db, collectionRef, doc, setDoc, getDoc, updateDoc, ref, uploadBytes, storage, arrayUnion, getDownloadURL, deleteObject, arrayRemove } from '../firebase';
import { listAll } from "firebase/storage";

async function accountcreation(user) {
    try {
        const userRef = doc(collectionRef, user.email);

        const docSnapshot = await getDoc(userRef);

        if (docSnapshot.exists()) {
            console.log('A document with the provided email already exists. Not creating a new document.');
            return;
        }

        await setDoc(userRef, {
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
            subjects: [],
            pdfurl: [],
        });
        console.log('New user document created successfully with email:', user.email);
    } catch (error) {
        console.error('Error creating user document: ', error);
    }
}


async function adddata(user, subject, pdf) {
    try {
        const userRef = doc(collectionRef, user);

        // Get the existing data
        const userDoc = await getDoc(userRef);
        const existingData = userDoc.data() || {};

        // Initialize updatedPdfUrls with the existing data
        const updatedPdfUrls = {...existingData.pdfurl };

        // Get existing subjectPdfUrls or initialize it if it doesn't exist
        const subjectPdfUrls = updatedPdfUrls[subject] || [];

        // Upload new files and get their download URLs
        for (const file of pdf) {
            const storageref = ref(storage, `${user}/${subject}/${file.name}`);
            await uploadBytes(storageref, file);
            console.log('File uploaded successfully.');
            const downloadurl = await getDownloadURL(storageref);
            subjectPdfUrls.push(downloadurl);
        }

        // Update the pdfurl object with the new data
        updatedPdfUrls[subject] = subjectPdfUrls;

        // Update the document with the merged data
        await updateDoc(userRef, { pdfurl: updatedPdfUrls, subjects: arrayUnion(subject) });

        console.log('Data added successfully.');
    } catch (error) {
        console.error('Error adding data: ', error);
        throw error;
    }
}

async function getpdf(user, subject) {
    const userRef = doc(collectionRef, user);
    const docSnapshot = await getDoc(userRef);
    if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        console.log(data.pdfurl[subject]);
        return data.pdfurl[subject];
    } else {
        console.log('No such document exists!');
        return null;
    }
}

async function getdata(user) {
    const userRef = doc(collectionRef, user);
    const docSnapshot = await getDoc(userRef);
    if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        return data;
    } else {
        console.log('No such document exists!');
        return null;
    }
}


async function deletedata(user, subject) {
    try {
        const userRef = doc(collectionRef, user);

        // Get document snapshot
        const docSnapshot = await getDoc(userRef);
        if (!docSnapshot.exists()) {
            console.log('Document does not exist.');
            return;
        }

        // Delete all files within the folder
        const storageRef = ref(storage, `${user}/${subject}/`);
        const listResult = await listAll(storageRef);
        await Promise.all(listResult.items.map(async(item) => {
            await deleteObject(item);
            console.log(`File ${item.name} deleted.`);
        }));

        // Delete the folder itself
        // await deleteObject(storageRef);
        console.log(`Folder ${subject} deleted.`);

        // Update Firestore data
        const data = docSnapshot.data();
        const updatedSubjects = data.subjects.filter(s => s !== subject);
        const updatedPdfUrls = {...data.pdfurl };
        delete updatedPdfUrls[subject];

        await updateDoc(userRef, {
            subjects: updatedSubjects,
            pdfurl: updatedPdfUrls
        });

        console.log(`Subject ${subject} removed from user ${user}'s subjects and PDF URLs.`);
    } catch (error) {
        console.error('Error removing subject:', error);
    }
}



export { accountcreation, adddata, getdata, getpdf, deletedata };