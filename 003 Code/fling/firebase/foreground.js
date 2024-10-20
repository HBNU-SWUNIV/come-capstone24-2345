import { messaging } from "@/firebase/firebaseDB";
import { onMessage } from "firebase/messaging";

onMessage(messaging, (payload) => {
  const title = payload.notification.title;
  const options = {
    body: payload.notification.body,
    icon: "/icons/icon.png",
  };

  if (Notification.permission === "granted") {
    new Notification(title, options);
  }
});
