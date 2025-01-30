# Clinical Logging API Endpoints
**Note:** You need to generate a token before you can access all endpoints either by logging in using the front-end interface or using the auth endpoint.

## Auth
### Generate token
`POST` api/auth/token 

Query Params: 
| Name | Type |
|------|------|
| **email** | string |
| **password** | string |

## Logbooks
### Create logbook
`POST` api/logbooks/

Query Params: 
| Name | Type |
|------|------|
| **type** | string |
| **title** | string |

### Logbook details
`GET` api/logbooks/{logbookID}

Query Params: 
| Name | Type |
|------|------|
| **logbookID** | uuid |

### User's logbooks
`GET` api/logbooks/

Query Params: None

## Logs
### Create log
`POST` api/logbooks/{logbookID}/logs

Query Params: Params changes between log types. You can find example queries for each log type in the `examples` directory.

### Logbook's logs
`GET` api/logbooks/{logbookID}/logs

Query Params: 
| Name | Type |
|------|------|
| **logbookID** | uuid |

### Log details
`GET` api/logbooks/{logbookID}/logs/{logID}

Query Params: 
| Name | Type |
|------|------|
| **logbookID** | uuid |
| **logID** | uuid |







