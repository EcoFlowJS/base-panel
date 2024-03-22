import { Outlet } from "react-router-dom";
import { initService } from "../../service/init/init.service";
import redirect from "../../utils/redirect/redirect";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import initStatusState, {
  isLoggedIn,
  isLoggedOut,
} from "../../store/initStatusState.store";
import Loading from "../../components/Loading/Loading.component";
import {
  errorNotification,
  successNotification,
} from "../../store/notification.store";
import { useNotification } from "@eco-flow/components-lib";
import { connectSocketIO } from "../../utils/socket.io/socket.io";
import baseSocketIOHndlers from "./baseSocketIO.handlers";
import { userPermissions } from "../../store/users.store";
import defaultPermissions from "../../defaults/defaultPermissions.default";
import fetchUserPermissions from "../../service/user/fetchUserPermissions.service";

const socket = connectSocketIO(["roles", "users", "setup"]);

export default function BaseLayout() {
  const re = redirect();
  const [isLoading, setLoading] = useState(true);
  const [initStatus, setinitStatus] = useAtom(initStatusState);
  const [loggedOut, setLoggedOut] = useAtom(isLoggedOut);
  const [loggedIn, setLoggedIn] = useAtom(isLoggedIn);

  const [isDisConnectedAfterConnect, setIsDisConnectedAfterConnect] =
    useState(false);
  const setUserPermissions = useAtom(userPermissions)[1];
  socket.on("connect", () => setIsDisConnectedAfterConnect(true));

  const [successNotificationMessage, setSuccessNotificationMessage] =
    useAtom(successNotification);
  const [errorNotificationMessage, setErrorNotificationMessage] =
    useAtom(errorNotification);

  const errorNoti = useNotification({
    type: "error",
    header: (
      <>
        {errorNotificationMessage.header ? errorNotificationMessage.header : ""}
      </>
    ),
    placement: errorNotificationMessage.placement,
    children: (
      <>
        {errorNotificationMessage.message
          ? errorNotificationMessage.message
          : ""}
      </>
    ),
  });

  const successNoti = useNotification({
    type: "success",
    header: (
      <>
        {successNotificationMessage.header
          ? successNotificationMessage.header
          : ""}
      </>
    ),
    placement: successNotificationMessage.placement,
    children: (
      <>
        {successNotificationMessage.message
          ? successNotificationMessage.message
          : ""}
      </>
    ),
  });

  useEffect(() => {
    initService().then((status) => {
      setinitStatus({ ...status });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (successNotificationMessage.show) {
      setSuccessNotificationMessage({
        ...successNotificationMessage,
        show: false,
      });
      successNoti.show();
    }
  }, [successNotificationMessage]);

  useEffect(() => {
    if (errorNotificationMessage.show) {
      setErrorNotificationMessage({ ...errorNotificationMessage, show: false });
      errorNoti.show();
    }
  }, [errorNotificationMessage]);

  useEffect(() => {
    if (initStatus.isNew && !initStatus.isLoggedIn) re("setup");
    if (!initStatus.isNew && !initStatus.isLoggedIn) re("login");
    if (!initStatus.isNew && initStatus.isLoggedIn) {
      re("dashboard");
      if (socket.disconnected && isDisConnectedAfterConnect) socket.connect();
      baseSocketIOHndlers(socket, initStatus.userID!).onRoleUpdate((value) =>
        setUserPermissions({ ...defaultPermissions, ...value })
      );
      fetchUserPermissions(initStatus.userID!, "Permissions").then(
        (response) => {
          if (response.success) {
            setUserPermissions({
              ...defaultPermissions,
              ...response.payload.permissions,
            });
          }
        }
      );
    }
  }, [initStatus]);

  useEffect(() => {
    if (loggedOut) {
      setLoggedOut(false);
      setinitStatus({ ...initStatus, isLoggedIn: false });
    }
  }, [loggedOut]);

  useEffect(() => {
    if (loggedIn) {
      setLoggedIn(false);
      setinitStatus({ ...initStatus, isLoggedIn: true });
    }
  }, [loggedIn]);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
}
