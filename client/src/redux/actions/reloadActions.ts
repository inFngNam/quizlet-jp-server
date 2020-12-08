import { getAccessToken } from "../../helper/getDataLocaStorage"
import { me } from "./userAction"
import { allModules } from "./moduleAction";
import { getListFolders } from "./folderActions";
import { getListOfCLasses } from "./classActions";
import { joinedClass } from "./joinClassAction";


export const resolverReload = () => {
    return async (dispatch: any) => {
        const accessToken = await getAccessToken();
        dispatch(me(accessToken))
        dispatch(allModules(accessToken))
        dispatch(getListFolders(accessToken))
        dispatch(getListOfCLasses(accessToken))
        dispatch(joinedClass(accessToken))
    }
}