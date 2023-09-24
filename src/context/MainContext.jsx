import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const MainContext = createContext();

const MainProvider = ({ children }) => {
  const [event, setEvent] = useState(1);

  return (
    <MainContext.Provider
      value={{
        event,
        setEvent,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.element,
};

export default MainProvider;