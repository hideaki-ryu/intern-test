import { React, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { SideNav } from "./SideNav";

export default function Dashboard() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(SERVER_URL + "/api/user", {
          withCredentials: true,
        });

        setUser(data);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  });

  return (
    <Stack component="main" direction="row">
      <SideNav {...user} />
      <Box
        sx={{
          padding: "40px 53px",
          maxWidth: "100%",
          height: "100vh",
        }}
      >
        <Outlet context={user} />
      </Box>
    </Stack>
  );
}
