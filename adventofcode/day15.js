function generatorMatch(genAstart, genBstart) {
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
function generatorMatch2(genAstart, genBstart) {
  let sequencesA=[];
  let sequencesB=[];
  let lastA = genAstart;
  let lastB = genBstart;
  let newA;
  let newB;
  let count = 0;

  while (sequencesA.length < 5000000 || sequencesB.length < 5000000) {
    newA = (lastA * 16807) % 2147483647;
    newB = (lastB * 48271) % 2147483647;
    lastA = newA;
    lastB = newB;
    if (newA % 4 === 0) {
      newA = newA.toString(2);
      newA = newA.split("").splice(-16).join("");
      sequencesA.push(newA);
    }
    if (newB % 8 === 0) {
      newB = newB.toString(2);
      newB = newB.split("").splice(-16).join("");
      sequencesB.push(newB);
    }
  }
  for (let i = 0; i < 5000000; i++) {
    if (sequencesA[i] === sequencesB[i]) {count++;}
  }
  console.log(count);

}

generatorMatch2(65, 8921);
generatorMatch2(512, 191);
