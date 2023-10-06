# React Tealium Example with Next.js

This repo is the example repo for [a StackOverflow answer](https://stackoverflow.com/a/66487661/2016353) to a question about [Tealium Tags Integration with React](https://stackoverflow.com/q/56691221/2016353)

## Run the Example

- Update your `.env` file per the `.env.example` example file to configure your Tealium account, profile, and environment. Note that these are public environment variables that inlined into the JavaScript sent to the browser.
- Install dependencies with `npm install`
- Run the Next.js server locally with `npm run dev`

## Salient Points of the Architecture

### Reference to the global `window.utag` object is stored in context

The useState and useEffect approach for polling for the utag object on the window could probably be improved. Regardless, the net result is the value changes from an `EmptyUtag` object (that discards calls) to a reference to the `window.utag` global object.

```
<UtagContext.Provider value={utag}>{children}</UtagContext.Provider>
```

### App-level component is wrapped with context provider

The App component is wrapped with `UtagProvider` so that individual page's can use the utag value in their logic.

```
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UtagProvider>
      <Component {...pageProps} />
    </UtagProvider>
  );
};
```

### Explicitly handle page views

Page views are handled explicitly in Page-level component useEffect

```
useEffect(() => {
  // Explicitly handle page views
  utag.view({ page_name: "Mens Fashion: View Page" });
}, [utag]);
```

### Events are tracked at the component level

```
<input
  name="shirts"
  type="range"
  min="0"
  max="100"
  step="1"
  onChange={(e) => {
    utag.link({
      tealium_event: "Change Quantity",
      product_id: ["12345"],
      product_name: ["Lucky Shirt"],
      product_quantity: [e.target.value],
      product_price: ["12.99"],
    });
  }}
/>
```
