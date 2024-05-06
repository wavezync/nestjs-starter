export const now = () => new Date();
export const nowUTC = () => new Date().toUTCString();
export const nowISO = () => new Date().toISOString();
export const nowUnix = () => Math.floor(new Date().getTime() / 1000);
