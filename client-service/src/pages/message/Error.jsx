import { errorAnimation } from "../../assets";
import Message from "./Message";

const Error = () => {
  console.log("Error page");
  return (
    <Message
      animation={errorAnimation}
      loop={true}
    />
  );
};

export default Error;
