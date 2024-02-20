import { Box } from "@mui/material"
import "./HomePage.css"
import Feed from "./Feed";
import Header from "./Header";

const HomePage = () => {

  return (
    <Box>
      <Header />
      <Box className="feedContainer">
        <Feed />
      </Box>
    </Box>
    )

  };
  
export default HomePage;