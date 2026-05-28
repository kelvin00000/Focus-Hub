export function formatJoinDate(timestamp: {
  seconds: number;
  nanoseconds: number;
}) {
    const parsedDate = new Date(
        timestamp.seconds * 1000
    );
    const day = parsedDate.getDate();
    const suffix =
        day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
    const month = parsedDate.toLocaleString("default",{ month: "long" });
    const year = parsedDate.getFullYear();
    return `${day}${suffix} ${month} ${year}`;
}
