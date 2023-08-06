
**Project Title:** Dashboard -Backend
**Live Link / Demo Link:**

## File Structure
Structure of Files.
```markdown
├── controller
| ├── user
| | ├── index.js //defining method for [get,post for users]
├── middleware
| ├── auth.js //used for checking token comming in header ['x-access-token']
├── models
│ ├── user.model.js //User model is defined for mongobd
├── routes
│ ├── apis //for api routes entry points 
| │ ├── v1 
| │ ├── index.js
├── services 
│ ├── user  //all user functions is defined here
│ | ├── index.js 
├── index.js //root file
├── node_modules
├── package.json
├── Dashboard.postmancollection.json //all the api is in this collection this can be used in postman
├──  test.js //test the server
└── .gitignore
```
way App work is  Flow
```
									middleware
									 ^    |
									 |	  |	
	index.js-> router->apis[version]-> controller -> services -> models 
```
## Services/api
These are the that is used for users `services\user\index.js`
| Services (User)`user.[method]` | params   | method  | `requiremet` | description |
| ------------------| ----- | ----- | ----- | ----------------------------|
| `register` | `req,res`| `post` | `nothing` | register a new user        |
| `edit` | `req,res`| `post` | `auth tokem` 	| modify user details first and last name |
| `get` | `req,res`| `get` | `auth tokem` 	| get all users |
| `auth` | `req,res`| `get` |`auth tokem` 	| Jwt token check  |
| `login` | `req,res`|`post` | `nothing` 	|User Login |


## User Schema 
```
first_name: { type:  String, default:  null },
last_name: { type:  String, default:  null },
email: { type:  String, unique:  true },
password: { type:  String },
role:{type:  String, default:  'user'},
token: { type:  String },
```
## Technology Used / library

**`Mongodb:`**  `Used for Database`
**`JavaScript:`**  `Used for writing defination `

## **Setup / Installation**
##### Clone the repo from github.
```bash
git  clone  ...
cd  [dashboard-backend]
```
##### Install the packages
```bash
npm  install
```
##### Start the Application
```bash
npm  start
```
or in Development use 

```bash
nodemon
```