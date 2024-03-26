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
import { userPermissions } from "../../store/users.store";
import defaultPermissions from "../../defaults/defaultPermissions.default";
import fetchUserPermissions from "../../service/user/fetchUserPermissions.service";
import { Socket } from "socket.io-client";
import {
  connectSocketIO,
  disconnectSocketIO,
} from "../../utils/socket.io/socket.io";
import baseSocketIOHndlers from "./baseSocketIO.handlers";
import userSignoutService from "../../service/user/userSignout.service";

export default function BaseLayout() {
  const re = redirect();
  const [isLoading, setLoading] = useState(true);
  const [initStatus, setinitStatus] = useAtom(initStatusState);
  const [loggedOut, setLoggedOut] = useAtom(isLoggedOut);
  const [loggedIn, setLoggedIn] = useAtom(isLoggedIn);
  const [isSocketConnected, setSocketConnected] = useState(false);

  const setUserPermissions = useAtom(userPermissions)[1];

  const [successNotificationMessage, setSuccessNotificationMessage] =
    useAtom(successNotification);
  const [errorNotificationMessage, setErrorNotificationMessage] =
    useAtom(errorNotification);

  let socket: Socket | null = null;

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

  //initial state change
  useEffect(() => {
    initService().then((status) => {
      setinitStatus({ ...status });
      setLoading(false);
    });

    return () => {
      if (isSocketConnected && socket !== null) disconnectSocketIO(socket)();
    };
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

  //setting up user status
  useEffect(() => {
    if (initStatus.isNew && !initStatus.isLoggedIn) re("setup");
    if (!initStatus.isNew && !initStatus.isLoggedIn) re("login");
    if (!initStatus.isNew && initStatus.isLoggedIn) {
      re("dashboard");

      fetchUserPermissions("Permissions").then((response) => {
        if (response.success) {
          setUserPermissions({
            ...defaultPermissions,
            ...response.payload.permissions,
          });
        }
      });
    }
  }, [initStatus]);

  //Logout state change
  useEffect(() => {
    if (loggedOut) {
      setLoggedOut(false);
      setinitStatus({ ...initStatus, isLoggedIn: false });
    }
  }, [loggedOut]);

  //Login state chnage
  useEffect(() => {
    if (loggedIn) {
      setLoggedIn(false);
      setinitStatus({ ...initStatus, isLoggedIn: true });
    }
  }, [loggedIn]);

  //socket connection and disconnect
  useEffect(() => {
    if (
      !isLoading &&
      !initStatus.isNew &&
      initStatus.isLoggedIn &&
      socket === null
    ) {
      socket = socket !== null ? socket : connectSocketIO(initStatus.userID);
      socket.on("connect", () => setSocketConnected(true));
      socket.on("disconnect", () => setSocketConnected(false));
      baseSocketIOHndlers(socket, initStatus.userID!).onRoleUpdate(
        ({ isActiveUser, roles }) => {
          if (!isActiveUser) {
            setinitStatus({ ...initStatus, isLoggedIn: false });
            userSignoutService().then(() => {
              if (socket !== null) {
                disconnectSocketIO(socket)();
                socket = null;
              }
            });
            return;
          }
          setUserPermissions({ ...defaultPermissions, ...roles });
        }
      );
      return;
    }

    if (socket !== null) disconnectSocketIO(socket)();
  }, [initStatus]);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
}
