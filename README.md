# React Native Challenge

## Description

This project is a video listing and playback application developed using React Native and Expo. It enables users to browse a list of videos retrieved from a simulated API (using json-server), view detailed information about each video, and play videos via HLS streaming. The application features skeleton loading to enhance the user experience during data fetching, and allows users to like videos and view the number of likes and views. Additionally, the app includes smooth animations and transitions to provide a seamless and engaging user experience.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Install ngrok

   Get your authtoken from [here](https://dashboard.ngrok.com/get-started/setup) and install ngrok following the instructions

   run the following command to expose your localhost to the internet

   ```bash
   ngrok http http://localhost:3001
   ```

   update your .env file EXPO_PUBLIC_API_URL variable with the ngrok url

3. Start the app

   ```bash
   npx expo start
   ```

   ```bash
   npx json-server --watch db.json -p 3001
   ```
