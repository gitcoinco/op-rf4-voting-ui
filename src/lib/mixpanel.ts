"use client";
import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_API!, {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

export default mixpanel;

mixpanel.track_links("a", "click nav link", {
  referrer: typeof document !== undefined ? document.referrer : undefined,
});
