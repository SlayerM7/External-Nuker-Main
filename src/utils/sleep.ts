export default async function (timeout: number) {
  if (timeout.toString().length == 1) timeout *= 1000;

  return new Promise((resolve) => {
    return setTimeout(resolve, timeout);
  });
}
