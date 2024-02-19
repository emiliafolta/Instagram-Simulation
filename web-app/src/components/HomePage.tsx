import { Box } from "@mui/material"
import "./HomePage.css"
import Feed from "./Feed";
import Header from "./Header";
import Login from "./Login";

const HomePage = () => {

  return (
    <Box>
      <Header />
      <Login />
      <Box className="feedContainer">
        <Feed />
      </Box>
    </Box>
    )

  };
  
export default HomePage;