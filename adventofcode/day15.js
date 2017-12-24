function generatorMatch(genAstart, genBstart) {
  let sequencesA=[];
  let sequencesB=[];
  let lastA = genAstart;
  let lastB = genBstart;
  let newA;
  let newB;
  let count = 0;

  for (let i =0; i < 40000000; i++) {
    newA = (lastA * 16807) % 2147483647;
    newB = (lastB * 48271) % 2147483647;
    lastA = newA;
    lastB = newB;
    newA = newA.toString(2);
    newA = newA.split("").splice(-16).join("");
    newB = newB.toString(2);
    newB = newB.split("").splice(-16).join("");
    if (newA === newB) {
      count++;
    }
  }
  console.log(count);

}

generatorMatch(512, 191);
