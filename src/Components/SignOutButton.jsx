import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Config/Firebase";

const SignOutButton = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        if(!currentUser){
            window.alert("No User is Currently Signed In");
        }

        const confirmed = window.confirm(`${currentUser.displayName || "User"}, Are you sure you want to sign out?`);
        if (!confirmed) return;

        try {
            await signOut(auth);
            window.alert("Signed Out Successfully");
            localStorage.removeItem("login");
            navigate("/");
        } catch (error) {
            console.error("Error signing out:", error);
            window.alert("Failed to sign out. Please try again.");
        }
    };
    
    return (
        <div className="sign_out_container">
            <button onClick={handleSignOut} className="sign_out">Log Out</button>
        </div>
    )
};

export default SignOutButton;