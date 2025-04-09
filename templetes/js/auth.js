// filepath: c:\Users\chinn\OneDrive\Desktop\webapplication\testwebmobile\templetes\js\auth.js
import { auth } from "../sdk.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Remove Node.js-specific imports (fs and path)

// Email and Password registration with email verification and Firestore integration.

/**
 * Logs authentication events to the browser's localStorage.
 * Each log entry contains a timestamp, the event type, the user identifier (if available), 
 * and any additional data provided.
 * @param {string} event - The authentication event (e.g. 'register', 'login', 'logout', 'resetPassword').
 * @param {string|null} uid - The user's unique identifier, if applicable.
 * @param {object} additionalData - Additional details to be logged.
 */
function logAuthEvent(event, uid, additionalData = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    uid,
    ...additionalData
  };

  let logs = JSON.parse(localStorage.getItem("authLogs")) || [];
  logs.push(logEntry);
  localStorage.setItem("authLogs", JSON.stringify(logs));
}

async function registerWithEmailAndPassword(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered successfully:", userCredential.user);
    // Send email verification to the registered user.
    await sendEmailVerification(userCredential.user);
    console.log("Verification email sent.");
    // Log the registration event.
    logAuthEvent('register', userCredential.user.uid, { email });
    return userCredential;
  } catch (error) {
    console.error("Error during registration:", error);
          throw error;
      }
    }


async function loginWithEmailAndPassword(email, password) {
  try {
      console.log("Attempting login with email:", email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully:", userCredential.user);
      logAuthEvent('login', userCredential.user.uid, { email });
      return userCredential;
  } catch (error) {
      console.error("Error during login:", error);
      throw error;
  }}
window.registerWithEmailAndPassword = registerWithEmailAndPassword;
window.loginWithEmailAndPassword = loginWithEmailAndPassword;

async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User logged in with Google:", result.user);
    // Log the Google login event.
    logAuthEvent('login-google', result.user.uid);
    return result;
  } catch (error) {
    console.error("Error during Google login:", error);
    throw error;
  }
}

async function logout() {
  try {
    await signOut(auth);
    console.log("User logged out successfully.");
    // Log the logout event.
    logAuthEvent('logout', null);
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}

async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent.");
    // Log the password reset event.
    logAuthEvent('resetPassword', null, { email });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}

// Expose functions on the global window for index.html access.
window.registerWithEmailAndPassword = registerWithEmailAndPassword;
window.loginWithEmailAndPassword = loginWithEmailAndPassword;
window.loginWithGoogle = loginWithGoogle;
window.logout = logout;
window.resetPassword = resetPassword;

console.log("Auth functions attached:", {
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  loginWithGoogle,
  logout,
  resetPassword
});

export {
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  loginWithGoogle,
  logout,
  resetPassword
};



let signupcontainer=document.getElementById("signup")
let logincontainer=document.getElementById("login")
let signuplink=document.getElementById("signuplink")        
let loginlink=document.getElementById("loginlink")




loginlink.addEventListener("click",function(event){
          // Prevent the default form submission
            signupcontainer.classList.add("d-none")// Replace with your desired action
            logincontainer.classList.remove("d-none")
})

signuplink.addEventListener("click",function(event){
            // Prevent the default form submission
            logincontainer.classList.add("d-none")// Replace with your desired action
            signupcontainer.classList.remove("d-none")
})
  