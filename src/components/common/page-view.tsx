"use client";

import mixpanel from "mixpanel-browser";
import { useEffect } from "react";

export function PageView({ title = "" }) {
  useEffect(() => {
    mixpanel.track_pageview({ title });
  }, [title]);
  return null;
}
