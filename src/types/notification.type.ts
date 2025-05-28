
export type NotificationType = "success" | "error" | "info" | "warning";

export interface NotificationContextProps {
  showNotification: (message: string, type?: NotificationType) => void;
}