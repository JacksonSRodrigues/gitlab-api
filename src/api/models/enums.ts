export enum Visibility {
    PUBLIC = 'public',
    INTERNAL = 'internal',
    PRIVATE = 'private'
}

export enum Orderby {
    ID = 'id',
    NAME = 'name',
    PATH = 'path',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updated_at',
    LAST_ACTIVITY_AT = 'last_activity_at'
}

export enum SortOrder {
    ASCENDING = 'asc',
    DESCENDING = 'desc'
}

export enum State {
    OPENED = 'opened',
    CLOSED = 'closed'
}

export enum Scope {
    ALL = 'all',
    ASSIGNED_TO_ME = 'assigned_to_me',
    CREATED_BY_ME = 'created_by_me'
}