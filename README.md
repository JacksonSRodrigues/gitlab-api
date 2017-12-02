# r-gitlab-api
An javascript api for accessing gitlab api's into your project. Build on Typescript. Gives access to basic gitlab operations you need to do by simply setting private token. Internally uses Frisbee api.. thanks to Frisbee team..

### Install
```
npm install r-gitlab-api --save
```

#### How to Use

##### Before Calling the api
``` ts
import { setAccessToken } from 'r-gitlab-api'

setAccessToken('ACCESS_TOKEN')
```

##### Projects
``` ts
import { Visibility } from 'r-gitlab-api'
import { Projects, Project } from 'r-gitlab-api'

const projects: Project[] = await Projects.getAll(Visibility.PRIVATE)
``` 

##### Issues

```ts
import { Issues, Issue } from 'r-gitlab-api'

let issues: Issue[] = await Issues.getAllOfProject(project.id)
```


## API
### Projects
```ts
getAll(visibity?: Visibility, owned?: boolean, membership?: boolean, sort?: SortOrder, orderby?: Orderby, search?: string): Promise<Project[]>

getOne(id: string): Promise<Project>
```



### Issues

```ts
getAll(state?: State, scope?: Scope, labels?: string[], milestoneTitle?: string, orderBy?: (Orderby.CREATED_AT | Orderby.UPDATED_AT), sort?: SortOrder, search?: string, milestoneIds?: string[], authoredBy?: string, assignedTo?: string): Promise<Issue[]>

getAllOfProject(projectId: string, state?: State, scope?: Scope, labels?: string[], milestoneTitle?: string, sort?: SortOrder, search?: string, milestoneIds?: string[], authoredBy?: string, assignedTo?: string): Promise<Issue[]>

getOneOfProject(projectId: string, issueId: string): Promise<Issue[]>

create(projectId: string, title: string, description?: string, confidential?: boolean, assigneeIds?: string[], milestoneId?: string, labels?: string[], dueDate?: Date): Promise<Issue>

edit(projectId: string, issueId: string, title?: string, description?: string, confidential?: boolean, assigneeIds?: string[], milestoneId?: string, labels?: string[], dueDate?: Date, event?: 'reopen' | 'close'): Promise<Issue>

deleteOne(projectId: string, issueId: string): Promise<Issue>
```

### Labels

```ts
getAll(projectId: string): Promise<Label[]>

create(projectId: string, name: string, color: string, description?: string): Promise<Label>
```

### Project Milestones

```ts
getAll(projectId: string, state?: State, search?: string, milestoneIds?: string[]): Promise<Milestone[]>

getOne(projectId: string, milestoneId: string): Promise<Milestone[]>

create(projectId: string, title: string, description?: string, dueDate?: Date, startDate?: Date): Promise<Milestone>

edit(projectId: string, milestoneId: string, title?: string, description?: string, dueDate?: Date, startDate?: Date, stateEvent?: string): Promise<Milestone>

getIssues(projectId: string, milestoneId: string): Promise<Issue[]>
```