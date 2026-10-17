const au = { currentUser: null };
export const getAuth = () => au;
export const onAuthStateChanged = (a, cb) => { a.currentUser = { uid: "demo-admin", email: "admin@sbbarber.studio" }; setTimeout(() => cb(a.currentUser), 0); return () => {}; };
export const signOut = async () => {}; export const signInWithEmailAndPassword = async () => {}; export const signInWithPopup = async () => {}; export const signInWithRedirect = async () => {};
export class GoogleAuthProvider { setCustomParameters() {} }
