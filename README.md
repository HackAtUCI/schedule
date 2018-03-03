# Hackathon Schedule Template
Simple, responsive schedule template for hackathons. Built on Angular.js, it takes in a schedule and displays it in a nicely formatted list.

## Features
* Reads in schedule data from a JSON file (you can even use an online JSON host such as [Jasonbase](https://www.jasonbase.com/) for fast editing).
* Supports one-day, two-day and three-day schedules.
* Displays a countdown timer that counts to both starting time and ending time.
* Navigation bar for easier access to Devpost, Slack, etc.
* Responsive, works on mobile!

## Screenshots
#### Desktop
![Desktop](/screenshots/desktop.png)

#### Desktop (Two-day Schedule)
![Desktop with two-day schedule](/screenshots/desktop_dual.png)

#### Mobile
![Mobile](/screenshots/mobile.png)

## Setup
1. Clone the repository.
2. Update the `startDate` and `endDate` variables in `config.json`.
3. Generate your JSON schedule file based on the format found in the samples at `sample_schedules/` and assign it to the `scheduleUrl` variable in `config.json`.
4. Update the branding.
5. Update the URLs on the navbar.
6. You’re good to go!

## Contributing
All contributions are welcome and appreciated!