// toggle button
const getElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw Error(`Моля провери имената на класовете, няма клас ${selector} `);
};

const links = getElement(".nav-links");
const navBtnDOM = getElement(".nav-btn");

navBtnDOM.addEventListener("click", () => {
  links.classList.toggle("show-links");
});
// date element
const date = getElement("#date");
const currentYear = new Date().getFullYear();
date.textContent = currentYear;

// slider
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");
slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});
let counter = 0;
if (nextBtn) {
  nextBtn.addEventListener("click", function () {
    counter++;
    carousel();
  });
}
if (prevBtn) {
  prevBtn.addEventListener("click", function () {
    counter--;
    carousel();
  });
}

function carousel() {
  // working with slides
  if (counter === slides.length) {
    counter = 0;
  }
  if (counter < 0) {
    counter = slides.length - 1;
  }
  // working with buttons

  // if (counter < slides.length - 1) {
  //   nextBtn.style.display = "block";
  // } else {
  //   nextBtn.style.display = "none";
  // }
  // if (counter > 0) {
  //   prevBtn.style.display = "block";
  // } else {
  //   prevBtn.style.display = "none";
  // }
  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}
if (prevBtn) {
  prevBtn.style.display = "none";
}

// RESULT-Modal
const resultBtn = document.querySelector(".result-btn");
const result = document.querySelector("div.result-overlay");
const closeBtn = document.querySelector(".close-btn");
let carOneMassTotal;
let carTwoMassTotal;
let data;
let calcD1;
let calcD2;

const carMass1 = document.getElementById("car1");
const person1_1 = document.getElementById("person1_1");
const person1_2 = document.getElementById("person1_2");
const person1_3 = document.getElementById("person1_3");
const person1_4 = document.getElementById("person1_4");
const person1_5 = document.getElementById("person1_5");
const luggage1 = document.getElementById("luggage1");
const carMass2 = document.getElementById("car2");
const person2_1 = document.getElementById("person2_1");
const person2_2 = document.getElementById("person2_2");
const person2_3 = document.getElementById("person2_3");
const person2_4 = document.getElementById("person2_4");
const person2_5 = document.getElementById("person2_5");
const luggage2 = document.getElementById("luggage2");
const ang1Before = document.getElementById("ang1before");
const ang2Before = document.getElementById("ang2before");
const ang1After = document.getElementById("ang1after");
const ang2After = document.getElementById("ang2after");
const inclineZero_1 = document.getElementById("zero1");
const inclineOne_1 = document.getElementById("one1");
const inclineZero_2 = document.getElementById("zero2");
const inclineOne_2 = document.getElementById("one2");
const inclineAngle_1 = document.getElementById("inclineangle1");
const inclineAngle_2 = document.getElementById("inclineangle2");
const distance1_1 = document.getElementById("distance1car1");
const distance1_2 = document.getElementById("distance2car1");
const distance2_1 = document.getElementById("distance1car2");
const distance2_2 = document.getElementById("distance2car2");
const friction1_1 = document.getElementById("friction1car1");
const friction1_2 = document.getElementById("friction2car1");
const friction2_1 = document.getElementById("friction1car2");
const friction2_2 = document.getElementById("friction2car2");
const speed_1 = document.getElementById("speed1");
const speed_2 = document.getElementById("speed2");
const oneAfterMS = document.querySelector(".oneafterms");
const oneAfterKmh = document.querySelector(".oneafterkmh");
const twoAfterMS = document.querySelector(".twoafterms");
const twoAfterKmh = document.querySelector(".twoafterkmh");
const oneBeforeMS = document.querySelector(".onebeforems");
const oneBeforeKmH = document.querySelector(".onebeforekmh");
const twoBeforeMS = document.querySelector(".twobeforems");
const twoBeforeKmH = document.querySelector(".twobeforekmh");

const numberInputs = document.querySelectorAll("input[type='number']");
// get and set localStorage for text/number/tel inputs
numberInputs.forEach((element) => {
  // get element Id to use as localStorage property name
  const dataName = element.getAttribute("id");
  // get input field data, if it's already stored in the localStorage
  const dataStored = localStorage.getItem(dataName);
  // set the localStorage value to the input field, if it exists
  if (dataStored) {
    element.value = localStorage.getItem(dataName);
  }

  // on blur save data input
  element.addEventListener("blur", function (event) {
    localStorage.setItem(dataName, event.target.value);
    console.log(localStorage.getItem(dataName));
  });
});

/*** STORAGE ACTIONS ***/

function clearStorage() {
  localStorage.clear();
}

function getStorageData() {
  const parsedData = {};

  // interate through all elements of the localStorage and parse the values
  numberInputs.forEach((element) => {
    parsedData[element.id] = JSON.parse(localStorage.getItem(element.id));
  });

  return parsedData;
}

function clearInputFields() {
  numberInputs.forEach((element) => {
    element.value = null;
  });
}

resultBtn.addEventListener("click", function (e) {
  data = getStorageData();
  carOneMassTotal = calculateCarMassTotal({
    carOneWeight: data.car1,
    passanger1_1Weight: data.person1_1,
    passanger1_2Weight: data.person1_2,
    passanger1_3Weight: data.person1_3,
    passanger1_4Weight: data.person1_4,
    passanger1_5Weight: data.person1_5,
    luggageOneWeight: data.luggage1,
  });

  carTwoMassTotal = calculateCarMassTotal({
    carTwoWeight: data.car2,
    passanger2_1Weight: data.person2_1,
    passanger2_2Weight: data.person2_2,
    passanger2_3Weight: data.person2_3,
    passanger2_4Weight: data.person2_4,
    passanger2_5Weight: data.person2_5,
    luggageTwoWeight: data.luggage2,
  });
  if (
    (!document.getElementById("zero1").checked &&
      !document.getElementById("one1").checked) ||
    (!document.getElementById("zero2").checked &&
      !document.getElementById("one2").checked) ||
    (carOneMassTotal == 0 && carTwoMassTotal == 0) ||
    (data.ang1before == 0 && data.ang2before == 0) ||
    calcD1 == 0 ||
    calcD2 == 0
  ) {
    alert("Моля, въведете правилна информация и отбележете всички полета!");
  } else {
    const matrixA11 = calcMatrixA11andA12(carOneMassTotal, data.ang1before);
    const matrixA12 = calcMatrixA11andA12(carTwoMassTotal, data.ang2before);
    const matrixA21 = calcMatrixA21andA22(carOneMassTotal, data.ang1before);
    const matrixA22 = calcMatrixA21andA22(carTwoMassTotal, data.ang2before);
    let downOrUpHill;
    if (document.getElementById("zero1").checked) {
      downOrUpHill = calcDownhillSpeed(
        data.speed1,
        data.distance1car1,
        data.friction1car1,
        data.inclineangle1,
        data.distance2car1,
        data.friction2car1
      );
    } else if (document.getElementById("one1").checked) {
      downOrUpHill = calcUphillSpeed(
        data.speed1,
        data.distance1car1,
        data.friction1car1,
        data.inclineangle1,
        data.distance2car1,
        data.friction2car1
      );
    }
    let secondDownOrUpHill;
    if (document.getElementById("zero2").checked) {
      secondDownOrUpHill = calcDownhillSpeed(
        data.speed2,
        data.distance1car2,
        data.friction1car2,
        data.inclineangle2,
        data.distance2car2,
        data.friction2car2
      );
    } else if (document.getElementById("one2").checked) {
      secondDownOrUpHill = calcUphillSpeed(
        data.speed2,
        data.distance1car2,
        data.friction1car2,
        data.inclineangle2,
        data.distance2car2,
        data.friction2car2
      );
    }

    const det = calcDet(matrixA11, matrixA12, matrixA21, matrixA22);

    const matrixF1 = calcMatrixF1(
      carOneMassTotal,
      downOrUpHill,
      data.ang1after,
      carTwoMassTotal,
      secondDownOrUpHill,
      data.ang2after
    );
    const matrixF2 = calcMatrixF2(
      carOneMassTotal,
      downOrUpHill,
      data.ang1after,
      carTwoMassTotal,
      secondDownOrUpHill,
      data.ang2after
    );
    calcD1 = calcD1andD2(matrixF1, matrixA22, matrixA12, matrixF2);
    calcD2 = calcD1andD2(matrixA11, matrixF2, matrixF1, matrixA21);
    const onebeforeMS = D1orD2devidedByDet(calcD1, det);
    const twobeforeMS = D1orD2devidedByDet(calcD2, det);
    const oneafterKmH = parseToKmH(downOrUpHill);
    const twoafterKmH = parseToKmH(secondDownOrUpHill);
    const onebeforeKmH = parseToKmH(onebeforeMS);
    const twobeforeKmH = parseToKmH(twobeforeMS);
    oneAfterMS.innerHTML = `${downOrUpHill}`;
    twoAfterMS.innerHTML = `${secondDownOrUpHill}`;
    oneAfterKmh.innerHTML = `${oneafterKmH}`;
    twoAfterKmh.innerHTML = `${twoafterKmH}`;
    oneBeforeMS.innerHTML = `${onebeforeMS}`;
    twoBeforeMS.innerHTML = `${twobeforeMS}`;
    oneBeforeKmH.innerHTML = `${onebeforeKmH}`;
    twoBeforeKmH.innerHTML = `${twobeforeKmH}`;
  }
});

if (resultBtn) {
  resultBtn.addEventListener("click", function (e) {
    if (
      !(
        (!document.getElementById("zero1").checked &&
          !document.getElementById("one1").checked) ||
        (!document.getElementById("zero2").checked &&
          !document.getElementById("one2").checked) ||
        (carOneMassTotal == 0 && carTwoMassTotal == 0) ||
        (data.ang1before == 0 && data.ang2before == 0) ||
        calcD1 == 0 ||
        calcD2 == 0
      )
    ) {
      e.preventDefault();
      result.classList.add("open-result");
    }
  });
}
if (closeBtn) {
  closeBtn.addEventListener("click", function (e) {
    result.classList.remove("open-result");
  });
}

// Clear button
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", function (e) {
  clearStorage();
  clearInputFields();
});

/*** CALCULATIONS ***/

// Обща маса на автомобил в килограми
const calculateCarMassTotal = (carOneData) => {
  let carOneMassTotal = 0;

  for (const entry in carOneData) {
    carOneMassTotal += carOneData[entry];
  }

  return carOneMassTotal;
};

/*** КВАДРАТНА МАТРИЦА "А" И МАТРИЦА СТЪЛБ "F" ***/
const calcMatrixA11andA12 = (carOneMassTotal, angleBeforeHit) => {
  // A(1,1) func =====> B2*COS(B4*3.1416/180)
  // A(1,2) func ==== > B3*COS(B5*3.1416/180)
  return carOneMassTotal * Math.cos((angleBeforeHit * 3.1416) / 180);
};

const calcMatrixA21andA22 = (carOneMassTotal, angleBeforeHit) => {
  // A(2,1) func =====> B2*SIN(B4*3.1416/180)
  // A(2,2) func =====> B3*SIN(B5*3.1416/180)
  return carOneMassTotal * Math.sin((angleBeforeHit * 3.1416) / 180);
};
const calcMatrixF1 = (
  carOneMassTotal,
  downOrUp,
  angOneAfter,
  carTwoMassTotal,
  downOrUp2,
  angTwoAfter
) => {
  // F(1,1) func =====> B2*D41*COS(B6*3.1416/180)+B3*D43*COS(B7*3.1416/180)
  let first =
    carOneMassTotal * downOrUp * Math.cos((angOneAfter * 3.1416) / 180);
  let second =
    carTwoMassTotal * downOrUp2 * Math.cos((angTwoAfter * 3.1416) / 180);
  return first + second;
};

const calcMatrixF2 = (
  carOneMassTotal,
  downOrUp,
  angOneAfter,
  carTwoMassTotal,
  downOrUp2,
  angTwoAfter
) => {
  // F(1,2) func =====> B2*D41*SIN(B6*3.1416/180)+B3*D43*SIN(B7*3.1416/180)
  let first2 =
    carOneMassTotal * downOrUp * Math.sin((angOneAfter * 3.1416) / 180);
  let second2 =
    carTwoMassTotal * downOrUp2 * Math.sin((angTwoAfter * 3.1416) / 180);
  return first2 + second2;
};

const calcDet = (matrixA11, matrixA12, matrixA21, matrixA22) => {
  // matrix = [ [11, 12], [21, 22] ];
  return matrixA11 * matrixA22 - matrixA21 * matrixA12;
};

const calcD1andD2 = (matrix1, matrix2, matrix3, matrix4) => {
  return matrix1 * matrix2 - matrix3 * matrix4;
};

// Скорост на автомобил 1 след удара [m/s] --- СПУСКАНЕ
const calcDownhillSpeed = (
  speed,
  firstAfterDistance,
  firstFriction,
  inclineAng,
  secondAfterDistance,
  secondFriction
) => {
  let powFunc = Math.pow(speed / 3.6, 2);
  let cosFunc =
    2 *
    9.81 *
    firstAfterDistance *
    (firstFriction * Math.cos((inclineAng * 3.1416) / 180) -
      Math.sin((inclineAng * 3.1416) / 180)); // калкулацията за B и за D е абсолютно еднаква - може да се изнесе във фунцкия с подходящо име и параметри
  // let sinFunc = Math.sin((inclineAng * 3.1416) / 180);
  let secCosFunc =
    2 *
    9.81 *
    secondAfterDistance *
    (secondFriction * Math.cos((inclineAng * 3.1416) / 180) -
      Math.sin((inclineAng * 3.1416) / 180));
  return Math.sqrt(powFunc + cosFunc + secCosFunc).toFixed(2);
  // =IF(B9<1,SQRT((B13/3.6)^2+2*9.81*B15*(B19*COS(B11*3.1416/180)-SIN(B11*3.1416/180))+2*9.81*B16*(B20*COS(B11*3.1416/180)-SIN(B11*3.1416/180))),0)
};
// Скорост на автомобил 1 след удара [m/s] --- ИЗКАЧВАНЕ
const calcUphillSpeed = (
  speed,
  firstAfterDistance,
  firstFriction,
  inclineAng,
  secondAfterDistance,
  secondFriction
) => {
  let powFunc1 = Math.pow(speed / 3.6, 2);
  let cosFunc1 =
    2 *
    9.81 *
    firstAfterDistance *
    (firstFriction * Math.cos((inclineAng * 3.1416) / 180) +
      Math.sin((inclineAng * 3.1416) / 180));
  let secCosFunc1 =
    2 *
    9.81 *
    secondAfterDistance *
    (secondFriction * Math.cos((inclineAng * 3.1416) / 180) +
      Math.sin((inclineAng * 3.1416) / 180));

  return Math.sqrt(powFunc1 + cosFunc1 + secCosFunc1).toFixed(2);
};

const parseToKmH = (value) => {
  return (value * 3.6).toFixed(2);
};
const D1orD2devidedByDet = (value, det) => {
  return (value / det).toFixed(2);
};
