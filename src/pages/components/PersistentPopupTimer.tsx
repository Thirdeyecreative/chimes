import { useEffect } from "react";
import { useAuthContext } from "../AuthContext/AuthContext";

const PersistentPopupTimer = () => {
  const { hasPopupOpened, setHasPopupOpened, isOpen, setIsOpen } =
    useAuthContext();

  useEffect(() => {
    // If popup has already opened in this session, do nothing
    if (hasPopupOpened) return;

    const timer = setTimeout(() => {
      // Check again inside timeout to be safe
      if (!hasPopupOpened && !isOpen) {
        setIsOpen(true);
        setHasPopupOpened(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, []);
  
  return null;
};

export default PersistentPopupTimer;
