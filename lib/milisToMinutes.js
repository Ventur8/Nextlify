export function milisToMinutes(milis) {
    const minutes = Math.floor(milis / 60000);
    const seconds = ((milis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}