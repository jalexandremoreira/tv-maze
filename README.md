## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs the necessary dependencies for the project.

### `npx expo start`

Runs expo development mode.
In the CLI you can choose to run the app on a simulator or on your phone using the Expo Go App. You can also press W to run the app on the web (I suggest toggling the mobile device mode in the browser inspector since the app doesn't currently handle desktop sizes).

## Development Time

Development took about 16h, including the taken time to design the app on Figma and implement the API. The reason for this is the lack of a UI library. I wanted to display my ability to create complex UI from scratch, but this took a lot of time.

With more time I would have abstracted the fetching logic to App.tsx and created a provider using the Context API in order to serve the same data across the app. This would have allowed me to also display any fetching errors using the SnackBar component.

I would have also saved all the data returned by the API when fetching in order to display a paginated "recently viewed" section on the home page, and to reduce time when fetching the same data again.

Finally I would have spent some more time implementing proper exact paths in order to be able to share a link from the app to a specific show that opens on the web version in absence of the app.

## Future Improvements

Some of the things in this list are "nice to have" and some are "must have" in order to make the app production ready.

- Add better handling when there are no favorites;
- Add a 404 page
- Add better handling of errors;
- Add accounts for persistent favorites;
