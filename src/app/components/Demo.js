import * as React from "react";
import Button from "@mui/material/Button";
import { loginUser } from "../../api/app";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth";
import { getTokenFromRedux, getUserByUsername } from "../../api/user";
import { fetchUser } from "../../features/users";

function Demo() {
  const dispatch = useDispatch();
  const authentication = useSelector((state) => state.auth);
  const storedUser = useSelector((state) => state.users);

  const user = {
    username: "pritam",
    password: "pritam",
  };

  const callMe = async () => {
    console.log("Fetching User");
    const token = getTokenFromRedux(authentication.value.accessToken);
    const getUserRes = await getUserByUsername(
      authentication.value.username,
      token
    );
    dispatch(fetchUser(getUserRes));
  };

  return (
    <div className="App">
      <Button
        variant="contained"
        onClick={async () => {
          console.log("Logging in");
          const loginRes = await loginUser(user);
          dispatch(login(loginRes));
        }}
      >
        Login
      </Button>
      <Button variant="contained" onClick={() => callMe()}>
        Fetch User
      </Button>
      {console.log(storedUser)}
    </div>
  );
}

export default Demo;
