"use client";

/**
 * Small client island for the footer — dispatches a custom event
 * that re-opens the cookie consent banner so users can change
 * their preference without clearing browser cookies manually.
 */
const CookieSettingsButton = () => {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("show-cookie-consent"))}
      className="transition hover:text-white"
    >
      Manage Cookies
    </button>
  );
};

export default CookieSettingsButton;
