import { atom } from "jotai";
import { UserPermissions } from "@eco-flow/types";
import defaultPermissions from "../defaults/defaultPermissions.default";

const userPermissions = atom<UserPermissions>(defaultPermissions);

export { userPermissions };
