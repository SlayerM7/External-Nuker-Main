import sleep from "../utils/sleep";
async function rapid(str, conditionNumber) {
  let count = 0;
  async function goRapid() {
    return new Promise(async (resolve, reject) => {
      count = count + 1;
      let array = str.split("");
      str = array[0];
      array.shift();
      for (let ix in array) {
        await sleep(40);
        let index = Number(ix);
        str += `${array[index]}`;
        process.title = str;
        if (index + 1 === array.length && count <= array.length) {
          process.title = "";
          if (count !== conditionNumber) goRapid();
          else resolve(void 0);
        }
      }
    });
  }
  return goRapid();
}

export { rapid };
