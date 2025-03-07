## Guide for pull requests:
- When working on a feature, create a branch for your feature. Please make sure the branch name is in the following format: `name/feature`. Create a new branch for each feature, instead of using the same branch for all of your work.
- When your work is ready for review, open a new pull request to the `main` branch.
- Then, move the relevant ticket in Notion to `In Review` status

**Please follow the following template when filling out a Pull Request:**

### Description
Describe what you did, and what changes you made to the files. If changing any parts of the UI, describe what parts of the UI you changed (ex: added a new login button on the navbar, created a new button on the dashboard that links to a form for users to upload documents for transcription)
### Visuals
Include if making changes to frontend components. This can be in one of two forms:
- Screenshots of the updated UI
- A short video that shows the parts of the app where you have made changes

### Link to Notion ticket
Go to the tasks page in the notion and click on the `...` on the relevant task, copy link, and paste it here

## What not to commit
**Before making any commits, please ensure the following are not being committed**:
Although most of these items are included in the .gitignore files, it's good to double check:
- `node_modules`
- Anything in the root-level `assets` folder
- Any Flowleaflets provided files, for example the logbook pages
- Python virtual environment folders
- Any `.env` files

Additionally, ensure that in any files that are to be committed, please do not include sensitive info such as API keys, patient information, or user credentials.
