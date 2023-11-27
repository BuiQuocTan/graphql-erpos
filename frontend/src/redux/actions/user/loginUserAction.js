import { toast } from "react-toastify";
import { LOGIN_USER } from "../../types/UserType";

const addUserAction = (data) => {
	return {
		type: LOGIN_USER,
		payload: data,
	};
};

export const addUser = (data) => {
	return (dispatch) => {
		try {
			//dispatching data
			dispatch(addUserAction(data));
			localStorage.setItem("access-token", data.token);
			localStorage.setItem("role", data.role);
			localStorage.setItem("user", data.username);
			localStorage.setItem("id", data.id);
			localStorage.setItem("isLogged", true);
			toast.success(" Login Successfully Done");

			// <Navigate to="home" />;
			return "success";
		} catch (error) {
			console.log(error.message);
			toast.error("Incorrect Username or Password !");
			return "error";
		}
	};
};
