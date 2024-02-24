# Instagram-Simulation
User Interface for understanding and reasoning on data Terms of Use of Social Media Data by simulating a Social Media platform in which users have complete control over their data with respect to recommendation algorithms.

To run the react app cd into web-app and run npm run start.

The app will ask you to log in - it definitely works for default provider (https://solidweb.me) but feel free to try out other providers (some throw errors - TODO - fix this) 

Each user profile consists of the following fields:
1. solid webID
2. username (for user study this will be the participant id)
3. list of categories this user likes
4. other personal data
    - location field?
    - ???


Potential factors to consider when creating a user profile:

1. Explicit User Preferences - indicated by selecting categories of interest.

2. Demographic Information (?) - factors such as age, gender, location, occupation, etc. to tailor recommendations based on demographic characteristics. (demographic segmentation?)

3. Interactions - analyze user's interactions with posts to track which categories they like.

4. Temporal Patterns: Consider time-based factors such as time of day, day of the week, or seasonal preferences. Users may have different interests depending on the time or season.

5. Content Length and Complexity (?) Some users may prefer shorter, concise content, while others may prefer longer, more in-depth posts. Adjust recommendations based on the user's preference for content length and complexity.

6. Language and Tone (?) Analyze the language and tone of the posts that the user has interacted with in the past. Tailor recommendations to match the user's preferred language and tone.

Engagement Level: Consider the level of engagement with different categories. Some users may prefer highly interactive content, while others may prefer passive consumption.

Social Context: Although you're not using a user network, you can still consider broader social trends or popular topics that may be relevant to the user based on their demographic information or past interactions.

External Factors: Consider external factors such as current events, trends, or cultural phenomena that may influence the user's preferences.

Feedback Mechanisms: Implement mechanisms for users to provide explicit feedback on recommended posts, allowing the system to refine recommendations over time based on user input.

Note:
To run the flask backend first allow running scripts using:
Set-ExecutionPolicy Unrestricted -Scope Process

Then activate the virtual environment using:
venv/bin/activate

And finally run the flask using:
venv/bin/flask run
OR
python api.py


