## Guide for making backend requests

### Avaliable Routes
| Description | Path |
|----------|----------|
| Generate Token | `POST` /api/auth/token |
| Create logbook | `POST` api/logbooks/{type} |
| Retrieve all of user's logbooks | `GET` api/logbooks/ |
| Retrieve logbook details (id, type, time created) | `GET` api/logbooks/{logbookID} |
| Create log | `POST` api/logbooks/{logbookID}/logs |
| Retrieve all logs in specified logbook | `GET` api/logbooks/{logbookID}/logs |
| Retrieve a singular log in specified logbook | `GET` api/logbooks/{logbookID}/logs/{logID} |

**Note:** There are examples for each different log type in the `logs` folder