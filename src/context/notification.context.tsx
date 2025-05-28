import Notification from "@/components/common/Notification";
import { NotificationContextProps, NotificationType } from "@/types/notification.type";
import React, { createContext, useContext, useState, ReactNode } from "react";


const NotificationContext = createContext<NotificationContextProps>({
  showNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("info");

  const showNotification = (msg: string, notifType: NotificationType = "info") => {
    setMessage(msg);
    setType(notifType);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification open={open} message={message} type={type} onClose={handleClose} />
    </NotificationContext.Provider>
  );
};
