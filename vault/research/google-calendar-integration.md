# Google Calendar Integration with OpenClaw

This document outlines how to connect Google Calendar to OpenClaw for reading calendar events, focusing on a Chromebook/Linux setup.

## 1. Google Calendar APIs and Authentication Methods

The primary and recommended method for interacting with the Google Calendar API is **OAuth 2.0**.

*   **OAuth 2.0 (Recommended)**: This is the industry-standard protocol for authorization. It allows OpenClaw (as a client application) to access a user's Google Calendar data without ever handling their Google username and password. The flow involves:
    *   **Client ID and Client Secret**: These credentials identify OpenClaw to Google's authentication server.
    *   **Authorization Code**: The user grants permission via a web browser, and an authorization code is returned to OpenClaw.
    *   **Access Token**: OpenClaw exchanges the authorization code for an access token (short-lived) and a refresh token (long-lived).
    *   **Refresh Token**: The refresh token is used to obtain new access tokens when the current one expires, allowing continuous access without re-authentication by the user.
    *   **Scopes**: These define the specific permissions OpenClaw requests (e.g., `https://www.googleapis.com/auth/calendar.readonly` for reading events).
*   **Service Accounts**: These are special Google accounts used by applications to make API calls to Google APIs. They are suitable for server-to-server interactions where the application itself owns the data or acts on behalf of domain-wide delegated authority. While possible, they are generally less suitable for personal assistant scenarios where the assistant needs to access *Dee's personal* calendar.
*   **API Keys**: API keys are used for identifying a project for usage and billing, and are typically used for accessing public data (e.g., Google Maps display) or certain APIs that do not involve user authorization. They **cannot** be used to access private user data like calendar events.

## 2. How OpenClaw could read calendar events

Given the current OpenClaw capabilities and the absence of a documented, built-in Google Calendar plugin, the most effective approach is through **custom Python scripts** utilizing the Google Calendar API.

*   **Custom Python Scripts (`google-api-python-client`)**:
    *   **Mechanism**: A Python script would use the `google-api-python-client` library to interact with the Google Calendar API. It would handle the OAuth 2.0 flow to obtain and manage credentials (access and refresh tokens).
    *   **Reading Events**: The script would make API calls (e.g., `service.events().list()`) to retrieve events from specified calendars. Events can be filtered by time range, calendar ID, and other parameters.
    *   **Integration with OpenClaw**: OpenClaw's `exec` tool can execute this Python script. The script's output (e.g., a formatted list of upcoming events) would be captured by OpenClaw. This allows OpenClaw to get event data on demand or on a schedule (e.g., via a cron job).
*   **Google Apps Script (GAS)**: While powerful for scripting within the Google ecosystem, integrating GAS directly with a locally running OpenClaw instance would be more complex, likely requiring webhooks or other indirect triggers. It's not the recommended primary approach for this specific setup.
*   **Existing Plugins**: A thorough review of the OpenClaw documentation at `/home/dieterwerwath/.config/nvm/versions/node/v22.22.0/lib/node_modules/openclaw/docs/` did not reveal any dedicated, pre-built Google Calendar integration plugins.

## 3. Recommended Approach for a Chromebook/Linux Setup

The recommended approach for Dee's Chromebook/Linux setup is to use a **custom Python script executed by OpenClaw**.

*   **Rationale**:
    *   **Native Support**: Python is well-supported on Linux environments (including Chromebooks running Crostini).
    *   **OpenClaw Compatibility**: The `exec` tool in OpenClaw is designed to run arbitrary shell commands, including Python scripts.
    *   **Direct Control**: This method provides maximum flexibility to customize what calendar data is fetched and how it's processed.
    *   **Security**: OAuth 2.0 for installed applications allows secure, user-delegated access, with credentials stored locally.

## 4. Step-by-step Instructions for Dee to Follow

Here are the step-by-step instructions for Dee to set up Google Calendar integration:

### Step 4.1: Google Cloud Project Setup

1.  **Go to Google Cloud Console**: Navigate to [https://console.cloud.google.com/](https://console.cloud.google.com/).
2.  **Create a New Project**: If you don't have one, create a new project (e.g., "OpenClaw Calendar Integration").
3.  **Enable Google Calendar API**:
    *   In the Google Cloud Console, use the search bar to find "Google Calendar API".
    *   Select it and click "Enable".
4.  **Create OAuth Consent Screen**:
    *   In the navigation menu, go to "APIs & Services" > "OAuth consent screen".
    *   Choose "External" user type and click "Create".
    *   Fill in the required fields (App name, User support email, Developer contact information). For "Authorized domains", you might not need to add anything for a local application, but if prompted, you can leave it blank or add `localhost`.
    *   Add the scope `https://www.googleapis.com/auth/calendar.readonly`. This grants read-only access to your calendars.
    *   Save and continue. For testing, you can add your Google account as a "Test user" to bypass verification for now.
5.  **Create Credentials (OAuth Client ID)**:
    *   In the navigation menu, go to "APIs & Services" > "Credentials".
    *   Click "CREATE CREDENTIALS" > "OAuth client ID".
    *   For "Application type", select "Desktop app".
    *   Give it a name (e.g., "OpenClaw-Calendar").
    *   Click "Create".
    *   **Download JSON**: A dialog will appear with your client ID and client secret. Click "DOWNLOAD JSON" to save your `credentials.json` file. **Rename this file to `credentials.json`** and save it in your OpenClaw workspace (e.g., in a new `skills/calendar/` directory).

### Step 4.2: OpenClaw Environment Setup (Chromebook/Linux)

1.  **Install Python and Libraries**:
    *   Ensure Python 3 is installed.
    *   Install the necessary Python libraries:
        ```bash
        sudo apt update
        sudo apt install python3-pip -y
        pip install google-api-python-client google-auth-oauthlib google-auth-httplib2
        ```
        (If you encounter permission issues, you might need `pip install --user ...`)
2.  **Create a Directory for Calendar Skill**:
    ```bash
    mkdir -p /home/dieterwerwath/torque-workspace/skills/calendar
    ```
3.  **Place `credentials.json`**: Move the downloaded `credentials.json` file into this new `skills/calendar/` directory.

### Step 4.3: Create the Python Script (`get_events.py`)

Create a file named `get_events.py` in `/home/dieterwerwath/torque-workspace/skills/calendar/` with the following content:

```python
import datetime
import os.path
import json

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]

def main():
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first time.
    token_path = os.path.join(os.path.dirname(__file__), "token.json")
    credentials_path = os.path.join(os.path.dirname(__file__), "credentials.json")

    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                credentials_path, SCOPES
            )
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open(token_path, "w") as token:
            token.write(creds.to_json())

    try:
        service = build("calendar", "v3", credentials=creds)

        # Call the Calendar API
        now = datetime.datetime.utcnow().isoformat() + "Z"  # 'Z' indicates UTC time
        # print("Getting the upcoming 10 events")
        events_result = (
            service.events()
            .list(
                calendarId="primary",
                timeMin=now,
                maxResults=10,
                singleEvents=True,
                orderBy="startTime",
            )
            .execute()
        )
        events = events_result.get("items", [])

        if not events:
            print("No upcoming events found.")
            return

        formatted_events = []
        for event in events:
            start = event["start"].get("dateTime", event["start"].get("date"))
            end = event["end"].get("dateTime", event["end"].get("date"))
            formatted_events.append(
                {
                    "summary": event.get("summary", "No Title"),
                    "start": start,
                    "end": end,
                    "location": event.get("location"),
                    "description": event.get("description"),
                }
            )
        print(json.dumps(formatted_events, indent=2))

    except HttpError as error:
        print(f"An error occurred: {error}")

if __name__ == "__main__":
    main()
```

### Step 4.4: Initial Authorization Run

1.  **Run the script manually once**: The first time you run `get_events.py`, it will open a browser window and ask you to log in with your Google account and grant permissions.
    ```bash
    python3 /home/dieterwerwath/torque-workspace/skills/calendar/get_events.py
    ```
    Follow the browser prompts. After successful authorization, a `token.json` file will be created in the `skills/calendar/` directory. This file stores your credentials securely for future runs.

### Step 4.5: Integrate with OpenClaw

You can now use OpenClaw's `exec` tool to run this script and get calendar events.

```python
print(default_api.exec(command='python3 /home/dieterwerwath/torque-workspace/skills/calendar/get_events.py'))
```

This command will execute the Python script, which will then print a JSON array of your upcoming 10 events. OpenClaw will capture this output.

## 5. Costs and Limitations

*   **Costs**:
    *   **Google Calendar API**: The Google Calendar API is typically free for personal use under its free tier, which includes generous quotas for requests. For typical personal assistant usage (checking events a few times a day), it's highly unlikely to incur costs. Details on quotas can be found in the Google Cloud Console.
    *   **Google Cloud Project**: There are no direct costs for creating a Google Cloud project or enabling the Calendar API, unless you exceed the free tier limits (which are very high for simple API usage).
*   **Limitations**:
    *   **OAuth Consent Screen Verification**: If you plan to share this OpenClaw setup or the underlying Google Cloud project with many users, Google may require verification of your OAuth consent screen, especially if you request sensitive scopes. For a personal, single-user setup, adding your Google account as a "Test user" is usually sufficient to avoid this.
    *   **`token.json` Security**: The `token.json` file contains sensitive authentication tokens. It must be kept secure on your Linux system. If this file is compromised, it could grant unauthorized access to your Google Calendar. Ensure your OpenClaw workspace and the Linux environment are properly secured.
    *   **Read-Only Access**: The provided script uses the `calendar.readonly` scope, meaning OpenClaw can only *read* events, not create, modify, or delete them. If write access is needed, the scope would need to be changed to `https://www.googleapis.com/auth/calendar` and the OAuth consent screen re-configured.
    *   **Internet Connection**: OpenClaw and the Python script require an active internet connection to communicate with Google Calendar API.
    *   **Refresh Token Expiry**: While refresh tokens are long-lived, they can theoretically expire or be revoked (e.g., if you change your Google password or revoke access in your Google account settings). If this happens, you would need to re-run the authorization step (Step 4.4).
