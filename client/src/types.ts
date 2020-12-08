export enum HTTP_METHOD {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
export enum ENABLE_FIELD_SEARCH  {
    NAME = "name",
    CREATED_AT = "created_at"
}
export enum ENABLE_SORT_TYPE {
    DESC = "desc",
    ASC = "asc"
}
export type Api = {
    url: string;
    method: HTTP_METHOD;
}
export type ActionStore = {
    type: string;
    payload?: any;
}
export type RegisterInput = {
    username: string;
    birthday: string;
    email: string;
    password: string;
}
export type LoginInput = {
    email: string;
    password: string;
}
export type AccessRolePopupProps = {
    user?: any;
    showModal: boolean;
    closePopup?: any;
    handleMax?: any;
    edit?: any;
}
export type TermPopupProps = {
    terms?: any;
    user?: any;
    showAddTerm?: boolean;
    closePopup?: any;
    module_id?: number;
    addTerm?: any;
    editTerm?: any;
    term_id?: any;
    showEditTerm?: any;
    item?: any;
}
export type ModuleCreate = {
    name: string;
    public?: boolean;
    max_score?: number;
    description?: string;
}
export type CreateFolderInput = {
    name: string;
    public: boolean;
    description?: string;
}
export type UpdateFolderInput = {
    name?: string;
    public?: boolean;
    description?: string;
}

export type UpdateClassInput = {
    name?: string;
    public?: boolean;
    description?: string;
}

export type CreateClassInput = {
    name: string;
    public: boolean;
    description?: string;
}
export type QuerySearchInput = {
    name: string,
    sortBy: ENABLE_FIELD_SEARCH,
    sortType: ENABLE_SORT_TYPE.ASC | ENABLE_SORT_TYPE.DESC
}